## How to use this component

The basic invocation requires `@value` to be passed.

```handlebars
<Hds::CodeBlock
  @value="let codeLang=`JavaScript`;
console.log(`I am ${codeLang} code`);"
/>
```

### Language

(TODO: fix, can't pass content containing single quotes, double quotes also seem to break it at times)

The `language` argument sets the syntax highlighting used. The default value is "javascript".


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
  @hasCopyButton={{true}}
  @value="let codeLang=`JavaScript`;
console.log(`I am ${codeLang} code`);"
/>
```

### Line numbers

Set `lineNumbers` to `true` to display a number for each line of code.

```handlebars
<Hds::CodeBlock
  @lineNumbers={{true}}
  @value="let codeLang=`JavaScript`;
console.log(`I am ${codeLang} code`);"
/>
```

### lineWrapping

(TODO: fix, feature not working)

By default, long lines of code will overflow the `CodeBlock` container requiring users to scroll to view the full content. Setting `lineWrapping` to `true` will wrap long lines of code instead.

```handlebars
<Hds::CodeBlock
  @lineWrapping={{true}}
  @value="console.log(`I am JavaScript code`, `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam`);"
/>
```

### Highlight

Highlight either individual code lines or a wrange of code lines. (Examples: "2, 4", "6-10")

```handlebars
<Hds::CodeBlock
  @readOnly={{false}}
  @value="TODO"
/>
```

### maxHeight

Code content uses `auto` height by default but you can opt to set a `maxHeight` value to save space. Vertical scrolling is enabled as part of this feature allowing users to vertical scroll to view overflowing content.

```handlebars
<Hds::CodeBlock
  @readOnly={{false}}
  @value="TODO"
/>
```

### readOnly

By default end-users are unable to edit the code within a `CodeBlock`. Setting this to `true` allows them to type to alter the content if they wish.

```handlebars
<Hds::CodeBlock
  @readOnly={{false}}
  @value="TODO"
/>
```
