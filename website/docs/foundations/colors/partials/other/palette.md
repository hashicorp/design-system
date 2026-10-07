## Semantic tokens

### Foreground

Use for text and icons.

<!-- algolia-ignore-start -->
<div>
  {{#each this.colors.semantic.foreground as |color|}}
    <Doc::ColorSwatch @color={{color}} />
  {{else}}
    <p>No tokens found for "semantic/foreground" colors 🤷‍♀️</p>
  {{/each}}
</div>
<!-- algolia-ignore-end -->

### Surface

Use for container and component backgrounds.

<!-- algolia-ignore-start -->
<div>
  {{#each this.colors.semantic.surface as |color|}}
    <Doc::ColorSwatch @color={{color}} />
  {{else}}
    <p>No tokens found for "semantic/surface" colors 🤷‍♀️</p>
  {{/each}}
</div>
<!-- algolia-ignore-end -->

### Border

Use for container and component borders. Neutral values can also be used for horizontal rules.

<!-- algolia-ignore-start -->
<div>
  {{#each this.colors.semantic.border as |color|}}
    <Doc::ColorSwatch @color={{color}} />
  {{else}}
    <p>No tokens found for “semantic/border” colors.</p>
  {{/each}}
</div>
<!-- algolia-ignore-end -->

### Focus

Use to indicate an element is in a focused state. Use critical values for critical actions only and action values for everything else.

!!! Info

These are primarily used internally by the Design Systems Team to define focus states.
!!!

<!-- algolia-ignore-start -->
<div>
  {{#each this.colors.semantic.focus as |color|}}
    <Doc::ColorSwatch @color={{color}} />
  {{else}}
    <p>No tokens found for “semantic/focus” colors.</p>
  {{/each}}
</div>
<!-- algolia-ignore-end -->

### Page

Use for page backgrounds.

<!-- algolia-ignore-start -->
<div>
  {{#each this.colors.semantic.page as |color|}}
    <Doc::ColorSwatch @color={{color}} />
  {{else}}
    <p>No tokens found for “semantic/page” colors.</p>
  {{/each}}
</div>
<!-- algolia-ignore-end -->

## Brand colors

<!-- algolia-ignore-start -->
<div>
  {{#each-in this.colors.branding as |brand colorsList|}}
    <h3>{{capitalize brand}}</h3>
    {{#each colorsList as |color|}}
      <Doc::ColorSwatch @color={{color}} />
    {{/each}}
  {{else}}
    <p>No tokens found for “branding” colors.</p>
  {{/each-in}}
</div>
<!-- algolia-ignore-end -->

## Core palette

Core palette colors should be used sparingly and only when the correct semantic mapping isn’t available for the use case.

<!-- algolia-ignore-start -->
<div>
  {{#each-in this.colors.palette as |tone colorsList|}}
    <h3>{{capitalize tone}}</h3>
    {{#each colorsList as |color|}}
      <Doc::ColorSwatch @color={{color}} />
    {{/each}}
  {{else}}
    <p>No tokens found for “palette” colors.</p>
  {{/each-in}}
</div>
<!-- algolia-ignore-end -->
