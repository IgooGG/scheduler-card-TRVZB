/** @vitest-environment jsdom */

import { expect, it } from 'vitest';
import { TrvzbInternalSchedulerCard } from '../src/trvzb/card';
import { DAYS, HomeAssistant } from '../src/trvzb/types';
import { TRVZB_INTERNAL_SCHEDULER_BUILD } from '../src/trvzb/version';

it('renders the full editor when all cached weekdays have normalized duplicate final transitions', async () => {
  const states: HomeAssistant['states'] = {
    'climate.room': { state: 'auto', attributes: { friendly_name: 'Room' } },
  };
  for (const day of DAYS)
    states[`text.room_weekly_schedule_${day}`] = {
      state: '00:00/19 04:30/23 09:00/18 14:00/23 22:00/21 22:00/21',
      attributes: {},
    };

  const card = new TrvzbInternalSchedulerCard();
  // This ordering reproduces Lovelace assigning config before the hass object.
  card.setConfig({ entity: 'climate.room', debug: true });
  card.hass = { states, callService: async () => undefined };
  document.body.append(card);
  await card.updateComplete;
  await card.updateComplete;

  expect(card.shadowRoot?.textContent).toContain('Exact duplicate final transitions were normalized');
  expect(card.shadowRoot?.textContent).toContain(`TRVZB scheduler debug · build ${TRVZB_INTERNAL_SCHEDULER_BUILD}`);
  expect(card.shadowRoot?.textContent).toContain('rendering editor');
  expect(card.shadowRoot?.querySelectorAll('.day-tabs button')).toHaveLength(7);
  expect(card.shadowRoot?.querySelector('.timeline')).not.toBeNull();
  expect(card.shadowRoot?.querySelectorAll('.transitions .transition')).toHaveLength(5);
  expect(card.shadowRoot?.querySelector('button.primary')?.textContent).toContain('Save');

  card.remove();
});

it('hides only informational schedule notices when show_warnings is false', async () => {
  const states: HomeAssistant['states'] = {
    'climate.room': { state: 'auto', attributes: { friendly_name: 'Room' } },
  };
  for (const day of DAYS)
    states[`text.room_weekly_schedule_${day}`] = {
      state: '00:00/19 04:30/23 09:00/18 14:00/23 22:00/21 22:00/21',
      attributes: {},
    };

  const card = new TrvzbInternalSchedulerCard();
  card.setConfig({ entity: 'climate.room', show_warnings: false });
  card.hass = { states, callService: async () => undefined };
  document.body.append(card);
  await card.updateComplete;
  await card.updateComplete;

  const text = card.shadowRoot?.textContent || '';
  expect(text).not.toContain('Schedule values are cached Home Assistant/Zigbee2MQTT state');
  expect(text).not.toContain('Exact duplicate final transitions were normalized');
  expect(card.shadowRoot?.querySelectorAll('.day-tabs button')).toHaveLength(7);
  expect(card.shadowRoot?.querySelector('.timeline')).not.toBeNull();
  expect(card.shadowRoot?.querySelectorAll('.transitions .transition')).toHaveLength(5);
  expect(card.shadowRoot?.querySelector('button.primary')?.textContent).toContain('Save');

  const loaded = card as unknown as { loaded?: { normalizedDuplicateDays: readonly string[] } };
  expect(loaded.loaded?.normalizedDuplicateDays).toHaveLength(7);
  card.remove();
});

it('keeps a stale-cache safety warning visible when show_warnings is false', async () => {
  const states: HomeAssistant['states'] = {
    'climate.room': { state: 'auto', attributes: { friendly_name: 'Room' } },
  };
  for (const day of DAYS)
    states[`text.room_weekly_schedule_${day}`] = {
      state: '00:00/19 22:00/21',
      attributes: {},
      last_updated: '2000-01-01T00:00:00Z',
    };

  const card = new TrvzbInternalSchedulerCard();
  card.setConfig({ entity: 'climate.room', show_warnings: false });
  card.hass = { states, callService: async () => undefined };
  document.body.append(card);
  await card.updateComplete;
  await card.updateComplete;

  const text = card.shadowRoot?.textContent || '';
  expect(text).not.toContain('Schedule values are cached Home Assistant/Zigbee2MQTT state');
  expect(text).toContain('Schedule cache is stale. Review the current entity values');
  expect(card.shadowRoot?.querySelector('.timeline')).not.toBeNull();
  card.remove();
});

it('keeps an unavailable-schedule error visible when show_warnings is false', async () => {
  const states: HomeAssistant['states'] = {
    'climate.room': { state: 'auto', attributes: { friendly_name: 'Room' } },
  };
  for (const day of DAYS)
    states[`text.room_weekly_schedule_${day}`] = {
      state: day === 'friday' ? 'unavailable' : '00:00/19 22:00/21',
      attributes: {},
    };

  const card = new TrvzbInternalSchedulerCard();
  card.setConfig({ entity: 'climate.room', show_warnings: false });
  card.hass = { states, callService: async () => undefined };
  document.body.append(card);
  await card.updateComplete;
  await card.updateComplete;

  expect(card.shadowRoot?.textContent).toContain('Cached schedule values are unavailable for friday');
  expect(card.shadowRoot?.querySelector('.timeline')).toBeNull();
  card.remove();
});
