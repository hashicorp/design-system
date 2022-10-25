<h1>Focus ring - Showcase</h1>

<section data-test-percy data-section="showcase">
  
  <h4 class="dummy-h4">Focus ring:</h4>
  <p class="dummy-paragraph">Standalone "focus ring" effect</p>
  <div class="dummy-focus-ring-samples">
    <div class="dummy-focus-ring-sample hds-focus-ring-action-box-shadow">
      <DummyPlaceholder @text="no radius" @width="100" @height="100" @background="transparent" />
    </div>
    <div class="dummy-focus-ring-sample dummy-focus-ring-sample--border-radius hds-focus-ring-action-box-shadow">
      <DummyPlaceholder @text="with border radius" @width="100" @height="100" @background="transparent" />
    </div>
  </div>
  <div class="dummy-focus-ring-samples">
    <div class="dummy-focus-ring-sample">
      <span class="dummy-text-small">action</span>
      <br />
      <div class="hds-focus-ring-action-box-shadow">
        <DummyPlaceholder @text="with border radius" @width="100" @height="100" @background="transparent" />
      </div>
    </div>
    <div class="dummy-focus-ring-sample">
      <span class="dummy-text-small">critical</span>
      <br />
      <div class="hds-focus-ring-critical-box-shadow">
        <DummyPlaceholder @text="with border radius" @width="100" @height="100" @background="transparent" />
      </div>
    </div>
  </div>
</section>
