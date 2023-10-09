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

### Custom starting tab

Customize the starting tab to display on page load. The first tab is selected by default.

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

[We don't recommed nesting tabs](/components/tabs#nested), but in case it's necessary to implement such feature a special code implementation needs to be used: the `T.Panel` needs to be exposed and its `P.isVisible` property needs to be provided to the nested tab using the `@isParentVisible` argument, so that when the parent visibility changes the nested tab can be initialized accordingly.

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
