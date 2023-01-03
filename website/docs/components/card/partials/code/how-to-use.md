## Usage

```handlebars
<Hds::Card::Container @level="mid" @hasBorder={{true}}>[Your content here]</Hds::Card::Container>
```

!!! Info

**Just a container**

The layout of the card itself, and its content, is left to the consumer of the component. The `Hds::Card::Container` is nothing more than a block container—a `<div>`—that provides styling for the `elevation`, `border`, and `background`. Sizing of the card, internal padding, and content alignment are all the consumer’s responsibility.

!!!

In this example we apply custom classes to control the layout of the card and its content:

```handlebars
<div class="my-custom-class-to-set-the-card-layout">
  <Hds::Card::Container @level="mid" @hasBorder={{true}}>
    <div class="my-custom-class-to-set-the-content-layout">
      [Your content here]
    </div>
  </Hds::Card::Container>
</div>
```

In this case we’ve added an external element that wraps the card, with a custom class that controls the width of the wrapper itself (but could also be a CSS `flex` or `grid` container, for example) and an internal element that wraps the content and applies padding around it (resulting in visual internal padding for the card) and aligns the text to the center.

### Interactive states

At the moment, we do not recommend using the card component as an interactive element, although we may add this feature in the future. Despite this, some products have implemented designs that provide visual feedback to the user interacting with a card by changing the elevation style (on `:hover` or `:active`).

As a stopgap measure, we have introduced two specific arguments `@levelHover` and `@levelActive` to allow users to declare the specific "level" they want to use for each of these interactive states.

In the following example, the card transitions between these elevations _mid → high → mid_ depending on these iteration states _rest → hover → active_:

```handlebars
<div class="my-custom-class-to-set-the-card-layout">
  <Hds::Card::Container @level="mid" @levelHover="high" @levelActive="mid" @hasBorder={{true}}>
    <div class="my-custom-class-to-set-the-content-layout">
      [Your content here]
    </div>
  </Hds::Card::Container>
</div>
```

**Important**: this is only an example and not a recommendation: if you have any doubt about which level to use for the different states, please speak with your product designer or the HDS team.
