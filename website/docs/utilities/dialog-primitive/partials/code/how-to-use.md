The DialogPrimitive Wrapper is built on the HTML `<dialog>` element, and therefore supports the same API.

## How to use this component

The `DialogPrimitive` serves as the foundation for dialog derived components like the HDS `Modal` and `Flyout`. Unlike other HDS primitives, we recommended using `DialogPrimitive` components directly when you need to create a dialog with a custom layout. This is particularly useful for constructing non-modal dialogs that integrate into a page layout, rather than floating above it.

### Basic dialog using DialogPrimitive components

```handlebars
<Hds::DialogPrimitive::Wrapper open>
  <:header>
    <Hds::DialogPrimitive::Header 
      @icon="info" 
      @tagline="Tagline"
    >
      Title
    </Hds::DialogPrimitive::Header>
    <Hds::DialogPrimitive::Description>Description</Hds::DialogPrimitive::Description>
  </:header>
  <:body>
    <Hds::DialogPrimitive::Body>
      <p class="hds-typography-body-300 hds-foreground-primary">Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Libero culpa expedita assumenda at nisi minus unde fuga iure suscipit aut qui, odit
        natus eum voluptates ut molestiae! Perferendis, impedit qui? Lorem ipsum dolor sit amet?</p>
    </Hds::DialogPrimitive::Body>
  </:body>
  <:footer>
    <Hds::DialogPrimitive::Footer>
      <Hds::ButtonSet>
        <Hds::Button type="submit" @text="Primary" />
        <Hds::Button type="button" @text="Secondary" @color="secondary" />
      </Hds::ButtonSet>
    </Hds::DialogPrimitive::Footer>
  </:footer>
</Hds::DialogPrimitive::Wrapper>
```

### Overlay backdrop for use with modal dialogs

```handlebars
<div class="doc-utility-dialog-primitive-overlay-container">
  <Hds::DialogPrimitive::Overlay />
</div>
```
