## Showcase

<section data-test-percy data-section="showcase">
  <h3 class="dummy-h4">Content</h3>
  <div class="dummy-badge-base-sample">
    <Hds::Badge @text="Only text" />
    <Hds::Badge @icon="activity" @text="Text + icon" />
    <Hds::Badge @icon="activity" @text="Only icon" @isIconOnly={{true}} />
    <div class="dummy-badge-max-width-container">
      <Hds::Badge @icon="activity" @text="This is a very long text that should go on two lines" />
    </div>
  </div>
  <div class="dummy-badge-base-sample">
    <p>This is a paragraph:
      <Hds::Badge @icon="activity" @text="Lorem ipsum" /></p>
  </div>

  <h4 class="dummy-h5">Containers</h4>
  <div class="dummy-badge-containers">
    {{#let (array "block" "flex" "grid") as |displays|}}
      {{#each displays as |display|}}
        <div>
          <span class="dummy-text-small">Parent with <code class="dummy-code">display: {{display}}</code></span>
          <br />
          <div class="dummy-badge-containers__{{display}}">
            <Hds::Badge @text="Only text" /><Hds::Badge @icon="activity" @text="Text + icon" /><Hds::Badge
              @icon="activity"
              @text="Only icon"
              @isIconOnly={{true}}
            />
          </div>
        </div>
      {{/each}}
    {{/let}}
  </div>

  <h3 class="dummy-h4">Size</h3>
  <div class="dummy-badge-base-sample">
    {{#each this.BADGE_SIZES as |size|}}
      <Hds::Badge @icon="activity" @text={{capitalize size}} @size={{size}} />
    {{/each}}
  </div>

  <h3 class="dummy-h4">Type</h3>
  <div class="dummy-badge-base-sample">
    {{#each this.BADGE_TYPES as |type|}}
      <Hds::Badge @icon="activity" @text={{capitalize type}} @type={{type}} />
    {{/each}}
  </div>

  <h3 class="dummy-h4">Color:</h3>
  {{#each this.BADGE_COLORS as |color|}}
    <h4 class="dummy-h6">{{capitalize color}}</h4>
    <div class="dummy-badge-color-grid">
      {{#each this.BADGE_SIZES as |size|}}
        {{#each this.BADGE_TYPES as |type|}}
          <div
            class="dummy-badge-base-sample dummy-badge-base-sample--type-{{type}}
              dummy-badge-base-sample--color-{{color}}"
          >
            <Hds::Badge @icon="activity" @text="Lorem ipsum" @size={{size}} @type={{type}} @color={{color}} />
            <Hds::Badge @text="Lorem ipsum" @size={{size}} @type={{type}} @color={{color}} />
            <Hds::Badge
              @icon="activity"
              @text="Lorem Ipsum"
              @size={{size}}
              @type={{type}}
              @color={{color}}
              @isIconOnly={{true}}
            />
          </div>
        {{/each}}
      {{/each}}
    </div>
  {{/each}}
</section>