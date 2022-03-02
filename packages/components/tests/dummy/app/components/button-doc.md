The button component is used to trigger an action or event. They should not be used to route to a URL. This component supports `...attributes`.

### Basic use

The most basic invocation requires text to be passed:

```hbs
<Hds::Button @text="Copy to clipboard" />
```

Renders to:
<Hds::Button @text="Copy to clipboard" />

### Add an icon

To add an icon to your button, give the `@icon` a [Flight Icon](https://flight-hashicorp.vercel.app/) name:

```hbs
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" />
```

Renders to:
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" />

### Icon position

By default, if you define an icon, it is placed before the text. If you would like to position the icon after the text, define `@iconPosition`:

```hbs
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" @iconPosition="trailing" />
```

Renders to:
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" @iconPosition="trailing" />

### Icon-only button

If you would like to create an icon-only button, set `@isIconOnly` to `true`. Note that you still have to define the `@text` value; it will be used as the `aria-label` attribute value on the `button` element.

```hbs
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" @isIconOnly={{true}} />
```

Renders to:
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" @isIconOnly={{true}} />

### Color

There are three available colors for a button: primary, secondary, and destructive. The default is primary. To use a different color, declare another value for `@color`:

```hbs
<Hds::Button @text="Destructive" @color="destructive" />
```

<Hds::Button @text="Primary action" />
<br/>
<Hds::Button @text="Secondary action" @color="secondary" />
<br/>
<Hds::Button @text="Destructive action" @color="destructive" />


### Size

There are three sizes available for buttons: small, medium and large. The default is medium. To use a different size, declare a value for `@size`:

```hbs
<Hds::Button @text="Large button" @size="large" />
```

Renders to (with icons):
<Hds::Button @text="Small button" @size="small" @icon="clipboard-copy" />
<br/>
<Hds::Button @text="Medium button" @icon="clipboard-copy" />
<br/>
<Hds::Button @text="Large button" @size="large" @icon="clipboard-copy" />

### Type

This is the native button attribute, `type`. There are three possible values: button, submit, and reset. If the button is used inside of a form, its type should be submit. The default for the button type is button. To use a different value, declare a different value for `@type`:

```hbs
<Hds::Button @text="Submit" @type="submit" />
```

### Disabled buttons

This is the native button attribute, `disabled`. To use this attribute, set `@isDisabled` to `true`. The default is null, which means that the attribute will not render at all in the DOM.

```hbs
<Hds::Button @text="Copy to clipboard" @isDisabled=true />
```

Renders to:
<Hds::Button @text="Copy to clipboard" @isDisabled=true />

### Full-width buttons

This allows indication that a button should take up the full-width of the parent container. It is set to false by default.

```hbs
<Hds::Button @text="Copy to clipboard" @isFullWidth={{true}} />
```

Renders to:
<Hds::Button @text="Copy to clipboard" @isFullWidth={{true}} />

### Actions

Define the action in your route or controller, and add it to the component invocation in your template:

```hbs
<Hds::Button @text="Copy to clipboard" {{on "click" this.copyToClipboard}} />
```

Read the Ember.js guides for more information: <a href="https://guides.emberjs.com/release/in-depth-topics/patterns-for-actions/" target="_blank" rel="noopener noreferer">Patterns for Actions</a>