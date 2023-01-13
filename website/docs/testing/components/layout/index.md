---
title: Doc::Layout
---

## How to use this component

The `Doc::Layout` component is used to lay out a group of elements and add spacing between them.

**Default horizontal direction with 12px spacing**

```handlebars
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
```

**With vertical direction**

```handlebars
<Doc::Layout @direction="vertical" @spacing="12px">
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
```

**Horizontal direction aligned to the right**

```handlebars
<Doc::Layout @spacing="12px" @align="right">
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
```

**Vertical direction aligned to the right**

```handlebars
<Doc::Layout @direction="vertical" @spacing="12px" @align="right">
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
```

**Horizontal direction aligned to center**

```handlebars
<Doc::Layout @spacing="12px" @align="center">
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
```

**Vertical direction aligned to center**

```handlebars
<Doc::Layout @direction="vertical" @spacing="12px" @align="center">
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
```

**Horizontal direction with alignment set to “justify”**

```handlebars
<Doc::Layout @spacing="12px" @align="justify">
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
```

**Vertical direction with alignment set to “justify”**

!!! Warning

Only shows an effect if height of container is taller than child items inside. Currently adds extra space after the last child.
(This particular layout may not be commonly used though so could be considered an edge case.)

!!!

```handlebars
<Doc::Layout @direction="vertical" @spacing="12px" @align="justify">
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
```

@include "partials/code/component-api.md"