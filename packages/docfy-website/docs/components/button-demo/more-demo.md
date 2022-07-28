---
order: 2
---

# More complex example using `DocfyDemo`

This example is generated using `DocfyDemo` capability ([link to docs](https://docfy.dev/docs/ember/writing-demos)).

The most basic invocation requires text to be passed:

```hbs template
<Hds::Button @text='Copy to clipboard' />
<Hds::Button @text={{this.text}} />
```

```js component
import Component from '@glimmer/component';

export default class MyDemo extends Component {
  text = 'Hello world!';
}
```
