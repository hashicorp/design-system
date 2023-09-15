---
title: Doc::Layout
---

## How to use this component

The `Doc::Layout` component is used as a wrapper component to lay out a group of elements and add spacing between them.

Currently it works best for creating simple layouts and adding spacing between example components within documentation pages vs. as a general layout tool. (It does not handle markdown as content for example.) In the future, we can enhance this component to support more complex layouts and various types of content if there is a need.

!!! Information

Hds::IconTile components are used in the examples below but you could use Doc::Layout to wrap and lay out any type of element.

!!!

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
  <Hds::IconTile @color="vault-secrets" @icon="fingerprint" />
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

Space out child elements with equal spacing in-between similarly to justified text. Optionally, you can also define `@spacing` to maintain a minimum space between elements.

```handlebars
<Doc::Layout @align="justify">
  <Hds::IconTile @color="neutral" @icon="user" />
  <Hds::IconTile @color="boundary" @icon="crosshair" />
  <Hds::IconTile @color="consul" @icon="server-cluster" />
  <Hds::IconTile @color="nomad" @icon="briefcase" />
  <Hds::IconTile @color="packer" @icon="layers" />
</Doc::Layout>
```

**Vertical direction with alignment set to “justify”**

!!! Warning

Only shows an effect if height of container is taller than child items inside. Currently adds extra undesired space after the last child. (This particular layout may not be commonly used though so could be considered an edge case.)

!!!

```handlebars
<Doc::Layout @direction="vertical" @align="justify" style="height: 400px;">
  <Hds::IconTile @color="neutral" @icon="user" />
  <Hds::IconTile @color="boundary" @icon="crosshair" />
  <Hds::IconTile @color="consul" @icon="server-cluster" />
  <Hds::IconTile @color="nomad" @icon="briefcase" />
  <Hds::IconTile @color="packer" @icon="layers" />
</Doc::Layout>
```

@include "partials/code/component-api.md"
