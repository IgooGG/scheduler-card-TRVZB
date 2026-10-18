import { changedDays, serializeDay } from './schedule';
import { Day, HomeAssistant, WeekSchedule } from './types';

export interface SaveAttempt {
  confirmed: Day[];
  pending: Day[];
  error?: string;
}

/** Write changed days sequentially and require an observed state echo for each. */
export async function saveChangedDays(
  hass: HomeAssistant,
  entities: Record<Day, string>,
  original: WeekSchedule,
  draft: WeekSchedule,
  waitFor: (entity: string, value: string) => Promise<boolean>
): Promise<SaveAttempt> {
  const pending = changedDays(original, draft);
  const confirmed: Day[] = [];
  for (const day of pending) {
    const value = serializeDay(draft[day]);
    try {
      await hass.callService('text', 'set_value', { entity_id: entities[day], value });
      if (!(await waitFor(entities[day], value))) {
        return {
          confirmed,
          pending: pending.filter((item) => !confirmed.includes(item)),
          error: `${day} was not confirmed by an observed schedule state.`,
        };
      }
      confirmed.push(day);
    } catch (error) {
      return {
        confirmed,
        pending: pending.filter((item) => !confirmed.includes(item)),
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
  return { confirmed, pending: [] };
}
