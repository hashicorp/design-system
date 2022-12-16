The suggested way to apply the typographic definitions to a UI element is using the **predefined CSS helper classes** provided.

#### Design tokens

There are numerous [typographic design tokens](./tokens) in our system.

Since they are "atomic" definitions that associate a particular typographic property (e.g. `font-size`, or `line-height`, or `letter-spacing`) to a single value, they are not exactly "typographic" styles.

For this reason we **strongly advise against** using them directly in your CSS, and prefer the CSS helpers provided by the system, to avoid "mix & match" of typographic styles.

#### CSS helper classes

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

#### Font family
<Doc::FontHelpersList @items={{this.cssHelpers.families}} />
#### Font weights
<Doc::FontHelpersList @items={{this.cssHelpers.weights}} />
#### Font styles
<Doc::FontHelpersList @items={{this.cssHelpers.styles}} />

To use this classes you have to import the CSS file `[products|devdot]/css/helpers/typography.css` from the `@hashicorp/design-system-tokens` package.

#### Combinations font style / font weight

!!! Info

**Notice**

We are showing only the combinations of `font-size` ("style") and `font-weight` that the design system **suggests** to use.

!!!

<Doc::FontHelpersList @items={{this.stylesCombinations}} />
