#### Families

<div>
{{#each this.families as |family|}}
  <div class="dummy-typography-sample dummy-typography-sample--family">
    <h5 class="doc-text-h5">{{family}}</h5>
    <p class="hds-font-family-{{family}}">The fox jumped over the lazy dog</p>
  </div>
{{/each}}
</div>

#### Weights

<div>
{{#each this.weights as |weight|}}
  <div class="dummy-typography-sample dummy-typography-sample--weight">
    <h5 class="doc-text-h5">{{weight}}</h5>
    <p class="hds-font-family-sans-text hds-font-weight-{{weight}}">The fox jumped over the lazy dog</p>
  </div>
{{/each}}
</div>

#### Combinations font style / font weight

!!! Info
We are showing only the combinations of `font-size` ("style") and `font-weight` that the design system **suggests** to use.
!!!

<div>
{{#each-in this.stylesCombinations as |style weights|}}
  <h5 class="doc-text-h5">{{style}}</h5>
  {{#each weights as |weight|}}
    <p class="hds-typography-{{style}} hds-font-weight-{{weight}}">The fox jumped over the lazy dog ({{weight}})</p>
  {{/each}}
{{/each-in}}
</div>