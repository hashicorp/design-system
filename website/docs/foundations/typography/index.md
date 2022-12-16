---
title: Typography
---

## Font stack

Each OS comes with a specific typeface. By telling our components “use the system’s default typeface, whatever that is,” we’re giving our apps fewer things to have to look for, so they load faster. This is important in big apps, where you need every little bit of performance help you can get. This of course, means that it might appear a little different on each OS, but contextually to that user on that OS, it will not seem out of place at all.

System fonts also offer many benefits that many web fonts don’t. They are broadly tested and have many styles and variations to support internationalization, code, tabular data, data viz, etc... As a new design system, we need to be pragmatic, and system fonts seem to cover our present and potential future use cases.

!!! Info

HashiCorp has general writing guidelines for copy standards e.g. capitalization and punctuation. Refer to [this document](https://docs.google.com/document/d/1ABNkYIp6aLwPYNpuYOFcDFBFCcnH_4ePRaLP-gD_tKE/edit#heading=h.w9d2qpiz1vpb) for more details.

!!!

The suggested way to apply the typographic definitions to a UI element is using the **predefined CSS helper classes** provided.

## Design tokens

There are numerous [typographic design tokens](./tokens) in our system.

Since they are "atomic" definitions that associate a particular typographic property (e.g. `font-size`, or `line-height`, or `letter-spacing`) to a single value, they are not exactly "typographic" styles.

For this reason we **strongly advise against** using them directly in your CSS, and prefer the CSS helpers provided by the system, to avoid "mix & match" of typographic styles.

## CSS helper classes

There are different CSS helper classes that can be used for different purposes.

If you want to change **only** the _font-family_ you can use one the "font-family" helpers:

```markup
<p class="hds-font-family-sans-text">Lorem ipsum dolor.</p>
```

These helpers are meant to use in very special cases, when the designers used custom typographic styles.

_Notice: the "font-family-sans-display" helper is intented for headings and titles, while the "font-family-sans-text" helper is intended for body copy text. The "font-family-mono-code" helper is intended for monospaced text._

In most of the cases, you will use the _typography_ CSS helpers:

```markup
<p class="hds-typography-display-300">Lorem ipsum dolor.</p>
```

These classes will contain, in a single declaration, everything that you need to apply a "standard" style to an element: _font-family_, _font-size_, _line-height_, plus a reset for _margin_ and _padding_ to `0px` (to match how they behave in Figma).

If you want to change the _font-weight_ of an element you can use one the "font-weight" helpers:

```markup
<!-- with font-family CSS helpers -->
<p class="hds-font-family-sans-text hds-font-weight-medium">Lorem ipsum dolor.</p>

<!-- with typographic style CSS helpers -->
<p class="hds-typography-display-300 hds-font-weight-semibold">Lorem ipsum dolor.</p>
```

These are the **CSS helper classes** that you can use:

### Font family
<Doc::FontHelpersList @items={{this.cssHelpers.families}} />
### Font weights
<Doc::FontHelpersList @items={{this.cssHelpers.weights}} />
### Font styles
<Doc::FontHelpersList @items={{this.cssHelpers.styles}} />

To use this classes you have to import the CSS file `[products|devdot]/css/helpers/typography.css` from the `@hashicorp/design-system-tokens` package.

### Combinations font style / font weight

!!! Info

**Notice**

We are showing only the combinations of `font-size` ("style") and `font-weight` that the design system **suggests** to use.

!!!

<Doc::FontHelpersList @items={{this.stylesCombinations}} />
