---
title: Elevation
category: foundations
component: elevation
section: showcase
---


<section data-test-percy data-section="showcase">
  
  <h4 class="dummy-h4">Elevation:</h4>
  <p class="dummy-paragraph">Standalone shadow effects</p>
  <div class="dummy-elevation-sample">
    {{#each @model.ELEVATIONS as |elevation|}}
      <div class="hds-elevation-{{elevation}}">
        <DummyPlaceholder @text={{elevation}} @width="100" @height="100" @background="transparent" />
      </div>
    {{/each}}
  </div>
  <h4 class="dummy-h4">Surface:</h4>
  <p class="dummy-paragraph">Shadow effects combined with an additional edge</p>
  <div class="dummy-elevation-sample">
    {{#each @model.SURFACES as |surface|}}
      <div class="hds-surface-{{surface}}">
        <DummyPlaceholder @text={{surface}} @width="100" @height="100" @background="transparent" />
      </div>
    {{/each}}
  </div>
</section>
