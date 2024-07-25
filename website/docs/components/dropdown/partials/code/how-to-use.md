## How to use this component

To make the invocation more flexible and intuitive, we provide contextual components for Toggles, ListItems, Header and Footer. For example, `<Hds::Dropdown::ListItem::Separator />` would be contextually expressed as `<D.Separator />`.

```handlebars
<Hds::Dropdown as |D|>
  <D.ToggleButton @text="Menu" />
  <D.Title @text="Title Text" />
  <D.Description @text="Descriptive text goes here." />
  <D.Interactive @href="#" @text="Add" />
  <D.Interactive @href="#" @text="Add More" />
  <D.Interactive @href="#" @text="Add Another Thing Too" />
  <D.Separator />
  <D.Interactive @route="components" @icon="trash" @text="Delete" @color="critical" />
</Hds::Dropdown>
```

### ToggleButton

The basic invocation of ToggleButton requires `@text` to be passed. By default, it renders a primary button with a chevron icon.

```handlebars
<Hds::Dropdown as |D|>
  <D.ToggleButton @text="Text Toggle" />
  <D.Interactive @route="components" @text="Item One" />
  <D.Interactive @route="components" @text="Item Two" />
  <D.Interactive @route="components" @text="Item Three" />
  <D.Interactive @text="Item Four (closes on click)" {{on "click" D.close}} />
  <D.Separator />
  <D.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
</Hds::Dropdown>
```

Alternatively, pass `secondary` to `@color` to display a secondary button with a chevron icon.

```handlebars
<Hds::Dropdown as |D|>
  <D.ToggleButton @text="Text Toggle" @color="secondary" />
  <D.Interactive @route="components" @text="Item One" />
  <D.Interactive @route="components" @text="Item Two" />
  <D.Interactive @route="components" @text="Item Three" />
  <D.Interactive @text="Item Four (closes on click)" {{on "click" D.close}} />
  <D.Separator />
  <D.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
</Hds::Dropdown>
```

### ToggleIcon

#### ToggleIcon as overflow menu

Overflow menus are often found in the last column of a [Tables](/components/table). This is the only use case where it is acceptable to use
`@hasChevron={{false}}`. `@text` is still required, because it supplies the `aria-label` for ToggleIcon.

```handlebars
<Hds::Dropdown as |D|>
  <D.ToggleIcon @icon="more-horizontal" @text="Overflow Options" @hasChevron={{false}} />
  <D.Interactive @route="components" @text="Create" />
  <D.Interactive @route="components" @text="Read" />
  <D.Interactive @route="components" @text="Update" />
  <D.Separator />
  <D.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
</Hds::Dropdown>
```

#### ToggleIcon as user menu

`@text` is still required, because it supplies the `aria-label` for ToggleIcon.

```handlebars
<Hds::Dropdown as |D|>
  <D.ToggleIcon @icon="user" @text="user menu" />
  <D.Title @text="Signed In" />
  <D.Description @text="email@domain.com" />
  <D.Separator />
  <D.Interactive @route="components" @text="Settings and Preferences" />
  <D.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
</Hds::Dropdown>
```

#### ToggleIcon with other icons

Pass any [icon](/icons/library) name to `@icon` to change the icon used in ToggleIcon. `@text` is still required, because it supplies the `aria-label` for ToggleIcon.

```handlebars
<Hds::Dropdown as |D|>
  <D.ToggleIcon @icon="settings" @text="settings menu" />
  <D.Title @text="Signed In" />
  <D.Description @text="email@domain.com" />
  <D.Separator />
  <D.Interactive @route="components" @text="Settings and Preferences" />
  <D.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
</Hds::Dropdown>
```

### List placement

By default, the list is positioned below the button, aligned to the right. To change the list position pass `bottom-left`, `top-left`, or `top-right` to `@listPosition` on the Dropdown component.

```handlebars
<Hds::Dropdown @listPosition="bottom-left" as |D|>
  <D.ToggleButton @text="Text Toggle" />
  <D.Interactive @route="components" @text="Item One" />
  <D.Interactive @route="components" @text="Item Two" />
  <D.Interactive @route="components" @text="Item Three" />
  <D.Interactive @text="Item Four (closes on click)" {{on "click" D.close}} />
  <D.Separator />
  <D.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
</Hds::Dropdown>
```

In contexts where the Dropdown needs to be _inline_, to inherit the alignment from a parent, you can use the `@isInline` argument (and set the `@listPosition` accordingly to your needs):

```handlebars
<div class="doc-dropdown-mock-text-align-right">
  <Hds::Dropdown @isInline={{true}} @listPosition="bottom-right" as |D|>
    <D.ToggleButton @text="Text Toggle" @color="secondary" />
    <D.Interactive @route="components" @text="Item One" />
    <D.Interactive @route="components" @text="Item Two" />
    <D.Interactive @route="components" @text="Item Three" />
  </Hds::Dropdown>
</div>
```

