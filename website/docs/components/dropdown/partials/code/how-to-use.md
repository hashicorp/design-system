## How to use this component

To make the invocation more intuitive for developers, we’ve provided contextual components for toggles and list items. For example, `<Hds::Dropdown::ListItem::Separator />` is yielded in a hash, using the key `<XX.Separator />` when invoked:

```handlebars
<Hds::Dropdown as |dd|>
  <dd.ToggleButton @text="Menu" />
  <dd.Title @text="Title Text" />
  <dd.Description @text="Descriptive text goes here." />
  <dd.Interactive @href="#" @text="Add" />
  <dd.Interactive @href="#" @text="Add More" />
  <dd.Interactive @href="#" @text="Add Another Thing Too" />
  <dd.Separator />
  <dd.Interactive @route="components" @icon="trash" @text="Delete" @color="critical" />
</Hds::Dropdown>
```

### ListItem::Interactive

The `Interactive` list item renders the correct element based on the passing of an `@route`, `@href`, or the addition of a click event (i.e.,
`\{{on "click" this.myAction}}`).

Internally, the component uses the [Hds::Interactive](/utilities/interactive/) utility component.

#### Rendering a button

If you add an event handler (no `@href` or `@route`), a `<button>` element will be rendered:

```handlebars
{{!-- The Doc::ListContainer component is just to help the component render properly --}}
<Doc::ListContainer class="hds-dropdown-list">
  <Hds::Dropdown::ListItem::Interactive {{on "click" this.myAction}} @text="Run command" />
</Doc::ListContainer>
```

#### Rendering a link with `@href`

If you pass a `@href` argument, a link (`<a>` element) will be generated:

```handlebars
{{!-- The Doc::ListContainer component is just to help the component render properly --}}
<Doc::ListContainer class="hds-dropdown-list">
  <Hds::Dropdown::ListItem::Interactive @href="https://www.hashicorp.com/request-demo/terraform" @text="Request a demo" />
</Doc::ListContainer>
```

!!! Info

**Internal Link?**

When using the `@href` argument, you’re indicating an external link (instead of a route). So, a few relevant HTML attributes are added–`target="_blank"` and `rel="noopener noreferrer"`. However, if the `@href` really _does_ point to an internal link or uses a different protocol (e.g., `mailto` or `ftp`), pass `@isHrefExternal={{false}}` to the component and it will not add any extra HTML attributes.

!!!

#### Rendering a LinkTo (with `@route`)

If you pass a `@route`, Ember’s `<LinkTo>` will be used:

```handlebars
{{!-- The Doc::ListContainer component is just to help the component render properly --}}
<Doc::ListContainer class="hds-dropdown-list">
  <Hds::Dropdown::ListItem::Interactive @route="my.page.route" @model="my.page.model" @text="Activate cluster" />
</Doc::ListContainer>
```

If the route is external to your current engine, you must also pass `@isRouteExternal={{true}}` to the component so that it will use `<LinkToExternal>` instead of a `<LinkTo>`. For more details see the [Hds::Interactive component](/utilities/interactive/) documentation.

All the standard arguments for the `<LinkTo/LinkToExternal>` components are supported (eg. `models/model/query/current-when/replace`).

## Examples

### ToggleButton + ListItem, Separator

This example shows a dropdown with a toggle-button, links, a separator and a link (color, critical):

```handlebars
<Hds::Dropdown as |dd|>
  <dd.ToggleButton @text="Text Toggle" />
  <dd.Interactive @route="components" @text="Item One" />
  <dd.Interactive @route="components" @text="Item Two" />
  <dd.Interactive @route="components" @text="Item Three" />
  <dd.Interactive @text="Item Four (closes on click)" {{on "click" dd.close}} />
  <dd.Separator />
  <dd.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
</Hds::Dropdown>
```

Rendered (positioned to the right):

### ToggleButton + Title, Description, CopyItem, Separator

