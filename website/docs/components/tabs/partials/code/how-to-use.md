#### Basic use

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

#### With a custom starting tab

Optionally, you can set a custom starting tab to display on page load. (By default the first tab is selected.)

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

#### With optional Count and Icon

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

#### Pass in a function that gets called when a tab is clicked

You can use the `@onClickTab` handler to pass in your own custom function. For example, if you need to store the active tab in the URL for persistence.

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
