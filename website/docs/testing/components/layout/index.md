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

[[code-snippets/layout-horizontal]]

**With vertical direction**

[[code-snippets/layout-vertical]]

**Horizontal direction aligned to the right**

[[code-snippets/layout-horizontal-right]]

**Vertical direction aligned to the right**

[[code-snippets/layout-vertical-right]]

**Horizontal direction aligned to center**

[[code-snippets/layout-horizontal-center]]

**Vertical direction aligned to center**

[[code-snippets/layout-vertical-center]]

**Horizontal direction with alignment set to “justify”**

Space out child elements with equal spacing in-between similarly to justified text. Optionally, you can also define `@spacing` to maintain a minimum space between elements.

[[code-snippets/layout-horizontal-justify]]

**Vertical direction with alignment set to “justify”**

!!! Warning

Only shows an effect if height of container is taller than child items inside. Currently adds extra undesired space after the last child. (This particular layout may not be commonly used though so could be considered an edge case.)

!!!

[[code-snippets/layout-vertical-justify]]

@include "partials/code/component-api.md"
