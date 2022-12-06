<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">Generated element</h4>

  <div class="dummy-link-inline-generated-list">
    <div>
      <span class="dummy-text-small">with
        <code class="dummy-code">@href</code>
        ⇒
        <code class="dummy-code">&lt;a&gt;</code></span>
      <br />
      <div class="hds-typography-body-300">
        <Hds::Link::Inline @color="primary" @href="#">Lorem ipsum dolor</Hds::Link::Inline>
      </div>
    </div>
    <div>
      <span class="dummy-text-small">with
        <code class="dummy-code">@route</code>
        ⇒
        <code class="dummy-code">&lt;LinkTo&gt;</code>
        ⇒
        <code class="dummy-code">&lt;a&gt;</code></span>
      <br />
      <div class="hds-typography-body-300">
        <Hds::Link::Inline @color="primary" @route="components">Lorem ipsum dolor</Hds::Link::Inline>
      </div>
    </div>
  </div>

  <h4 class="dummy-h4">Content</h4>

  <div class="dummy-link-inline-content-list">
    <div class="hds-typography-body-300">
      <Hds::Link::Inline @color="primary" @href="#">Only text</Hds::Link::Inline>
    </div>
    <div class="hds-typography-body-300">
      <Hds::Link::Inline @color="primary" @icon="globe" @iconPosition="leading" @href="#">Text + leading icon</Hds::Link::Inline>
    </div>
    <div class="hds-typography-body-300">
      <Hds::Link::Inline @color="primary" @icon="arrow-right-circle" @iconPosition="trailing" @href="#">Text + trailing
        icon</Hds::Link::Inline>
    </div>
  </div>
  <br />
  <div class="hds-typography-body-100">
    Lorem
    <Hds::Link::Inline @color="primary" @icon="globe" @iconPosition="leading" @href="#">ipsum dolor</Hds::Link::Inline>
    sit amet
    <Hds::Link::Inline @color="primary" @icon="arrow-right-circle" @iconPosition="trailing" @href="#">consectetur
      adipiscing</Hds::Link::Inline>
    elit.
  </div>
  <div class="hds-typography-body-200">
    Lorem
    <Hds::Link::Inline @color="primary" @icon="globe" @iconPosition="leading" @href="#">ipsum dolor</Hds::Link::Inline>
    sit amet
    <Hds::Link::Inline @color="primary" @icon="arrow-right-circle" @iconPosition="trailing" @href="#">consectetur
      adipiscing</Hds::Link::Inline>
    elit.
  </div>
  <div class="hds-typography-body-300">
    Lorem
    <Hds::Link::Inline @color="primary" @icon="globe" @iconPosition="leading" @href="#">ipsum dolor</Hds::Link::Inline>
    sit amet
    <Hds::Link::Inline @color="primary" @icon="arrow-right-circle" @iconPosition="trailing" @href="#">consectetur
      adipiscing</Hds::Link::Inline>
    elit.
  </div>
  <br />
  <div class="dummy-link-inline-content-list">
    <div class="dummy-link-inline-content-list__item">
      <span class="dummy-text-small">within text block</span>
      <br />
      <div class="hds-typography-body-300">
        <Hds::Link::Inline @color="primary" @href="#">Lorem ipsum dolor sit amet</Hds::Link::Inline>, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
      </div>
    </div>
    <div class="dummy-link-inline-content-list__item">
      <span class="dummy-text-small">span two lines</span>
      <br />
      <div class="hds-typography-body-300">
        Lorem ipsum dolor sit amet,
        <Hds::Link::Inline @color="primary" @href="#">consectetur adipiscing elit</Hds::Link::Inline>, sed do eiusmod
        tempor incididunt ut labore et dolore.
      </div>
    </div>
    <div class="dummy-link-inline-content-list__item">
      <span class="dummy-text-small">span two lines and overlaps</span>
      <br />
      <div class="hds-typography-body-300">
        Lorem ipsum dolor sit amet,
        <Hds::Link::Inline @color="primary" @href="#">consectetur adipiscing elit, sed do eiusmod tempor</Hds::Link::Inline>
        incididunt ut labore et dolore.
      </div>
    </div>
  </div>

  <h4 class="dummy-h4">
    States
  </h4>
  <div class="dummy-link-inline-states-grid">
    {{#each this.COLORS as |color|}}
      <h5 class="dummy-h5 dummy-link-inline-states-grid__title">{{capitalize color}}</h5>
      {{#each @model.STATES as |state|}}
        <div>
          <div class="hds-typography-body-300">This is the
            <Hds::Link::Inline
              @color={{color}}
              @href="../components/link"
              mock-state-value={{state}}
            >{{state}}</Hds::Link::Inline>
            state
          </div>
          <br />
          <div class="hds-typography-body-300">This is the
            <Hds::Link::Inline
              @color={{color}}
              @href="../components/link"
              @icon="external-link"
              @iconPosition="trailing"
              mock-state-value={{state}}
            >{{state}}</Hds::Link::Inline>
            state
          </div>
        </div>
      {{/each}}
    {{/each}}
  </div>
</section>