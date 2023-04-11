## How to use this component

The HDS tooltip is provided both as a `TooltipButton` component and as a `tooltip` Ember modifier/helper. The component is intended to handle the majority of use cases and should be used vs. the helper whenever feasible. The helper is available if you need to apply a tooltip to a custom element other than an HTML button although should still only be used with interactive elements such as anchor links and form inputs to ensure accessibility.

<!-- use the same heading order from Guidelines -->
### Basic examples 

#### With FlightIcon
```handlebars
  <Hds::TooltipButton @text="Here is more information">
    <FlightIcon @name="alert-circle" aria-label="More information" />
  </Hds::TooltipButton>
```

#### With text content with bold and em tags to format tooltip text
```handlebars
  <Hds::TooltipButton @text="<b>Hello</b> <em>there</em>! Here is more info.">
    More information
  </Hds::TooltipButton>
```

#### Used next to text content
```handlebars
  <p>
    <strong>Header text</strong>
    <Hds::TooltipButton @text="Here is more information">
      <FlightIcon @name="alert-circle" aria-label="More information" />
    </Hds::TooltipButton>
  </p>
```

### Placement

The tooltip appears at the “top” centered above the opener button content by default. If the tooltip is near any of the edges of the screen, its position will automatically adjust to prevent the tooltip content from being cut off so it remains readable.

Use the `placement` argument if you would like to use a different starting position for the tooltip vs. the default.

#### With “bottom” placement

```handlebars
  <Hds::TooltipButton @text="Here is more information" @placement="bottom">
    <FlightIcon @name="alert-circle" aria-label="More information" />
  </Hds::TooltipButton>
```

### Offset

You can change the offset of the tooltip in relation to the opener element content if needed.

#### With offset of “50 30”

```handlebars
  <Hds::TooltipButton @text="Here is more information" @offset={{array 50 30}}>
    <FlightIcon @name="alert-circle" aria-label="More information" />
  </Hds::TooltipButton>
```

### Ember modifier/helper

If you use the modifier instead of the component you will need to add your own styling for the element you are atttaching the toolip to

#### Helper used on an anchor tag

```handlebars
  <a href="#" {{hds-tooltip "This link takes you to more information"}}>More information</a>
```

#### With different placement and offset options
```handlebars
  <a href="#" {{hds-tooltip "This link takes you to more information" options=(hash placement="right" offset=(array 15 60))}}>More information</a>
```

#### Helper used on an HTML text input tag combined with HDS form components

```handlebars
  <Hds::Form::Field @layout="vertical" as |F|>
    <F.Label @controlId="tooltip-example-control-id">First Name</F.Label>
    <F.Control>
      <input type="text" value="Jane" id="tooltip-example-control-id" {{hds-tooltip "Here is more information"}} />
    </F.Control>
  </Hds::Form::Field>
```