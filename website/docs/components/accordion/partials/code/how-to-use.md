## How to use this component

The `Accordion` component is used to wrap and group one or more `Accordion::Item` child components. The Accordion items consist of “toggle” and “content” named blocks containing plain text or HTML content.

### Size

A different size of Accordion can be invoked using the `@size` argument.

[[demo: code-snippets/accordion-size.hbs]]

### Type

Use the `@type` argument to render a `flush` Accordion.

[[demo: code-snippets/accordion-type.hbs]]

### Complex HTML content

With an Alert component in the toggle block and an HTML table in the content block.

[[demo: code-snippets/accordion-html-content.hbs]]

With a link in the toggle block and a form in the content.

[[demo: code-snippets/accordion-contains-interactive.hbs]]

With an Accordion in the content block.

[[demo: code-snippets/accordion-nested.hbs]]

### Expand and collapse all

The `@forceState` argument enables you to implement expand/collapse all functionality by programmatically controlling the states of all items within a group. The `@forceState` argument may also be used at item level if further granularity is required.

[[demo: code-snippets/accordion-expand-all.hbs]]

### Persist Item state

The `@forceState` argument can be used to programmatically control individual Accordion Items. For example, use `@onClickToggle` to respond to the user’s click, save the open/close state, then use `@forceState` to persist the state if the screen refreshes.

[[demo: code-snippets/accordion-persist-state.hbs]]

#### JavaScript code

```javascript{data-execute=false}
  @tracked itemState;

  // Store Item state in session storage to persist across page reloads
  constructor(owner, args) {
    super(owner, args);
    this.itemState = sessionStorage.getItem(STORAGE_KEY) ?? 'open';
  }

  @action
  onItemToggle() {
    this.itemState = this.itemState === 'open' ? 'close' : 'open';
    sessionStorage.setItem(STORAGE_KEY, this.itemState);
  }
```

### Accessible name

The `ariaLabel` value is applied to the HTML button which controls visibility of the content block. The text does not display in the UI. The default value is "Toggle display" but you can set a custom value useful for translated text for example.

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

### Title tag

!!! Warning 

**Accessibility alert**

The default `@titleTag` is `"div"` because the correct value is dependent on the individual page. We strongly encourage consumers to update the `@titleTag` to the appropriate heading tag to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.
!!!

The `@titleTag` argument changes the HTML element that wraps the title block of each `Accordion::Item`. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if an Accordion is within a subsection of the page below a heading level 2, the value should be `"h3"`.

```handlebars
  <div class="doc-accordion-demo-heading">
    <Hds::Text::Display @tag="h2" @size="300">Examination period</Hds::Text::Display>
  </div>
  <Hds::Accordion @titleTag="h3" as |A|>
    <A.Item>
      <:toggle>Exam experience</:toggle>
      <:content>
        All certification exams are taken online with a live proctor, accommodating all locations and time zones. Online proctoring provides the same benefits of a physical test center while being more accessible to exam-takers. The live proctor verifies your identity, walks you through rules and procedures, and watches you take the exam. Learn more ways to prepare for an online proctored exam in our Knowledgebase.
      </:content>
    </A.Item>
    <A.Item>
      <:toggle>Requirements for attending an exam</:toggle>
      <:content>
        Before you register for an exam, review the Exam-taker Handbook to learn the requirements and policies for taking exams. It is your responsibility to know and abide by our program rules to successfully enter your exam appointment, failure to do so may result in forfeiture of appointment fees.        
      </:content>
    </A.Item>
    <A.Item>
      <:toggle>Your badge and certificate</:toggle>
      <:content>
        HashiCorp has partnered with Credly to offer you a digital badge and downloadable certificate upon passing a certification exam. There is no fee for this service and acceptance is up to you. Digital badges can be used in email signatures or digital resumes, and on social media sites such as LinkedIn, Facebook, and Twitter. Badges link back to a real-time verification feature that describes your qualifications.
      </:content>
    </A.Item>
  </Hds::Accordion>
```
### Open

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

### Static

Set `isStatic` to `true` on an `Accordion::Item` to remove the ability to interact with the toggle.

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

### Contains interactive

By default, the `containsInteractive` property of the `Accordion::Item` is set to `false`, meaning that the entire `Accordion::Item` toggle block can be clicked to hide and show the associated content. If set to `true`, only the chevron button of the `Accordion::Item` is clickable vs. the entire block. This allows you to add other interactive content inside the toggle block if desired.

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
