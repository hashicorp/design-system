The button component is used to trigger an action or event. They should not be used to route to a URL. This component supports `...attributes`.

### Basic Use

The most basic invocation requires text to be passed:

```hbs
<Hds::Button @text="Copy to Clipboard" />
```

Renders to:
<Hds::Button @text="Copy to Clipboard" />

### Add an Icon

To add an icon to your button, give the `@icon` a [Flight Icon](https://flight-hashicorp.vercel.app/) name:

```hbs
<Hds::Button @text="Copy to Clipboard" @icon="clipboard-copy" />
```

Renders to:
<Hds::Button @text="Copy to Clipboard" @icon="clipboard-copy" />

### Position Icon

By default, if you define an icon, it is placed before the text. If you would like to position the icon after the text, define `@iconPos`:

```hbs
<Hds::Button @text="Copy to Clipboard" @icon="clipboard-copy" @iconPos="trailing" />
```

Renders to:
<Hds::Button @text="Copy to Clipboard" @icon="clipboard-copy" @iconPos="trailing" />

### Icon-only Button

If you would like to create an icon-only button, set `@isIconOnly` to `true`. Note that you still have to define the `@text` value; it will be used as the `aria-label` attribute value on the `button` element.

```hbs
<Hds::Button @text="Copy to Clipboard" @icon="clipboard-copy" @isIconOnly={{true}} />
```

Renders to:
<Hds::Button @text="Copy to Clipboard" @icon="clipboard-copy" @isIconOnly={{true}} />

### Color

There are four available colors for a button: primary, secondary, and destructive. The default is primary. To use a different color, declare another value for `@color`:

```hbs
<Hds::Button @text="Destructive" @color="destructive" />
```

<Hds::Button @text="Primary Action" />
<br/>
<Hds::Button @text="Secondary Action" @color="secondary" />
<br/>
<Hds::Button @text="Destructive Action" @color="destructive" />


### Size

There are three sizes available for buttons: small, medium and large. The default is medium. To use a different size, declare a value for `@size`:

```hbs
<Hds::Button @text="Large Button" @size="large" />
```

Renders to (with icons):
<Hds::Button @text="Small Button" @size="small" @icon="clipboard-copy" />
<br/>
<Hds::Button @text="Medium Button" @icon="clipboard-copy" />
<br/>
<Hds::Button @text="Large Button" @size="large" @icon="clipboard-copy" />

### Type

This is the native button attribute, `type`. There are three possible values: button, submit, and reset. If the button is used inside of a form, its type should be submit. The default for the button type is button. To use a different value, declare a different value for `@type`:

```hbs
<Hds::Button @text="Submit" @type="submit" />
```

### Disabled Buttons

This is the native button attribute, `disabled`. To use this attribute, set `@isDisabled` to `true`. The default is null, which means that the attribute will not render at all in the DOM.

```hbs
<Hds::Button @text="Copy to Clipboard" @isDisabled=true />
```

Renders to:
<Hds::Button @text="Copy to Clipboard" @isDisabled=true />

### Full-width Buttons

This allows indication that a button should take up the full-width of the parent container. It is set to false by default.

```hbs
<Hds::Button @text="Copy to Clipboard" @isFullWidth={{true}} />
```

Renders to:
<Hds::Button @text="Copy to Clipboard" @isFullWidth={{true}} />

### Actions

<!-- TODO add more explicit content here to make it as easy as possible -->

You can define the action that should be performed in your route, and add it to the component invocation in your template:

```hbs
@onSomeEvent={{this.takeSomeAction}}
```

Read the Ember.js guides for more information: [Patterns for Actions](https://guides.emberjs.com/release/in-depth-topics/patterns-for-actions/).
