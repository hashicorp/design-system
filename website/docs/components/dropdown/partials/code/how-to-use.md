## How to use this component

To make the invocation more flexible and intuitive, we provide contextual components for Toggles, ListItems, Header and Footer. For example, `<Hds::Dropdown::ListItem::Separator />` would be contextually expressed as `<dd.Separator />`.

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

### ToggleButton

The basic invocation of ToggleButton requires `@text` to be passed. By default, it renders a primary button with a chevron icon.

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

Alternatively, pass `secondary` to `@color` to display a secondary button with a chevron icon.

```handlebars
<Hds::Dropdown as |dd|>
  <dd.ToggleButton @text="Text Toggle" @color="secondary" />
  <dd.Interactive @route="components" @text="Item One" />
  <dd.Interactive @route="components" @text="Item Two" />
  <dd.Interactive @route="components" @text="Item Three" />
  <dd.Interactive @text="Item Four (closes on click)" {{on "click" dd.close}} />
  <dd.Separator />
  <dd.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
</Hds::Dropdown>
```

### ToggleIcon

#### ToggleIcon as overflow menu

Overflow menus are often found in the last column of a [Tables](/components/table). This is the only use case where it is acceptable to use
`@hasChevron={{false}}`. `@text` is still required, because it supplies the `aria-label` for ToggleIcon.

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

#### ToggleIcon as user menu

`@text` is still required, because it supplies the `aria-label` for ToggleIcon.

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

#### ToggleIcon with other icons

Pass any [icon](/icons/library) name to `@icon` to change the icon used in ToggleIcon. `@text` is still required, because it supplies the `aria-label` for ToggleIcon.

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

### List placement

By default, the list is positioned below the button, aligned to the right. To change the list position pass `bottom-left`, `top-left`, or `top-right` to `@listPosition` on the Dropdown component.

```handlebars
<Hds::Dropdown @listPosition="bottom-left" as |dd|>
  <dd.ToggleButton @text="Text Toggle" />
  <dd.Interactive @route="components" @text="Item One" />
  <dd.Interactive @route="components" @text="Item Two" />
  <dd.Interactive @route="components" @text="Item Three" />
  <dd.Interactive @text="Item Four (closes on click)" {{on "click" dd.close}} />
  <dd.Separator />
  <dd.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
</Hds::Dropdown>
```

In contexts where the Dropdown needs to be _inline_, to inherit the alignment from a parent, you can use the `@isInline` argument (and set the `@listPosition` accordingly to your needs):

```handlebars
<div class="doc-dropdown-mock-text-align-right">
  <Hds::Dropdown @isInline={{true}} @listPosition="bottom-right" as |dd|>
    <dd.ToggleButton @text="Text Toggle" @color="secondary" />
    <dd.Interactive @route="components" @text="Item One" />
    <dd.Interactive @route="components" @text="Item Two" />
    <dd.Interactive @route="components" @text="Item Three" />
  </Hds::Dropdown>
</div>
```

### List size

You can explicitly control the height or width of a list. Any acceptable value (px, rem, em) can be declared:

!!! Info

The `@height` argument actually sets a `max-height` which prevents the list from growing past a certain height.

!!!

```handlebars
<Hds::Dropdown @isInline={{true}} @height="170px" @width="250px" as |dd|>
  <dd.ToggleButton @text="Text Toggle" />
  <dd.Interactive @route="components" @text="Item One" />
  <dd.Interactive @route="components" @text="Item Two" />
  <dd.Interactive @route="components" @text="Item Three" />
  <dd.Interactive @route="components" @text="Item Four" />
  <dd.Interactive @route="components" @text="Item Five" />
  <dd.Interactive @route="components" @text="Item Six" />
  <dd.Interactive @route="components" @text="Item Seven" />
</Hds::Dropdown>
```

### List footer

It is possible that you may want to add a list footer for things like a set of buttons for a filter control:

