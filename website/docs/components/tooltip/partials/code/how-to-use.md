## How to use this component

The HDS tooltip is provided as both a `TooltipButton` component and as an `hds-tooltip` Ember modifier. To be accessible, the element which triggers a tooltip needs to be an interactive element which can receive focus. This means that:

* if the tooltip needs to be applied to a non-interactive element, the `TooltipButton` component should be used as it wraps the opener element with a `button` element.
* if the tooltip needs to be applied to an element which is already interactive, the `hds-tooltip` modifier should be used.

Currently, the tooltip uses [Tippy.js](https://atomiks.github.io/tippyjs/) under the hood for its main functionality.

<!-- use the same heading order from Guidelines -->
### TooltipButton

#### Icon
```handlebars
  <Hds::TooltipButton @text="Here is more information">
    <FlightIcon @name="alert-circle" aria-label="More information" />
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

#### Extra Tippy Options

You can use `@extraTippyOptions` to enable rich tooltip text.

Be sure to sanitize your data if enabling this option. To maintain accessibility, do not include interactive content such as links or buttons. We recommend using only basic inline-level text formatting tags such as `strong` or `em`. Using block-level tags such as `div` or `p` will make the HTML syntax invalid.

```handlebars
  <Hds::TooltipButton 
    @extraTippyOptions={{hash allowHTML=true}}
    @text="<b>Hello</b> <em>there</em>! Here is more info."
  >
    More information
  </Hds::TooltipButton>
```

### Ember modifier

An Ember modifier is available if your use case requires attaching a tooltip to an element than is already interactive (to be accessible, tooltips should only be attached to interactive elements, like buttons, links, inputs, etc). 

#### Modifier used on a link

```handlebars
  <a href="#" {{hds-tooltip "Hello"}}>More information</a>
```

#### Placement
```handlebars
  <a href="#" {{hds-tooltip "This link takes you to more information" options=(hash placement="right")}}>More information</a>
```

#### Offset
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