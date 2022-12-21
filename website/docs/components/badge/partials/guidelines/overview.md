Badges are concise, non-interactive labels that represent metadata.

## Usage

### When to use

- To indicate status, such as “Running”, “Applied”, “Errored”, etc.
- As feature flags, such as “In Preview”, “Beta”, “New”, etc.
- For categorizations, such as Product Lines and Account Levels.
- For keyboard shortcut hints, such as “Esc”.

### When not to use

- To display version numbers or collection counts in Tabs, use [BadgeCount](/components/badge-count/overview)
- For a list of metadata elements (like selected filters), consider using a [Tag](/components/tag/overview).
- For dismissable elements, consider using a [Tag](/components/tag/overview).
- For longer status messages, consider an [Alert](/components/alert/overview).
- Don’t use a link within a Badge, consider moving the link outside of the Badge.

### Color

There are six colors: `neutral`, `neutral-dark-mode`, `highlight`, `critical`, `success`, and `warning`.

<Hds::Badge @text="Neutral" @color="neutral" />
<Hds::Badge @text="Neutral-dark-mode" @color="neutral-dark-mode" />
<Hds::Badge @text="Highlight" @color="highlight" />
<Hds::Badge @text="Critical" @color="critical" />
<Hds::Badge @text="Success" @color="success" />
<Hds::Badge @text="Warning" @color="warning" />

### Icon

An icon can be shown in addition to or instead of text.

<Hds::Badge @text="With text" @icon="terraform" />

<Hds::Badge @text="With text" @icon="terraform" @isIconOnly={{true}} /> Without text (isIconOnly)

### Size

There are three sizes: `small`, `medium`, and `large`.

<Hds::Badge @text="Small" @size="small" />
<Hds::Badge @text="Medium" @size="medium" />
<Hds::Badge @text="Large" @size="large" />

### Type

There are three types of Badges: filled, inverted, and outlined.

<Hds::Badge @text="Filled" @type="filled" />
<Hds::Badge @text="Inverted" @type="inverted" />
<Hds::Badge @text="Outlined" @type="outlined" />

## Related

- [BadgeCount](/components/badge-count/)
