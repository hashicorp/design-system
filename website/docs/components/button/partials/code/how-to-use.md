The button component is used to trigger an action or event. For accessibility, buttons should not be used to route to a URL; use a [Link](/components/link/standalone) instead.

## How to use this component

The basic invocation requires text to be passed:

```handlebars
<Hds::Button @text="Copy to clipboard" />
```

### Add an icon

To add an icon to your button, give the `@icon` any [Helios icon](/foundations/icons/library) name:

```handlebars
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" />
```

### Icon position

By default, if you define an icon, it is placed in the leading position (before the text). If you need to position the icon in the trailing position (after the text), define `@iconPosition`:

```handlebars
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" @iconPosition="trailing" />
```

### Icon-only button

!!! Info

To add a tooltip to an icon-only button, here’s an example of how to do it in an accessible way: [Accessible Button Tooltip Pattern](https://codepen.io/melsumner/pen/bGGdmMV).
!!!

If you would like to create an icon-only button, set `@isIconOnly` to `true`. Note that you still have to define the `@text` value; it will be used as the `aria-label` attribute value on the `button` element.

```handlebars
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" @isIconOnly={{true}} />
```

### Color

There are four available colors for a button: `primary`, `secondary`, `tertiary`, and `critical`. The default is `primary`. To use a different color, declare another value for `@color`:

```handlebars
<Hds::Button @text="Secondary" @color="secondary" />
```

```handlebars
<Hds::Button @text="Tertiary" @color="tertiary" @icon="bulb" />
```

```handlebars
<Hds::Button @text="Critical" @color="critical" />
```

### Size

There are three sizes available for buttons: `small`, `medium` and `large`. The default is `medium`. To use a different size, declare a value for `@size`:

```handlebars
<Hds::Button @text="Small button" @size="small" />
```

```handlebars
<Hds::Button @text="Large button" @size="large" />
```

### Full-width

This allows indication that a button should take up the full-width of the parent container. It’s set to `false` by default.

```handlebars
<Hds::Button @text="Copy to clipboard" @isFullWidth={{true}} />
```

### Type

This is the native button attribute, `type`. There are three possible values: `button`, `submit`, and `reset`. The default `type` for the button is `submit`. To prevent a button from submitting a form, set `type` to `button`.

```handlebars
<Hds::Button @text="Submit" type="submit" />
```

### Actions

Define the action in your route or controller, and add it to the component invocation in your template:

Read the Ember.js guides for more information: [Patterns for Actions](https://guides.emberjs.com/release/in-depth-topics/patterns-for-actions/) .

```handlebars
<Hds::Button @text="Copy to clipboard" {{on "click" this.copyToClipboard}} />
```

### Links

You can generate a link with the visual appearance of a button passing a `@href` or a `@route` argument to the component.

If you’re passing a `@href` or a `@route` argument to the component, this will generate a `<a>` link, not a `<button>`. In this case no `type` is needed.

!!! Info

The `Hds::Button` component uses the generic `Hds::Interactive` component. For more details about how this utility component works please refer to [its documentation page](/utilities/interactive/).
!!!

#### With @href

If you pass a `@href` argument a `<a>` link will be generated.

`target=“_blank”` and `rel=“noopener noreferrer”` attributes are applied by default. This is the most common case, as internal links are generally handled using a `@route` argument but can be overridden. If the `href` points to an internal link, or uses a different protocol (e.g., "mailto" of "ftp"), pass `@isHrefExternal={{true}}` and it will not add the `target` and `rel` attributes.

```handlebars
<Hds::Button @text="Visit website" @icon="external-link" @iconPosition="trailing" @href="https://hashicorp.com" />
```

#### With @route

If you pass a `@route` argument a `<a>` link will be generated using a `<LinkTo>` Ember component. All of the standard arguments for the `<LinkTo/LinkToExternal>` components are supported (eg. `models/model/query/current-when/replace`).

If the route is external to your current engine you have to pass `@isRouteExternal={{true}}` so it will use `<LinkToExternal>` instead of `<LinkTo>` for the `@route`. For more details see the [Hds::Interactive component](/utilities/interactive/).

```handlebars
<Hds::Button @text="Back to homepage" @icon="arrow-left" @route="index" />
```

### Disabled buttons

To disable a button, manually add the native `disabled` attribute:

!!! Info

If using a `@href` or `@route` and needing to disable the component, you’ll need to intercept the events since links can’t be disabled.
!!!

```handlebars
<Hds::Button @text="Copy to clipboard" disabled />
```