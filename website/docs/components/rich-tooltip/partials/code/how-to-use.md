The Rich Tooltip component associates a "toggle" element with a "tooltip" element that wraps some generic content (in that sense, both elements act as "containers"). "Soft" (hover/focus) or "click" event listeners can be assigned to the toggle, and when triggered they toggle the visibility of the tooltip, which appears as "popover" on top of the page content. When the tooltip is visible, it can be closed in various ways: toggling via the "soft" or "click" events, clicking outside of the popover, or via the `esc` key.

Now, while at first glance the Rich Tooltip component may seem a simple component, beneath the surface it conceals a lot of complexity:

- the component uses the [native web Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to display the tooltip content as "popover" on top of the page content
- it also uses a third-party library called [Floating UI](https://floating-ui.com/) to provide the anchoring of the "popover" to the "toggle" element, and the automatic positioning/collision detection functionality.
- these functionalities are in turn abstracted in two underlying HDS utilities (the `hds-anchored-position` modifier and the [PopoverPrimitive component](/utilities/popover-primitive)), on top of which the Rich Tooltip component is built.

The component provides a lot of options to customize its behavior. Below we have tried to describe the most common examples, but if you find a use case that is not supported by the existing Rich Tooltip implementation, please [speak with the Design System team](/about/support).

And finally, since tooltips are notoriously hard to implement in an accessible way, we have tried to limit the ways in which the Rich Tooltip can be used, while at the same time provide an escape hatch if some edge cases need to be supported. If this is the case, consumers will need to make sure the component is used in a [conformant accessible way](/components/rich-tooltip?tab=accessibility).

## How to use this component

When using this component, there are a few things to consider:

- what toggle to use; the standard [InfoText toggle](#with-infotext-toggle) or a [generic toggle](#with-a-generic-toggle), and in that case if the generic toggle contains interactive elements or not
- if the toggle is a [standalone element](#as-a-standalone-element) or if instead lives [inline with other text](#inline-with-other-text)
- how the end-user should [interact](#interactivity) with the toggle to show/hide the tooltip

Depending of these factors, there are different ways to implement the code, described in these alternatives below.

### With `InfoText` toggle

#### As a standalone element

The toggle element (and the parent "wrapping" container) are rendered by default as block elements. This means it can easily be used as a standalone element.

The invocation requires a "toggle" element and "content" to be passed as yielded sub-components:

```handlebars
<Hds::RichTooltip as |RT|>
  <RT.ToggleInfoText @icon="info">More info</RT.ToggleInfoText>
  <RT.PopoverContent>
    <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Descriptive information</Hds::Text::Body>
  </RT.PopoverContent>
</Hds::RichTooltip>
```

Here we're using the `InfoText` toggle element, which ensures perceivability and accessibility out of the box. It consist of text (with a specific underline decoration applied to it) and an optional icon (can be leading or trailing).

The text and the icon are rendered inside an HTML `<button>` element (the one that technically acts as a toggling control for the popover). For details about how the user can interact with this button see the [Interactivity](#interactivity) sub-section.

!!! Info

If this doesn't work for your needs/context, you can use a [generic toggle](#with-a-generic-toggle), but in this case it's up to you to make sure the implementation is compliant with the [accessibility requirements](/components/rich-tooltip?tab=accessibility).

!!!

The `PopoverContent` element instead is a pure container that yields the children inside the "popover" tooltip bubble. You can pass whatever content you need to it, but you are also responsible of styling and structuring it according to your needs/context.


!!! Info

Notice: we apply a CSS reset (`all: initial`) to the container to avoid styles applied to the parent elements leaking into the tooltip content. If you find any issue with this reset please [speak with the Design System team](/about/support).

!!!

##### Size

As you can see from the code example above, the content of the toggle doesn't get formatted by default (so that it can be used [inline with other text](#inline-with-other-text) and it inherits the typographic style from its parent element).

To apply a predefined typographic styles you have to pass a `@size` argument:

```handlebars
<Hds::RichTooltip as |RT|>
  <RT.ToggleInfoText @size="large" @icon="info" @iconPosition="trailing">More info</RT.ToggleInfoText>
  <RT.PopoverContent>
    <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Descriptive information</Hds::Text::Body>
  </RT.PopoverContent>
</Hds::RichTooltip>
```

In all cases the icon size is proportional to the font size (`1em`).

##### Visual organization

If you need to align the toggle with other UI elements, use a parent element that wraps the content and provides the desired layout (e.g., using flexbox):

```handlebars
<div class="doc-rich-tooltip-standalone-block-flex-layout">
  <Hds::Button @text="Your action" {{on "click" this.onClickButton}} />
  <Hds::RichTooltip as |RT|>
    <RT.ToggleInfoText @size="medium" @icon="info">More info</RT.ToggleInfoText>
    <RT.PopoverContent>
      <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
      <Hds::Text::Body @tag="p" @size="200">Descriptive information</Hds::Text::Body>
    </RT.PopoverContent>
  </Hds::RichTooltip>
</div>
```

#### Inline with other text

If the tooltip toggle needs to be inline with other text, use the `@isInline` argument:

```handlebars
Lorem
<Hds::RichTooltip @isInline={{true}} as |RT|>
  <RT.ToggleInfoText>ipsum dolor</RT.ToggleInfoText>
  <RT.PopoverContent>
    <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Descriptive information</Hds::Text::Body>
  </RT.PopoverContent>
</Hds::RichTooltip>
sit amet consectetur adipiscing elit.
```

In this case, it is better not to assign a `@size` to the `InfoText` toggle, so that its typographic style is the same as the text that comes before/after the toggle text.

To apply a typographic style to the whole paragraph you can use a [Text](/components/text) component as a wrapper:

```handlebars
<Hds::Text::Body @tag="p" @size="300">
  Lorem
  <Hds::RichTooltip @isInline={{true}} as |RT|>
    <RT.ToggleInfoText>ipsum dolor</RT.ToggleInfoText>
    <RT.PopoverContent>
      <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
      <Hds::Text::Body @tag="p" @size="200">Descriptive information</Hds::Text::Body>
    </RT.PopoverContent>
  </Hds::RichTooltip>
  sit amet consectetur adipiscing elit.
</Hds::Text::Body>
```

Similarly, you can apply a typographic class, or a custom CSS class, to a parent container.

Which one of these approaches to use will depend on the context where the code is implemented, so we leave it to the consumers to decide which approach works better for them.

#### Interactivity

By default the visibility of the tooltip is toggled via "soft" event listeners (hover/focus) applied to the "toggle" container. _Notice: from a purely technical standpoint, the events are `mouseEnter/Leave` and `focusIn/Out`._

You can change this behavior and opt for a more explicit user interaction enabling "click" events (in this case the "soft" events are disabled) setting the argument `@enableClickEvents` to `true`:

```handlebars
<Hds::RichTooltip @enableClickEvents={{true}} as |RT|>
  <RT.ToggleInfoText @size="medium" @icon="info">More info</RT.ToggleInfoText>
  <RT.PopoverContent>
    <Hds::Text::Display @tag="h4" @size="200">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Descriptive information</Hds::Text::Body>
  </RT.PopoverContent>
</Hds::RichTooltip>
```

Independent of which interaction is used, the tooltip can be dismissed by clicking outside of the component or with the `esc` key (this "light dismiss" behavior is automatically provided by the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using#auto_state_and_light_dismiss)).

#### Placement

By default the tooltip is shown below the toggle, visually centered. It's possible to change the initial position of the tooltip using the `@popoverPlacement` argument:

```handlebars
<Hds::RichTooltip @popoverPlacement="top-start" as |RT|>
  <RT.ToggleInfoText @size="large" @icon="info">Lorem ipsum</RT.ToggleInfoText>
  <RT.PopoverContent>
    <Hds::Text::Display @tag="h4" @size="300">Lorem ipsum</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Sit amet consectetur ut ultrices id venenatis in felis auctor ante.</Hds::Text::Body>
  </RT.PopoverContent>
</Hds::RichTooltip>
```

#### Collision detection

The RichTooltip component automatically adapts its alignment depending on its position relative to the viewport to avoid "collisions" with the browser window boundaries. This means that when an end-user scrolls the page, or resizes the browser, the position of the tooltip on the page dynamically adapts to these changes (along the two axes, main and secondary).

It's possible to disable this behavior setting the `@enableCollisionDetection` argument to `false`.

It's also possible to customize this behaviour using the values:
- `flip` - adapts the position only on the main axis
- `shift` - adapts the position only on the secondary axis
- `auto` - uses the side where there is more space available (in relation to the viewport)

The default option is a combination of `flip`+`shift` and is the suggested one, but there may be use cases where the other options work better in a specific context/use case.

!!! Info

More in-depth explanations about the different alignment algorithms and how they work can be found in the Floating UI documentation. See [flip](https://floating-ui.com/docs/flip), [shift](https://floating-ui.com/docs/shift), and [autoPlacement](https://floating-ui.com/docs/autoPlacement)).

!!!

In the example below we use an `auto` placement: try to scroll and/or resize the page and see how the tooltip changes its position automatically:

```handlebars
<Hds::RichTooltip @enableCollisionDetection="auto" @enableClickEvents={{true}} as |RT|>
  <RT.ToggleInfoText @size="large" @icon="info" @iconPosition="trailing">Lorem ipsum</RT.ToggleInfoText>
  <RT.PopoverContent>
    <Hds::Text::Display @tag="h4" @size="300">Lorem ipsum</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Sit amet consectetur ut ultrices id venenatis in felis auctor ante.</Hds::Text::Body>
  </RT.PopoverContent>
</Hds::RichTooltip>
```

#### Fixed width/height

By default the size of the tooltip automatically adapts to the size of its content (with a max-width of `280px`). It's possible to assign fixed `width` and/or `height` to the tooltip using the `@popoverWidth`/`@popoverHeight` arguments:

```handlebars
<Hds::RichTooltip @popoverWidth="450px" @popoverHeight="200px" as |RT|>
  <RT.ToggleInfoText @size="large" @icon="info" @iconPosition="trailing">Lorem ipsum</RT.ToggleInfoText>
  <RT.PopoverContent>
    <Hds::Text::Display @tag="h4" @size="300">Lorem ipsum</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Sit amet consectetur ut ultrices id venenatis in felis auctor ante.</Hds::Text::Body>
  </RT.PopoverContent>
</Hds::RichTooltip>
```

### With a generic toggle

There may be use cases in which the `InfoText` toggle doesn't work in a specific context or design. These cases should be rare, but if necessary it's possible to use an alternative content as a "toggle" with the `ToggleGeneric` yielded component:

```handlebars
<Hds::RichTooltip as |RT|>
  <RT.ToggleGeneric>
    <Hds::Tag @text="My text tag" />
  </RT.ToggleGeneric>
  <RT.PopoverContent>
    <Hds::Text::Display @tag="h4" @size="300">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Descriptive information</Hds::Text::Body>
  </RT.PopoverContent>
</Hds::RichTooltip>
```

#### Interactive vs non-interactive content

If the content of the generic toggle is interactive, or contains interactive elements, you will need to set the `@toggleContainsInteractive` argument to `true` to avoid generating nested interactive elements (not accessible):

```handlebars
<Hds::RichTooltip @toggleContainsInteractive={{true}} as |RT|>
  <RT.ToggleGeneric>
    <Hds::Tag @text="My text tag" @onDismiss={{this.yourOnDismissFunction}} />
  </RT.ToggleGeneric>
  <RT.PopoverContent>
    <Hds::Text::Display @tag="h4" @size="300">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Descriptive information</Hds::Text::Body>
  </RT.PopoverContent>
</Hds::RichTooltip>
```

In this case, it's not possible to enable the "click" events for the toggle, only the "soft" events (hover/focus) are allowed.

#### Other options

Apart from the interactivity, which requires different considerations, using the generic toggle for the Rich Tooltip still supports the same options for placement, collision detection, inlining, and width/height described above.

### Advanced options

There might be special use cases in which you may need some of the more advanced options of the Rich Tooltip. Below you can find some examples. If you find yourself in need of custom behaviors for the Rich Tooltip [speak with the Design System team](/about/support).

#### Offset

You can change the default spacing between the toggle and the tooltip itself using the `@popoverOffset` argument:

```handlebars
<Hds::RichTooltip @popoverOffset={{24}} as |RT|>
  <RT.ToggleInfoText @size="large" @icon="info" @iconPosition="trailing">More info</RT.ToggleInfoText>
  <RT.PopoverContent>
    <Hds::Text::Display @tag="h4" @size="300">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Descriptive information</Hds::Text::Body>
  </RT.PopoverContent>
</Hds::RichTooltip>
```

#### isOpen

You can render the tooltip initially opened using the `@isOpen` argument:

```handlebars
<Hds::RichTooltip @isOpen={{true}} @popoverPlacement="right" as |RT|>
  <RT.ToggleInfoText @size="large" @icon="info" @iconPosition="trailing">More info</RT.ToggleInfoText>
  <RT.PopoverContent>
    <Hds::Text::Display @tag="h4" @size="300">Some title</Hds::Text::Display>
    <Hds::Text::Body @tag="p" @size="200">Descriptive information</Hds::Text::Body>
  </RT.PopoverContent>
</Hds::RichTooltip>
```

!!! Warning

**Important**

This option should be considered carefully before being implemented in production code, because in this case the popover is in what's called a "manual" state, which means it can't be dismissed via `esc` or "click outside" until the end-user has interacted with it.

!!!

