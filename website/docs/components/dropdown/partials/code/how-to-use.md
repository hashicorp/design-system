#### Invocation

To make the invocation more intuitive for developers, we've provided contextual components for the toggles and list-item items. For example, `<Hds::Dropdown::ListItem::Separator />` is yielded in a hash under the key `<XX.Separator />` when invoked:

```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  &lt;dd.ToggleButton @text="..." /&gt;
  &lt;dd.Title @text="Lorem ipsum" /&gt;
  &lt;dd.Description @text="Lorem ipsum dolor sine qua non est." /&gt;
  &lt;dd.Interactive @href="..." @text="Add" /&gt;
  &lt;dd.Separator /&gt;
  &lt;dd.Interactive @route="components" @icon="trash" @text="Delete" @color="critical" /&gt;
&lt;/Hds::Dropdown&gt;
```

#### URLs and routes handling

The `Interactive` list item renders the correct element based on the passing of an `@route`, `@href`, or the addition of a click event (i.e., `{{on "click" myAction}}`).

_Notice: the `Interactive` list item component internally uses the generic `Hds::Interactive` component. For more details about how this low-level component works please refer to [its documentation page](/utilities/interactive/)._

##### Basic use

If you don't pass a `@href` or `@route` argument a simple `<button>` will be generated:

```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  ...
  &lt;dd.Interactive {{on "click" myAction}} @text="Run command" /&gt;
&lt;/Hds::Dropdown&gt;
```

_Notice: in this case you will have to add your own event handling function to it._

##### With @href

If you pass a `@href` argument a `<a>` link will be generated:

```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  ...
  &lt;dd.Interactive @href="https://www.hashicorp.com/request-demo/terraform" @text="Request a demo" /&gt;
&lt;/Hds::Dropdown&gt;
```

**Important**: when using the `@href` argument the component adds by default the attributes `target="_blank"` and `rel="noopener noreferrer"` to the `<a>` element (because this is the most common use case: internal links are generally handled using a `@route` argument). If the `href` points to an internal link, or uses a different protocol (eg. "mailto" of "ftp") you can pass `@isHrefExternal={{true}}` to the component and it will not add the `target` and `rel` attributes (but you can pass yours if needed, using the `...attributes` spreading. For more details see the [Hds::Interactive component](/utilities/interactive/).

##### With @route

If you pass a `@route` argument a `<a>` link will be generated using a `<LinkTo>` Ember component:

```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  ...
  &lt;dd.Interactive @route="my.page.route" @model="my.page.model" @text="Activate cluster" /&gt;
&lt;/Hds::Dropdown&gt;
```

**Important**: if the route is external to your current engine you have to pass also `@isRouteExternal={{true}}` to the component so that it will use `<LinkToExternal>` instead of a simple `<LinkTo>` for the `@route`. For more details see the [Hds::Interactive component](/utilities/interactive/)

_Notice: all the standard arguments for the `<LinkTo/LinkToExternal>` components are supported (eg. `models/model/query/current-when/replace`)._

#### Examples

##### ToggleButton + ListItem, Separator

This example demonstrates the use of a dropdown with a toggle-button, links, a separator and a link (color, critical):

```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  &lt;dd.ToggleButton @text="Text Toggle" /&gt;
  &lt;dd.Interactive @route="components" @text="Item One" /&gt;
  &lt;dd.Interactive @route="components" @text="Item Two" /&gt;
  &lt;dd.Interactive @route="components" @text="Item Three" /&gt;
  &lt;dd.Interactive @text="Item Four (closes on click)" {{on "click" dd.close}} /&gt;
  &lt;dd.Separator /&gt;
  &lt;dd.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" /&gt;
&lt;/Hds::Dropdown&gt;
```

Rendered (positioned to the right):

##### ToggleButton + Title, Description, CopyItem, Separator

This example demonstrates the use of a dropdown with a toggle-button (color, secondary), title, description, a generic (which is yielding a Link::Standalone component), copy-item, a separator and a link (color, critical):

To indicate that a secondary button style should be used for the "button" toggle, add `@color="secondary"`. If no `@color` is declared, `primary` will be used by default.

{{! template-lint-disable no-whitespace-for-layout }}

```handlebars
&lt;Hds::Dropdown as |dd| &gt;
  &lt;dd.ToggleButton @text="Integrate with Terraform Cloud" @color="secondary" /&gt;
  &lt;dd.Title @text="Integrate with Terraform Cloud" /&gt;
  &lt;dd.Description @text="Create a new run task in Terraform using the URL and key below." /&gt;
  &lt;dd.Generic&gt;
    &lt;Hds::Link::Standalone @text="Watch tutorial video" @icon="film" href="/" /&gt;
  &lt;/dd.Generic&gt;
  &lt;dd.CopyItem @text="https://api.cloud.hashicorp.com" @copyItemTitle="Endpoint URL" /&gt;
  &lt;dd.CopyItem @text="91ee1e8ef65b337f0e70d793f456c71d" @copyItemTitle="HMAC Key" /&gt;
&lt;/Hds::Dropdown&gt;
```

Rendered as secondary variation (positioned to the right):

_Notice: when using the "generic" list item the developer is completely responsible for any element yielded, including the accessibility of that element, as well as the layout of the content (we provide only the horizontal padding for consistency with the other items)._

##### ToggleIcon for "overflow" dropdown menus

Example: an "overflow" toggle for use only in a table element (per design). The dropdown has default and destructive (critical) links. This is the only use case where it is acceptable to use `@hasChevron={{false}}`.

Note that `toggleText` is still required, because it supplies the `aria-label` for the toggle button.

```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  &lt;dd.ToggleIcon @icon="more-horizontal" @text="Overflow Options" @hasChevron={{false}} /&gt;
  &lt;dd.Interactive @route="components" @text="Create" /&gt;
  &lt;dd.Interactive @route="components" @text="Read" /&gt;
  &lt;dd.Interactive @route="components" @text="Update" /&gt;
  &lt;dd.Separator /&gt;
  &lt;dd.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" /&gt;
&lt;/Hds::Dropdown&gt;
```

Rendered in a table cell:

Column A

Column B

Column C

Row 1, cell 1

Row 1, cell 2

Row 2, cell 1

Row 2, cell 2

Row 3, cell 1

Row 3, cell 2

Row 4, cell 1

Row 4, cell 2

##### With a loading "interactive" item

Example: there may be use cases when it's necessary to put an item in a "loading" state while the app performs some operations (eg. checking asynchronously the user's permission to execute a certain operation, once the toggle has been clicked).

