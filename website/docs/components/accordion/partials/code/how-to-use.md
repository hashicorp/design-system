## How to use this component

The `Accordion` component is used to wrap and group together one or more `Accordion::Item` child components. The Accordion items consist of “toggle” and “content” named blocks which can contain either plain text or HTML content.

### Size

A different size of Accordion can be invoked using the `@size` argument.

```handlebars
  <Hds::Accordion @size="large" as |A|>
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

### Type

Use the `@type` argument to render a `flush` Accordion.

```handlebars
  <Hds::Accordion @type="flush" as |A|>
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

### Complex HTML content

With an Alert component in the toggle block and an HTML table in the content block.

```handlebars
  <Hds::Accordion as |A|>
    <A.Item @isOpen={{true}}>
      <:toggle>
        <Hds::Alert @type="compact" @color="success" as |A|>
          <A.Title>Title</A.Title>
          <A.Description>Plan finished <small>22 days ago</small></A.Description>
        </Hds::Alert>
      </:toggle>
      <:content>
        <p class="hds-typography-body-200">
          <strong>Queued:</strong>
          9 days ago >
          <strong>Finished:</strong>
          9 days ago
        </p>
        <Hds::Table @caption="Example table">
          <:head as |H|>
            <H.Tr>
              <H.Th>Name</H.Th>
              <H.Th>Type</H.Th>
              <H.Th>Value</H.Th>
            </H.Tr>
          </:head>
          <:body as |B|>
            <B.Tr>
              <B.Td>Cell one A</B.Td>
              <B.Td>Cell two A</B.Td>
              <B.Td>Cell three A</B.Td>
            </B.Tr>
            <B.Tr>
              <B.Td>Cell one B</B.Td>
              <B.Td>Cell two B</B.Td>
              <B.Td>Cell three B</B.Td>
            </B.Tr>
          </:body>
        </Hds::Table>
      </:content>
    </A.Item>
  </Hds::Accordion>
```

With a link in the toggle block and a form in the content.

```handlebars
  <Hds::Accordion as |A|>
    <A.Item @containsInteractive={{true}} @isOpen={{true}}>
      <:toggle>
        <div class="hds-typography-body-300">
          Text inside a nested div with <a href="https://www.hashicorp.com/">a link</a>.
        </div>
      </:toggle>
      <:content>
        <p>
          <Hds::Form::TextInput::Field @type="email" as |F|>
            <F.Label>Email</F.Label>
          </Hds::Form::TextInput::Field>
        </p>
        <Hds::Button @text="Submit" />
      </:content>
    </A.Item>
  </Hds::Accordion>
```

With an Accordion in the content block.

```handlebars
  <Hds::Accordion @type="flush" as |A|>
    <A.Item @isOpen={{true}}>
      <:toggle>Item one</:toggle>
      <:content>
        <Hds::Accordion @type="flush" as |AA|>
          <AA.Item>
            <:toggle>Nested item one</:toggle>
            <:content>Neste content one</:content>
          </AA.Item>
          <AA.Item>
            <:toggle>Nested item two</:toggle>
            <:content>Neste content two</:content>
          </AA.Item>
        </Hds::Accordion>
      </:content>
    </A.Item>
  </Hds::Accordion>
```

### ariaLabel

The `ariaLabel` value is applied to the HTML button which controls visibility of the content block. The text does not display in the UI. The default value is "Toggle display" but you can set a custom value which is useful for translated text for example.

```handlebars
  <Hds::Accordion as |A|>
    <A.Item @ariaLabel="Mostrar u ocultar">
      <:toggle>Elemento uno</:toggle>
      <:content>
        Contenido adicional para el elemento uno
      </:content>
    </A.Item>
  </Hds::Accordion>
```

### isOpen

Set `isOpen` to `true` on an `Accordion::Item` to display its associated content on page load instead of initially hiding it.

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

### isStatic

Set `isStatic` to `true` on an `Accordion::Item` to removes the ability to interact with the toggle.

```handlebars
  <Hds::Accordion as |A|>
    <A.Item>
      <:toggle>Item one</:toggle>
      <:content>
        Additional content for item one
      </:content>
    </A.Item>
    <A.Item @isStatic={{true}}>
      <:toggle>Item two</:toggle>
      <:content>
        Additional content for item two
      </:content>
    </A.Item>
  </Hds::Accordion>
```

### containsInteractive

By default, the `containsInteractive` property of the `Accordion::Item` is set to `false`, meaning that the entire `Accordion::Item` toggle block can be clicked to hide and show the associated content. If set to `true` only the chevron button of the `Accordion::Item` is clickable vs. the entire block. This allows you to add other interactive content inside the toggle block if desired.

```handlebars
<Hds::Accordion as |A|>
  <A.Item @containsInteractive={{true}}>
    <:toggle>
      <div class="doc-accordion-item-toggle-content-flex-layout">
        <Hds::Alert @type="compact" @color="success" as |A|>
          <A.Title>Title</A.Title>
          <A.Description>Plan finished <small>22 days ago</small></A.Description>
        </Hds::Alert>
        <Hds::Button @text="Details" @color="secondary" @size="small" />
      </div>
    </:toggle>
    <:content>
      Additional content for item one
    </:content>
  </A.Item>
  <A.Item @containsInteractive={{true}}>
    <:toggle>
      <div class="doc-accordion-item-toggle-content-flex-layout">
        <span>Peering connection log results</span>
        <Hds::Link::Standalone @icon="external-link" @iconPosition="trailing" @text="Details" @href="https://www.hashicorp.com/" />
      </div>
    </:toggle>
    <:content>
      Additional content for item two
    </:content>
  </A.Item>
</Hds::Accordion>
```
