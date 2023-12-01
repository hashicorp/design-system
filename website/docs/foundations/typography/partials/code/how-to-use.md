## How to use these styles

We offer different ways to apply typography styles to UI elements:

- [Text helper component](#text-component): This is the **preferred way** to apply HDS text styles to **HTML elements**.
- [CSS helper classes](#css-helper-classes): This can be used to apply styles to **Ember components** (or as fallback when using the `Text` helper component is not possible).
- [Design tokens](#design-tokens): This should be the **last resort** when none of the previous options are possible (or when only some of the HDS style properties  are needed, like `font-family`, `font-size`, `line-height`, etc.)

### Text component

This helper component provides a handy way to declare an HTML tag and apply to it one of the predefined typographic styles (via CSS helper classes, this happens automatically under the hood), plus a set of other properties like color and alignment.

For details about this component, [see the `Text` page](/components/text).

### CSS helper classes

In a single declaration, these predefined CSS classes contain everything to apply a standard typographic style to an element: `font-family`, `font-size`, `line-height`, and a reset for `margin` and `padding` to match the intended design language.

```markup
<p class="hds-typography-display-300">The quick brown fox jumps over the lazy dog.</p>
```

#### Font styles

<!-- algolia-ignore-start -->
<Doc::FontHelpersList @items={{this.cssHelpers.styles}} />
<!-- algolia-ignore-end -->

#### Font family

While we don’t recommend using custom styles often, `font-family` helpers are available to change the font family of an element.

```markup
<p class="hds-font-family-sans-text">The quick brown fox jumps over the lazy dog.</p>
```

| `font-family` helpers         | Use for                  |
| ------------------------------| ------------------------ |
| `font-family-sans-display`    | Headings and titles      |
| `font-family-sans-text`       | Body copy                |
| `font-family-mono-code`       | Monospaced text          |


<!-- algolia-ignore-start -->
<Doc::FontHelpersList @items={{this.cssHelpers.families}} />
<!-- algolia-ignore-end -->

#### Font weight

Use the `font-weight` helpers to change the weight of text in an element.

```markup
<!-- with font-family CSS helpers -->
<p class="hds-font-family-sans-text hds-font-weight-medium">The quick brown fox jumps over the lazy dog.</p>

<!-- with typographic style CSS helpers -->
<p class="hds-typography-display-300 hds-font-weight-semibold">The quick brown fox jumps over the lazy dog.</p>
```

<!-- algolia-ignore-start -->
<Doc::FontHelpersList @items={{this.cssHelpers.weights}} />
<!-- algolia-ignore-end -->

#### Style and weight

The following are recommended style and weight combinations for use in our applications:

<!-- algolia-ignore-start -->
<Doc::FontHelpersList @items={{this.stylesCombinations}} />
<!-- algolia-ignore-end -->

### Design tokens

Helios offers numerous [typographic design tokens](./tokens) should your project require more flexibility.

Since these are “atomic” definitions that associate a particular typographic property (e.g., `font-size`, `line-height`, `letter-spacing`, etc.) to a single value, we don’t consider them “typographic” styles. Therefore, we advise against using them directly in your CSS and recommend using the CSS helper classes instead.