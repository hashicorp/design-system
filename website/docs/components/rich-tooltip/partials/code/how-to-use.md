The Rich Tooltip component associates a toggle element with a tooltip element that contains generic content. "Soft" (hover/focus) or click event listeners can be assigned to the toggle, which toggle the tooltip's visibility, which appears as a popover on top of the page content. The tooltip can be closed by re-triggering the toggle events, clicking outside the popover, or pressing the `esc` key.

While the Rich Tooltip may seem to be a fairly simple component, there is a lot of complexity beneath the surface:

- The component uses the [native web Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to display the tooltip content as a popover on top of the page.
- A third-party library called [Floating UI](https://floating-ui.com/) provides the anchoring of the "popover" to the "toggle" element and the automatic positioning/collision detection functionality.
- These functionalities are abstracted into two HDS utilities (the `hds-anchored-position` modifier and the [PopoverPrimitive component](/utilities/popover-primitive)), which the Rich Tooltip component is built on top of.

Since tooltips are notoriously hard to implement in an accessible way, we limited the ways in which the Rich Tooltip can be used. At the same time, we have provided an escape hatch if some edge cases need to be supported (but in this case, consumers will need to make sure the component is used in a [conformant and accessible way](/components/rich-tooltip?tab=accessibility)).

The component provides several options to customize its behavior. Below we have tried to describe the most common examples, but if you find a use case that is not supported by the existing Rich Tooltip implementation, please [speak with the Design System team](/about/support).

## How to use this component

When using this component, there are a few things to consider:

- what toggle to use; the [standard toggle](#standard-toggle) or a [generic toggle](#generic-toggle)
- if the toggle is a [standalone element](#as-a-standalone-element) or instead lives [inline with other text](#inline-with-other-text)
- how the end-user should [interact](#interactivity) with the toggle to show/hide the tooltip

Depending on these factors, there are different ways to implement the code, as described in the alternatives below.

### Standard toggle

The standard `Toggle` element **ensures perceivability and accessibility out of the box**. It consist of a piece of text (with an underline decoration applied to it) and an optional icon. The icon can be leading or trailing, and its size is always proportional to the font size of the text (`1em`).

The text and icon are rendered inside an HTML `<button>` element (which technically acts as a toggling control for the popover). For details about how the user can interact with this button, see the [Interactivity](#interactivity) sub-section.


The `Bubble` element is a pure container that yields the children inside the "popover" tooltip bubble. Consumers can pass whatever content they need to it, but they are responsible for styling and structuring it according to their needs/context.


!!! Info

Note: we apply a CSS reset (`all: initial`) to the container to avoid styles applied to the parent elements leaking into the tooltip content. If you find any issue with this reset, please [speak with the Design System team](/about/support).

!!!

#### As a standalone element

By default, the `Toggle` element is rendered as a block. This means it can easily be used as a standalone UI element.

As mentioned above, the invocation requires a "toggle" and a "bubble" element to be passed as yielded sub-components. The "toggle" accepts a `@text` argument and an optional `@icon` argument. The "bubble" element instead yields its content inside the popover tooltip:

```handlebars
<Hds::RichTooltip as |RT|>
  <RT.Toggle @text="More info" @icon="info" />
  <RT.Bubble>
    <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Some descriptive information</Hds::Text::Body>
  </RT.Bubble>
</Hds::RichTooltip>
```

As one can see, by default the text of the toggle doesn't get a typographic style (it inherits it from the parent).

##### Size


To apply a predefined typographic style, it's necessary to pass a `@size` argument:

```handlebars
<Hds::RichTooltip as |RT|>
  <RT.Toggle @size="large" @text="More info" @icon="info" />
  <RT.Bubble>
    <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Some descriptive information</Hds::Text::Body>
  </RT.Bubble>
</Hds::RichTooltip>
```

##### Visual organization

To align the toggle with other UI elements, consumers should use a parent element that wraps the content and provides the desired layout (e.g., using flexbox):

```handlebars
<div class="doc-rich-tooltip-standalone-block-flex-layout">
  <Hds::Button @text="Your action" {{on "click" this.onClickButton}} />
  <Hds::RichTooltip as |RT|>
    <RT.Toggle @size="medium" @text="More info" @icon="info" />
    <RT.Bubble>
      <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
      <Hds::Text::Body @tag="p" @size="200">Some descriptive information</Hds::Text::Body>
    </RT.Bubble>
  </Hds::RichTooltip>
</div>
```

#### Inline with other text

If the toggle needs to be inline with other text, use the `@isInline` argument:

```handlebars
Lorem
<Hds::RichTooltip as |RT|>
  <RT.Toggle @isInline={{true}} @text="ipsum dolor" />
  <RT.Bubble>
    <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Some descriptive information</Hds::Text::Body>
  </RT.Bubble>
</Hds::RichTooltip>
sit amet consectetur adipiscing elit.
```

In this case, it is better not to assign a `@size` to the `Toggle`, so that its typographic style is the same as the text that comes before/after the toggle text.

To apply a typographic style to the whole paragraph, consumers can use a [Text](/components/text) component as a wrapper:

```handlebars
<Hds::Text::Body @tag="p" @size="300">
  Lorem
  <Hds::RichTooltip as |RT|>
    <RT.Toggle @isInline={{true}} @text="ipsum dolor" />
    <RT.Bubble>
      <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
      <Hds::Text::Body @tag="p" @size="200">Some descriptive information</Hds::Text::Body>
    </RT.Bubble>
  </Hds::RichTooltip>
  sit amet consectetur adipiscing elit.
</Hds::Text::Body>
```

Similarly, a typographic class (or a custom CSS class) can be applied to a parent container.

#### Whitespace issues

There may be cases in which the tooltip text is preceded/followed by non-whitespace characters. In this case, extra whitespace could appear between these characters and the toggle text. Unfortunately the only solution we have found is to remove all whitespace before/after the `<Hds::RichTooltip>` tag, and before/after the `<RT.Toggle>` and `<RT.Bubble>` tags:

```handlebars
<Hds::Text::Body @tag="p" @size="300">
  Lorem "<Hds::RichTooltip as |RT|><RT.Toggle @isInline={{true}} @text="ipsum dolor" /><RT.Bubble>
      <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
      <Hds::Text::Body @tag="p" @size="200">Some descriptive information</Hds::Text::Body>
    </RT.Bubble></Hds::RichTooltip>" sit amet consectetur adipiscing elit.
</Hds::Text::Body>
```

### Interactivity

By default, the visibility of the tooltip is toggled via "soft" event listeners (hover/focus) applied to the toggle container. _Note: from a purely technical standpoint, the actual events used are `mouseEnter/Leave` and `focusIn/Out`._

To change this behavior and opt for a more explicit user interaction using click events (in this case the "soft" events are disabled) set the argument `@enableClickEvents` to `true`:

```handlebars
<Hds::RichTooltip @enableClickEvents={{true}} as |RT|>
  <RT.Toggle @size="medium" @text="More info" @icon="info" />
  <RT.Bubble>
    <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Some descriptive information</Hds::Text::Body>
  </RT.Bubble>
</Hds::RichTooltip>
```

Independent of which interaction is used, the tooltip can be dismissed by clicking outside of the component or with the `esc` key (this "light dismiss" behavior is automatically provided by the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using#auto_state_and_light_dismiss)).

### Placement

By default the tooltip is shown below the toggle, visually centered. It's possible to change the initial position of the tooltip using the `@placement` argument:

```handlebars
<Hds::RichTooltip as |RT|>
  <RT.Toggle @size="medium" @text="Lorem ipsum" @icon="info" />
  <RT.Bubble @placement="top-start">
    <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Some descriptive information that spans multiple lines</Hds::Text::Body>
  </RT.Bubble>
</Hds::RichTooltip>
```

### Collision detection

The RichTooltip component automatically adapts its alignment depending on its position relative to the viewport to avoid collisions with the browser window boundaries. This means that when an end-user scrolls the page, or resizes the browser, the position of the tooltip on the page dynamically adapts to these changes (along the two axes, main and secondary).

It's possible to disable this behavior by setting the `@enableCollisionDetection` argument to `false`.

It's also possible to customize this behaviour using the values:
- `flip` - adapts the position only along its [axis of alignment](https://floating-ui.com/docs/flip#mainaxis)
- `shift` - adapts the position only along its [side axis](https://floating-ui.com/docs/shift#mainaxis)
- `auto` - uses the side where there is [more space available](https://floating-ui.com/docs/autoPlacement) (in relation to the viewport)

The default option is a combination of `flip`+`shift` and is the suggested one, but there may be use cases where the other options work better in a specific context/use case.

!!! Info

More in-depth explanations about the different alignment algorithms and how they work can be found in the Floating UI documentation. See [flip](https://floating-ui.com/docs/flip), [shift](https://floating-ui.com/docs/shift), and [autoPlacement](https://floating-ui.com/docs/autoPlacement)).

!!!

In the example below, we use an `auto` placement: try scrolling and/or resizing the page and see how the tooltip changes its position automatically:

```handlebars
<Hds::RichTooltip @enableClickEvents={{true}} as |RT|>
  <RT.Toggle @size="medium" @text="More info" @icon="info" />
  <RT.Bubble @enableCollisionDetection="auto">
    <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Some descriptive information that spans multiple lines</Hds::Text::Body>
  </RT.Bubble>
</Hds::RichTooltip>
```

### Fixed width/height

By default, the size of the tooltip automatically adapts to the size of its content (with a max-width of `280px`). It's possible to assign a fixed `width` and/or `height` to the tooltip by providing the `@width` or `@height` arguments:

```handlebars
<Hds::RichTooltip as |RT|>
  <RT.Toggle @size="medium" @text="More info" @icon="info" />
  <RT.Bubble @width="450px" @height="200px">
    <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Some descriptive information</Hds::Text::Body>
  </RT.Bubble>
</Hds::RichTooltip>
```

### Generic toggle

There may be special use cases in which the standard text or icon-based toggle doesn't work in a specific context or design. For this reason, custom content can be yielded to the `Toggle` element, but this should be considered an option of last resort, because it could result in a non-accessible implementation.

```handlebars
<Hds::RichTooltip as |RT|>
  <RT.Toggle>
    <Hds::Tag @text="My text tag" />
  </RT.Toggle>
  <RT.Bubble>
    <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Some descriptive information</Hds::Text::Body>
  </RT.Bubble>
</Hds::RichTooltip>
```

!!! Warning

**Important**

When used in this way, it's up to the consumer to make sure the implementation is compliant with the [accessibility requirements](/components/rich-tooltip?tab=accessibility).

!!!

### Advanced options

There might be special use cases in which consumers may need to fine tune the Rich Tooltip behaviour. Below we provide some some examples.

!!! Insight

If your use case requires customizing the component behavior or functionality, we suggest [speaking with the Design System team](/about/support) first before actually implementing the changes (as we may already have your case covered).

!!!

#### Offset

The default spacing between the toggle and the tooltip itself can be tweaked using the `@offset` argument:

```handlebars
<Hds::RichTooltip as |RT|>
  <RT.Toggle @size="medium" @text="More info" @icon="info" />
  <RT.Bubble @offset={{24}}>
    <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Some descriptive information</Hds::Text::Body>
  </RT.Bubble>
</Hds::RichTooltip>
```

#### isOpen

The tooltip can be rendered as initially opened using the `@isOpen` argument:

```handlebars
<Hds::RichTooltip @isOpen={{true}} as |RT|>
  <RT.Toggle @size="medium" @text="More info" @icon="info" @iconPosition="leading" />
  <RT.Bubble @placement="right">
    <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Some descriptive information</Hds::Text::Body>
  </RT.Bubble>
</Hds::RichTooltip>
```

!!! Warning

**Important**

This option should be considered carefully before being implemented in production code, because in this case the popover is in what's called a "manual" state, which means it can't be dismissed via `esc` or "click outside" until the end-user has interacted with it.

!!!

