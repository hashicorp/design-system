## How to use this component

The `Accordion` component is used to wrap and group one or more `Accordion::Item` child components. The Accordion items consist of “toggle” and “content” named blocks containing plain text or HTML content.

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
        <Hds::Form as |FORM|>
          <FORM.Section>
            <Hds::Form::TextInput::Field @type="email" as |F|>
              <F.Label>Email</F.Label>
            </Hds::Form::TextInput::Field>
          </FORM.Section>

          <FORM.Footer>
            <Hds::Button @text="Submit" />
          </FORM.Footer>
        </Hds::Form>
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
            <:content>Nested content one</:content>
          </AA.Item>
          <AA.Item>
            <:toggle>Nested item two</:toggle>
            <:content>Nested content two</:content>
          </AA.Item>
        </Hds::Accordion>
      </:content>
    </A.Item>
  </Hds::Accordion>
```

### Expand and collapse all

The `@forceState` argument enables you to implement expand/collapse all functionality by programmatically controlling the states of all items within a group. The `@forceState` argument may also be used at item level if further granularity is required.

```handlebars
  <div class="doc-accordion-flex-layout">
    <Hds::Text::Display @size="300">Examination period</Hds::Text::Display>
    <Hds::Button
      @text={{if (eq this.accordionState "open") "Collapse all" "Expand all"}}
      @icon={{if (eq this.accordionState "open") "unfold-close" "unfold-open"}}
      @color="tertiary" @size="small" {{on "click" this.toggleAccordionState}}
    />
  </div>
  <Hds::Accordion @forceState={{this.accordionState}} as |A|>
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
    <A.Item>
      <:toggle>Renewing your certification</:toggle>
      <:content>
        All HashiCorp Certifications are valid for two years, and you will be eligible to renew your certification starting 18 months after you earned your certification. To recertify, you will need to pass an exam at the same level or higher for the certification you are looking to renew. There are several pathways to recertification available, and you can learn more on our Knowledge Base or by heading to each exam’s homepage.        
      </:content>
    </A.Item>
    <A.Item>
      <:toggle>Finding certified practitioners</:toggle>
      <:content>
        HashiCorp publishes all earned badges to a publicly searchable directory on Credly. Here, you can filter and find people who hold HashiCorp Cloud Engineer certifications. Learn how to opt-out of this service in our Knowledgebase.
      </:content>
    </A.Item>
  </Hds::Accordion>
```

### Persist Item state

The `@forceState` argument can be used to programmatically control individual Accordion Items. For example, use `@onClickToggle` to respond to the user’s click, save the open/close state, then use `@forceState` to persist the state if the screen refreshes.

```handlebars
  <Hds::Accordion as |A|>
    <A.Item>
      <:toggle>Item one</:toggle>
      <:content>
        Additional content for item one
      </:content>
    </A.Item>
    <A.Item
      @onClickToggle={{this.onItemToggle}} 
      @forceState={{this.itemState}}
    >
      <:toggle>Item two</:toggle>
      <:content>
        Item open on page load. Click to close then refresh the window. 
        The Item will remember its state and remain closed.
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

#### JavaScript code

```javascript{data-execute=false}
<Hds::Form>
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
</Hds::Form>
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
