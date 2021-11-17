The button component is used to trigger an action or event. They should not be used to route to a URL.

### Basic Use
The most basic invocation requires text to be passed:

```hbs
<Hds::Button @text="Toggle" />
```

### Add an Icon

To add an icon to your button, give the `@icon` a [Flight Icon]() name:

```hbs
<Hds::Button @text="Toggle" @icon="moon">
```

### Position Icon

By default, if you define an icon, it is placed before the text. If you would like to position the icon after the text, define `@iconPos`:

```hbs
<Hds::Button @text="Toggle" @icon="moon" @iconPos="trailing">
```

### Icon-only Button

If you would like to create an icon-only button, set `@isIconOnly` to `true`. Note that you still have to define the `@text` value; it will be used as the `aria-label` attribute value on the `button` element.

```hbs
<Hds::Button @text="Toggle" @icon="moon" @isIconOnly=true />
```

### Actions

You can define the action that should be performed in your route, and add it to the component invocation in your template:

```hbs
@onSomeEvent={{this.takeSomeAction}}
```

Read the Ember.js guides for more information: [Patterns for Actions](https://guides.emberjs.com/release/in-depth-topics/patterns-for-actions/).