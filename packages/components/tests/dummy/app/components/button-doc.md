The button component is used to trigger an action or event. They should not be used to route to a URL. This component supports `...attributes`, giving you the flexibility you need.

### Basic Use

The most basic invocation requires text to be passed:

```hbs
<Hds::Button @text="Toggle" />
```

Renders to:

<div>
  <Hds::Button @text="Toggle" />
</div>

### Add an Icon

To add an icon to your button, give the `@icon` a [Flight Icon](https://flight-hashicorp.vercel.app/) name:

```hbs
<Hds::Button @text="Toggle" @icon="moon" />
```

Renders to:

<div>
  <Hds::Button @text="Toggle" @icon="moon" />
</div>

### Position Icon

By default, if you define an icon, it is placed before the text. If you would like to position the icon after the text, define `@iconPos`:

```hbs
<Hds::Button @text="Toggle" @icon="moon" @iconPos="trailing" />
```

Renders to:

<div>
  <Hds::Button @text="Toggle" @icon="moon" @iconPos="trailing" />
</div>

### Icon-only Button

If you would like to create an icon-only button, set `@isIconOnly` to `true`. Note that you still have to define the `@text` value; it will be used as the `aria-label` attribute value on the `button` element.

```hbs
<Hds::Button @text="Toggle" @icon="moon" @isIconOnly=true />
```

Renders to:

<div>
  <Hds::Button @text="Toggle" @icon="moon" @isIconOnly=true />
</div>

### Actions

You can define the action that should be performed in your route, and add it to the component invocation in your template:

```hbs
@onSomeEvent={{this.takeSomeAction}}
```

Read the Ember.js guides for more information: [Patterns for Actions](https://guides.emberjs.com/release/in-depth-topics/patterns-for-actions/).