In that case the argument `@isLoading={{true}}` can be passed to the item: this will show a "loading" icon (even if an argument `@icon` is provided) and set the item as non-interactive until the value of `@isLoading` is set to `false` again.

```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  &lt;dd.ToggleIcon @icon="more-horizontal" @text="Overflow Options" @hasChevron={{false}} /&gt;
  &lt;dd.Interactive @route="components" @isLoading={{true}} @text="Edit cluster" @color="action" @icon="edit" /&gt;
  &lt;dd.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" /&gt;
&lt;/Hds::Dropdown&gt;
```

Rendered in a table cell:

ID

Status

Cluster ABC

Running

Cluster XYZ

Idle

##### ToggleIcon as user menu

In this example, we have a user icon with a title, description, separator, and links.

Note that `toggleText` is still required, because it supplies the `aria-label` for the toggle button.

```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  &lt;dd.ToggleIcon @icon="user" @text="user menu" /&gt;
  &lt;dd.Title @text="Signed In" /&gt;
  &lt;dd.Description @text="design-systems@hashicorp.com" /&gt;
  &lt;dd.Separator /&gt;
  &lt;dd.Interactive @route="components" @text="Settings and Preferences" /&gt;
  &lt;dd.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" /&gt;
&lt;/Hds::Dropdown&gt;
```

Rendered as a toggle/icon for a user menu (positioned to the right):

Here is a customized example to demonstrate how that would look like in dark mode (not supported by the design system yet):

##### ToggleIcon with other icons

In this example, we have a settings icon with a title, description, separator, and links.

Note that `toggleText` is still required, because it supplies the `aria-label` for the toggle button.

```handlebars
&lt;Hds::Dropdown as |dd|&gt;
  &lt;dd.ToggleIcon @icon="settings" @text="settings menu" /&gt;
  &lt;dd.Title @text="Signed In" /&gt;
  &lt;dd.Description @text="design-systems@hashicorp.com" /&gt;
  &lt;dd.Separator /&gt;
  &lt;dd.Interactive @route="components" @text="Settings and Preferences" /&gt;
  &lt;dd.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" /&gt;
&lt;/Hds::Dropdown&gt;
```

Rendered (positioned to the right):