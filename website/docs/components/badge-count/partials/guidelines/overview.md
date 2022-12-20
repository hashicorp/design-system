Use `BadgeCount` as a numeric label to display version numbers, collection counts in tabs, and similar information. For non-numeric information, use [Badge](/components/badge/).

## Usage

### When to use
* To display version numbers (ie. “v1.2.0”), collection counts in tabs, and similar information.

### When not to use
* To display non-numeric information, consider [Badge](/components/badge/).

### Type

There are three types of BadgeCounts: filled, inverted, and outlined.

<Hds::BadgeCount @text="3" @type="filled" />
<Hds::BadgeCount @text="3" @type="inverted" />
<Hds::BadgeCount @text="3" @type="outlined" />

### Color
There are two colors: neutral, and neutral-dark-mode.

<Hds::BadgeCount @text="3" @color="neutral" />
<Hds::BadgeCount @text="3" @color="neutral-dark-mode" />

### Size
There are three sizes: small, medium, and large.

<Hds::BadgeCount @text="3" @size="small" />
<Hds::BadgeCount @text="3" @size="medium" />
<Hds::BadgeCount @text="3" @size="large" />

## Related
* [Badge](/components/badge/)