## How to use this component

The component uses the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to display the dropdown list. A third-party library called [Floating UI](https://floating-ui.com/) provides anchoring and positioning functionality.

To make the invocation more flexible and intuitive, we provide contextual components for Toggles, ListItems, Header and Footer. For example, `<Hds::Dropdown::ListItem::Separator />` would be contextually expressed as `<D.Separator />`.

[[code-snippets/dropdown-basic]]

### ToggleButton

The basic invocation of ToggleButton requires `@text` to be passed. By default, it renders a primary button with a chevron icon.

[[code-snippets/dropdown-toggle-button]]

Alternatively, pass `secondary` to `@color` to display a secondary button with a chevron icon.

[[code-snippets/dropdown-toggle-button-secondary]]

### ToggleIcon

#### ToggleIcon as overflow menu

Overflow menus are often found in the last column of a [Table](/components/table/table). This is the only use case where it is acceptable to use
`@hasChevron={{false}}`. `@text` is still required, because it supplies the `aria-label` for ToggleIcon.

[[code-snippets/dropdown-toggle-icon]]

#### ToggleIcon as user menu

`@text` is still required, because it supplies the `aria-label` for ToggleIcon.

[[code-snippets/dropdown-user-menu]]

#### ToggleIcon with other icons

Pass any [icon](/icons/library) name to `@icon` to change the icon used in ToggleIcon. `@text` is still required, because it supplies the `aria-label` for ToggleIcon.

[[code-snippets/dropdown-toggle-icon-arg]]

### List placement

By default, the list is positioned below the button, aligned to the right. To change the list position pass `bottom-left`, `top-left`, or `top-right` to `@listPosition` on the Dropdown component.

[[code-snippets/dropdown-list-placement]]

In contexts where the Dropdown needs to be _inline_, to inherit the alignment from a parent, you can use the `@isInline` argument (and set the `@listPosition` accordingly to your needs):

[[code-snippets/dropdown-list-placement-inline]]

### Collision detection

Setting the `@enableCollisionDetection` argument to `true` will automatically adapt the list position relative to the viewport to avoid collisions with the browser window boundaries. This means that when an end-user scrolls the page, or resizes the browser, the position of the list on the page dynamically adapts to these changes.

[[code-snippets/dropdown-collision-detection]]

### List size

You can explicitly control the height or width of a list. Any acceptable value (px, rem, em) can be declared.

The `@height` argument actually sets a `max-height` which prevents the list from growing past a certain height.

[[code-snippets/dropdown-list-height]]

You can also set the width of a list to match the toggle button.

[[code-snippets/dropdown-match-toggle-width]]

When `@matchToggleWidth` is set, the `@width` value (if set) is overridden.

### List footer

It is possible that you may want to add a list footer for things like a set of buttons for a filter control:

[[code-snippets/dropdown-list-footer]]

### Content rendering in DOM

By default, the content of the Dropdown is not rendered into the browser when the Dropdown is closed.

To change this behavior, you can use the `@preserveContentInDom` argument so that the content is rendered in the DOM, regardless of whether the Dropdown is open or closed.

[[code-snippets/dropdown-preserve-content]]

### ListItem::Interactive

`ListItem::Interactive` renders the correct element based on the passing of a `@route`, `@href`, or the addition of a click event (e.g.,
`\{{on "click" this.myAction}}`).

!!! Info

The `ListItem::Interactive` component uses the generic `Hds::Interactive` component. For more details about how this utility component works, please refer to [its documentation page](/utilities/interactive).

!!!

#### Rendering a button

If you add an event handler (no `@href` or `@route`), a `<button>` element will be rendered:

[[code-snippets/dropdown-interactive-button]]

You can pass an `@icon` argument to add a leading icon:

[[code-snippets/dropdown-interactive-button-icon]]

#### Rendering a link with `@href`

If you pass an `@href` argument, a link (`<a>` element) will be generated:

[[code-snippets/dropdown-interactive-href]]

By default, the link is considered "external", which means that the `target=“_blank”` and `rel=“noopener noreferrer”` attributes are applied to the `<a>` element. This is the most common case, as internal links are generally handled using a `@route` argument.

To visually indicate that the link points to an external resource, you can use `@trailingIcon` and assign it an icon name like `external-link`, `docs-link`, `guide-link`, or `learn-link`.

[[code-snippets/dropdown-interactive-href-external]]

If the `@href` points to an internal link, or uses a different protocol (e.g., "mailto" or "ftp"), pass `@isHrefExternal={{false}}` to the component and it will omit the `target` and `rel` attributes.

#### Rendering a LinkTo (with `@route`)

Pass a `@route` to render Ember `<LinkTo>`. If the route is external to your current engine, pass `@isRouteExternal={{true}}` to use `<LinkToExternal>` instead of `<LinkTo>`. For more details see the [Hds::Interactive component](/utilities/interactive/) documentation. All the standard arguments for the `<LinkTo/LinkToExternal>` components are supported (e.g., `models/model/query/current-when/replace`).

[[code-snippets/dropdown-interactive-link-to]]

#### With a loading “interactive” item

There may be use cases when it’s necessary to put an item in a “loading” state while the app performs some operations (e.g., asynchronously checking the user’s permissions to execute a certain operation once the Toggle’s been clicked).

Pass the argument `@isLoading={{true}}` to the item. This will show a “loading” icon (even if an argument `@icon` is provided) and sets the item as non-interactive until the value of `@isLoading` is set to `false` again.

[[code-snippets/dropdown-interactive-loading]]

### ListItem::CopyItem

To enable users to copy a snippet of code (eg. URLs, secrets, code blocks, etc.) use `ListItem::CopyItem`.

Using the `@isTruncated` argument it is possible to constrain the text to one-line and truncate it if it does not fit the available space. Please be aware there are [serious accessibility concerns](/components/copy/snippet?tab=accessibility) with using this feature.

[[code-snippets/dropdown-copy-item]]

Using the `@isTruncated` argument, it is possible to disable the truncation applied to the text. Care should be taken in choosing how to use this feature as there are [accessibility concerns](/components/copy/snippet?tab=accessibility).

### ListItem::Checkmark

For switching context (e.g., organization switchers, project switchers, etc.) use `ListItem::Checkmark`.

[[code-snippets/dropdown-checkmark-item]]

### ListItem::Checkbox

For multi-selection within a form or larger filter pattern use `ListItem::Checkbox`.

[[code-snippets/dropdown-checkbox-item]]

### ListItem::Radio

For single selection within a form or larger filter pattern use `ListItem::Radio`.

[[code-snippets/dropdown-radio-item]]

### ListItem::Generic

!!! Warning

**Consumer responsibility**

When using the “generic” ListItem, the product team is responsible for implementing the layout and accessibility.
!!!

`ListItem::Generic` allows you to pass custom elements to the Dropdown.

[[code-snippets/dropdown-generic-item]]
