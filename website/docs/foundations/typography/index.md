---
title: Typography
caption: Typography relates to the style and appearance of textual information.
description: Typography relates to the structure and appearance of textual information. It relates to visual hierarchy, letterforms, and punctuation.
previewImage: assets/illustrations/foundations/typography.jpg
---

## Font stack

We use system fonts for all components. Each OS comes with a specific typeface. By telling our components “use the system’s default typeface, whatever that is” we’re giving our apps fewer things to have to look for, so they load faster. This is important in large applications, where you need every little bit of performance help you can get. This means that the text might appear a little different on each OS, but contextually to that user on that OS, it will not seem out of place at all.

System fonts also offer many benefits that many web fonts don’t. They are broadly tested and have many styles and variations to support internationalization, code, tabular data, data viz, etc... As a new design system, we need to be pragmatic, and system fonts seem to cover our present and potential future use cases.

### Sans-serif

![sans-serif on mac](/assets/foundations/typography/sans-serif-mac.png)

![sans-serif on windows](/assets/foundations/typography/sans-serif-windows.png)

![sans-serif on linux](/assets/foundations/typography/sans-serif-linux.png)

### Monospace

![monospace on mac](/assets/foundations/typography/monospace-mac.png)

![monospace on windows](/assets/foundations/typography/monospace-windows.png)

![monospace on linux](/assets/foundations/typography/monospace-linux.png)

## How to use

Apply typographic definitions to a UI element using the predefined CSS helper classes.

### CSS helper classes

In most cases, you will use the typography CSS helpers.

```markup
<p class="hds-typography-display-300">Lorem ipsum dolor.</p>
```

These classes contain, in a single declaration, everything that you need to apply a standard style to an element: `font-family`, `font-size`, `line-height`, plus a reset for `margin` and `padding` to match how they behave in Figma.

#### Styles

<Doc::FontHelpersList @items={{this.cssHelpers.styles}} />

#### Font family

These helpers are meant to be used in rare cases when the designers use custom styles.

!!! Info

The `font-family-sans-display` helper is intended for headings and titles, while the `font-family-sans-text` helper is intended for body copy text. The `font-family-mono-code` helper is intended for monospaced text.

!!!

```markup
<p class="hds-font-family-sans-text">Lorem ipsum dolor.</p>
```

<Doc::FontHelpersList @items={{this.cssHelpers.families}} />

#### Font weight

If you need to change the weight of an element you can use one of the `font-weight` helpers.

```markup
<!-- with font-family CSS helpers -->
<p class="hds-font-family-sans-text hds-font-weight-medium">Lorem ipsum dolor.</p>

<!-- with typographic style CSS helpers -->
<p class="hds-typography-display-300 hds-font-weight-semibold">Lorem ipsum dolor.</p>
```

<Doc::FontHelpersList @items={{this.cssHelpers.weights}} />

#### Style and weight

We suggest you use one of the following combinations of style and weight.

<Doc::FontHelpersList @items={{this.stylesCombinations}} />

### Design tokens

There are numerous [typographic design tokens](./tokens) in our system.

Since they are “atomic” definitions that associate a particular typographic property (e.g. `font-size`, or `line-height`, or `letter-spacing`) to a single value, they are not exactly “typographic” styles.

For this reason, we strongly advise against using them directly in your CSS, and prefer the CSS helpers classes.
