## Usage

### When to use

When displaying an object, or as part of a page title.

### When not to use

Inline in a string of text, such as a paragrph where an object is referred or linked to.

## Color

Use **Neutral** if the object or page is not a feature of a specific product, but is something universal. For example, for a "Dashboard" or "User" page.

<Hds::IconTile @color="neutral" @icon="dashboard" />

Use a **product-specific color** for objects or pages that are directly related to a product. For example:

- For a page showing a "Consul cluster"
- In a card or table row that represents a "Consul cluster"

<Hds::IconTile @color="consul" @icon="server-cluster" />

### Examples

<div style="display: flex; gap: 2rem;">
    <Hds::IconTile @color="neutral" @icon="user" />
    <Hds::IconTile @color="boundary" @icon="crosshair" />
    <Hds::IconTile @color="consul" @icon="server-cluster" />
    <Hds::IconTile @color="nomad" @icon="briefcase" />
    <Hds::IconTile @color="packer" @icon="layers" />
    <Hds::IconTile @color="terraform" @icon="grid" />
    <Hds::IconTile @color="vagrant" @icon="box" />
    <Hds::IconTile @color="vault" @icon="key" />
    <Hds::IconTile @color="waypoint" @icon="cloud-upload" />
</div>

## Size

Medium is the default size, but use the size that best fits any supporting text or UI. For example, don't use large IconTiles in tables

<div style="display: flex; gap: 2rem;">
    <Hds::IconTile @color="neutral" @icon="dashboard" @size="large" />
    <Hds::IconTile @color="neutral" @icon="dashboard" @size="medium" />
    <Hds::IconTile @color="neutral" @icon="dashboard" @size="small" />
</div>

## Secondary icon

A secondary icon can be added to provide additional context. For example, for an "Add user" page the "plus" icon indicates the action.

<div style="display: flex; gap: 2rem">
    <Hds::IconTile @color="neutral" @icon="user" @size="large" @iconSecondary="plus"/>
    <Hds::IconTile @color="neutral" @icon="user" @size="medium" @iconSecondary="plus"/>
    <Hds::IconTile @color="neutral" @icon="user" @size="small" @iconSecondary="plus"/>
</div>

## Using with content

IconTiles should not appear without accompanying content. They should be presented alongside a text label for the object or page they are being used to represent. Think of them as an accessory.