# Website / Analytics and Monitoring


- [Website / Analytics](#website--analytics)
  - [Enabling](#enabling)
  - [Configuration](#configuration-of-analytics--monitoring))
  - [Viewing stats](#viewing-stats)

---

We currently use [Fathom](https://usefathom.com/) to track analytics and monitor uptime for the website.

## Enabling

Whether analytics are tracked is controlled by the `FATHOM_ENABLED` environment variable being set to `true`. Currently this is only [enabled in the production app in Vercel](https://vercel.com/hashicorp/hds-website/settings/environment-variables) and **should not be enabled in other environments** without a specific reason as this will pollute our statistics.

## Configuration of analytics & monitoring

Access to Fathom’s dashboard can be done with credentials stored in the team’s 1Password vault. This allows you to configure things like events, domain names, and uptime monitoring.

## Viewing Stats

Read only analytics can be viewed by accessing credentials in the team’s 1Password vault.