```handlebars
<Hds::Dropdown @height="284px" as |dd|>
  <dd.ToggleButton @icon="tag" @text="Tags" @color="secondary" />
  <dd.Checkbox>access</dd.Checkbox>
  <dd.Checkbox>homework</dd.Checkbox>
  <dd.Checkbox>discovery</dd.Checkbox>
  <dd.Checkbox>memories</dd.Checkbox>
  <dd.Checkbox>music</dd.Checkbox>
  <dd.Checkbox>pharell</dd.Checkbox>
  <dd.Checkbox>punk</dd.Checkbox>
  <dd.Checkbox>random</dd.Checkbox>
  <dd.Checkbox>robots</dd.Checkbox>
  <dd.Checkbox>tag</dd.Checkbox>
  <dd.Footer @hasDivider={{true}}>
    <Hds::ButtonSet>
      <Hds::Button @text="Apply filters" @isFullWidth={{true}} @size="small" />
      <Hds::Button @text="Cancel" @color="secondary" @size="small" />
    </Hds::ButtonSet>
  </dd.Footer>
</Hds::Dropdown>
```

### ListItem::Interactive

`ListItem::Interactive` renders the correct element based on the passing of a `@route`, `@href`, or the addition of a click event (e.g.,
`\{{on "click" this.myAction}}`). Internally, the component uses the [Hds::Interactive](/utilities/interactive) utility component.

#### Rendering a button

If you add an event handler (no `@href` or `@route`), a `<button>` element will be rendered:

```handlebars
{{!-- The Doc::ListContainer component is just to help the component render properly --}}
<Doc::ListContainer class="hds-dropdown__list">
  <Hds::Dropdown::ListItem::Interactive {{on "click" this.myAction}} @text="Run command" />
</Doc::ListContainer>
```

You can pass an `@icon` argument to add a leading icon:

```handlebars
{{!-- The Doc::ListContainer component is just to help the component render properly --}}
<Doc::ListContainer class="hds-dropdown__list">
  <Hds::Dropdown::ListItem::Interactive {{on "click" this.myAction}} @text="Run command" @icon="build" />
</Doc::ListContainer>
```

#### Rendering a link with `@href`

!!! Info

**Internal Link?**

When using the `@href` argument, you’re indicating an external link (instead of a route). So, a few relevant HTML attributes are added—`target="_blank"` and `rel="noopener noreferrer"`. However, if the `@href` really _does_ point to an internal link or uses a different protocol (e.g., `mailto` or `ftp`), pass `@isHrefExternal={{false}}` to the component and it will not add any extra HTML attributes.
!!!

If you pass an `@href` argument, a link (`<a>` element) will be generated:

```handlebars
{{!-- The Doc::ListContainer component is just to help the component render properly --}}
<Doc::ListContainer class="hds-dropdown__list">
  <Hds::Dropdown::ListItem::Interactive @href="https://www.hashicorp.com/request-demo/terraform" @text="Request a demo" />
</Doc::ListContainer>
```

You can pass a `@trailingIcon` argument to indicate that the link points to an external resource:

```handlebars
{{!-- The Doc::ListContainer component is just to help the component render properly --}}
<Doc::ListContainer class="hds-dropdown__list">
  <Hds::Dropdown::ListItem::Interactive @href="https://www.hashicorp.com/request-demo/terraform" @text="Request a demo" @trailingIcon="external-link" />
</Doc::ListContainer>
```

#### Rendering a LinkTo (with `@route`)

Pass a `@route` to render Ember `<LinkTo>`. If the route is external to your current engine, pass `@isRouteExternal={{true}}` to use `<LinkToExternal>` instead of `<LinkTo>`. For more details see the [Hds::Interactive component](/utilities/interactive/) documentation. All the standard arguments for the `<LinkTo/LinkToExternal>` components are supported (e.g., `models/model/query/current-when/replace`).

```handlebars
{{!-- The Doc::ListContainer component is just to help the component render properly --}}
<Doc::ListContainer class="hds-dropdown__list">
  <Hds::Dropdown::ListItem::Interactive @route="my.page.route" @model="my.page.model" @text="Activate cluster" />
</Doc::ListContainer>
```

#### With a loading “interactive” item

There may be use cases when it’s necessary to put an item in a “loading” state while the app performs some operations (e.g., asynchronously checking the user’s permissions to execute a certain operation once the Toggle’s been clicked).

Pass the argument `@isLoading={{true}}` to the item. This will show a “loading” icon (even if an argument `@icon` is provided) and sets the item as non-interactive until the value of `@isLoading` is set to `false` again.

```handlebars
<Hds::Dropdown as |dd|>
  <dd.ToggleIcon @icon="more-horizontal" @text="Overflow Options" @hasChevron={{false}} />
  <dd.Interactive @route="components" @isLoading={{true}} @text="Edit cluster" @color="action" @icon="edit" />
  <dd.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
</Hds::Dropdown>
```

