<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">Generated elements</h4>

  <div class="dummy-interactive-sample">
    <p class="dummy-paragraph">
      <code class="dummy-code">&lt;button&gt;</code>
      <span class="dummy-text-small">(with no @route or @href provided / default)</span>
    </p>
    <Hds::Interactive>This is a button (default)</Hds::Interactive>
  </div>

  <div class="dummy-interactive-sample" id="local-anchor">
    <p class="dummy-paragraph">
      <code class="dummy-code">&lt;a&gt;</code>
      <span class="dummy-text-small">(with @href argument)</span>
    </p>
    <Hds::Interactive @href="http://google.com">This is an external
      <code>&lt;a&gt;</code>
      link (default)</Hds::Interactive>
    <br />
    <Hds::Interactive @href="#local-anchor" @isHrefExternal={{false}}>This is an internal
      <code>&lt;a&gt;</code>
      link</Hds::Interactive>
  </div>

  <div class="dummy-interactive-sample">
    <p class="dummy-paragraph">
      <code class="dummy-code">&lt;LinkTo&gt;</code>
      <span class="dummy-text-small">(with @route argument but no @isRouteExternal)</span>
    </p>
    <Hds::Interactive @route="index">This is a <code>&lt;LinkTo&gt;</code> link</Hds::Interactive>
  </div>

  <div class="dummy-interactive-sample">
    <p class="dummy-paragraph">
      <code class="dummy-code">&lt;LinkToExternal&gt;</code>
      <span class="dummy-text-small">(with @route argument and @isRouteExternal set to true)</span>
    </p>
    {{!-- <Hds::Interactive @route="index" @isRouteExternal={{true}}>This is a <code>&lt;LinkToExternal&gt;</code> link</Hds::Interactive> --}}
    <pre>⚠️ We can't render this component in this application (it will work only on Ember engines).</pre>
  </div>

</section>