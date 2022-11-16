---
category: components
component: badge-count
section: showcase
---

<h1>BadgeCount component - Showcase</h1>

<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">Content</h4>
  <div class="dummy-badge-base-sample">
    <Hds::BadgeCount @text="3" />
    <Hds::BadgeCount @text="99+" />
    <Hds::BadgeCount @text="v1.2.3" />
  </div>
  <div class="dummy-badge-base-sample">
    <p>This is a paragraph: <Hds::BadgeCount @text="3" /></p>
  </div>

  <h4 class="dummy-h4">Size</h4>
  <div class="dummy-badge-base-sample">
    {{#each @model.BADGE_COUNT_SIZES as |size|}}
      <Hds::BadgeCount @text={{capitalize size}} @size={{size}} />
    {{/each}}
  </div>

  <h4 class="dummy-h4">Type</h4>
  <div class="dummy-badge-base-sample">
    {{#each @model.BADGE_COUNT_TYPES as |type|}}
      <Hds::BadgeCount @text={{capitalize type}} @type={{type}} />
    {{/each}}
  </div>

  <h4 class="dummy-h4">Color:</h4>
  {{#each @model.BADGE_COUNT_COLORS as |color|}}
    <p class="dummy-h6">{{capitalize color}}</p>
    <div class="dummy-badge-color-grid">
      {{#each @model.BADGE_COUNT_SIZES as |size|}}
        {{#each @model.BADGE_COUNT_TYPES as |type|}}
          <div
            class="dummy-badge-base-sample dummy-badge-base-sample--type-{{type}}
              dummy-badge-base-sample--color-{{color}}"
          >
            <Hds::BadgeCount @text="3" @size={{size}} @type={{type}} @color={{color}} />
          </div>
        {{/each}}
      {{/each}}
    </div>
  {{/each}}
</section>
