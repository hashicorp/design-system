!!! Info

This component only exists in code. The Figma equivalent would be a manually input text object with a formatted string.
!!!

## Usage

### When to use

- To display a date and/or time in a consistent format across products

### When not to use
- If users need to enter a date, use the Date variants of the `TextInput`
- If users need to enter a time, use the Time variant of the `TextInput`
- If users need to enter a date and time, use the Datetime-local variant of the `TextInput`

### Formatting options

The Time component converts UTC timestamps into user-friendly formats, with multiple display options available to suit the context best:

- **Relative Date:** Displays the time in relative terms (e.g., "3 hours ago" or "in 2 days"). This format is recommended for recent events, particularly within the past or upcoming week, as it simplifies recognition of time-sensitive actions.
- **Friendly Date:** Provides a user-friendly date, optionally paired with a relative indicator (e.g., "Sep 5, 2018, 3:30 PM EST"). This is ideal for longer time frames where the exact date offers clear context.
- **Friendly Local Date:** Converts the date to the user’s local timezone for added clarity (e.g., “Sep 2, 2024, 3:30 PM EST”).
- **Date Range:** Presents a range by specifying a start and end date
(e.g., “Sep 2–Sep 9, 2024”).

### Relative dates

- Relative dates work well for periods from one minute up to one week.
- For added accuracy, a tooltip can display the exact timestamp, including seconds and the local timezone (e.g., “Sep 5, 2018, 4:07:32 PM PST”). This feature helps users who need precise information without manually converting from UTC.

![Tooltip displaying exact timestamp](/assets/components/time/time-example-tooltip.png)

- Omit “about” in phrases like “about 3 hours ago” since the approximation is implied.
- To improve readability, show only the most significant unit, e.g., “3 days ago” instead of “3 days, 4 hours ago.”.

### Friendly dates

Limit the visible display to the minute (e.g., “Sep 5, 2018, 4:07 PM”).