This example demonstrates the use of a dropdown with a toggle-button (color, secondary), title, description, a generic (which is yielding a Link::Standalone component), copy-item, a separator and a link (color, critical):

To indicate that a secondary button style should be used for the "button" toggle, add `@color="secondary"`. If no `@color` is declared, `primary` will be used by default.

```handlebars
<Hds::Dropdown as |dd| >
  <dd.ToggleButton @text="Integrate with Terraform Cloud" @color="secondary" />
  <dd.Title @text="Integrate with Terraform Cloud" />
  <dd.Description @text="Create a new run task in Terraform using the URL and key below." />
  <dd.Generic>
    <Hds::Link::Standalone @text="Watch tutorial video" @icon="film" href="/" />
  </dd.Generic>
  <dd.CopyItem @text="https://api.cloud.hashicorp.com" @copyItemTitle="Endpoint URL" />
  <dd.CopyItem @text="91ee1e8ef65b337f0e70d793f456c71d" @copyItemTitle="HMAC Key" />
</Hds::Dropdown>
```

!!! Info

**Generic**

When using the "generic" list item the developer is completely responsible for any element yielded, including the accessibility of that element, as well as the layout of the content (we provide only the horizontal padding for consistency with the other items).

!!!

### ToggleIcon for "overflow" dropdown menus

Example: an "overflow" toggle for use only in a table element (per design). The dropdown has default and destructive (critical) links. This is the only use case where it is acceptable to use
`@hasChevron={{false}}`.

Note that `toggleText` is still required–it provides the `aria-label` for the toggle button.

```handlebars
<Hds::Dropdown as |dd|>
  <dd.ToggleIcon @icon="more-horizontal" @text="Overflow Options" @hasChevron={{false}} />
  <dd.Interactive @route="components" @text="Create" />
  <dd.Interactive @route="components" @text="Read" />
  <dd.Interactive @route="components" @text="Update" />
  <dd.Separator />
  <dd.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
</Hds::Dropdown>
```

### With a loading "interactive" item

There may be use cases when it’s necessary to put an item in a "loading" state while the app performs some operations (e.g., checking asynchronously the user’s permission to execute a certain operation, once the toggle has been clicked).

In that case the argument `@isLoading={{true}}` can be passed to the item: this will show a "loading" icon (even if an argument `@icon` is provided) and set the item as non-interactive until the value of `@isLoading` is set to `false` again.

```handlebars
<Hds::Dropdown as |dd|>
  <dd.ToggleIcon @icon="more-horizontal" @text="Overflow Options" @hasChevron={{false}} />
  <dd.Interactive @route="components" @isLoading={{true}} @text="Edit cluster" @color="action" @icon="edit" />
  <dd.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
</Hds::Dropdown>
```

### ToggleIcon as user menu

In this example, we have a user icon with a title, description, separator, and links.

Note that `toggleText` is still required, because it supplies the `aria-label` for the toggle button.

```handlebars
<Hds::Dropdown as |dd|>
  <dd.ToggleIcon @icon="user" @text="user menu" />
  <dd.Title @text="Signed In" />
  <dd.Description @text="email@domain.com" />
  <dd.Separator />
  <dd.Interactive @route="components" @text="Settings and Preferences" />
  <dd.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
</Hds::Dropdown>
```

Rendered as a toggle/icon for a user menu (positioned to the right):

Here is a customized example to demonstrate how that would look like in dark mode (not supported by the design system yet):

#### ToggleIcon with other icons

In this example, we have a settings icon with a title, description, separator, and links.

Note that `toggleText` is still required, because it supplies the `aria-label` for the toggle button.

```handlebars
<Hds::Dropdown as |dd|>
  <dd.ToggleIcon @icon="settings" @text="settings menu" />
  <dd.Title @text="Signed In" />
  <dd.Description @text="email@domain.com" />
  <dd.Separator />
  <dd.Interactive @route="components" @text="Settings and Preferences" />
  <dd.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
</Hds::Dropdown>
```
