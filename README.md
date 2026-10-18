# Scheduler Card TRVZB

A standalone Home Assistant Lovelace card for editing the weekly schedule stored inside a SONOFF TRVZB radiator valve. Its element name is `trvzb-internal-scheduler-card`, so it can coexist with upstream `scheduler-card`.

The valve—not Home Assistant—executes the schedule. Once saved and put into `auto`, the TRV continues locally when Home Assistant, Zigbee2MQTT, and the coordinator are offline. Those services must be online to view or edit it.

## Requirements and limitations

- A SONOFF TRVZB exposed by Zigbee2MQTT with Home Assistant MQTT discovery enabled.
- Home Assistant creates seven `text` entities for `weekly_schedule_monday` through `weekly_schedule_sunday`. The card uses `text.set_value`; it never opens MQTT from the browser or needs broker credentials.
- Zigbee2MQTT documents these properties as not readable through `/get`. The card renders Home Assistant's cached states and never claims a fresh physical-device read. It labels cached values stale after 24 hours by default.
- TRVZB permits at most six daily transitions. The first is `00:00`, times are unique and increasing, and temperature is 4–35 °C in 0.5 °C steps. Invalid edits cannot be saved.
- Some Zigbee2MQTT cached states contain an identical final transition twice. The card hides only consecutive entries with the same time **and** Celsius temperature, displays an informational warning, and never writes that normalization back until you explicitly save an edit. Same-time entries with different temperatures remain an error.
- Schedule values are always Celsius, including when Home Assistant displays the climate entity itself in Fahrenheit. The card shows a warning in that situation and never converts schedule values based on browser locale or HA's climate display unit.
- Only `auto` follows the internal schedule. `heat` is manual and `off` disables normal heating; modes do not overwrite schedules.

Daily strings are `HH:mm/temperature`, for example `00:00/18 06:00/21 09:00/18 17:00/22 22:00/18`.

## HACS installation

1. In HACS open **Custom repositories**, add `https://github.com/IgooGG/scheduler-card-TRVZB`, and select **Dashboard**.
2. Download **Scheduler Card TRVZB**, then reload the browser/dashboard when requested.
3. HACS installs `dist/scheduler-card-TRVZB.js`. If it does not add a resource automatically, add `/hacsfiles/scheduler-card-TRVZB/scheduler-card-TRVZB.js` as a JavaScript module in **Settings → Dashboards → Resources**.
4. Add the YAML below.

HACS Dashboard repositories need a `.js` file in `dist/` matching the repository name. Without a release HACS downloads the default branch; with a release it downloads the latest release asset. The included tagged-release workflow attaches the exact bundle, but it does not create releases until you push a tag.

## Configuration

Use `thermostats` for an ordered selector. These are examples, not defaults:

```yaml
type: custom:trvzb-internal-scheduler-card
title: Heating schedules
thermostats:
  - entity: climate.sypialniaignasiagrzejnik
    name: Sypialnia Ignasia
  - entity: climate.sypialniatatygrzejnik
    name: Sypialnia Taty
  - entity: climate.kuchniagrzejnik
    name: Salon / Kuchnia
confirmation_timeout: 30
stale_after_hours: 24
```

The usual discovery ID is `text.<climate-slug>_weekly_schedule_monday`. Auto-discovery accepts only matching `text.*` candidates containing the climate slug, avoiding another TRV and ensuring each discovered entity supports `text.set_value`. When IDs differ, explicitly map every day:

```yaml
type: custom:trvzb-internal-scheduler-card
entity: climate.sypialniaignasiagrzejnik
schedule_entities:
  monday: text.ignasia_weekly_schedule_monday
  tuesday: text.ignasia_weekly_schedule_tuesday
  wednesday: text.ignasia_weekly_schedule_wednesday
  thursday: text.ignasia_weekly_schedule_thursday
  friday: text.ignasia_weekly_schedule_friday
  saturday: text.ignasia_weekly_schedule_saturday
  sunday: text.ignasia_weekly_schedule_sunday
```

## Safe editing and verification

Select one thermostat and day. The wide timeline supports five-minute drag adjustment of non-midnight markers; inputs provide exact changes. Copy changes the local draft only. A browser-leave and thermostat-switch warning protects unsaved edits.

Nothing is written before **Save**. Save validates all days, writes only changed `text` entities, and waits for each expected Home Assistant state update. “Confirmed” means the text entity observed the requested value—not merely that the service accepted it. If confirmation times out or a later day fails, confirmed days remain recorded while unconfirmed edits remain available for a retry.

To verify a real write, note a daily text entity in **Developer Tools → States**, edit that day, press Save, and verify the matching `text.*_weekly_schedule_<day>` state exactly matches the displayed string. Then set the climate entity to `auto` and verify the TRV’s auto/timer indicator. Do this only on a schedule you intend to change.

## Manual install, test, release

```sh
npm ci
npm test
npm run build
```

Copy `dist/scheduler-card-TRVZB.js` into `config/www/`, add `/local/scheduler-card-TRVZB.js` as a module resource, and use the same YAML. Hard-refresh after a manual update.

For a release after local testing, update `package.json`, commit, create `vX.Y.Z`, then push the branch and tag. The workflow tests, builds, and attaches `scheduler-card-TRVZB.js` to that GitHub release. It is intentionally never triggered by an ordinary commit.

## Troubleshooting

- **Entities not found:** enable Zigbee2MQTT Home Assistant discovery and the seven schedule text entities. Otherwise configure `schedule_entities`.
- **Unavailable, malformed, or stale:** the card keeps the actual cache and disables editing instead of fabricating a schedule. Check HA, Zigbee2MQTT, and device availability.
- **Save timed out:** transport may have accepted a write but HA did not observe it. Inspect the schedule entity/Zigbee2MQTT log before retrying.
- **Schedule does not run:** use `auto`, not manual `heat`.

## License and attribution

This fork is GPL-3.0-or-later; retain [LICENSE](LICENSE). It began as a fork of [nielsfaber/scheduler-card](https://github.com/nielsfaber/scheduler-card), whose GPL source and attribution remain here. The schedule format and behavior were reviewed against [abaddon/ha_sonoff_TRVZB_scheduler_card](https://github.com/abaddon/ha_sonoff_TRVZB_scheduler_card) (MIT); no source files from that project were copied. This implementation intentionally uses Home Assistant text entities rather than its direct browser MQTT publishing.

## Verification status

Unit tests cover parsing/serialization, constraints, changed-day preservation, discovery, and unavailable/malformed/stale cached state. Save acknowledgements use mocked Home Assistant state updates and require final validation in a real HA/Zigbee2MQTT install. This repository has no HA credentials and no physical TRV was contacted during development.
