<h1>Link::Standalone component - Showcase</h1>

<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">Generated element</h4>

  <div class="dummy-link-standalone-generated-list">
    <div>
      <span class="dummy-text-small">with
        <code class="dummy-code">@href</code>
        ⇒
        <code class="dummy-code">&lt;a&gt;</code></span>
      <br />
      <Hds::Link::Standalone @icon="plus" @text="Lorem ipsum dolor" @color="primary" @href="#" />
    </div>
    <div>
      <span class="dummy-text-small">with
        <code class="dummy-code">@route</code>
        ⇒
        <code class="dummy-code">&lt;LinkTo&gt;</code>
        ⇒
        <code class="dummy-code">&lt;a&gt;</code></span>
      <br />
      <Hds::Link::Standalone @icon="plus" @text="Lorem ipsum dolor" @color="primary" @route="index" />
    </div>
  </div>

  <h4 class="dummy-h4">Content</h4>
  <div class="dummy-link-standalone-base-sample">
    <Hds::Link::Standalone @icon="plus" @text="Text & leading icon" @href="../components/link" />
    <Hds::Link::Standalone
      @icon="arrow-right"
      @text="Text & trailing icon"
      @href="../components/link"
      @iconPosition="trailing"
    />
    <div class="dummy-link-standalone-max-width-container">
      <Hds::Link::Standalone
        @icon="plus"
        @text="Very long text that might wrap for multiple lines"
        @href="../components/link"
      />
    </div>
  </div>
  <h4 class="dummy-h4">
    Sizes
  </h4>
  <div class="dummy-link-standalone-base-sample">
    {{#each @model.SIZES as |size|}}
      <Hds::Link::Standalone @icon="plus" @text={{capitalize size}} @size={{size}} @route="components.link" />
    {{/each}}
  </div>
  <h4 class="dummy-h4">
    States (in each size)
  </h4>
  <div class="dummy-link-standalone-states-grid">
    {{#each @model.COLORS as |color|}}
      <h5 class="dummy-h5 dummy-link-standalone-states-grid__title">{{capitalize color}}</h5>
      {{#each @model.SIZES as |size|}}
        {{#each @model.STATES as |state|}}
          <div>
            <span class="dummy-text-small">
              {{capitalize size}}/{{capitalize state}}:
            </span>
            <br />
            <Hds::Link::Standalone
              @icon="plus"
              @text={{capitalize state}}
              @size={{size}}
              @color={{color}}
              @href="../components/link"
              mock-state-value={{state}}
            />
          </div>
        {{/each}}
      {{/each}}
    {{/each}}
  </div>
</section>
