import {
  DAYS,
  Day,
  DaySchedule,
  ScheduleEntityMap,
  Transition,
  WeekSchedule,
  HomeAssistant,
  LoadResult,
} from './types';

export const MIN_TEMP = 4;
export const MAX_TEMP = 35;
export const MAX_TRANSITIONS = 6;
export const TEMP_STEP = 0.5;

const INVALID_STATES = new Set(['', 'unknown', 'unavailable', 'none', 'null', 'n/a']);
const token = /^(\d{2}):(\d{2})\/(\d{1,2}(?:\.\d+)?)$/;

export const minutes = (time: string): number => {
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  return match ? Number(match[1]) * 60 + Number(match[2]) : Number.NaN;
};

export const formatTime = (value: number): string => {
  const bounded = Math.max(0, Math.min(1439, Math.round(value)));
  return `${String(Math.floor(bounded / 60)).padStart(2, '0')}:${String(bounded % 60).padStart(2, '0')}`;
};

export function validateDay(schedule: DaySchedule): string[] {
  const errors: string[] = [];
  if (!Array.isArray(schedule) || !schedule.length) errors.push('A day needs at least a 00:00 transition.');
  if (schedule.length > MAX_TRANSITIONS) errors.push(`A day can contain at most ${MAX_TRANSITIONS} transitions.`);
  if (schedule[0]?.time !== '00:00') errors.push('The first transition must be at 00:00.');
  let previous = -1;
  schedule.forEach((item, index) => {
    const at = minutes(item.time);
    if (!Number.isInteger(at) || at < 0 || at >= 1440) errors.push(`Transition ${index + 1} has an invalid time.`);
    if (at <= previous) errors.push('Transition times must be strictly increasing and unique.');
    previous = at;
    if (!Number.isFinite(item.temperature) || item.temperature < MIN_TEMP || item.temperature > MAX_TEMP)
      errors.push(`Transition ${index + 1} must be between ${MIN_TEMP} and ${MAX_TEMP} °C.`);
    if (Math.abs(item.temperature / TEMP_STEP - Math.round(item.temperature / TEMP_STEP)) > 0.00001)
      errors.push(`Transition ${index + 1} must use ${TEMP_STEP} °C steps.`);
  });
  return errors;
}

export interface ParsedDay {
  schedule?: DaySchedule;
  errors: string[];
  /** Exact consecutive time/temperature duplicates removed for the UI only. */
  normalizedDuplicates: number;
}

export function parseDay(value: string): ParsedDay {
  if (typeof value !== 'string' || !value.trim())
    return { errors: ['The cached schedule is empty.'], normalizedDuplicates: 0 };
  const parsed: Transition[] = [];
  for (const part of value.trim().split(/\s+/)) {
    const found = token.exec(part);
    if (!found) return { errors: [`Invalid schedule token: ${part}`], normalizedDuplicates: 0 };
    const hour = Number(found[1]);
    const minute = Number(found[2]);
    if (hour > 23 || minute > 59) return { errors: [`Invalid time: ${found[1]}:${found[2]}`], normalizedDuplicates: 0 };
    parsed.push({ time: `${found[1]}:${found[2]}`, temperature: Number(found[3]) });
  }
  const normalized = parsed.filter((transition, index) => {
    const previous = parsed[index - 1];
    return !previous || previous.time !== transition.time || previous.temperature !== transition.temperature;
  });
  const normalizedDuplicates = parsed.length - normalized.length;
  const errors = validateDay(normalized);
  return errors.length ? { errors, normalizedDuplicates } : { schedule: normalized, errors: [], normalizedDuplicates };
}

export function serializeDay(schedule: DaySchedule): string {
  const errors = validateDay(schedule);
  if (errors.length) throw new Error(errors.join(' '));
  return schedule
    .map(({ time, temperature }) => `${time}/${Number.isInteger(temperature) ? temperature : temperature.toFixed(1)}`)
    .join(' ');
}

export function cloneWeek(schedule: WeekSchedule): WeekSchedule {
  return Object.fromEntries(DAYS.map((day) => [day, schedule[day].map((entry) => ({ ...entry }))])) as WeekSchedule;
}

export function changedDays(original: WeekSchedule, edited: WeekSchedule): Day[] {
  return DAYS.filter((day) => serializeDay(original[day]) !== serializeDay(edited[day]));
}

/** Derive only the common MQTT-discovery entity name; configuration always wins. */
export function discoverScheduleEntities(
  hass: HomeAssistant,
  climateEntity: string,
  explicit?: ScheduleEntityMap
): ScheduleEntityMap {
  const slug = climateEntity.replace(/^climate\./, '');
  const found: ScheduleEntityMap = { ...explicit };
  for (const day of DAYS) {
    if (found[day]) continue;
    const suffix = `_weekly_schedule_${day}`;
    const exact = `text.${slug}${suffix}`;
    if (hass.states[exact]) {
      found[day] = exact;
      continue;
    }
    const candidates = Object.keys(hass.states).filter(
      (id) => id.startsWith('text.') && id.endsWith(suffix) && id.includes(slug)
    );
    if (candidates.length === 1) found[day] = candidates[0];
  }
  return found;
}

export function loadCachedSchedule(
  hass: HomeAssistant,
  climateEntity: string,
  explicit?: ScheduleEntityMap,
  staleAfterHours = 24
): LoadResult {
  const entities = discoverScheduleEntities(hass, climateEntity, explicit);
  const missing = DAYS.filter((day) => !entities[day]);
  if (missing.length)
    return {
      status: 'missing',
      entities,
      message: `Schedule entities were not found for ${missing.join(', ')}. Configure schedule_entities explicitly.`,
    };
  const complete = entities as Record<Day, string>;
  const unavailable = DAYS.filter((day) => INVALID_STATES.has((hass.states[complete[day]]?.state || '').toLowerCase()));
  if (unavailable.length)
    return {
      status: 'unavailable',
      entities,
      message: `Cached schedule values are unavailable for ${unavailable.join(', ')}. Zigbee2MQTT cannot read these schedules on demand.`,
    };
  const schedule = {} as WeekSchedule;
  const normalizedDuplicateDays: Day[] = [];
  for (const day of DAYS) {
    const result = parseDay(hass.states[complete[day]].state);
    if (!result.schedule) return { status: 'malformed', entities, message: `${day}: ${result.errors.join(' ')}` };
    schedule[day] = result.schedule;
    if (result.normalizedDuplicates) normalizedDuplicateDays.push(day);
  }
  const timestamps = DAYS.map(
    (day) => hass.states[complete[day]].last_updated || hass.states[complete[day]].last_changed
  ).filter((v): v is string => Boolean(v));
  const cachedAt = timestamps.sort()[0];
  const stale = cachedAt ? Date.now() - new Date(cachedAt).getTime() > staleAfterHours * 3600000 : false;
  return { status: 'loaded', schedule, entities: complete, cachedAt, stale, normalizedDuplicateDays };
}
