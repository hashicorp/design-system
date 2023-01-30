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
