<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">Families</h4>
  {{#each this.families as |family|}}
    <div class="dummy-typography-sample dummy-typography-sample--family">
      <h5 class="dummy-h5">{{family}}</h5>
      <p class="hds-font-family-{{family}}">The fox jumped over the lazy dog</p>
    </div>
  {{/each}}

  <h4 class="dummy-h4">Weights</h4>
  {{#each this.weights as |weight|}}
    <div class="dummy-typography-sample dummy-typography-sample--weight">
      <h5 class="dummy-h5">{{weight}}</h5>
      <p class="hds-font-family-sans-text hds-font-weight-{{weight}}">The fox jumped over the lazy dog</p>
    </div>
  {{/each}}

  <h4 class="dummy-h4">Styles</h4>
  <p class="dummy-paragraph"><em>Notice: we are showing only the combinations of
      <code class="dummy-code">font-size</code>
      ("style") and
      <code class="dummy-code">font-weight</code>
      that the design system
      <strong>suggests</strong>
      to use.</em></p>
  <div class="dummy-typography-sample dummy-typography-sample--style">
    {{#each-in this.stylesCombinations as |style weights|}}
      <h5 class="dummy-h5">{{style}}</h5>
      {{#each weights as |weight|}}
        <p class="hds-typography-{{style}} hds-font-weight-{{weight}}">The fox jumped over the lazy dog ({{weight}})</p>
      {{/each}}
    {{/each-in}}
  </div>

</section>