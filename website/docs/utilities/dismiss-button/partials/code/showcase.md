<section data-test-percy data-section="showcase">
  
  <h4 class="dummy-h4">States</h4>
  <div class="dummy-dismiss-button-states-grid">
    {{#each @model.STATES as |state|}}
      <div>
        <span class="dummy-text-small">{{capitalize state}}:</span>
        <br />
        <Hds::DismissButton mock-state-value={{state}} />
      </div>
    {{/each}}
  </div>
</section>