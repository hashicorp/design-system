!!! Info

The Time component exists only in code. The Figma equivalent would be a manually input text object with a formatted string. For writing guidelines related to this component, read our content [Date and Time](/content/writing-guidelines#date-and-time) section.

!!!

## How to use this component

The Time component is used to display dates and times in a consistent format.

### Basic invocation with default time format display

The Time component displays dates using “friendly local” format by default which includes the abbreviated month name and the time of day along with the local timezone. A [Tooltip](/components/tooltip) is also included which by default displays the time in ISO UTC format. Set `hasTooltip` to `false` to turn off tooltip display.

The component does not include text styling so will inherit text styles from the context in which it is used.

#### Single time

```handlebars
<Hds::Text::Body>
  <Hds::Time @date="29 November 2021 9:30" />
</Hds::Text::Body>
```

#### Time range

In addition to displaying single dates, the Time component can be used to display date ranges.

```handlebars
<Hds::Text::Body>
  <Hds::Time @startDate="14 October 2024" @endDate="16 October 2024" />
</Hds::Text::Body>
```

### Display

Use the `@display` argument to specify a date format. You can select from “friendly-relative”, “friendly-only”, and “friendly-local” formats as well as just “relative” or “utc” display. See the [“Date and time” writing guidelines](/content/writing-guidelines#date-and-time) for more information on when to use each of these formats.


```handlebars
<Hds::Text::Body>
  HashiConf 2024 ended <Hds::Time @date="16 October 2024" @display="relative" />.
</Hds::Text::Body>
```
