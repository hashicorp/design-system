---
title: Writing guidelines
caption: Consistent language guidelines for components and patterns.
description: Consistent language guidelines for components and patterns.
previewImage: assets/illustrations/content/writing-guidelines.jpg
---

## Date and time

Display dates and times clearly and consistently across products.

### Usage

These formatting options are available in the [Time](/components/time) component. Choose the format most appropriate for your user needs.

- **Relative date**: Displays time in relative terms, e.g., "3 hours ago" or "in 2 days". This format is recommended for recent events, particularly within the past or upcoming week, as it simplifies recognition of time-sensitive actions.
- **Friendly date**: Provides a user-friendly date and time, e.g., "Sep 5, 2018, 3:30 PM EST". Limit time format to the minute.
- **Friendly local date**: Converts the date to the user’s local timezone for added clarity, e.g., "Sep 2, 2024, 3:30 PM EST". Ideal for exact dates and times. Limit time format to the minute.
- **Date range**: Displays a range by specifying a start and end date, e.g., "Sep 2–Sep 9, 2024".
- **Precise time**: Displays date and time in a UTC format for a log stream or where human readability isn't necessary, e.g., “2024-09-05T23:15:17345Z”.

### Relative dates

Relative dates work well for periods from one minute up to one week. For added accuracy, a [Tooltip](/components/tooltip) can display the exact timestamp, including seconds and the local timezone, e.g., "Sep 5, 2018, 4:07:32 PM PST". This helps users who need precise information without manually converting from UTC.

![A relative date displayed as "5 days ago" with the full date shown in a tooltip in the friendly local format "Sep 5, 2018, 4:07:32 PM EST".](/assets/content/writing-guidelines/writing-guidelines-relative-dates-with-tooltip.png)

- Omit "about" in phrases like "about 3 hours ago" since the approximation is implied.
To improve readability, show only the most significant unit, e.g., "3 days ago" instead of "3 days, 4 hours ago."
- Friendly dates limit the visible display to the minute, e.g., "Sep 5, 2018, 4:07 PM".
