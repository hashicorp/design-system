## Semantic tokens

### Foreground

Use for text and icons.

{{#each this.colors.semantic.foreground as |color|}}
  <Doc::ColorSwatch @color={{color}} />
{{else}}
  <p>No tokens found for "semantic/foreground" colors 🤷‍♀️</p>
{{/each}}

### Surface

Use for container and component backgrounds.

{{#each this.colors.semantic.surface as |color|}}
  <Doc::ColorSwatch @color={{color}} />
{{else}}
  <p>No tokens found for "semantic/surface" colors 🤷‍♀️</p>
{{/each}}

### Border

Use for container and component borders. Neutral values can also be used for horizontal rules.

{{#each this.colors.semantic.border as |color|}}
  <Doc::ColorSwatch @color={{color}} />
{{else}}
  <p>No tokens found for “semantic/border” colors.</p>
{{/each}}

### Focus

Use to indicate an element is in a focused state. Use critical values for critical actions only and action values for everything else.

!!! Info

These are primarily used internally by the Design Systems Team to define focus states.
!!!

{{#each this.colors.semantic.focus as |color|}}
  <Doc::ColorSwatch @color={{color}} />
{{else}}
  <p>No tokens found for “semantic/focus” colors.</p>
{{/each}}

### Page

Use for page backgrounds.

{{#each this.colors.semantic.page as |color|}}
  <Doc::ColorSwatch @color={{color}} />
{{else}}
  <p>No tokens found for “semantic/page” colors.</p>
{{/each}}

## Brand colors

{{#each-in this.colors.branding as |brand colorsList|}}
  <h3>{{capitalize brand}}</h3>
  {{#each colorsList as |color|}}
    <Doc::ColorSwatch @color={{color}} />
  {{/each}}
{{else}}
  <p>No tokens found for “branding” colors.</p>
{{/each-in}}

## Core palette

Core palette colors should be used sparingly and only when the correct semantic mapping isn’t available for the use case.

{{#each-in this.colors.palette as |tone colorsList|}}
  <h3>{{capitalize tone}}</h3>
  {{#each colorsList as |color|}}
    <Doc::ColorSwatch @color={{color}} />
  {{/each}}
{{else}}
  <p>No tokens found for “palette” colors.</p>
{{/each-in}}
