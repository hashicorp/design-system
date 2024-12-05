## How to use this component

The basic invocation doesn't require any arguments.

```handlebars
<Hds::CodeEditor />
```

### Title and description

Optionally, you can pass a title and/or a description.

```handlebars
<Hds::CodeEditor
  @language="sql"
  @value="SELECT * FROM TABLE"
as |CE|>
  <CE.Title>
    CodeEditor title
  </CE.Title>
  <CE.Description>
    CodeEditor description
  </CE.Description>
</Hds::CodeEditor>
```

### Title tag

The `@tag` argument changes the HTML element that wraps the `[CE].Title` content. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if a CodeEditor is within a subsection of the page below a heading level 2, the value should be `"h3"`. 

```handlebars
<div class="doc-code-block-demo-heading">
  <Hds::Text::Display @tag="h2" @size="300">Learn to write functions in JavaScript</Hds::Text::Display>
  <Hds::Text::Body @tag="p">Functions are a critical part of learning JavaScript. They are reusable chunks of code that can perform tasks like convert an object to an array.</Hds::Text::Body>
</div>
<Hds::CodeEditor
  @language="javascript"
  @value="function convertObjectToArray (obj) {
  let arr = Object
    .keys(obj)
    .map(key => {return [key, obj[key] ]})
    .flat()
    .sort()
  ;
  return arr;
}" as |CE|>
  <CE.Title @tag="h3">
    convertObjectToArray.js
  </CE.Title>
</Hds::CodeEditor>
```

!!! Insight

The default `@tag` is `"div"` because the correct value is dependent on the individual page. We strongly encourage consumers to update the `@tag` to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.

!!!

### Language

The `language` argument sets the syntax highlighting used. We only support the following languages: `javascript`, `json`, `sql`, and `go`. If you need additional languages <LinkTo class="doc-link-generic" @route="show" @model="about/support">contact the Design Systems Team</LinkTo>

```handlebars
<Hds::CodeEditor
  @language="go"
  @value="package main
import fmt
func main() {
  fmt.Println(helloWorld)
}"
/>
```

### Copy button

Set `hasCopyButton` to `true` to display a button for users to copy `CodeEditor` content to their computer clipboard.

```handlebars
<Hds::CodeEditor
  @language="javascript"
  @hasCopyButton={{true}}
  @value="let codeLang=`JavaScript`;
console.log(`I am ${codeLang} code`);"
/>
```
