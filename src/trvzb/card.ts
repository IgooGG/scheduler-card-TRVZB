import { css, html, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  CardConfig,
  DAYS,
  Day,
  HomeAssistant,
  LoadResult,
  ScheduleEntityMap,
  ThermostatConfig,
  Transition,
  WeekSchedule,
} from './types';
import {
  changedDays,
  cloneWeek,
  formatTime,
  loadCachedSchedule,
  MAX_TRANSITIONS,
  MAX_TEMP,
  MIN_TEMP,
  minutes,
  TEMP_STEP,
  validateDay,
} from './schedule';
import { saveChangedDays } from './save';

const DAY_LABEL: Record<Day, string> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
};
const timeout = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));
const formatCelsius = (temperature: number): string =>
  Number.isInteger(temperature) ? String(temperature) : temperature.toFixed(1);

@customElement('trvzb-internal-scheduler-card')
export class TrvzbInternalSchedulerCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      --trvzb-accent: var(--primary-color);
    }
    ha-card {
      overflow: hidden;
    }
    .header {
      display: flex;
      gap: 12px;
      align-items: center;
      padding: 16px 16px 8px;
    }
    .header h1 {
      flex: 1;
      margin: 0;
      font-size: var(--ha-font-size-xl, 22px);
      font-weight: 500;
    }
    select,
    input,
    button {
      font: inherit;
      color: var(--primary-text-color);
    }
    select,
    input {
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 8px;
    }
    button {
      border: 0;
      border-radius: 8px;
      padding: 9px 12px;
      background: var(--secondary-background-color);
      cursor: pointer;
    }
    button.primary,
    button.active {
      background: var(--trvzb-accent);
      color: var(--text-primary-color, white);
    }
    button:disabled {
      opacity: 0.52;
      cursor: not-allowed;
    }
    .body {
      padding: 8px 16px 16px;
    }
    .notice {
      margin: 8px 0 14px;
      padding: 10px 12px;
      background: var(--secondary-background-color);
      border-left: 4px solid var(--warning-color, #f6b51d);
      border-radius: 4px;
      white-space: normal;
    }
    .notice.error {
      border-left-color: var(--error-color, #db4437);
    }
    .notice.info {
      border-left-color: var(--info-color, var(--primary-color));
    }
    .toolbar,
    .actions,
    .day-tabs,
    .mode {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
    }
    .toolbar {
      justify-content: space-between;
      margin: 8px 0 14px;
    }
    .mode button {
      text-transform: capitalize;
    }
    .day-tabs {
      border-bottom: 1px solid var(--divider-color);
      padding-bottom: 8px;
    }
    .day-tabs button {
      min-width: 52px;
    }
    .timeline {
      position: relative;
      height: 145px;
      margin: 24px 10px 14px;
      border-radius: 10px;
      background: linear-gradient(90deg, var(--secondary-background-color), var(--card-background-color));
      border: 1px solid var(--divider-color);
      overflow: visible;
      touch-action: none;
    }
    .axis {
      position: absolute;
      inset: auto 0 -22px;
      display: flex;
      justify-content: space-between;
      color: var(--secondary-text-color);
      font-size: 0.78em;
    }
    .segment {
      position: absolute;
      top: 0;
      bottom: 0;
      background: color-mix(in srgb, var(--trvzb-accent) 12%, transparent);
      border-right: 1px solid color-mix(in srgb, var(--trvzb-accent) 45%, transparent);
    }
    .marker {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 20px;
      margin-left: -10px;
      background: transparent;
      border: 0;
      padding: 0;
      touch-action: none;
    }
    .marker::before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 4px;
      height: 100%;
      background: var(--trvzb-accent);
      border-radius: 4px;
    }
    .marker span {
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      color: var(--primary-text-color);
      font-size: 0.78em;
    }
    .marker:first-of-type {
      cursor: default;
    }
    .temperature {
      position: absolute;
      left: 8px;
      bottom: 8px;
      font-size: 1.15em;
      font-weight: 500;
    }
    .transitions {
      margin-top: 35px;
      display: grid;
      gap: 8px;
    }
    .transition {
      display: grid;
      grid-template-columns: minmax(94px, 1fr) minmax(88px, 1fr) auto;
      gap: 8px;
      align-items: center;
      padding: 8px;
      border-radius: 8px;
      background: var(--secondary-background-color);
    }
    .transition input {
      min-width: 0;
      width: 100%;
      box-sizing: border-box;
    }
    .temperature-control {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .temperature-control input {
      flex: 1;
    }
    .copy {
      margin-top: 14px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
    }
    .status {
      color: var(--secondary-text-color);
      font-size: 0.9em;
    }
    .unsaved {
      color: var(--warning-color, #f6b51d);
      font-weight: 600;
    }
    @media (max-width: 540px) {
      .header {
        align-items: flex-start;
        flex-direction: column;
      }
      .header select {
        width: 100%;
      }
      .toolbar {
        align-items: flex-start;
        flex-direction: column;
      }
      .transition {
        grid-template-columns: 1fr 1fr auto;
      }
      .timeline {
        margin-left: 5px;
        margin-right: 5px;
      }
    }
  `;

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config: CardConfig = {};
  @state() private selected = 0;
  @state() private day: Day = 'monday';
  @state() private loaded?: LoadResult;
  @state() private original?: WeekSchedule;
  @state() private draft?: WeekSchedule;
  @state() private message = '';
  @state() private saving = false;
  private dragIndex?: number;
  private beforeUnload = (event: BeforeUnloadEvent) => {
    if (this.dirty) {
      event.preventDefault();
      event.returnValue = '';
    }
  };

  public static getConfigElement() {
    return document.createElement('trvzb-internal-scheduler-card-editor');
  }
  public static getStubConfig() {
    return { type: 'custom:trvzb-internal-scheduler-card', thermostats: [] };
  }

  setConfig(config: CardConfig): void {
    if (!config || (!config.entity && !config.thermostats?.length)) throw new Error('Provide entity or thermostats.');
    this.config = config;
    this.selected = 0;
    this.reload();
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('beforeunload', this.beforeUnload);
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('beforeunload', this.beforeUnload);
  }
  protected updated(changed: PropertyValues): void {
    if (changed.has('hass') && (this.config.entity || this.config.thermostats?.length) && !this.saving)
      this.reload(false);
  }

  private get thermostats(): ThermostatConfig[] {
    const configured =
      this.config.thermostats ||
      (this.config.entity ? [{ entity: this.config.entity, schedule_entities: this.config.schedule_entities }] : []);
    return configured.map((item) => (typeof item === 'string' ? { entity: item } : item));
  }
  private get thermostat(): ThermostatConfig | undefined {
    return this.thermostats[this.selected];
  }
  private get dirty(): boolean {
    return Boolean(this.original && this.draft && changedDays(this.original, this.draft).length);
  }
  private get timeoutMs(): number {
    return Math.max(5, this.config.confirmation_timeout ?? 30) * 1000;
  }

  private reload(replaceDraft = true): void {
    const thermostat = this.thermostat;
    if (!thermostat || !this.hass) return;
    const result = loadCachedSchedule(
      this.hass,
      thermostat.entity,
      thermostat.schedule_entities,
      this.config.stale_after_hours ?? 24
    );
    this.loaded = result;
    if (result.status === 'loaded' && replaceDraft && !this.dirty) {
      this.original = cloneWeek(result.schedule);
      this.draft = cloneWeek(result.schedule);
      this.message = '';
    }
  }

  private selectThermostat(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    if (value === this.selected) return;
    if (this.dirty && !window.confirm('Discard unsaved schedule changes?')) {
      (event.target as HTMLSelectElement).value = String(this.selected);
      return;
    }
    this.selected = value;
    this.original = undefined;
    this.draft = undefined;
    this.message = '';
    this.reload();
  }
  private setDay(day: Day): void {
    this.day = day;
  }
  private updateTransition(index: number, patch: Partial<Transition>): void {
    if (!this.draft) return;
    const day = this.day;
    const next = cloneWeek(this.draft);
    next[day][index] = { ...next[day][index], ...patch };
    next[day].sort((a, b) => minutes(a.time) - minutes(b.time));
    this.draft = next;
  }
  private addTransition(): void {
    if (!this.draft || this.draft[this.day].length >= MAX_TRANSITIONS) return;
    const values = this.draft[this.day];
    const last = minutes(values[values.length - 1].time);
    const nextTime = Math.min(1439, last + Math.max(30, Math.floor((1439 - last) / 2)));
    if (nextTime <= last) return;
    const next = cloneWeek(this.draft);
    next[this.day].push({ time: formatTime(nextTime), temperature: values[values.length - 1].temperature });
    this.draft = next;
  }
  private removeTransition(index: number): void {
    if (!this.draft || index === 0) return;
    const next = cloneWeek(this.draft);
    next[this.day].splice(index, 1);
    this.draft = next;
  }
  private copyTo(event: Event): void {
    if (!this.draft) return;
    const targets = Array.from(this.renderRoot.querySelectorAll<HTMLInputElement>('input[data-copy-day]:checked')).map(
      (input) => input.dataset.copyDay as Day
    );
    if (!targets.length) return;
    const next = cloneWeek(this.draft);
    targets.forEach((target) => (next[target] = next[this.day].map((item) => ({ ...item }))));
    this.draft = next;
    this.message = `Copied ${DAY_LABEL[this.day]} to ${targets.map((day) => DAY_LABEL[day]).join(', ')}.`;
    (event.currentTarget as HTMLButtonElement).blur();
  }
  private cancel(): void {
    if (this.original) {
      this.draft = cloneWeek(this.original);
      this.message = 'Edits discarded.';
    }
  }
  private pointerDown(event: PointerEvent, index: number): void {
    if (index === 0 || this.saving) return;
    this.dragIndex = index;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }
  private pointerMove(event: PointerEvent): void {
    if (this.dragIndex === undefined || !this.draft) return;
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const value = Math.round((((event.clientX - rect.left) / rect.width) * 24 * 60) / 5) * 5;
    const values = this.draft[this.day];
    const lower = minutes(values[this.dragIndex - 1].time) + 5;
    const upper = this.dragIndex < values.length - 1 ? minutes(values[this.dragIndex + 1].time) - 5 : 1439;
    this.updateTransition(this.dragIndex, { time: formatTime(Math.max(lower, Math.min(upper, value))) });
  }
  private pointerUp(): void {
    this.dragIndex = undefined;
  }

  private async setMode(mode: 'off' | 'auto' | 'heat'): Promise<void> {
    const thermostat = this.thermostat;
    if (!thermostat) return;
    this.message = 'Requesting mode change…';
    try {
      await this.hass.callService('climate', 'set_hvac_mode', { entity_id: thermostat.entity, hvac_mode: mode });
      this.message = `Mode request sent: ${mode}. Auto is the only mode that follows the TRV schedule.`;
    } catch (error) {
      this.message = `Could not change mode: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  private async waitFor(entity: string, expected: string): Promise<boolean> {
    const until = Date.now() + this.timeoutMs;
    while (Date.now() < until) {
      if (this.hass.states[entity]?.state === expected) return true;
      await timeout(250);
    }
    return false;
  }
  private async save(): Promise<void> {
    if (!this.original || !this.draft || !this.thermostat || this.loaded?.status !== 'loaded') return;
    const errors = DAYS.flatMap((day) => validateDay(this.draft![day]).map((error) => `${DAY_LABEL[day]}: ${error}`));
    if (errors.length) {
      this.message = errors.join(' ');
      return;
    }
    const days = changedDays(this.original, this.draft);
    if (!days.length) {
      this.message = 'No changes to save.';
      return;
    }
    this.saving = true;
    this.message = 'Saving changed days; waiting for Home Assistant state confirmation…';
    try {
      const result = await saveChangedDays(
        this.hass,
        this.loaded.entities,
        this.original,
        this.draft,
        (entity, value) => this.waitFor(entity, value)
      );
      result.confirmed.forEach((day) => {
        this.original![day] = this.draft![day].map((item) => ({ ...item }));
      });
      this.message = result.error
        ? `${result.confirmed.length ? `Confirmed ${result.confirmed.map((day) => DAY_LABEL[day]).join(', ')}. ` : ''}Save incomplete: ${result.error} Existing unsaved days were kept for retry.`
        : `Confirmed on device state: ${result.confirmed.map((day) => DAY_LABEL[day]).join(', ')}.`;
    } finally {
      this.saving = false;
      this.original = this.original ? cloneWeek(this.original) : undefined;
    }
  }

  render() {
    const thermostat = this.thermostat;
    const climate = thermostat && this.hass?.states[thermostat.entity];
    const haUsesFahrenheit =
      climate?.attributes.temperature_unit === '°F' || climate?.attributes.temperature_unit === 'F';
    const daySchedule = this.draft?.[this.day] || [];
    const dayErrors = this.draft ? validateDay(daySchedule) : [];
    return html`<ha-card
      ><div class="header">
        <h1>${this.config.title || 'TRVZB internal schedule'}</h1>
        ${
          this.thermostats.length > 1
            ? html`<select @change=${this.selectThermostat} .value=${String(this.selected)} aria-label="Thermostat">
                ${this.thermostats.map((item, i) => html`<option value=${i}>${item.name || this.hass?.states[item.entity]?.attributes.friendly_name || item.entity}</option>`)}
              </select>`
            : nothing
        }
      </div>
      <div class="body">
        ${!climate ? html`<div class="notice error">Configured climate entity is unavailable: ${thermostat?.entity || 'none'}.</div>` : nothing}
        ${this.loaded && this.loaded.status !== 'loaded' ? html`<div class="notice error">${this.loaded.message}</div>` : nothing}
        ${this.loaded?.status === 'loaded' ? html`<div class="notice">Schedule values are cached Home Assistant/Zigbee2MQTT state${this.loaded.cachedAt ? ` (oldest cached ${new Date(this.loaded.cachedAt).toLocaleString()})` : ''}; TRVZB does not support on-demand schedule reads.${this.loaded.stale ? ' This cache is marked stale.' : ''}</div>` : nothing}
        ${this.loaded?.status === 'loaded' && this.loaded.normalizedDuplicateDays.length ? html`<div class="notice info">Exact duplicate final transitions were normalized for editing on ${this.loaded.normalizedDuplicateDays.map((day) => DAY_LABEL[day]).join(', ')}. The cached thermostat values have not been changed; they are rewritten only if you explicitly save edits.</div>` : nothing}
        ${haUsesFahrenheit ? html`<div class="notice info">Home Assistant reports this climate entity in °F. TRVZB schedule values are always displayed, validated, and sent as °C; no conversion is applied.</div>` : nothing}
        <div class="toolbar">
          <div class="mode">
            <span class="status">Mode:</span
            >${(['off', 'auto', 'heat'] as const).map((mode) => html`<button ?disabled=${!climate || this.saving} class=${climate?.state === mode ? 'active' : ''} @click=${() => this.setMode(mode)}>${mode}</button>`)}
          </div>
          <span class="status">Auto follows the locally stored TRV schedule. Heat is manual.</span>
        </div>
        ${
          this.draft
            ? html`<div class="day-tabs">
                  ${DAYS.map((day) => html`<button class=${day === this.day ? 'active' : ''} @click=${() => this.setDay(day)}>${DAY_LABEL[day]}</button>`)}
                </div>
                <div
                  class="timeline"
                  @pointermove=${this.pointerMove}
                  @pointerup=${this.pointerUp}
                  @pointercancel=${this.pointerUp}
                >
                  ${daySchedule.map((item, index) => html`<div class="segment" title=${`${formatCelsius(item.temperature)} °C from ${item.time}`} style=${`left:${minutes(item.time) / 14.4}%;width:${((index < daySchedule.length - 1 ? minutes(daySchedule[index + 1].time) : 1440) - minutes(item.time)) / 14.4}%`}><span class="temperature">${formatCelsius(item.temperature)} °C</span></div>`)}
                  ${daySchedule.map((item, index) => html`<button class="marker" style=${`left:${minutes(item.time) / 14.4}%`} @pointerdown=${(event: PointerEvent) => this.pointerDown(event, index)} aria-label=${`Move ${item.time}`}><span>${item.time}</span></button>`)}
                  <div class="axis">
                    <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
                  </div>
                </div>
                <div class="transitions">
                  ${daySchedule.map(
                    (item, index) =>
                      html`<div class="transition">
                        <input
                          type="time"
                          step="60"
                          .value=${item.time}
                          ?disabled=${index === 0 || this.saving}
                          @change=${(event: Event) => this.updateTransition(index, { time: (event.target as HTMLInputElement).value })}
                        />
                        <div class="temperature-control">
                          <input
                            type="number"
                            min=${MIN_TEMP}
                            max=${MAX_TEMP}
                            step="0.5"
                            .value=${formatCelsius(item.temperature)}
                            ?disabled=${this.saving}
                            aria-label="Temperature in °C"
                            title="Temperature in °C"
                            @change=${(event: Event) => this.updateTransition(index, { temperature: Number((event.target as HTMLInputElement).value) })}
                          /><span aria-hidden="true">°C</span>
                        </div>
                        <button
                          ?disabled=${index === 0 || this.saving}
                          @click=${() => this.removeTransition(index)}
                          aria-label="Remove transition"
                        >
                          −
                        </button>
                      </div>`
                  )}
                </div>
                <div class="copy">
                  <button
                    ?disabled=${daySchedule.length >= MAX_TRANSITIONS || this.saving}
                    @click=${this.addTransition}
                  >
                    + Add transition</button
                  ><span class="status">Copy ${DAY_LABEL[this.day]} to:</span
                  >${DAYS.filter((day) => day !== this.day).map((day) => html`<label><input type="checkbox" data-copy-day=${day} ?disabled=${this.saving} /> ${DAY_LABEL[day]}</label>`)}<button
                    ?disabled=${this.saving}
                    @click=${this.copyTo}
                  >
                    Copy
                  </button>
                </div>
                ${dayErrors.length ? html`<div class="notice error">${dayErrors.join(' ')}</div>` : nothing}
                <div class="actions">
                  <button
                    class="primary"
                    ?disabled=${!this.dirty || this.saving || dayErrors.length > 0}
                    @click=${this.save}
                  >
                    ${this.saving ? 'Saving…' : 'Save'}</button
                  ><button ?disabled=${!this.dirty || this.saving} @click=${this.cancel}>Cancel</button
                  >${this.dirty ? html`<span class="unsaved">Unsaved changes</span>` : html`<span class="status">No pending changes</span>`}
                </div>`
            : nothing
        }
        ${this.message ? html`<div class="notice ${this.message.includes('incomplete') || this.message.includes('Could not') ? 'error' : ''}">${this.message}</div>` : nothing}
      </div></ha-card
    >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'trvzb-internal-scheduler-card': TrvzbInternalSchedulerCard;
  }
}
