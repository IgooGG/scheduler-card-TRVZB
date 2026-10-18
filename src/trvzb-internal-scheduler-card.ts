import './trvzb/card';
import './trvzb/editor';

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'trvzb-internal-scheduler-card',
  name: 'TRVZB Internal Scheduler Card',
  description: 'Edit the weekly schedule stored in Sonoff TRVZB valves.',
  preview: true,
});

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}
