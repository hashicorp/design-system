## Usage

### When to use

To represent an object or as part of a page title.

### When not to use

Within a paragraph where an object is referred to.

## Color

Use **Neutral** if the object or page is not a specific product feature but something universal. For example, for a “Dashboard” or “User” page.

<Hds::IconTile @color="neutral" @icon="dashboard" />

Use a **product-specific color** for objects or pages directly related to a product. For example:

- For a page showing a “Consul cluster”
- In a card or table row that represents a “Consul cluster”

<Hds::IconTile @color="consul" @icon="server-cluster" />

### Examples

<Doc::Layout @spacing="12px">
  <Hds::IconTile @color="neutral" @icon="user" />
  <Hds::IconTile @color="boundary" @icon="crosshair" />
  <Hds::IconTile @color="consul" @icon="server-cluster" />
  <Hds::IconTile @color="nomad" @icon="briefcase" />
  <Hds::IconTile @color="packer" @icon="layers" />
  <Hds::IconTile @color="terraform" @icon="grid" />
  <Hds::IconTile @color="vagrant" @icon="box" />
  <Hds::IconTile @color="vault" @icon="key" />
  <Hds::IconTile @color="waypoint" @icon="cloud-upload" />
</Doc::Layout>

## Size

Medium is the default size, but we recommend using the size that best fits the supporting text or UI. For example, don’t use large Icon Tiles in tables.

<Doc::Layout @spacing="12px">
  <Hds::IconTile @color="neutral" @icon="dashboard" @size="large" />
  <Hds::IconTile @color="neutral" @icon="dashboard" @size="medium" />
  <Hds::IconTile @color="neutral" @icon="dashboard" @size="small" />
</Doc::Layout>

## Secondary icon

A secondary icon can be added to provide additional context. For example, for an “Add user” page the “plus” icon indicates the action.

<Doc::Layout @spacing="16px">
  <Hds::IconTile @color="neutral" @icon="user" @size="large" @iconSecondary="plus"/>
  <Hds::IconTile @color="neutral" @icon="user" @size="medium" @iconSecondary="plus"/>
  <Hds::IconTile @color="neutral" @icon="user" @size="small" @iconSecondary="plus"/>
</Doc::Layout>

## Using with content

Icon Tiles should not appear without accompanying content. Instead, they should be presented alongside a text label for the object or page they are being used to represent. We recommend thinking of them as an accessory.