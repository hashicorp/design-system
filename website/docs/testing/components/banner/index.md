---
title: Doc::Banner
---

## Banner blocks

An information banner (`info`)

!!! Info

**This is the title**

This is a paragraph
- This is
- A list
!!!

Another information banner (`information`)

!!! Information

**This is the title**

This is a paragraph
- This is
- A list
!!!

A warning banner (`warning`)

!!! Warning

**This is the title**

This is a paragraph
- This is
- A list
!!!

A critical banner (`critical`)

!!! Critical

**This is the title**

This is a paragraph
- This is
- A list
!!!

An insight banner (`insight`)

!!! Insight

**This is the title**

This is a paragraph
- This is
- A list
!!!

A callout banner (`callout`)

!!! Callout

**This is the title**

This is a paragraph
- This is
- A list

!!!

-----

!!! Info

A banner without a title
!!!

!!! Info

A banner without a title but a **strong** in the content (in the first child)
!!!

!!! Info

**This is the title**

A banner with a title and a **strong** in the content
!!!


-----

## Imported banners


Banner included directly via `partial`

@include "partials/simple-banner.md"

Banner included via `partial` inside a `<section>`

<section data-tab="Guidelines">
    @include "partials/simple-banner.md"
</section>
