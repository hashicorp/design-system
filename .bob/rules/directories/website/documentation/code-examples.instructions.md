---
applyTo: "website/docs/components/**/code/code-snippets, website/docs/components/**/code/how-to-use.md"
description: "Guidelines for component code examples documentation"
---

# Component code examples documentation

## Markdown file

`code/how-to-use.md` contains all of the content for code guidance on how to use a component including code examples, rules to follow, and available variants.

### Content guidelines

- Start each guide with an introductory summary of the intention of the component, and a code example with basic usage
- Include code examples for all arguments, including event handlers
- Include code examples for all variants for given properties.
  - Ex: A code example with all color values for a `@color` argument

### Formatting rules
- Code values such as component names, arguments, provided values should be formatted with `` tick marks
- Code values nomenclature
  - `ComponentName`
  - `[A].ContextualComponentName`
  - `@argument`
  - `html-attribute`
  - `<html-element>`
  - `:named-block`
- Code snippets must be shown with the format `[[code-snippets/file-name]]`

### Example template

```md
## How to use this component

<!-- Component summary -->

### Variant 1

<!-- Explanation of variant -->

[[code-snippets/variant-1]]

### Variant 2

<!-- Explanation of variant -->

[[code-snippets/variant-2]]

### Event handling

<!-- Explanation of event handling -->

[[code-snippets/event-handling]]
```

### Code snippet integration

To use a code snippet from `code/code-snippets` in the markdown file, you MUST use the following formatting.

```md
[[code-snippets/file-name]]
```

`file-name` must match exactly the file name of the snippet you are trying to use.

Additional parameters such as `execute=false` can be added.

```md
[[code-snippets/file-name execute=false]]
```

## Code snippets

In the `code/code-snippets` folder there are component files which can be used inside `code/how-to-use.md` to show interactive demos of components.

### Important rules
If the following rules are not followed, the code snippet will not be displayed.
- All file names for a snippet must be the same
- `hbs` and `gts` files are required for every snippet

### File structure

- `snippet-name.classic.hbs`
- `snippet-name.classic.js` (Optional)
- `snippet-name.gts`

### Example templates

`hbs` file
```hbs
<Hds::Component::Name
  {{on "click" this.toggleDemoState}}
>
  Lorem ipsum
</Hds::Component::Name>
```

`js` file
```js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked demoState = 'close';

  @action
  toggleDemoState() {
    this.demoState = this.demoState === 'open' ? 'close' : 'open';
  }
}
```

`gts` file
```gts
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import { HdsComponentName } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked demoState = 'close';

  toggleDemoState = () => {
    this.demoState = this.demoState === 'open' ? 'close' : 'open';
  };

  <template>
    <HdsComponentName
     {{on "click" this.toggleDemoState}}
    >
      Lorem ipsum
    </HdsComponentName>
  </template>
}
```
