## How to use this component

The basic invocation requires `@value` to be passed.

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
    Acceptance instructions
  </CB.Title>
</Hds::CodeBlock>
```

```handlebars
<Hds::CodeBlock
  @language="bash"
  @value="export VAULT_ADDR=https://0242ac170030.aws.hcp.dev:8200;
export VAULT_NAMESPACE=admin"
as |CB|>
  <CB.Description>
    Export your cluster’s public URL and the default <a>namespace</a> called admin.
  </CB.Description>
</Hds::CodeBlock>
```

### Language

The `language` argument sets the syntax highlighting used. We only support a the following languaged: `bash`, `go`, `hcl`, `json`, `log`, `shell-session` and `yaml`. If you need additional languages <LinkTo class="doc-link-generic" @route="show" @model="about/support">contact the Design Systems Team</LinkTo>

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

Highlight either individual code lines or a range of code lines. (Examples: "2, 4", "6-10")

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
/>
```

### Editable content

By default, end-users are unable to edit the code within a `CodeBlock`. Setting this to `true` allows them to type to alter the content if they wish.

```handlebars
<Hds::CodeBlock
  @language="javascript"
  @contentEditable={{true}}
  @value="let codeLang=`JavaScript`;
console.log(`I am ${codeLang} code`);"
/>
```
