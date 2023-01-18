## How to use these styles

While we do offer design tokens for typography, we recommend using the predefined CSS helper classes.

### CSS helper classes

In a single declaration, these classes contain everything to apply a standard style to an element: `font-family`, `font-size`, `line-height`, and a reset for `margin` and `padding` to match the intended design language.

```markup
<p class="hds-typography-display-300">The fox jumped over the lazy dog.</p>
```

#### Font styles

<Doc::FontHelpersList @items={{this.cssHelpers.styles}} />

#### Font family

While we don’t recommend using custom styles often, `font-family` helpers are available to change the font family of an element.

```markup
<p class="hds-font-family-sans-text">The fox jumped over the lazy dog.</p>
```

| `font-family` helpers         | Use for                  |
| ------------------------------| ------------------------ |
| `font-family-sans-display`    | Headings and titles      |
| `font-family-sans-text`       | Body copy                |
| `font-family-mono-code`       | Monospaced text          |


<Doc::FontHelpersList @items={{this.cssHelpers.families}} />

#### Font weight

Use the `font-weight` helpers to change the weight of an element.

```markup
<!-- with font-family CSS helpers -->
<p class="hds-font-family-sans-text hds-font-weight-medium">The fox jumped over the lazy dog.</p>

<!-- with typographic style CSS helpers -->
<p class="hds-typography-display-300 hds-font-weight-semibold">The fox jumped over the lazy dog.</p>
```

<Doc::FontHelpersList @items={{this.cssHelpers.weights}} />

#### Style and weight

The following are recommended style and weight combinations for use in our applications:

<Doc::FontHelpersList @items={{this.stylesCombinations}} />

### Design tokens

Helios offers numerous [typographic design tokens](./tokens) should your project require more flexibility.

Since these are “atomic” definitions that associate a particular typographic property (e.g., `font-size`, `line-height`, `letter-spacing`, etc.) to a single value, we don’t consider them “typographic” styles. Therefore, we advise against using them directly in your CSS and recommend using the CSS helper classes instead.