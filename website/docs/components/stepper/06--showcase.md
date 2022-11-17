---
title: Stepper Indicator
category: components
component: stepper
section: showcase
---


<section data-test-percy data-section="showcase">
  
  <h4 class="dummy-h4">Status</h4>
  <h5 class="dummy-h5">Default</h5>
  <div class="dummy-stepper-indicator-grid">
    {{#each @model.STEP_STATUSES as |status|}}
      <div>
        <span class="dummy-text-small">{{capitalize status}}</span>
        <br />
        <Hds::Stepper::Step::Indicator @status={{status}} @text="1" />
      </div>
    {{/each}}
  </div>
  <h5 class="dummy-h5">Interactive</h5>
  {{#each @model.STEP_STATUSES as |status|}}
    <div class="dummy-stepper-indicator-grid">
      {{#each @model.STATES as |state|}}
        <div>
          <span class="dummy-text-small">{{capitalize status}}/{{state}}</span>
          <br />
          <Hds::Stepper::Step::Indicator
            @status={{status}}
            @text="1"
            @isInteractive={{true}}
            mock-state-value={{state}}
          />
        </div>
      {{/each}}
    </div>
  {{/each}}
  <h4 class="dummy-h4">Task</h4>
  <h5 class="dummy-h5">Default</h5>
  <div class="dummy-stepper-indicator-grid">
    {{#each @model.TASK_STATUSES as |status|}}
      <div>
        <span class="dummy-text-small">{{capitalize status}}</span>
        <br />
        <Hds::Stepper::Task::Indicator @status={{status}} @text="1" />
      </div>
    {{/each}}
  </div>
  <h5 class="dummy-h5">Interactive</h5>
  {{#each @model.TASK_STATUSES as |status|}}
    <div class="dummy-stepper-indicator-grid">
      {{#each @model.STATES as |state|}}
        <div>
          <span class="dummy-text-small">{{capitalize status}}/{{state}}</span>
          <br />
          <Hds::Stepper::Task::Indicator @status={{status}} @isInteractive={{true}} mock-state-value={{state}} />
        </div>
      {{/each}}
    </div>
  {{/each}}
</section>
