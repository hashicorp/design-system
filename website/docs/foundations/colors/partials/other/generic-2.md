<section data-test-percy data-section="colors-semantic">

  

  <h4 class="dummy-h4">Foreground</h4>
  <p class="dummy-paragraph">Use for text and icons.</p>
  <div class="dummy-colors-list">
    {{#each this.colors.semantic.foreground as |color|}}
      <DummyColorCard @color={{color}} />
    {{else}}
      <p class="dummy-paragraph">No tokens found for "semantic/foreground" colors 🤷‍♀️</p>
    {{/each}}
  </div>

  <h4 class="dummy-h4">Surface</h4>
  <p class="dummy-paragraph">Use for container and component backgrounds.</p>
  <div class="dummy-colors-list">
    {{#each this.colors.semantic.surface as |color|}}
      <DummyColorCard @color={{color}} />
    {{else}}
      <p class="dummy-paragraph">No tokens found for "semantic/surface" colors 🤷‍♀️</p>
    {{/each}}
  </div>

  <h4 class="dummy-h4">Border</h4>
  <p class="dummy-paragraph">Use for container and component borders. Neutral values can also be used for horizontal
    rules.</p>
  <div class="dummy-colors-list">
    {{#each this.colors.semantic.border as |color|}}
      <DummyColorCard @color={{color}} />
    {{else}}
      <p class="dummy-paragraph">No tokens found for "semantic/border" colors 🤷‍♀️</p>
    {{/each}}
  </div>

  <h4 class="dummy-h4">Focus</h4>
  <p class="dummy-paragraph">Use to indicate an element is in a focused state. Critical values for critical actions
    only, Action values for everything else.
    <em>Notice: they're used internally by the design system to define focus states</em>.</p>
  <div class="dummy-colors-list">
    {{#each this.colors.semantic.focus as |color|}}
      <DummyColorCard @color={{color}} />
    {{else}}
      <p class="dummy-paragraph">No tokens found for "semantic/focus" colors 🤷‍♀️</p>
    {{/each}}
  </div>

  <h4 class="dummy-h4">Page</h4>
  <p class="dummy-paragraph">Use for page backgrounds.</p>
  <div class="dummy-colors-list">
    {{#each this.colors.semantic.page as |color|}}
      <DummyColorCard @color={{color}} />
    {{else}}
      <p class="dummy-paragraph">No tokens found for "semantic/page" colors 🤷‍♀️</p>
    {{/each}}
  </div>

  
  {{#each-in this.colors.branding as |brand colorsList|}}
    <h4 class="dummy-h4">{{capitalize brand}}</h4>
    <div class="dummy-colors-list">
      {{#each colorsList as |color|}}
        <DummyColorCard @color={{color}} />
      {{/each}}
    </div>
  {{else}}
    <p class="dummy-paragraph">No tokens found for "branding" colors 🤷‍♀️</p>
  {{/each-in}}

  
  <p class="dummy-paragraph">Core Palette colors should be used sparingly and only when the correct semantic mapping
    isn’t available for the use case.</p>
  {{#each-in this.colors.palette as |tone colorsList|}}
    <h4 class="dummy-h4">{{capitalize tone}}</h4>
    <div class="dummy-colors-list">
      {{#each colorsList as |color|}}
        <DummyColorCard @color={{color}} />
      {{/each}}
    </div>
  {{else}}
    <p class="dummy-paragraph">No tokens found for "palette" colors 🤷‍♀️</p>
  {{/each-in}}
</section>