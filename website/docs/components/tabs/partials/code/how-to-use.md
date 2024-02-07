## How to use this component

```handlebars
<Hds::Tabs as |T|>
  <T.Tab>One</T.Tab>
  <T.Tab>Two</T.Tab>
  <T.Tab>Three</T.Tab>

  <T.Panel>Content 1</T.Panel>
  <T.Panel>Content 2</T.Panel>
  <T.Panel>Content 3</T.Panel>
</Hds::Tabs>
```

### Size

Set `@size` to "large" to display the large `Tabs` variant. The default `@size` is "medium".

```handlebars
<Hds::Tabs @size="large" as |T|>
  <T.Tab>One</T.Tab>
  <T.Tab>Two</T.Tab>
  <T.Tab>Three</T.Tab>

  <T.Panel>Content 1</T.Panel>
  <T.Panel>Content 2</T.Panel>
  <T.Panel>Content 3</T.Panel>
</Hds::Tabs>
```

### Pre-selecting a tab

While the first tab is selected by default, it is possible to customize the starting tab to display on page load in two different ways (depending on how the tabs' state is controlled/persisted).

#### Using `@isSelected` argument applied to one of the `Tab` elements

Declare which tab is selected when the component is first rendered by providing `@isSelected` argument to one of the `Tab` elements. From that moment on, the tab selection is controlled internally by the component.

```handlebars
<Hds::Tabs as |T|>
  <T.Tab>One</T.Tab>
  <T.Tab>Two</T.Tab>
  <T.Tab @isSelected={{true}}>Three</T.Tab>

  <T.Panel>Content 1</T.Panel>
  <T.Panel>Content 2</T.Panel>
  <T.Panel>Content 3, I am displayed on page load.</T.Panel>
</Hds::Tabs>
```

#### Using `@selectedTabIndex` argument applied to the `Tabs` component

If you want to control the internal "selected tab" state of the component, and possibly persist it in a query parameter, you need to provide a `@selectedTabIndex` argument to the main `Tabs` component. You also need to handle the change of state using the `@onClickTab` callback function, invoked whenever a user clicks/selects one of the tabs.

```handlebars
<Hds::Tabs @selectedTabIndex={{this.demoSelectedTab}} @onClickTab={{this.demoUpdateSelectedTabQueryParam}} as |T|>
  <T.Tab>One</T.Tab>
  <T.Tab>Two</T.Tab>
  <T.Tab >Three</T.Tab>

  <T.Panel>Content 1</T.Panel>
  <T.Panel>Content 2</T.Panel>
  <T.Panel>Content 3</T.Panel>
</Hds::Tabs>
```

### Count and icon

```handlebars
<Hds::Tabs as |T|>
  <T.Tab @count="5">One</T.Tab>
  <T.Tab @icon="download">Two</T.Tab>
  <T.Tab>Three</T.Tab>

  <T.Panel>Content 1</T.Panel>
  <T.Panel>Content 2</T.Panel>
  <T.Panel>Content 3!</T.Panel>
</Hds::Tabs>
```

### Call a function on tab click

Use the `@onClickTab` handler to pass in a custom function. For example, to store the active tab in the URL for persistence.

```handlebars
<Hds::Tabs @onClickTab={{this.logClickedTab}} as |T|>
  <T.Tab>One</T.Tab>
  <T.Tab>Two</T.Tab>
  <T.Tab>Three</T.Tab>

  <T.Panel>Content one</T.Panel>
  <T.Panel>Content two</T.Panel>
  <T.Panel>Content three</T.Panel>
</Hds::Tabs>
```

### Nested tabs

[We don’t recommend nesting tabs](/components/tabs#nested), but in case it’s necessary to implement such a feature a special code implementation needs to be used: the `T.Panel` needs to be exposed and its `P.isVisible` property needs to be provided to the nested tab using the `@isParentVisible` argument, so that when the parent visibility changes the nested tab can be initialized accordingly.

```handlebars
  <Hds::Tabs as |T|>
    <T.Tab>🐤 Birds</T.Tab>
    <T.Tab>🐠 Fishes</T.Tab>
    <T.Tab>🐙 Cephalopods</T.Tab>
    <T.Panel as |P|>
      <Hds::Tabs @isParentVisible={{P.isVisible}} as |NT|>
        <NT.Tab>🦜 Parrots</NT.Tab>
        <NT.Tab>🦅 Eagles</NT.Tab>
        <NT.Tab>🦉 Owls</NT.Tab>
        <NT.Panel><Doc::Placeholder @text="🦜 Content for Parrots" @height="50" /></NT.Panel>
        <NT.Panel><Doc::Placeholder @text="🦅 Content for Eagles" @height="50" /></NT.Panel>
        <NT.Panel><Doc::Placeholder @text="🦉 Content for Owls" @height="50" /></NT.Panel>
      </Hds::Tabs>
    </T.Panel>
    <T.Panel as |P|>
      <Hds::Tabs @isParentVisible={{P.isVisible}} as |NT|>
        <NT.Tab>🐬 Dolphins</NT.Tab>
        <NT.Tab>🦈 Sharks</NT.Tab>
        <NT.Panel><Doc::Placeholder @text="🐬 Content for Dolphins" @height="50" /></NT.Panel>
        <NT.Panel><Doc::Placeholder @text="🦈 Content for Sharks" @height="50" /></NT.Panel>
      </Hds::Tabs>
    </T.Panel>
    <T.Panel><Doc::Placeholder @text="🐙 Content for Cephalopods" @height="50" /></T.Panel>
  </Hds::Tabs>
```
