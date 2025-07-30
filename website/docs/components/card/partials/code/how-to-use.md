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

There are three arguments: `@level`, `@levelHover` and `@levelActive`. These allow consumers to declare the specific "level" they want to use for each of these interactive states. Following our guidelines, the example transitions between _mid → high → mid_ elevations on these iteration states _default → hover → active_:

```handlebars
<div class="doc-card-interactive-demo">
  <Hds::Card::Container @level="mid" @levelHover="high" @levelActive="mid" @hasBorder={{true}}>
      <a href="#">
        [Your static content here]
      </a>
  </Hds::Card::Container>
</div>
```

Using SCSS, the `.doc-card-interactive-demo` class would look something like this:

```scss
.doc-card-interactive-demo {
  .hds-card__container {

    a {
      display: block;
      padding: 16px;
      border-radius: inherit;

      &:focus {
        outline: none;
        box-shadow: var(--token-focus-ring-action-box-shadow);
      }
    }
  }
}
```

This example implements a basic interactive card which uses a link to wrap the entirety of the static content area. For further assistance on implementing interactive cards, [contact the Design System Team](https://helios.hashicorp.design/about/support).
