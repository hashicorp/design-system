# Website / Analytics and Monitoring


- [Website / Analytics](#website--analytics)
  - [Enabling](#enabling)
  - [Configuration](#configuration-of-analytics--monitoring))
  - [Viewing stats](#viewing-stats)

---

We currently use [Fathom](https://usefathom.com/) to track analytics and monitor uptime for the website.

## Enabling

Analytics are enabled when the app is in Vercel's production [environment](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables): `VERCEL_ENV==="production"`

## Configuration of analytics & monitoring

Access to Fathom’s dashboard can be done with credentials stored in the team’s 1Password vault. This allows you to configure things like events, domain names, and uptime monitoring.

## Viewing Stats

Read only analytics can be viewed by accessing credentials in the team’s 1Password vault.
