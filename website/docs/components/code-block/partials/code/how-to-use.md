## How to use this component

The basic invocation requires a `@value` argument. The component encodes this argument before displaying it.

!!! Info

If the `\n` escape sequence is used in the `@value` string in Handlebars, it will not be automatically converted to a newline, as it can have unexpected side effects.

!!!

```handlebars
<Hds::CodeBlock
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

!!! Insight

The default `@tag` is `"div"` because the correct value is dependent on the individual page. We strongly encourage consumers to update the `@tag` to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.

!!!

### Language

The `language` argument sets the syntax highlighting used. We only support the following languages: `bash`, `go`, `hcl`, `json`, `log`, `ruby`, `shell-session`, and `yaml`. If you need additional languages <LinkTo class="doc-link-generic" @route="show" @model="about/support">contact the Design Systems Team</LinkTo>

```handlebars
<Hds::CodeBlock
  @language="go"
  @value="package main
import fmt
func main() {
  fmt.Println(helloWorld)
}"
/>
```

### Copy button

Set `hasCopyButton` to `true` to display a button for users to copy `CodeBlock` content to their computer clipboard.

```handlebars
<Hds::CodeBlock
  @language="javascript"
  @hasCopyButton={{true}}
  @value="let codeLang=`JavaScript`;
console.log(`I am ${codeLang} code`);"
/>
```

### Line numbers

Line numbers are displayed by default. Set `hasLineNumbers` to `false` to hide them.

```handlebars
<Hds::CodeBlock
  @language="javascript"
  @hasLineNumbers={{false}}
  @value="let codeLang=`JavaScript`;
console.log(`I am ${codeLang} code`);"
/>
```

!!! Info

Due to technical limitations, if the `@value` changes dynamically the line numbers will fail to update.

!!!

### Line wrapping

By default, long lines of code will overflow the `CodeBlock` container requiring users to scroll to view the full content. Setting `hasLineWrapping` to `true` will wrap long lines of code instead.

```handlebars
<Hds::CodeBlock
  @language="javascript"
  @hasLineWrapping={{true}}
  @value="console.log(`I am JavaScript code`, `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam`);"
/>
```

### Highlight lines

Highlight either individual code lines or a range of code lines. (Examples: `2, 4`, `6-10`)

```handlebars
<Hds::CodeBlock
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

Code content uses `auto` height by default but you can opt to set a `maxHeight` value to save space. Vertical scrolling is enabled as part of this feature allowing users to scroll vertically to view the overflowing content.

```handlebars
<Hds::CodeBlock
  @language="javascript"
  @maxHeight="105px"
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
