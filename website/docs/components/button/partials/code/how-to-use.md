!!! Info

**Differences between Figma and code**

Due to differences in text rendering between Figma and web browsers, the `Button` Ember component uses `font-weight` 400 vs. the Figma component which uses `font-weight` 500.
!!!

## How to use this component

The basic invocation requires text to be passed:

```handlebars
<Hds::Button @text="Basic button" />
```

!!! Demo basic-button.hbs !!!

### Add an icon

To add an icon to your Button, give the `@icon` any [icon](/icons/library) name:

```handlebars
<Hds::Button @text="Create cluster" @icon="plus" />
```

### Icon position

By default, if you define an icon, it is placed in the leading position (before the text). If you need to position the icon in the trailing position (after the text), define `@iconPosition`:

```handlebars
<Hds::Button @text="Next step" @icon="arrow-right" @iconPosition="trailing" />
```

### Icon-only Button


If you would like to create an icon-only Button, set `@isIconOnly` to `true`. Note that you still have to define the `@text` value; it will be used as the `aria-label` attribute value on the `Button` element.

```handlebars
<Hds::Button @text="Create cluster" @icon="plus" @isIconOnly={{true}} />
```

### Color

There are four available colors for the Button: `primary`, `secondary`, `tertiary`, and `critical`. The default is `primary`. To use a different color, declare another value for `@color`:

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

There are three sizes available for the Button: `small`, `medium`, and `large`. The default is `medium`. To use a different size, declare a value for `@size`:

```handlebars
<Hds::Button @text="Small button" @size="small" />
```

```handlebars
<Hds::Button @text="Large button" @size="large" />
```

### Full-width

This indicates that the Button should take up the full-width of the parent container. It’s set to `false` by default.

```handlebars
<Hds::Button @text="Full width button" @isFullWidth={{true}} />
```

### Layout

To change the default `block` layout to `inline`, set `@isInline` to `true`. This can be useful in contexts where the Button needs to be <em>inline</em>, for example to inherit the alignment from a parent.

```handlebars
<div class="doc-button-mock-text-align-right">
  <Hds::Button @text="inline layout" @isInline={{true}} />
</div>
```

### Type

This is the native HTML button attribute, `type`. There are three possible values: `button`, `submit`, and `reset`. The default `type` for the Button is `button`. To submit form data to the server, set `type` to `submit`.

```handlebars
<Hds::Button @text="Submit" type="submit" />
```

### Actions

Define the action in your route or controller, and add it to the component invocation in your template:

Read the Ember.js guides for more information: [Patterns for Actions](https://guides.emberjs.com/release/in-depth-topics/patterns-for-actions/) .

```handlebars
<Hds::Button @text="Alert me" {{on "click" this.alertOnClick}} />
```

### Links

You can generate a link with the visual appearance of a button, by passing an `@href` or a `@route` argument to the component.

If you’re passing an `@href` or a `@route` argument to the component, this will generate an `<a>` link, not a `<button>`. In this case, no `type` is needed.

!!! Insight

**Code tip**

The `Hds::Button` component uses the generic `Hds::Interactive` component. For more details about how this utility component works, please refer to [its documentation page](/utilities/interactive).

!!!

#### With @href

If you pass an `@href` argument, an `<a>` link will be generated.

By default, the link is considered "external", which means that the `target=“_blank”` and `rel=“noopener noreferrer”` attributes are applied to the `<a>` element. This is the most common case, as internal links are generally handled using a `@route` argument.

```handlebars
<Hds::Button @text="Visit website" @icon="external-link" @iconPosition="trailing" @href="https://hashicorp.com" />
```

If the `@href` points to an internal link, or uses a different protocol (e.g., "mailto" or "ftp"), pass `@isHrefExternal={{false}}` to the component and it will omit the `target` and `rel` attributes.

#### With @route

If you pass a `@route` argument, an `<a>` link will be generated using a `<LinkTo>` Ember component. All of the standard arguments for the `<LinkTo/LinkToExternal>` components are supported (eg. `models/model/query/current-when/replace`).

If the route is external to your current engine, you have to pass `@isRouteExternal={{true}}` so it will use `<LinkToExternal>` instead of `<LinkTo>` for the `@route`. For more details, see the [Hds::Interactive component](/utilities/interactive).

```handlebars
<Hds::Button @text="Back to homepage" @icon="arrow-left" @route="index" />
```

### Loading state

If the button needs to toggle between an "idle" and a "loading" state, we suggest applying a width to it (via inline style or CSS class) to prevent the button from resizing on click (and potentially causing layout shifts).

```handlebars
<Hds::Button
  {{style width="7.5rem"}}
  @icon={{if this.isLoading "loading"}}
  @text={{if this.isLoading "Loading" "Save"}}
  {{on "click" this.toggleIsLoading}}
/>
```

We suggest limiting the application of this override only to this specific use case and letting the button resize accordingly to its content.

### Disabled Buttons

!!! Warning

**Accessibility alert**

Links cannot use the `disabled` attribute (per HTML specification); even if you were to intercept the event, they are still subject to color-contrast conformance requirements.
!!!

To disable a Button, manually add the native `disabled` attribute:

```handlebars
<Hds::Button @text="Alert me" disabled {{on "click" this.alertOnClick}} />
```
