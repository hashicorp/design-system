Tabs allow users to move between different views within the same context at the same level of hierarchy, ie. UI vs. CLI, macOS vs. Windows vs. Linux, etc.

## Usage

### When to use

- Use to allow users to move between different views within the same context.

### When not to use

- Tabs are not intended for navigation, for this purpose consider using a sidebar, links, or [Breadcrumb](/components/breadcrumb/).

### Basic Tabs

<Hds::Tabs as |T|>
  <T.Tab>One</T.Tab>
  <T.Tab>Two</T.Tab>
  <T.Tab>Three</T.Tab>
  <T.Panel>Content one</T.Panel>
  <T.Panel>Content two</T.Panel>
  <T.Panel>Content three</T.Panel>
</Hds::Tabs>

### With icon and badge count

<Hds::Tabs as |T|>
  <T.Tab @count="5">One</T.Tab>
  <T.Tab @icon="info">Two</T.Tab>
  <T.Tab>Three</T.Tab>
  <T.Tab @icon="alert-triangle" @count="5">Four</T.Tab>
  <T.Panel>Content one</T.Panel>
  <T.Panel>Content two</T.Panel>
  <T.Panel>Content three</T.Panel>
  <T.Panel>Content four</T.Panel>
</Hds::Tabs>

### With overflowing tabs

<Hds::Tabs as |T|>
  <T.Tab>One one-thousand</T.Tab>
  <T.Tab>Two one-thousand</T.Tab>
  <T.Tab>Three one-thousand</T.Tab>
  <T.Tab>Four one-thousand</T.Tab>
  <T.Tab>Five one-thousand</T.Tab>
  <T.Tab>Six one-thousand</T.Tab>
  <T.Tab>Seven one-thousand</T.Tab>
  <T.Tab>Eight one-thousand</T.Tab>
  <T.Tab>Nine one-thousand</T.Tab>
  <T.Tab>Ten one-thousand</T.Tab>
  <T.Panel>Content one</T.Panel>
  <T.Panel>Content two</T.Panel>
  <T.Panel>Content three</T.Panel>
  <T.Panel>Content four</T.Panel>
  <T.Panel>Content five</T.Panel>
  <T.Panel>Content six</T.Panel>
  <T.Panel>Content seven</T.Panel>
  <T.Panel>Content eight</T.Panel>
  <T.Panel>Content nine</T.Panel>
  <T.Panel>Content ten</T.Panel>
</Hds::Tabs>

## Related

- [Breadcrumb](/components/breadcrumb/)