### ListItem::CopyItem

To enable users to copy a snippet of code (eg. URLs, secrets, code blocks, etc.) use `ListItem::CopyItem`.

Using the `@isTruncated` argument it is possible to constrain the text to one-line and truncate it if it does not fit the available space. Please be aware there are [serious accessibility concerns](/components/copy/snippet?tab=accessibility) with using this feature.

```handlebars
<Hds::Dropdown as |dd|>
  <dd.ToggleButton @listPosition="bottom-left" @text="Create run task" @color="secondary" />
  <dd.Title @text="Integrate with Terraform Cloud" />
  <dd.Description @text="Create a new run task in Terraform using the URL and key below." />
  <dd.CopyItem @text="https://api.cloud.hashicorp.com" @copyItemTitle="Endpoint URL" />
  <dd.CopyItem @text="91ee1e8ef65b337f0e70d793f456c71d91ee1e8ef65b337f0e70d793f456c71d" @copyItemTitle="HMAC Key" />
  <dd.CopyItem @isTruncated={{false}} @text="91ee1e8ef65b337f0e70d793f456c71d91ee1e8ef65b337f0e70d793f456c71d" @copyItemTitle="HMAC Key (without truncation)" />
</Hds::Dropdown>
```

Using the `@isTruncated` argument, it is possible to disable the truncation applied to the text. Care should be taken in choosing how to use this feature as there are [accessibility concerns](/components/copy/snippet?tab=accessibility).

### ListItem::Checkmark

For switching context (e.g., organization switchers, project switchers, etc.) use `ListItem::Checkmark`.

```handlebars
<Hds::Dropdown @listPosition="bottom-left" as |dd|>
  <dd.ToggleButton @text="HCP Design Sandbox" @color="secondary" />
  <dd.Checkmark>ACME Org</dd.Checkmark>
  <dd.Checkmark @selected={{true}}>HCP Design Sandbox</dd.Checkmark>
  <dd.Footer @hasDivider={{true}}>
    <Hds::Link::Standalone @icon="list" @text="All Organizations" @color="secondary" @href="#" />
  </dd.Footer>
</Hds::Dropdown>
```

### ListItem::Checkbox

For multi-selection within a form or larger filter pattern use `ListItem::Checkbox`.

```handlebars
<Hds::Dropdown @listPosition="bottom-left" as |dd|>
  <dd.ToggleButton @count="2" @text="Status" @color="secondary" />
  <dd.Checkbox @count="4">Failing</dd.Checkbox>
  <dd.Checkbox @count="2" checked>Active</dd.Checkbox>
  <dd.Checkbox @count="1">Starting</dd.Checkbox>
  <dd.Checkbox @count="3" checked>Pending</dd.Checkbox>
  <dd.Footer @hasDivider={{true}}>
    <Hds::Button @text="Apply filters" @isFullWidth={{true}} @size="small" />
  </dd.Footer>
</Hds::Dropdown>
```

### ListItem::Radio

For single selection within a form or larger filter pattern use `ListItem::Radio`.

```handlebars
<Hds::Dropdown @listPosition="bottom-left" as |dd|>
  <dd.ToggleButton @text="Status" @color="secondary" />
  <dd.Radio name="status" @count="4">Failing</dd.Radio>
  <dd.Radio name="status" @count="2" checked>Active</dd.Radio>
  <dd.Radio name="status" @count="1">Starting</dd.Radio>
  <dd.Radio name="status" @count="3">Pending</dd.Radio>
  <dd.Footer @hasDivider={{true}}>
    <Hds::Button @text="Apply filters" @isFullWidth={{true}} @size="small" />
  </dd.Footer>
</Hds::Dropdown>
```

### ListItem::Generic

!!! Info

When using the “generic” ListItem, the product team is responsible for implementing the layout and accessibility.
!!!

`ListItem::Generic` allows you to pass custom elements to the Dropdown.

```handlebars
<Hds::Dropdown @listPosition="bottom-left" as |dd|>
  <dd.ToggleButton @text="Text Toggle" @color="secondary" />
  <dd.Title @text="Integrate with Terraform Cloud" />
  <dd.Description @text="Create a new run task in Terraform using the URL and key below." />
  <dd.Generic>
    <Hds::Link::Standalone @text="Watch tutorial video" @icon="film" @href="/" />
  </dd.Generic>
</Hds::Dropdown>
```