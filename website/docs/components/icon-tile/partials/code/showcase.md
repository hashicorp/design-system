<section data-test-percy data-section="showcase">
  
  <h4 class="dummy-h4">Size</h4>
  <ul class="dummy-icon-tile-side-by-side">
    <li>
      <p class="dummy-paragraph">With logo</p>
      <div class="dummy-icon-tile-base-sample">
        {{#each this.SIZES as |size|}}
          <Hds::IconTile @logo="boundary" @size={{size}} />
        {{/each}}
      </div>
    </li>
    <li>
      <p class="dummy-paragraph">With icon</p>
      <div class="dummy-icon-tile-base-sample">
        {{#each @model.SIZES as |size|}}
          <Hds::IconTile @icon="dashboard" @size={{size}} />
        {{/each}}
      </div>
    </li>
  </ul>

  <h4 class="dummy-h4">Logo</h4>
  {{#each @model.PRODUCTS as |product|}}
    <div class="dummy-icon-tile-base-sample">
      {{#each @model.SIZES as |size|}}
        <Hds::IconTile @logo={{product}} @size={{size}} />
      {{/each}}
    </div>
  {{/each}}

  <h4 class="dummy-h4">Icon color</h4>
  {{#each @model.COLORS as |color|}}
    {{! As agreed with designers, we prefer to hide the option of icon with "hcp" color }}
    {{#if (not-eq color "hcp")}}
      <div class="dummy-icon-tile-base-sample">
        {{#each @model.SIZES as |size|}}
          <Hds::IconTile @icon="dashboard" @size={{size}} @color={{color}} />
        {{/each}}
      </div>
    {{/if}}
  {{/each}}

  <h4 class="dummy-h4">Secondary icon</h4>
  <ul class="dummy-icon-tile-side-by-side">
    <li>
      <p class="dummy-paragraph">With logo</p>
      <div class="dummy-icon-tile-base-sample">
        {{#each @model.SIZES as |size|}}
          <Hds::IconTile @logo="boundary" @size={{size}} @iconSecondary="plus" />
        {{/each}}
      </div>
    </li>
    <li>
      <p class="dummy-paragraph">With icon</p>
      <div class="dummy-icon-tile-base-sample">
        {{#each @model.SIZES as |size|}}
          <Hds::IconTile @icon="dashboard" @size={{size}} @iconSecondary="trash" />
        {{/each}}
      </div>
    </li>
  </ul>
</section>