# Badge

## When to use

- To indicate status, such as "Running", "Applied", "Errored", etc.
- As feature flags, such as "In Preview", "Beta", "New", etc.
- For categorizations, such as Product Lines and Account Levels.
- Keyboard shortcut hints, such as "Esc".
- for collection enumeration or version number, use [BadgeCount](/components/badge-count/overview)

## When not to use

- For a list of metadata elements (like selected filters), consider using a [Tag](/components/tag/overview).
- For dismissable elements, consider using a [Tag](/components/tag/overview).
- For longer status messages, consider an [Alert](/components/alert/overview).
- Don’t use a link within a Badge, consider moving the link outside of the Badge.
- Don’t use BadgeCount for anything non-numeric, except version numbers (ie. “v1.2.0”).

---

## Anatomy

![Anatomy of the badge component](/assets/components/badge/badge-anatomy.png)

#### Text

Optional (see Accessibility)

#### Icon

Required on Status badges (Success, Warning, Critical). Optional otherwise.

#### Container

Required

---

## Size

<section>
  <Hds::Badge @color="neutral" @size="small" @text="Small" />
  <Hds::Badge @color="neutral" @size="medium" @text="Medium" />
  <Hds::Badge @color="neutral" @size="large" @text="Large" />
</section>

**Medium** is the preferred size, but use a badge size that best fits the UI.

For example:

- use large badges when inline with a heading
- don't use large badges in tables

As badge widths need to get smaller (ie. for a responsive input), the content within the badge may truncate.

_Banner (informational):_ Small badges are closest in size to that of Structure badges.

---

## Type

<section>
  <Hds::Badge @color="neutral" @size="medium" @type="filled" @text="Filled" />
</section>

Use **Filled** badges when displaying many badges at once or to make subtle callouts.

For example:

- when listing statuses in a table
- for successful or passive actions

<section>
  <Hds::Badge @color="neutral" @size="medium" @type="inverted" @text="Inverted" />
</section>

Use **Inverted** when needing to draw extra attentio nto somthing. Use intentionally and sparingly.

For example:

- for errors or other critical feedback that needs addressing
- when needing many badges on one page take care not to overwhelm the user with too many inverted badges.

<section>
  <Hds::Badge @color="neutral" @size="medium" @type="outlined" @text="Outlined" />
</section>

Use **Outlined** as an alternative to Filled, but when extra attention is not required.

---

## Color

<section>
  <Hds::Badge @color="neutral" @size="medium" @type="filled" @text="Neutral" />
  <Hds::Badge @color="neutral" @size="medium" @type="inverted" @text="Neutral (dark mode)" />
  <Hds::Badge @color="highlight" @size="medium" @type="filled" @text="Highlight" />
  <Hds::Badge @color="success" @size="medium" @type="filled" @text="Success" />
  <Hds::Badge @color="warning" @size="medium" @type="filled" @text="Warning" />
  <Hds::Badge @color="critical" @size="medium" @type="filled" @text="Critical" />
</section>

Use color logically.

- **Neutral** to call attention to general metadata, such as "New", "Beta", "In Preview", etc.
- **Neutral (dark mode)** for general metadata on dark backgrounds, such as sidebars and headers.
- **Highlight** for general metadata that needs a more obvious callout or prominence on the page.
- **Success** to indicate a successful or passive action, such as "Running".
- **Warning** to indicate a warning.
- **Critical** to indicate critical feedback or something that needs immediate action.

<section>
  <Hds::Badge @color="critical" @type="filled" @icon="award" @size="small" @text="Bronze" />
  <Hds::Badge @color="neutral" @type="filled" @icon="award" @size="small" @text="Silver" />
  <Hds::Badge @color="warning" @type="filled" @icon="award" @size="small" @text="Gold" />
</section>

**Note:** An alternative use case for **Critical Filled**, **Neutral Filled**, and **Warning Filled** are for Account Levels.

---

## Icon

<section>
  <Hds::Badge @color="neutral" @type="filled" @text="Text only" />
  <Hds::Badge @color="neutral" @type="filled" @icon="corner-down-left" @isIconOnly={{true}} @text="" />
  <Hds::Badge @color="neutral" @type="filled" @icon="hexagon" @text="Text + Icon" />
</section>

Badges come in a few icon, text combinations; text only, icon only, and icon + text (where icons are always on the left). Use icons intentionally and only when the provide the user with extra value.

_Banner (informational):_ We realize the Small badges use an icon size that is not supported by Flight and thus have scaled it down to fit within the badge. We weighed the pros and cons of doing this vs using the 16px size in the smaller badges and ultimately landed here as it works better visually. You should still be able to use the 16px size within the badge and not see any issues, but please let us know if you do.

---

## Content

- Labels should be short and to the point (~25 characters). They should not consist of full sentences, but should provide enough context to be useful, especially when using status badges.
- Language should be used consistently within each product (ie. when using “In Progress” for 1 badge, use that same convention throughout the rest of the application).
- As badge widths need to get smaller (ie. for a responsive layout), the content within the badge may truncate.

---

## Accessibility

<section>
  <Hds::Badge @color="success" @type="filled" @icon="check" @text="Applied" />
  <Hds::Badge @color="warning" @type="filled" @icon="alert-triangle" @text="Policy override" />
  <Hds::Badge @color="critical" @type="filled" @icon="x" @text="Errored" />
</section>

Status badges (Success, Warning, Critical) should always include an icon to avoid relying on color alone as a means to indicate status to the user.

When using badges, provide annotations of the non-visual experience to the team. This could look like:

![Example of an annotation of a badge to provide more context](/assets/components/badge/badge-annotation.png)
