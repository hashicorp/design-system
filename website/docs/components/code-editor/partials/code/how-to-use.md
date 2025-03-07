## How to use this component

The code editor is provided as both a `CodeEditor` component and as an `hds-code-editor` Ember [modifier](/components/code-editor?tab=code#ember-modifier). To use this component, you must either include the yielded `Title` component, provide an `@ariaLabel`, or specify an `@ariaLabelledBy`.


```handlebars
<Hds::CodeEditor @ariaLabel="Basic usage" />
```

### Ember modifier

An Ember modifier is available if your use case does not require a visible title, description, or any additional interactivity beyond editing code.

#### Modifier used on a `div`

```handlebars
<div {{hds-code-editor ariaLabel="Ember modifier usage"}} />
```

### Title and description

Optionally, you can pass a title and/or a description using the `[CE].Title` and `[CE].Description` components yielded by the Code Editor component.

```handlebars
<Hds::CodeEditor @value="Hello, world" as |CE|>
  <CE.Title>
    CodeEditor title
  </CE.Title>
  <CE.Description>
    CodeEditor description
  </CE.Description>
</Hds::CodeEditor>
```

### Title tag

The `@tag` argument changes the HTML element that wraps the `[CE].Title` content. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if a Code Editor is within a subsection of the page below a heading level 2, the value should be `"h3"`. 

```handlebars
<div class="doc-code-editor-demo-heading">
  <Hds::Text::Display @tag="h2" @size="300">Learn to write functions in Go</Hds::Text::Display>
  <Hds::Text::Body @tag="p">Functions are a critical part of learning Go. They are reusable chunks of code that can perform tasks like convert an object to an array.</Hds::Text::Body>
</div>
<Hds::CodeEditor
  @language="go"
  @value={{this.goCode}}
  as |CE|>
  <CE.Title @tag="h3">
    convertObjectToArray.js
  </CE.Title>
</Hds::CodeEditor>
```

!!! Insight

The default `@tag` is `"h2"`, however, the correct value is dependent on the individual page. We strongly encourage consumers to update the `@tag` to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.

!!!

### Language

The `language` argument sets the syntax highlighting used. We support the following languages: `rego`, `ruby`, `sentinel`, `shell`, `go`, `hcl`, `javascript`, `json`, `sql`, and `yaml`. If you need additional languages, <LinkTo class="doc-link-generic" @route="show" @model="about/support">contact the Design Systems Team</LinkTo>.

```handlebars
<Hds::CodeEditor
  @ariaLabel="language"
  @language="go"
  @value={{this.goCode}}
/>
```

### Copy button

Set `hasCopyButton` to `true` to display a button for users to copy Code Editor content to their computer clipboard. Use `copyButtonText` to provide a meaningful and unique label for the copy button.

```handlebars
<Hds::CodeEditor
  @ariaLabel="copy button"
  @hasCopyButton={{true}}
  @copyButtonText="Copy lorem ipsum code"
  @value={{this.loremIpsum}}
/>
```

### Full screen mode

Set `hasFullScreenButton` to `true` to display a button for users to toggle between a full screen view and normal placement within the page.

```handlebars
<Hds::CodeEditor @ariaLabel="full screen mode" @hasFullScreenButton={{true}} @value={{this.loremIpsum}} />
```

### Line wrapping

Set `hasLineWrapping` to `true` to enable line wrapping within the editor.

```handlebars
<Hds::CodeEditor @ariaLabel="line wrapping example" @hasLineWrapping={{true}} @value={{this.loremIpsum}} />
```