/** Types deliberately limited to the Home Assistant surface used by this card. */
export const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

export type Day = (typeof DAYS)[number];

export interface Transition {
  time: string;
  temperature: number;
}

export type DaySchedule = Transition[];
export type WeekSchedule = Record<Day, DaySchedule>;
export type ScheduleEntityMap = Partial<Record<Day, string>>;

export interface ThermostatConfig {
  /** A TRVZB climate entity. This is not used as an MQTT topic. */
  entity: string;
  name?: string;
  /** Explicit schedule text entities. Prefer this if auto discovery cannot match them. */
  schedule_entities?: ScheduleEntityMap;
}

export interface CardConfig {
  type?: 'custom:trvzb-internal-scheduler-card';
  title?: string;
  /** One or more climate entities, in display order. */
  thermostats?: Array<string | ThermostatConfig>;
  /** Shorthand for a single thermostat. */
  entity?: string;
  /** Explicit mapping for the shorthand entity. */
  schedule_entities?: ScheduleEntityMap;
  /** Seconds to wait for Home Assistant to publish the requested text entity state. */
  confirmation_timeout?: number;
  /** Cached schedule values older than this are labelled stale, but remain readable. */
  stale_after_hours?: number;
  /** Hide cache and duplicate-normalization information notices; safety checks remain active. */
  show_warnings?: boolean;
  /** Show non-sensitive initialization and rendering diagnostics in the card. */
  debug?: boolean;
}

export interface HassState {
  state: string;
  attributes: Record<string, unknown>;
  last_updated?: string;
  last_changed?: string;
}

export interface HomeAssistant {
  states: Record<string, HassState>;
  callService: (domain: string, service: string, data?: Record<string, unknown>) => Promise<unknown>;
  localize?: (key: string) => string;
}

export type LoadResult =
  | {
      status: 'loaded';
      schedule: WeekSchedule;
      entities: Record<Day, string>;
      cachedAt?: string;
      stale: boolean;
      /** Days whose cached state had exact consecutive duplicates hidden for editing. */
      normalizedDuplicateDays: Day[];
    }
  | { status: 'missing' | 'unavailable' | 'malformed'; message: string; entities: ScheduleEntityMap };
