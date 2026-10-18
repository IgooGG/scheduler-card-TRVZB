import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CardConfig, HomeAssistant } from './types';

@customElement('trvzb-internal-scheduler-card-editor')
export class TrvzbInternalSchedulerCardEditor extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
    textarea {
      width: 100%;
      min-height: 120px;
      box-sizing: border-box;
      font: inherit;
    }
  `;
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public value: CardConfig = {};
  setConfig(config: CardConfig): void {
    this.value = config;
  }
  private change(event: Event): void {
    const raw = (event.target as HTMLTextAreaElement).value;
    try {
      const thermostats = raw
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
      this.value = { ...this.value, type: 'custom:trvzb-internal-scheduler-card', thermostats };
      this.dispatchEvent(
        new CustomEvent('config-changed', { detail: { config: this.value }, bubbles: true, composed: true })
      );
    } catch {
      /* textarea cannot throw; preserve a valid editor state */
    }
  }
  render() {
    return html`<p>
        TRVZB climate entity IDs, one per line. The card auto-detects matching
        <code>text.*_weekly_schedule_*</code> entities; use YAML <code>schedule_entities</code> if names differ.
      </p>
      <textarea @change=${this.change}>
${(this.value.thermostats || (this.value.entity ? [this.value.entity] : [])).map((item) => (typeof item === 'string' ? item : item.entity)).join('\n')}</textarea>`;
  }
}
