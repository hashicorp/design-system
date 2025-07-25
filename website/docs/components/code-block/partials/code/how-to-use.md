## How to use this component

To use this component, you must either include the yielded `Title` component, provide an `@ariaLabel`, or specify an `@ariaLabelledBy`.

The basic invocation requires a `@value` argument. The component encodes this argument before displaying it.

!!! Warning

**Code alert**

If the `\n` escape sequence is used in the `@value` string in Handlebars, it will not be automatically converted to a newline, as it can have unexpected side effects.
!!!

```handlebars
<Hds::CodeBlock
  @ariaLabel="basic usage"
  @value="aws ec2 --region us-west-1 accept-vpc-peering-connection"
/>
```

### Title and description

Optionally, you can pass a title and/or a description.

```handlebars
<Hds::CodeBlock
  @language="bash"
  @value="aws ec2 --region us-west-1 accept-vpc-peering-connection"
as |CB|>
  <CB.Title>
    CodeBlock title
  </CB.Title>
  <CB.Description>
    CodeBlock description
  </CB.Description>
</Hds::CodeBlock>
```

### Title tag

The `@tag` argument changes the HTML element that wraps the `[CB].Title` content. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if a CodeBlock is within a subsection of the page below a heading level 2, the value should be `"h3"`. 

!!! Warning

**Accessibility alert**

The default `@tag` is `"div"` because the correct value is dependent on the individual page. We strongly encourage consumers to update the `@tag` to the appropriate heading tag to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.
!!!

```handlebars
<div class="doc-code-block-demo-heading">
  <Hds::Text::Display @tag="h2" @size="300">Learn to write functions in JavaScript</Hds::Text::Display>
  <Hds::Text::Body @tag="p">Functions are a critical part of learning JavaScript. They are reusable chunks of code that can perform tasks like convert an object to an array.</Hds::Text::Body>
</div>
<Hds::CodeBlock
  @language="javascript"
  @value="function convertObjectToArray (obj) {
  let arr = Object
    .keys(obj)
    .map(key => {return [key, obj[key] ]})
    .flat()
    .sort()
  ;
  return arr;
}" as |CB|>
  <CB.Title @tag="h3">
    convertObjectToArray.js
  </CB.Title>
</Hds::CodeBlock>
```

### Language

The `language` argument sets the syntax highlighting used. We only support the following languages: `bash`, `go`, `hcl`, `json`, `log`, `ruby`, `shell-session`, and `yaml`. If you need additional languages <LinkTo class="doc-link-generic" @route="show" @model="about/support">contact the Design Systems Team</LinkTo>

```handlebars
<Hds::CodeBlock
  @ariaLabel="language"
  @language="go"
  @value="package main
import fmt
func main() {
  fmt.Println(helloWorld)
}"
/>
```

### Copy button

Set `hasCopyButton` to `true` to display a button for users to copy `CodeBlock` content to their computer clipboard. Use `copyButtonText` to provide a meaningful and unique label for the copy button. Set `onCopy` to a callback function that is invoked when the "copy" action succeeds.

```handlebars
<Hds::CodeBlock
  @ariaLabel="copy button"
  @language="javascript"
  @hasCopyButton={{true}}
  @copyButtonText="Copy javascript code"
  @value="let codeLang=`JavaScript`;
console.log(`I am ${codeLang} code`);"
/>
```

### Line numbers

Line numbers are displayed by default. Set `hasLineNumbers` to `false` to hide them.

```handlebars
<Hds::CodeBlock
  @ariaLabel="line numbers"
  @language="javascript"
  @hasLineNumbers={{false}}
  @value="let codeLang=`JavaScript`;
console.log(`I am ${codeLang} code`);"
/>
```

!!! Warning

**Code alert**

Due to technical limitations, if the `@value` changes dynamically the line numbers will fail to update.
!!!

### Line wrapping

By default, long lines of code will overflow the `CodeBlock` container requiring users to scroll to view the full content. Setting `hasLineWrapping` to `true` will wrap long lines of code instead.

```handlebars
<Hds::CodeBlock
  @ariaLabel="line wrapping"
  @language="javascript"
  @hasLineWrapping={{true}}
  @value="console.log(`I am JavaScript code`, `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam`);"
/>
```

### Highlight lines

Highlight either individual code lines or a range of code lines. (Examples: `2, 4`, `6-10`)

```handlebars
<Hds::CodeBlock
  @ariaLabel="line highlighting"
  @language="javascript"
  @highlightLines={{"2, 4"}}
  @value="import Application from `@ember/application`;
import Resolver from `ember-resolver`;
import loadInitializers from `ember-load-initializers`;
import config from `dummy/config/environment`;

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);"
/>
```

### Limit height

Code content uses `auto` height by default but you can opt to set a `maxHeight` value to save space. If the content height exceeds the set max height, vertical scrolling is enabled to view the overflowing content and a toggle button is displayed to expand the height and show the Code Block content in its entirety.

```handlebars
<Hds::CodeBlock
  @language="javascript"
  @maxHeight="130px"
  @value="import Application from `@ember/application`;
import Resolver from `ember-resolver`;
import loadInitializers from `ember-load-initializers`;
import config from `dummy/config/environment`;

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);"
as |CB|>
  <CB.Title>
    CodeBlock title
  </CB.Title>
  <CB.Description>
    CodeBlock description
  </CB.Description>
</Hds::CodeBlock>
```
