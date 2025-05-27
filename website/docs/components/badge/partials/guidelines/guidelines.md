## Usage

### When to use

- To indicate status, such as “Running”, “Applied”, “Errored”, etc.
- As feature flags, such as “In Preview”, “Beta”, “New”, etc.
- For categorizations, such as Product Lines and Account Levels.
- For keyboard shortcut hints, such as `Esc`.

### When not to use

- To display version numbers or collection counts in Tabs, consider [Badge Count](/components/badge-count).
- For a list of metadata elements (like selected filters), consider [Tag](/components/tag).
- For dismissable elements, consider [Tag](/components/tag).
- For longer status messages, consider [Alert](/components/alert).

## Color

There are six colors: `neutral`, `neutral-dark-mode`, `highlight`, `critical`, `success`, and `warning`.

<Hds::Badge @text="Neutral" @color="neutral" />
<Hds::Badge @text="Neutral-dark-mode" @color="neutral-dark-mode" />
<Hds::Badge @text="Highlight" @color="highlight" />
<Hds::Badge @text="Critical" @color="critical" />
<Hds::Badge @text="Success" @color="success" />
<Hds::Badge @text="Warning" @color="warning" />

Use color logically.

- **Neutral** to call attention to general metadata, such as “New”, “Beta”, “In Preview”, etc.
- **Neutral (dark mode)** for general metadata on dark backgrounds, such as sidebars and headers.
- **Highlight** for general metadata that needs a more obvious callout or prominence on the page.
- **Success** to indicate a successful or passive action, such as “Running”.
- **Warning** to indicate a warning.
- **Critical** to indicate critical feedback or something needing immediate action.

### Alternative color usage

Badges can also indicate different account levels:

<Hds::Badge @color="critical" @type="filled" @icon="award" @text="Bronze" />
<Hds::Badge @color="neutral" @type="filled" @icon="award" @text="Silver" />
<Hds::Badge @color="warning" @type="filled" @icon="award" @text="Gold" />

## Type

There are three types of Badges: `filled`, `inverted`, and `outlined`.

<Hds::Badge @text="Filled" @type="filled" />
<Hds::Badge @text="Inverted" @type="inverted" />
<Hds::Badge @text="Outlined" @type="outlined" />

### Filled

Use filled Badges when displaying many on a single page or for subtle callouts.

<Hds::Badge @text="Neutral filled" />
<Hds::Badge @color="highlight" @text="Highlight filled" />
<Hds::Badge @color="success" @text="Success filled" />
<Hds::Badge @color="warning" @text="Warning filled" />
<Hds::Badge @color="critical" @text="Critical filled" />

For example:

- when listing statuses in a table
- for successful or passive actions

### Inverted

Use inverted Badges to draw extra attention to something. However, avoid using too many inverted Badges on one page, as it could overwhelm the user and reduce the importance of nearby elements.

<Hds::Badge @type="inverted" @text="Neutral inverted" />
<Hds::Badge @type="inverted" @color="highlight" @text="Highlight inverted" />
<Hds::Badge @type="inverted" @color="success" @text="Success inverted" />
<Hds::Badge @type="inverted" @color="warning" @text="Warning inverted" />
<Hds::Badge @type="inverted" @color="critical" @text="Critical inverted" />

For example:

- for errors or other critical feedback that needs addressing

!!! Dont

![example of overuse of inverted badges in a table](/assets/components/badge/badge-inverted-dont.png =584x*)
!!!

### Outlined

Use outlined Badges as an alternative to filled Badges, but when extra attention is not required.

<Hds::Badge @type="outlined" @text="Neutral outlined" />
<Hds::Badge @type="outlined" @color="highlight" @text="Highlight outlined" />
<Hds::Badge @type="outlined" @color="success" @text="Success outlined" />
<Hds::Badge @type="outlined" @color="warning" @text="Warning outlined" />
<Hds::Badge @type="outlined" @color="critical" @text="Critical outlined" />

## Size

There are three sizes: `small`, `medium`, and `large`. Content within the Badges may truncate as screen sizes reduce.

<Hds::Badge @text="Small" @size="small" />
<Hds::Badge @text="Medium" @size="medium" />
<Hds::Badge @text="Large" @size="large" />

Medium is preferred, but use a badge size that best fits the UI.

For example:

- use large Badges when inline with a heading
- use small or medium Badges in tables, depending on the data density

## Icon

Badges come in a few icon and text combinations; text only, icon only, and icon + text (where the icon is in the leading position). Use icons intentionally and only when they provide the user with extra value.

<Hds::Badge @color="neutral" @type="filled" @text="Text only" />
<Hds::Badge @color="neutral" @type="filled" @icon="corner-down-left" @isIconOnly={{true}} @text="Icon only" />
<Hds::Badge @color="neutral" @type="filled" @icon="hexagon" @text="Text + Icon" />

## Using Badges for status

Badges are commonly used to communicate status of items and objects. To avoid relying solely on color as a means to communicate status, we recommend:

- Including an icon that aligns with the intended severity or importance of the status. Some common examples of this are `check` for success, `alert` for warning, and `x` for critical.
- Using explicit, straightforward language when communicating status, e.g., for items that are in a positive state, use "Successful" or "Active".

<Hds::Badge @color="success" @type="filled" @icon="check" @text="Successful" />
<Hds::Badge @color="warning" @type="filled" @icon="alert-triangle" @text="Degraded" />
<Hds::Badge @color="critical" @type="filled" @icon="x" @text="Error" />

## Content

- Labels should be short and to the point (~25 characters). They should not consist of full sentences but should provide enough context to be useful, especially when using status badges.
- Use language consistently within each product. For example, when using “In Progress” for one badge, use that same convention throughout the rest of the application.
- Since Badges are not interactive, they don’t support links. Consider moving the link outside of the Badge instead.
