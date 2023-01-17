## Showcase

<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">States</h4>
  <p class="dummy-text-small">Default</p>

  <div class="dummy-power-select-container">
    <div class="hds-power-select">
      <PowerSelect
        @options={{this.OPTIONS}}
        @selected={{this.SELECTED}}
        @onChange={{this.noop}}
        @renderInPlace={{true}}
        as |option|
      >
        {{option}}
      </PowerSelect>
    </div>
  </div>

  <p class="dummy-text-small">Focus</p>
  <div class="dummy-power-select-container">
    <div class="hds-power-select">
      <PowerSelect
        class="mock-focus"
        @options={{this.OPTIONS}}
        @selected={{this.SELECTED}}
        @onChange={{this.noop}}
        @renderInPlace={{true}}
        as |option|
      >
        {{option}}
      </PowerSelect>
    </div>
  </div>

  <p class="dummy-text-small">Disabled</p>
  <div class="dummy-power-select-container">
    <div class="hds-power-select">
      <PowerSelect
        @options={{this.OPTIONS}}
        @selected={{this.SELECTED}}
        @onChange={{this.noop}}
        @disabled={{true}}
        @renderInPlace={{true}}
        as |option|
      >
        {{option}}
      </PowerSelect>
    </div>
  </div>
</section>