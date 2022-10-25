# Tag / Showcase

<section data-test-percy>
  <h4 class="dummy-h4">Content</h4>
  <div class="dummy-tag-base-sample">
    <Hds::Tag @text="My text tag" @onDismiss={{this.noop}} />
    <Hds::Tag @text="My text tag" />
    <Hds::Tag @text="My link tag" @onDismiss={{this.noop}} @href="#" />
    <Hds::Tag @text="My link tag" @href="#" />
  </div>
  <div class="dummy-tag-base-sample">
    <p>This is a paragraph: <Hds::Tag @text="My text tag" /></p>
  </div>

  <h4 class="dummy-h4">States</h4>
  <div class="dummy-tag-states-grid">
    {{#each this.STATES as |state|}}
      <div>
        <span class="dummy-text-small">{{capitalize state}}:</span>
        <br />
        <div class="dummy-tag-states-subgrid">
          <Hds::Tag @text="My tag" @onDismiss={{this.noop}} mock-state-value={{state}} mock-state-selector="button" />
        </div>
      </div>
    {{/each}}

    {{#each this.COLORS as |color|}}
      <h5 class="dummy-h5 dummy-tag-states-grid__title">{{capitalize color}}</h5>
      {{#each this.STATES as |state|}}
        <div>
          <span class="dummy-text-small">{{capitalize state}}:</span>
          <br />
          <div class="dummy-tag-states-subgrid">
            <Hds::Tag
              @color={{color}}
              @text="My link tag"
              @onDismiss={{this.noop}}
              @href="#"
              mock-state-value={{state}}
              mock-state-selector="button"
            />
            <Hds::Tag
              @color={{color}}
              @text="My link tag"
              @onDismiss={{this.noop}}
              @href="#"
              mock-state-value={{state}}
              mock-state-selector="a"
            />
            <Hds::Tag
              @color={{color}}
              @text="My link tag"
              @href="#"
              mock-state-value={{state}}
              mock-state-selector="a"
            />
          </div>
        </div>
      {{/each}}
    {{/each}}
  </div>

  <h4 class="dummy-h4">Containers</h4>
  <div class="dummy-tag-containers">
    {{#let (array "block" "flex" "grid") as |displays|}}
      {{#each displays as |display|}}
        <div>
          <span class="dummy-text-small">Parent with <code class="dummy-code">display: {{display}}</code></span>
          <br />
          <div class="dummy-tag-containers__{{display}}">
            <Hds::Tag @text="My text tag" @onDismiss={{this.noop}} />
            <Hds::Tag @text="My text tag" @onDismiss={{this.noop}} />
            <Hds::Tag @text="My slightly longer tag" @onDismiss={{this.noop}} />
            <Hds::Tag @text="My text tag" @onDismiss={{this.noop}} />
          </div>
        </div>
      {{/each}}
    {{/let}}
  </div>
</section>