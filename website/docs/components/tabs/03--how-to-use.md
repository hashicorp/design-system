---
category: components
component: tabs
section: how-to-use
---

# Tabs Component - How to use

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

Renders to:

One Two Three Content 1 Content 2 Content 3

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

Renders to:

One Two Three Content 1 Content 2 Content 3, I am displayed on page load.

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

Renders to:

One Two Three Content 1 Content 2 Content 3!

#### Pass in a function that gets called when a tab is clicked

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

Renders to:

One Two Three Content 1 Content 2 Content 3