The DialogPrimitive Wrapper is built on the HTML `<dialog>` element, and therefore supports the same [JavaScript API](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog).

## How to use this component

The `DialogPrimitive` serves as the foundation for dialog derived components like the [Modal](/components/modal) and [Flyout](/components/flyout). Unlike other HDS primitives, we recommended using `DialogPrimitive` components directly when you need to create a dialog with a custom layout. This is particularly useful for constructing non-modal dialogs that integrate into a page layout, rather than floating above it.

### Basic dialog using DialogPrimitive components

```handlebars
<Hds::DialogPrimitive::Wrapper>
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

### Header title tag

The `@titleTag` argument changes the HTML element that wraps the `DialogPrimitive::Header` tagline and "title" content. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if the `DialogPrimitive` is used as a Split Window, the value should be `"h2"`. 

```handlebars
<div class="doc-dialog-primitive-grid-layout">
  <div class="doc-dialog-primitive-flex-layout">
    <Hds::Text::Display @tag="h1" @size="500">Page title</Hds::Text::Display>
    <Doc::Placeholder @text="Main content" @height="100%" @width="100%" @background="#eee" />
  </div>
  <Hds::DialogPrimitive::Wrapper class="doc-dialog-primitive-with-border">
    <:header>
      <Hds::DialogPrimitive::Header
        @icon="info"
        @tagline="Tagline"
        @titleTag="h2"
      >
        Split Window
      </Hds::DialogPrimitive::Header>
    </:header>
    <:body>
      <Hds::DialogPrimitive::Body>
       <Doc::Placeholder @text="Split Window content" @height="10rem" @width="100%" @background="#eee" />
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
</div>
```

!!! Insight

The default `@titleTag` is `"div"` because the correct value is dependent on the individual page. We strongly encourage consumers to update the `@titleTag` to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.

!!!
