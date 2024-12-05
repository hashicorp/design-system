## Component API

The Time component makes use of the `hds-time` service, which provides various time and formatting-related functions as well as a tracked `now` property representing current time in milliseconds, which continuously updates.

It uses two helper functions: the `hds-format-date` helper, which formats a date according to the passed-in options, and the `hds-format-relative` helper, which returns a relative string according to the passed-in value and units.

### Time component

<Doc::ComponentApi as |C|>
  <C.Property @name="date" @type="Date | string">
    Specify the date and time for a single date. Value can be specified as a [JavaScript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) or as an ISO date string.
  </C.Property>
  <C.Property @name="startDate" @type="Date | string">
    Specify the starting date and time for a date range. Value can be specified as a JavaScript Date object or as an ISO date string.
  </C.Property>
  <C.Property @name="endDate" @type="Date | string">
    Specify the ending date and time for a date range. Value can be specified as a JavaScript Date object or as an ISO date string.
  </C.Property>
  <C.Property @name="display" @type="string" @values={{array "friendly-relative" "friendly-local" "friendly-only" "relative" "utc" }} @default="friendly-local">
    The display format used for the date and time.
  </C.Property>
  <C.Property @name="hasTooltip" @type="boolean" @default="true">
    Sets whether a Tooltip is included which displays the time in ISO UTC format by default. (Varies according to `@display` value set.)
  </C.Property>
  <C.Property @name="isOpen" @type="boolean" @default="false">
    Sets whether Tooltip displays as open upon page load.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Time service

The time service provides various time-related functions as well as a tracked `now` property representing current time in milliseconds.

#### Properties

<Doc::ComponentApi as |C|>
  <C.Property @name="now" @type="Number">
    A tracked property representing the number of milliseconds since the epoch. Continuously updated through the start task.
  </C.Property>
</Doc::ComponentApi>

#### Functions

<Doc::ComponentApi as |C|>
  <C.Property @name="format">
    Takes two parameters, `difference` and `display`. The `difference` parameter, which is required, is an object consisting of an absolute value in milliseconds and a value in milliseconds. The `display` parameter, which is optional, is a string representing a display format type such as “friendly”. Returns `options`, `difference`, and `relative`.
  </C.Property>
  <C.Property @name="timeDifference">
    Takes a start date, which is a number, and an end date, which is a JavaScript Date object. Returns an object consisting of the absolute value of the difference between the dates and the value in milliseconds of the difference between the end and start dates.
  </C.Property>
  <C.Property @name="register">
    Registers a listener with the time service. Requires an id, which is a JavaScript Date object, as a parameter. Returns a function that calls the unregister function with the passed in id.
  </C.Property>
  <C.Property @name="unregister">
    Removes a listener from the time service. Requires an id, which is a JavaScript Date object, as a parameter. Returns a boolean.
  </C.Property>
</Doc::ComponentApi>
