<section data-test-percy data-section="showcase">
  <h2>Showcase</h2>

  <h3 class="dummy-h4">Content</h3>
  <div class="dummy-badge-base-sample">
    <Hds::BadgeCount @text="3" />
    <Hds::BadgeCount @text="99+" />
    <Hds::BadgeCount @text="v1.2.3" />
  </div>
  <div class="dummy-badge-base-sample">
    <p>This is a paragraph: <Hds::BadgeCount @text="3" /></p>
  </div>

  <h3 class="dummy-h4">Size</h3>
  <div class="dummy-badge-base-sample">
    {{#each this.BADGE_COUNT_SIZES as |size|}}
      <Hds::BadgeCount @text={{capitalize size}} @size={{size}} />
    {{/each}}
  </div>

  <h3 class="dummy-h4">Type</h3>
  <div class="dummy-badge-base-sample">
    {{#each this.BADGE_COUNT_TYPES as |type|}}
      <Hds::BadgeCount @text={{capitalize type}} @type={{type}} />
    {{/each}}
  </div>

  <h3 class="dummy-h4">Color:</h3>
  {{#each this.BADGE_COUNT_COLORS as |color|}}
    <h5 class="dummy-h6">{{capitalize color}}</h5>
    <div class="dummy-badge-color-grid">
      {{#each this.BADGE_COUNT_SIZES as |size|}}
        {{#each this.BADGE_COUNT_TYPES as |type|}}
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