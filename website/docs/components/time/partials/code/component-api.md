## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="date" @type="Date, string">
    Specify the date and time for a single date. Value can be specified as a JavaScript Date object or as an ISO date string.
  </C.Property>
  <C.Property @name="startDate" @type="Date, string">
    Specify the starting date and time for a date range. Value can be specified as a JavaScript Date object or as an ISO date string.
  </C.Property>
  <C.Property @name="endDate" @type="Date, string">
    Specify the ending date and time for a date range. Value can be specified as a JavaScript Date object or as an ISO date string.
  </C.Property>
  <C.Property @name="display" @type="string" @values={{array "friendly-relative" "friendly-local" "friendly-only" "relative" "utc" }} @default="friendly-local">
    The display format used for the date and time.
  </C.Property>
  <C.Property @name="hasTooltip" @type="boolean" @default="true">
    Sets whether a tooltip is included which displays the time in ISO UTC format by default. (Varies according to `@display` value set.)
  </C.Property>
  <C.Property @name="isOpen" @type="boolean" @default="false">
    Sets whether tooltip displays as open upon page load.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
