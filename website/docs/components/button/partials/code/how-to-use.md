The button component is used to trigger an action or event. For accessibility, buttons should not be used to route to a URL.

#### Basic use

The most basic invocation requires text to be passed:

```handlebars
<Hds::Button @text="Copy to clipboard" />
```

Renders to:

#### Add an icon

To add an icon to your button, give the `@icon` a [Flight icon](https://flight-hashicorp.vercel.app/) name:

```handlebars
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" />
```

Renders to:

#### Icon position

By default, if you define an icon, it is placed before the text. If you would like to position the icon after the text, define `@iconPosition`:

```handlebars
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" @iconPosition="trailing" />
```

Renders to:

#### Icon-only button

If you would like to create an icon-only button, set `@isIconOnly` to `true`. Note that you still have to define the `@text` value; it will be used as the `aria-label` attribute value on the `button` element.

```handlebars
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" @isIconOnly={{true}} />
```

Renders to:

Note: If you need to add a tooltip to an icon-only button, here is an example of how to do it in an accessible way: [Accessible Button Tooltip Pattern](https://codepen.io/melsumner/pen/bGGdmMV).

#### Color

There are four available colors for a button: `primary`, `secondary`, `tertiary`, and `critical`. The default is `primary`. To use a different color, declare another value for `@color`:

```handlebars
<Hds::Button @text="Critical" @color="critical" />
```

Renders to:

  
  
  

#### Size

There are three sizes available for buttons: `small`, `medium` and `large`. The default is `medium`. To use a different size, declare a value for `@size`:

```handlebars
<Hds::Button @text="Large button" @size="large" />
```

Renders to (with icons):

  
  

#### Full-width

This allows indication that a button should take up the full-width of the parent container. It is set to `false` by default.

```handlebars
<Hds::Button @text="Copy to clipboard" @isFullWidth={{true}} />
```

Renders to:

#### Type

This is the native button attribute, `type`. There are three possible values: `button`, `submit`, and `reset`. The default `type` for the button is `submit`. To prevent a button from submitting a form, set `type` to `button`.

```handlebars
<Hds::Button @text="Submit" type="submit" />
```

_Notice: if you're passing a `@href` or a `@route` argument to the component, this will generate a `<a>` link, not a `<button>` (see below). In this case no `type` is needed._

#### Actions

Define the action in your route or controller, and add it to the component invocation in your template:

```handlebars
<Hds::Button @text="Copy to clipboard" {{on "click" this.copyToClipboard}} />
```

Read the Ember.js guides for more information: [Patterns for Actions](https://guides.emberjs.com/release/in-depth-topics/patterns-for-actions/) .

#### Links

You can generate a link with the visual appearence of a button passing a `@href` or a `@route` argument to the component.

_Notice: the `Hds::Button` component internally uses the generic `Hds::Interactive` component. For more details about how this low-level component works please refer to [its documentation page](/utilities/interactive/)._

##### With @href

If you pass a `@href` argument a `<a>` link will be generated:

```handlebars
<Hds::Button @text="Visit website" @icon="external-link" @iconPosition="trailing" @href="https://hashicorp.com" />
```

Renders to:

**Important**: when using the `@href` argument the component adds by default the attributes `target="_blank"` and `rel="noopener noreferrer"` to the `<a>` element (because this is the most common use case: internal links are generally handled using a `@route` argument). If the `href` points to an internal link, or uses a different protocol (eg. "mailto" of "ftp") you can pass `@isHrefExternal={{true}}` to the component and it will not add the `target` and `rel` attributes (but you can pass yours if needed, using the `...attributes` spreading. For more details see the [Hds::Interactive component](/utilities/interactive/).

**Important**: if a `href` HTML attribute is used instead of the `@href` Ember argument we apply this visual treatment to alert the developer:

##### With @route

If you pass a `@route` argument a `<a>` link will be generated using a `<LinkTo>` Ember component:

```handlebars
<Hds::Button @text="Back to homepage" @icon="arrow-left" @route="index" />
```

Renders to:

**Important**: if the route is external to your current engine you have to pass also `@isRouteExternal={{true}}` to the component so that it will use `<LinkToExternal>` instead of a simple `<LinkTo>` for the `@route`. For more details see the [Hds::Interactive component](/utilities/interactive/).

_Notice: all the standard arguments for the `<LinkTo/LinkToExternal>` components are supported (eg. `models/model/query/current-when/replace`)._

#### Disabled buttons

To disable a button, manually add the native `disabled` attribute:

```handlebars
<Hds::Button @text="Copy to clipboard" disabled />
```

Renders to:

_Notice: since a `<a>` link can't be disabled, if you're passing a `@href` or a `@route` argument to the component you will need to take care of intercepting the events in case you want to disable it._