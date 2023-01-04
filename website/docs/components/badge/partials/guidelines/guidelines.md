### Color

There are six colors: `neutral`, `neutral-dark-mode`, `highlight`, `critical`, `success`, and `warning`.

<Hds::Badge @text="Neutral" @color="neutral" />
<Hds::Badge @text="Neutral-dark-mode" @color="neutral-dark-mode" />
<Hds::Badge @text="Highlight" @color="highlight" />
<Hds::Badge @text="Critical" @color="critical" />
<Hds::Badge @text="Success" @color="success" />
<Hds::Badge @text="Warning" @color="warning" />

Use color logically.

- **Neutral** to call attention to general metadata, such as "New", "Beta", "In Preview", etc.
- **Neutral (dark mode)** for general metadata on dark backgrounds, such as sidebars and headers.
- **Highlight** for general metadata that needs a more obvious callout or prominence on the page.
- **Success** to indicate a successful or passive action, such as "Running".
- **Warning** to indicate a warning.
- **Critical** to indicate critical feedback or something that needs immediate action.

<Hds::Badge @color="critical" @type="filled" @icon="award" @size="small" @text="Bronze" />
<Hds::Badge @color="neutral" @type="filled" @icon="award" @size="small" @text="Silver" />
<Hds::Badge @color="warning" @type="filled" @icon="award" @size="small" @text="Gold" />

!!! Info

An alternative use case for **Critical Filled**, **Neutral Filled**, and **Warning Filled** are for Account Levels.

!!!

### Icon

An icon can be shown in addition to or instead of text.

<Hds::Badge @color="neutral" @type="filled" @text="Text only" />
<Hds::Badge @color="neutral" @type="filled" @icon="corner-down-left" @isIconOnly={{true}} @text="" />
<Hds::Badge @color="neutral" @type="filled" @icon="hexagon" @text="Text + Icon" />

Badges come in a few icon and text combinations; text only, icon only, and icon + text (where icons are always on the left). Use icons intentionally and only when they provide the user with extra value.

!!! Info

We realize that the small badges use an icon size that is not supported by our icons and thus have scaled it down to fit within the badge. We weighed the pros and cons of doing this versus using the 16px size in the smaller badges and ultimately landed here as it works better visually. You should still be able to use the 16px size within the badge and not see any issues, but please let us know if you do.

!!!

---

### Size

There are three sizes: `small`, `medium`, and `large`.

<Hds::Badge @text="Small" @size="small" />
<Hds::Badge @text="Medium" @size="medium" />
<Hds::Badge @text="Large" @size="large" />

*Medium** is the preferred size, but use a badge size that best fits the UI.

For example:

- use large badges when inline with a heading
- don’t use large badges in tables

As badge widths need to get smaller (ie. for a responsive input), the content within the badge may truncate.

!!! Info

Small badges are closest in size to that of Structure badges.

!!!

---

### Type

There are three types of Badges: `filled`, `inverted`, and `outlined`.

<Hds::Badge @text="Filled" @type="filled" />
<Hds::Badge @text="Inverted" @type="inverted" />
<Hds::Badge @text="Outlined" @type="outlined" />

Use **Filled** badges when displaying many badges at once or to make subtle callouts.

For example:

- when listing statuses in a table
- for successful or passive actions

<Hds::Badge @color="neutral" @size="medium" @type="inverted" @text="Inverted" />

Use **Inverted** when needing to draw extra attentio nto somthing. Use intentionally and sparingly.

For example:

- for errors or other critical feedback that needs addressing
- when needing many badges on one page take care not to overwhelm the user with too many inverted badges.

<Hds::Badge @color="neutral" @size="medium" @type="outlined" @text="Outlined" />

Use **Outlined** as an alternative to Filled, but when extra attention is not required.

---

## Content

- Labels should be short and to the point (~25 characters). They should not consist of full sentences, but should provide enough context to be useful, especially when using status badges.
- Language should be used consistently within each product (ie. when using “In Progress” for 1 badge, use that same convention throughout the rest of the application).
- As badge widths need to get smaller (ie. for a responsive layout), the content within the badge may truncate.

---

## Accessibility

<Hds::Badge @color="success" @type="filled" @icon="check" @text="Applied" />
<Hds::Badge @color="warning" @type="filled" @icon="alert-triangle" @text="Policy override" />
<Hds::Badge @color="critical" @type="filled" @icon="x" @text="Errored" />

Status badges (Success, Warning, Critical) should always include an icon to avoid relying on color alone as a means to indicate status to the user.

When using badges, provide annotations of the non-visual experience to the team. This could look like:

![Example of an annotation of a badge to provide more context](/assets/components/badge/badge-annotation.png)