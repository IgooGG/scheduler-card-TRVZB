import { describe, expect, it } from 'vitest';
import { changedDays, loadCachedSchedule, parseDay, serializeDay, validateDay } from '../src/trvzb/schedule';
import { saveChangedDays } from '../src/trvzb/save';
import { DAYS, HomeAssistant, WeekSchedule } from '../src/trvzb/types';

const day = [
  { time: '00:00', temperature: 18 },
  { time: '06:00', temperature: 21 },
  { time: '09:00', temperature: 18 },
];
const week = (): WeekSchedule =>
  Object.fromEntries(DAYS.map((item) => [item, day.map((value) => ({ ...value }))])) as WeekSchedule;
const hass = (states: HomeAssistant['states']): HomeAssistant => ({ states, callService: async () => undefined });

describe('TRVZB daily schedules', () => {
  it('parses and serializes Zigbee2MQTT schedule text', () => {
    const parsed = parseDay('00:00/18 06:00/21 09:00/18.5');
    expect(parsed.errors).toEqual([]);
    expect(serializeDay(parsed.schedule!)).toBe('00:00/18 06:00/21 09:00/18.5');
  });
  it('rejects missing midnight, duplicates, invalid range, step, and more than six transitions', () => {
    expect(validateDay([{ time: '01:00', temperature: 18 }])).toContain('The first transition must be at 00:00.');
    expect(
      validateDay([
        { time: '00:00', temperature: 18 },
        { time: '00:00', temperature: 19 },
      ]).join(' ')
    ).toContain('strictly increasing');
    expect(validateDay([{ time: '00:00', temperature: 3.5 }]).join(' ')).toContain('between 4 and 35');
    expect(validateDay([{ time: '00:00', temperature: 18.2 }]).join(' ')).toContain('0.5 °C');
    expect(
      validateDay(
        Array.from({ length: 7 }, (_, index) => ({ time: `${String(index).padStart(2, '0')}:00`, temperature: 18 }))
      ).join(' ')
    ).toContain('at most 6');
  });
  it('reports only changed days and leaves unmodified days intact', () => {
    const original = week();
    const edited = week();
    edited.tuesday[1].temperature = 22;
    expect(changedDays(original, edited)).toEqual(['tuesday']);
    expect(original.monday).toEqual(edited.monday);
  });
  it('loads only complete available cached state and calls it stale when old', () => {
    const states: HomeAssistant['states'] = {};
    for (const item of DAYS)
      states[`text.room_weekly_schedule_${item}`] = {
        state: '00:00/18',
        attributes: {},
        last_updated: '2000-01-01T00:00:00Z',
      };
    const result = loadCachedSchedule(hass(states), 'climate.room');
    expect(result.status).toBe('loaded');
    if (result.status === 'loaded') expect(result.stale).toBe(true);
  });
  it('does not fabricate an unavailable or malformed schedule', () => {
    const states: HomeAssistant['states'] = {};
    for (const item of DAYS) states[`text.room_weekly_schedule_${item}`] = { state: '00:00/18', attributes: {} };
    states['text.room_weekly_schedule_friday'].state = 'unavailable';
    expect(loadCachedSchedule(hass(states), 'climate.room').status).toBe('unavailable');
    states['text.room_weekly_schedule_friday'].state = 'bad value';
    expect(loadCachedSchedule(hass(states), 'climate.room').status).toBe('malformed');
  });
  it('writes only changed days and preserves unconfirmed days for recovery', async () => {
    const original = week();
    const edited = week();
    edited.monday[1].temperature = 22;
    edited.tuesday[1].temperature = 23;
    const calls: string[] = [];
    const entities = Object.fromEntries(DAYS.map((item) => [item, `text.room_weekly_schedule_${item}`])) as Record<
      (typeof DAYS)[number],
      string
    >;
    const result = await saveChangedDays(
      { states: {}, callService: async (_domain, _service, data) => void calls.push(data?.entity_id as string) },
      entities,
      original,
      edited,
      async (entity) => entity.endsWith('_monday')
    );
    expect(calls).toEqual(['text.room_weekly_schedule_monday', 'text.room_weekly_schedule_tuesday']);
    expect(result.confirmed).toEqual(['monday']);
    expect(result.pending).toEqual(['tuesday']);
    expect(result.error).toContain('tuesday');
  });
  it('does not falsely confirm a transport error', async () => {
    const original = week();
    const edited = week();
    edited.monday[1].temperature = 22;
    const entities = Object.fromEntries(DAYS.map((item) => [item, `text.room_weekly_schedule_${item}`])) as Record<
      (typeof DAYS)[number],
      string
    >;
    const result = await saveChangedDays(
      { states: {}, callService: async () => Promise.reject(new Error('offline')) },
      entities,
      original,
      edited,
      async () => true
    );
    expect(result.confirmed).toEqual([]);
    expect(result.pending).toEqual(['monday']);
    expect(result.error).toBe('offline');
  });
});
