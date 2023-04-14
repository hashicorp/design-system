## How to use this component

The HDS tooltip is provided both as a `TooltipButton` component and as an `hds-tooltip` Ember modifier. The component is intended to handle the majority of use cases and should be used vs. the modifier whenever feasible. The modifier is available if you need to apply a tooltip to a custom element other than an HTML button although should still only be used with interactive elements such as anchor links and form inputs to ensure accessibility.

Currently, the tooltip uses [Tippy.js](https://atomiks.github.io/tippyjs/) under the hood for its main functionality.

<!-- use the same heading order from Guidelines -->
### Content

#### Icon
```handlebars
  <Hds::TooltipButton @text="Here is more information">
    <FlightIcon @name="alert-circle" aria-label="More information" />
  </Hds::TooltipButton>
```

#### Rich tooltip text (bold and emphasized)
```handlebars
  <Hds::TooltipButton @text="<b>Hello</b> <em>there</em>! Here is more info.">
    More information
  </Hds::TooltipButton>
```

#### Inline with text
```handlebars
  <p>
    <strong>Header text</strong>
    <Hds::TooltipButton @text="Here is more information">
      <FlightIcon @name="alert-circle" aria-label="More information" />
    </Hds::TooltipButton>
  </p>
```

#### Placement

The tooltip appears at the “top” centered above the opener button content by default. If the tooltip is near any of the edges of the screen, its position will automatically adjust to prevent the tooltip content from being cut off so it remains readable.

Use the `@placement` argument if you would like to use a different starting position for the tooltip vs. the default.


```handlebars
  <Hds::TooltipButton @text="Here is more information" @placement="bottom">
    <FlightIcon @name="alert-circle" aria-label="More information" />
  </Hds::TooltipButton>
```

#### Offset

You can change the offset of the tooltip in relation to the opener element content if needed.


```handlebars
  <Hds::TooltipButton @text="Here is more information" @offset={{array 50 30}}>
    <FlightIcon @name="alert-circle" aria-label="More information" />
  </Hds::TooltipButton>
```

### Ember modifier

If you use the modifier instead of the component you will need to add your own styling for the element you are attaching the toolip to.

#### Modifier used on a link

```handlebars
  <a href="#" {{hds-tooltip "This link takes you to more information"}}>More information</a>
```

#### Placement option
```handlebars
  <a href="#" {{hds-tooltip "This link takes you to more information" options=(hash placement="right")}}>More information</a>
```

#### Offset option
```handlebars
  <a href="#" {{hds-tooltip "This link takes you to more information" options=(hash offset=(array 60 60))}}>More information</a>
```

#### Modifier used on an input element

```handlebars
  <Hds::Form::Field @layout="vertical" as |F|>
    <F.Label @controlId="tooltip-example-control-id">First Name</F.Label>
    <F.Control>
      <input type="text" value="Jane" id="tooltip-example-control-id" {{hds-tooltip "Here is more information"}} />
    </F.Control>
  </Hds::Form::Field>
```