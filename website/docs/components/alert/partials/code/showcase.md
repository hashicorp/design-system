## Showcase

!!! Info

The compact alert is borderless, but shown with a dotted border for clarity.
!!!

### Type
<Hds::Alert @type="page" as |A|>
  <A.Title>Page alert</A.Title>
  <A.Description>Lorem ipsum dolor sit amet.</A.Description>
</Hds::Alert>

<Hds::Alert @type="inline" as |A|>
  <A.Title>Inline alert</A.Title>
  <A.Description>Lorem ipsum dolor sit amet.</A.Description>
</Hds::Alert>

<Hds::Alert @type="compact" as |A|>
  <A.Description>Compact alert. Lorem ipsum dolor sit amet.</A.Description>
</Hds::Alert>

### Content

<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>A simple title</A.Title>
  <A.Description>A simple description text</A.Description>
</Hds::Alert>

<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>An alert with just a title and no description text.</A.Title>
</Hds::Alert>

<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Description>An alert with no title and just a description text</A.Description>
</Hds::Alert>

<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>An alert with a very long title and a long description text that should go on multiple lines</A.Title>
  <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque erat elit, lacinia at magna
    eget, porttitor lobortis nulla.</A.Description>
</Hds::Alert>

<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>An alert with a rich description (HTML)</A.Title>
  <A.Description>Using the
    <code>A.Description</code>
    contextual component it’s possible to have content that contains HTML tags, like
    <strong>strong text</strong>
    and
    <em>emphasized text</em>
    as well as
    <code>code</code>,
    <pre>pre</pre>
    and
    <a href="#">inline links</a>.</A.Description>
</Hds::Alert>

<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>Multiple lines of description using more than one `description` contextual component</A.Title>
  <A.Description>This is the first line of description, yielded to a
    <code>A.Description</code>
    contextual component.</A.Description>
  <A.Description>And this is the second line of description, yielded to another
    <code>A.Description</code>
    contextual component.</A.Description>
</Hds::Alert>

<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>An alert with extra/custom content</A.Title>
  <A.Description>In special cases, you can pass extra content to the alert using the
    <code>A.Generic</code>
    contextual component.</A.Description>
  <A.Generic>
    <Doc::Placeholder @text="some generic content" @height="50" @background="#eee" />
  </A.Generic>
</Hds::Alert>

### Color

<Hds::Alert @type="inline" as |A|>
  <A.Title>Neutral alert</A.Title>
  <A.Description>Lorem ipsum dolor sit amet.</A.Description>
</Hds::Alert>

<Hds::Alert @type="inline" @color="highlight" as |A|>
  <A.Title>Highlight alert</A.Title>
  <A.Description>Lorem ipsum dolor sit amet.</A.Description>
</Hds::Alert>

<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>Success alert</A.Title>
  <A.Description>Lorem ipsum dolor sit amet.</A.Description>
</Hds::Alert>

<Hds::Alert @type="inline" @color="warning" as |A|>
  <A.Title>Warning alert</A.Title>
  <A.Description>Lorem ipsum dolor sit amet.</A.Description>
</Hds::Alert>

<Hds::Alert @type="inline" @color="critical" as |A|>
  <A.Title>Critical alert</A.Title>
  <A.Description>Lorem ipsum dolor sit amet.</A.Description>
</Hds::Alert>

### Icons

<Hds::Alert @type="inline" @color="highlight" as |A|>
  <A.Title>Default icon</A.Title>
  <A.Description>Lorem ipsum dolor sit amet.</A.Description>
</Hds::Alert>

<Hds::Alert @type="inline" @color="highlight" @icon="meh" as |A|>
  <A.Title>With icon override</A.Title>
  <A.Description>Lorem ipsum dolor sit amet.</A.Description>
</Hds::Alert>

<Hds::Alert @type="inline" @color="highlight" @icon="running" as |A|>
  <A.Title>With animated icon</A.Title>
  <A.Description>Lorem ipsum dolor sit amet.</A.Description>
</Hds::Alert>

<Hds::Alert @type="inline" @color="highlight" @icon="" as |A|>
  <A.Title>Without icon</A.Title>
  <A.Description>Lorem ipsum dolor sit amet.</A.Description>
</Hds::Alert>

### Dismissal

<Hds::Alert @type="inline" @color="neutral" as |A|>
  <A.Title>Without the dismiss button (default)</A.Title>
  <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</A.Description>
</Hds::Alert>

<Hds::Alert
  @type="inline"
  @color="neutral"
  {{! TODO: understand if we can use a generic helper - see https://hashicorp.slack.com/archives/C11JCBJTW/p1648751235987409 }}
  @onDismiss={{this.noop}}
  as |A|
>
  <A.Title>With the dismiss button</A.Title>
  <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</A.Description>
</Hds::Alert>

<Hds::Alert @type="inline" @color="neutral" @icon="" @onDismiss={{this.noop}} as |A|>
  <A.Title>With the dismiss button and no icon</A.Title>
  <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</A.Description>
</Hds::Alert>

<Hds::Alert @type="inline" @color="neutral" @onDismiss={{this.noop}} as |A|>
  <A.Description>With the dismiss button and no title</A.Description>
</Hds::Alert>

### Actions

<Hds::Alert @type="inline" @color="warning" as |A|>
  <A.Title>Action passed as yielded component</A.Title>
  <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</A.Description>
  <A.Button @text="Action" @color="secondary" />
</Hds::Alert>

<Hds::Alert @type="inline" @color="warning" as |A|>
  <A.Title>With multiple actions passed as yielded components</A.Title>
  <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</A.Description>
  <A.Button @text="Secondary" @color="secondary" />
  <A.Button @icon="plus" @text="Tertiary" @color="tertiary" />
  <A.Link::Standalone @icon="plus" @text="Standalone" @href="#" @color="secondary" />
</Hds::Alert>

<Hds::Alert @type="inline" @color="warning" as |A|>
  <A.Title>With actions and custom content</A.Title>
  <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
    et dolore magna aliqua.</A.Description>
  <A.Button @text="Action" @color="secondary" />
  <A.Link::Standalone @icon="plus" @text="Action" @href="#" @color="secondary" />
  <A.Generic>
    <div class="dummy-alert-sample-custom-content-after-actions">This for example could be extra text, specific for
      a special use case.</div>
  </A.Generic>
</Hds::Alert>
