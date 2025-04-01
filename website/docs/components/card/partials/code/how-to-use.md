!!! Info

**Just a container**

The layout of the Card itself, and its content, is left to the consumer of the component. The `Hds::Card::Container` is nothing more than a block container—a `<div>`—that provides styling for the `elevation`, `border`, and `background`. Sizing of the card, internal padding, and content alignment are all the consumer’s responsibility.

!!!

## How to use this component

```handlebars
<Hds::Card::Container @level="mid" @hasBorder={{true}}>
  [Your content here]
</Hds::Card::Container>
```

To style the Cards, you can add an external element that wraps the Card, with a custom class that controls the width of the wrapper itself and an internal element that wraps the content and applies padding around it (resulting in visual internal padding for the Card) and aligns the text to the center.

Alternatively, you could use the Card Containers in a CSS `flex` or `grid` container.

### HTML tag

To specify which HTML tag to use to render the component, use the `@tag` argument. The default tag is a `div` but you can optionally render the Card as an `li` to be used within a list.

Note: If you choose to use the `Card` as a list item, you must wrap it either in a `ul` or `ol` tag for the markup to be valid. Also note that you are responsible for the related styling for the list and list items.

```handlebars
<ul class="doc-card-list-demo">
  <Hds::Card::Container @tag="li" @hasBorder={{true}} class="doc-card-list-demo__item">
    Card item 1
  </Hds::Card::Container>

  <Hds::Card::Container @tag="li" @hasBorder={{true}} class="doc-card-list-demo__item">
    Card item 2
  </Hds::Card::Container>

  <Hds::Card::Container @tag="li" @hasBorder={{true}} class="doc-card-list-demo__item">
    Card item 3
  </Hds::Card::Container>
</ul>
```

### Interactive states

At the moment, we do not recommend using the Card component as an interactive element, although we may add this feature in the future. Despite this, some products have implemented designs that provide visual feedback to the user interacting with a Card by changing the elevation style (on `:hover` or `:active`).

As a stopgap, we have introduced two specific arguments `@levelHover` and `@levelActive` to allow users to declare the specific "level" they want to use for each of these interactive states.

<!-- TODO: this example doesn't work. should we update it or leave out for launch?

!!! Warning

This is only an example and not a recommendation. If you have any doubt about which level to use for the different states, please speak with your product designer or contact the Design Systems Team.
!!!

In the following example, the Card transitions between these elevations _mid → high → mid_ depending on these iteration states _rest → hover → active_:

```handlebars
<div class="my-custom-class-to-set-the-card-layout">
  <Hds::Card::Container @level="mid" @levelHover="high" @levelActive="mid" @hasBorder={{true}}>
    <div class="my-custom-class-to-set-the-content-layout">
      [Your content here]
    </div>
  </Hds::Card::Container>
</div>
```
-->