### List size

You can explicitly control the height or width of a list. Any acceptable value (px, rem, em) can be declared:

!!! Info

The `@height` argument actually sets a `max-height` which prevents the list from growing past a certain height.

!!!

```handlebars
<Hds::Dropdown @isInline={{true}} @height="170px" @width="250px" as |D|>
  <D.ToggleButton @text="Text Toggle" />
  <D.Interactive @route="components" @text="Item One" />
  <D.Interactive @route="components" @text="Item Two" />
  <D.Interactive @route="components" @text="Item Three" />
  <D.Interactive @route="components" @text="Item Four" />
  <D.Interactive @route="components" @text="Item Five" />
  <D.Interactive @route="components" @text="Item Six" />
  <D.Interactive @route="components" @text="Item Seven" />
</Hds::Dropdown>
```

### List footer

It is possible that you may want to add a list footer for things like a set of buttons for a filter control:

```handlebars
<Hds::Dropdown @height="284px" as |D|>
  <D.ToggleButton @icon="tag" @text="Tags" @color="secondary" />
  <D.Checkbox>access</D.Checkbox>
  <D.Checkbox>homework</D.Checkbox>
  <D.Checkbox>discovery</D.Checkbox>
  <D.Checkbox>memories</D.Checkbox>
  <D.Checkbox>music</D.Checkbox>
  <D.Checkbox>pharell</D.Checkbox>
  <D.Checkbox>punk</D.Checkbox>
  <D.Checkbox>random</D.Checkbox>
  <D.Checkbox>robots</D.Checkbox>
  <D.Checkbox>tag</D.Checkbox>
  <D.Footer @hasDivider={{true}}>
    <Hds::ButtonSet>
      <Hds::Button @text="Apply filters" @isFullWidth={{true}} @size="small" />
      <Hds::Button @text="Cancel" @color="secondary" @size="small" />
    </Hds::ButtonSet>
  </D.Footer>
</Hds::Dropdown>
```

### ListItem::Interactive

`ListItem::Interactive` renders the correct element based on the passing of a `@route`, `@href`, or the addition of a click event (e.g.,
`\{{on "click" this.myAction}}`). Internally, the component uses the [Hds::Interactive](/utilities/interactive) utility component.

#### Rendering a button

If you add an event handler (no `@href` or `@route`), a `<button>` element will be rendered:

```handlebars
<ul class="hds-dropdown__list">
  <Hds::Dropdown::ListItem::Interactive {{on "click" this.myAction}} @text="Run command" />
</ul>
```

You can pass an `@icon` argument to add a leading icon:

```handlebars
<ul class="hds-dropdown__list">
  <Hds::Dropdown::ListItem::Interactive {{on "click" this.myAction}} @text="Run command" @icon="build" />
</ul>
```

#### Rendering a link with `@href`

!!! Info

**Internal Link?**

When using the `@href` argument, you’re indicating an external link (instead of a route). So, a few relevant HTML attributes are added—`target="_blank"` and `rel="noopener noreferrer"`. However, if the `@href` really _does_ point to an internal link or uses a different protocol (e.g., `mailto` or `ftp`), pass `@isHrefExternal={{false}}` to the component and it will not add any extra HTML attributes.
!!!

If you pass an `@href` argument, a link (`<a>` element) will be generated:

```handlebars
<ul class="hds-dropdown__list">
  <Hds::Dropdown::ListItem::Interactive @href="https://www.hashicorp.com/request-demo/terraform" @text="Request a demo" />
</ul>
```

To indicate that the link points to an external resource, you can use `@trailingIcon` and assign it an icon name like `external-link`, `docs-link`, `guide-link`, or `learn-link`.

```handlebars
<ul class="hds-dropdown__list">
  <Hds::Dropdown::ListItem::Interactive @href="https://www.hashicorp.com/request-demo/terraform" @text="Request a demo" @trailingIcon="external-link" />
</ul>
```

#### Rendering a LinkTo (with `@route`)

Pass a `@route` to render Ember `<LinkTo>`. If the route is external to your current engine, pass `@isRouteExternal={{true}}` to use `<LinkToExternal>` instead of `<LinkTo>`. For more details see the [Hds::Interactive component](/utilities/interactive/) documentation. All the standard arguments for the `<LinkTo/LinkToExternal>` components are supported (e.g., `models/model/query/current-when/replace`).

```handlebars
<ul class="hds-dropdown__list">
  <Hds::Dropdown::ListItem::Interactive @route="my.page.route" @model="my.page.model" @text="Activate cluster" />
</ul>
```

#### With a loading “interactive” item

There may be use cases when it’s necessary to put an item in a “loading” state while the app performs some operations (e.g., asynchronously checking the user’s permissions to execute a certain operation once the Toggle’s been clicked).

