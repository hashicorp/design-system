Use Badge Count as a label to display numeric values, such as version numbers and collection counts in tabs. 

## Usage

### When to use

To display version numbers (e.g., “v1.2.0”), collection counts in tabs, or similar numeric information.

### When not to use

To display non-numeric information, consider [Badge](/components/badge).

## Type

There are three types of BadgeCounts: filled, inverted, and outlined.

<Hds::BadgeCount @text="3" @type="filled" />
<Hds::BadgeCount @text="3" @type="inverted" />
<Hds::BadgeCount @text="3" @type="outlined" />

## Color

There are two color options for each type: neutral and neutral-dark-mode.

<Hds::BadgeCount @text="3" @color="neutral" />
<Hds::BadgeCount @text="3" @color="neutral-dark-mode" />

## Size

There are three sizes: small, medium, and large.

<Hds::BadgeCount @text="3" @size="small" />
<Hds::BadgeCount @text="3" @size="medium" />
<Hds::BadgeCount @text="3" @size="large" />
