## How to use this component

[[code-snippets/tabs-basic]]

### Size

Set `@size` to "large" to display the large `Tabs` variant. The default `@size` is "medium".

[[code-snippets/tabs-size]]

### Pre-selecting a tab

While the first tab is selected by default, it is possible to customize the starting tab to display on page load in two different ways (depending on how the tabs' state is controlled/persisted).

#### Using `@isSelected` argument applied to one of the `Tab` elements

Declare which tab is selected when the component is first rendered by providing `@isSelected` argument to one of the `Tab` elements. From that moment on, the tab selection is controlled internally by the component.

[[code-snippets/tabs-pre-selected]]

#### Using `@selectedTabIndex` argument applied to the `Tabs` component

If you want to control the internal "selected tab" state of the component, and possibly persist it in a query parameter, you need to provide a `@selectedTabIndex` argument to the main `Tabs` component. You also need to handle the change of state using the `@onClickTab` callback function, invoked whenever a user clicks/selects one of the tabs.

[[code-snippets/tabs-controlled]]

### Count and icon

[[code-snippets/tabs-count-icon]]

### Call a function on tab click

Use the `@onClickTab` handler to pass in a custom function. For example, to store the active tab in the URL for persistence.

[[code-snippets/tabs-events]]

### Nested tabs

[We don’t recommend nesting tabs](/components/tabs#nested), but in case it’s necessary to implement such a feature a special code implementation needs to be used: the `T.Panel` needs to be exposed and its `P.isVisible` property needs to be provided to the nested tab using the `@isParentVisible` argument, so that when the parent visibility changes the nested tab can be initialized accordingly.

[[code-snippets/tabs-nested]]