Pass the argument `@isLoading={{true}}` to the item. This will show a “loading” icon (even if an argument `@icon` is provided) and sets the item as non-interactive until the value of `@isLoading` is set to `false` again.

```handlebars
<Hds::Dropdown as |D|>
  <D.ToggleIcon @icon="more-horizontal" @text="Overflow Options" @hasChevron={{false}} />
  <D.Interactive @route="components" @isLoading={{true}} @text="Edit cluster" @color="action" @icon="edit" />
  <D.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
</Hds::Dropdown>
```

### ListItem::CopyItem

To enable users to copy a snippet of code (eg. URLs, secrets, code blocks, etc.) use `ListItem::CopyItem`.

Using the `@isTruncated` argument it is possible to constrain the text to one-line and truncate it if it does not fit the available space. Please be aware there are [serious accessibility concerns](/components/copy/snippet?tab=accessibility) with using this feature.

```handlebars
<Hds::Dropdown as |D|>
  <D.ToggleButton @listPosition="bottom-left" @text="Create run task" @color="secondary" />
  <D.Title @text="Integrate with Terraform Cloud" />
  <D.Description @text="Create a new run task in Terraform using the URL and key below." />
  <D.CopyItem @text="https://api.cloud.hashicorp.com" @copyItemTitle="Endpoint URL" />
  <D.CopyItem @text="91ee1e8ef65b337f0e70d793f456c71d91ee1e8ef65b337f0e70d793f456c71d" @copyItemTitle="HMAC Key" />
  <D.CopyItem @isTruncated={{false}} @text="91ee1e8ef65b337f0e70d793f456c71d91ee1e8ef65b337f0e70d793f456c71d" @copyItemTitle="HMAC Key (without truncation)" />
</Hds::Dropdown>
```

Using the `@isTruncated` argument, it is possible to disable the truncation applied to the text. Care should be taken in choosing how to use this feature as there are [accessibility concerns](/components/copy/snippet?tab=accessibility).

### ListItem::Checkmark

For switching context (e.g., organization switchers, project switchers, etc.) use `ListItem::Checkmark`.

```handlebars
<Hds::Dropdown @listPosition="bottom-left" as |D|>
  <D.ToggleButton @text="HCP Design Sandbox" @color="secondary" />
  <D.Checkmark>ACME Org</D.Checkmark>
  <D.Checkmark @selected={{true}}>HCP Design Sandbox</D.Checkmark>
  <D.Footer @hasDivider={{true}}>
    <Hds::Link::Standalone @icon="list" @text="All Organizations" @color="secondary" @href="#" />
  </D.Footer>
</Hds::Dropdown>
```

### ListItem::Checkbox

For multi-selection within a form or larger filter pattern use `ListItem::Checkbox`.

```handlebars
<Hds::Dropdown @listPosition="bottom-left" as |D|>
  <D.ToggleButton @count="2" @text="Status" @color="secondary" />
  <D.Checkbox @count="4">Failing</D.Checkbox>
  <D.Checkbox @count="2" checked>Active</D.Checkbox>
  <D.Checkbox @count="1">Starting</D.Checkbox>
  <D.Checkbox @count="3" checked>Pending</D.Checkbox>
  <D.Footer @hasDivider={{true}}>
    <Hds::Button @text="Apply filters" @isFullWidth={{true}} @size="small" />
  </D.Footer>
</Hds::Dropdown>
```

### ListItem::Radio

For single selection within a form or larger filter pattern use `ListItem::Radio`.

```handlebars
<Hds::Dropdown @listPosition="bottom-left" as |D|>
  <D.ToggleButton @text="Status" @color="secondary" />
  <D.Radio name="status" @count="4">Failing</D.Radio>
  <D.Radio name="status" @count="2" checked>Active</D.Radio>
  <D.Radio name="status" @count="1">Starting</D.Radio>
  <D.Radio name="status" @count="3">Pending</D.Radio>
  <D.Footer @hasDivider={{true}}>
    <Hds::Button @text="Apply filters" @isFullWidth={{true}} @size="small" />
  </D.Footer>
</Hds::Dropdown>
```

### ListItem::Generic

!!! Info

When using the “generic” ListItem, the product team is responsible for implementing the layout and accessibility.
!!!

`ListItem::Generic` allows you to pass custom elements to the Dropdown.

```handlebars
<Hds::Dropdown @listPosition="bottom-left" as |D|>
  <D.ToggleButton @text="Text Toggle" @color="secondary" />
  <D.Title @text="Integrate with Terraform Cloud" />
  <D.Description @text="Create a new run task in Terraform using the URL and key below." />
  <D.Generic>
    <Hds::Link::Standalone @text="Watch tutorial video" @icon="film" @href="/" />
  </D.Generic>
</Hds::Dropdown>
```