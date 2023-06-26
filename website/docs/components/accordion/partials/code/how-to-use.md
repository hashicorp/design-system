## How to use this component

The Accordion component is used to wrap and group together one or more AccordionItem child components. AccordionItems consist of “toggle” and “content” named blocks which can contain either plain text or HTML content.

```handlebars
  <Hds::Accordion as |A|>
    <A.Item>
      <:toggle>Item one</:toggle>
      <:content>
        Additional content for item one
      </:content>
    </A.Item>
    <A.Item>
      <:toggle>Item two</:toggle>
      <:content>
        Additional content for item two
      </:content>
    </A.Item>
  </Hds::Accordion>
```

### isOpen

Set `isOpen` to `true` on an AccordionItem to display its associated content on page load instead of initially hiding it.

```handlebars
  <Hds::Accordion as |A|>
    <A.Item @isOpen={{true}}>
      <:toggle>Item one</:toggle>
      <:content>
        Additional content for item one which is displayed on page load
      </:content>
    </A.Item>
    <A.Item>
      <:toggle>Item two</:toggle>
      <:content>
        Additional content for item two which is hidden on page load
      </:content>
    </A.Item>
  </Hds::Accordion>
```

### isInteractive

By default, the `isInteractive` property of the AccordionItem is set to `true`, meaning that the entire AccordionItem toggle block can be clicked to hide and show the associated content. If set to `false` only the chevron button of the AccordionItem is clickable vs. the entire block. This allows you to add other interactive content inside the toggle block if desired.

```handlebars
  <Hds::Accordion as |A|>
    <A.Item @isInteractive={{false}}>
      <:toggle>
        Item one
        <a href="https://www.hashicorp.com/">link</a>
      </:toggle>
      <:content>
        Additional content for item one which is displayed on page load
      </:content>
    </A.Item>
    <A.Item>
      <:toggle>Item two</:toggle>
      <:content>
        Additional content for item two which is hidden on page load
      </:content>
    </A.Item>
  </Hds::Accordion>
```