---
category: components
group: form
component: textarea
section: showcase
---

<h1>Form::Textarea Component - Showcase</h1>

<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">"Base" control</h4>
  <h5 class="dummy-h6">Interaction status</h5>
  <div class="dummy-form-textarea-base-sample">
    <div>
      <span class="dummy-text-small">Default</span>
      <br />
      <Hds::Form::Textarea::Base />
    </div>
    <div>
      <span class="dummy-text-small">With placeholder</span>
      <br />
      <Hds::Form::Textarea::Base placeholder="Lorem ipsum dolor" />
    </div>
    <div>
      <span class="dummy-text-small">With value</span>
      <br />
      <Hds::Form::Textarea::Base @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco" />
    </div>
  </div>
  <h5 class="dummy-h6">States</h5>
  <div class="dummy-form-textarea-grid-sample">
    {{#let (array "base" "invalid" "readonly" "disabled") as |variants|}}
      {{#each variants as |variant|}}
        {{#each @model.STATES as |state|}}
          {{! template-lint-disable simple-unless }}
          {{#unless (and (eq variant "disabled") (eq state "focus"))}}
            <div>
              <span class="dummy-text-small">{{capitalize variant}} / {{capitalize state}}:</span>
              <br />
              <div class="dummy-form-textarea-sublist" mock-state-value={{state}} mock-state-selector="textarea">
                <Hds::Form::Textarea::Base
                  disabled={{if (eq variant "disabled") "disabled"}}
                  readonly={{if (eq variant "readonly") "readonly"}}
                  @isInvalid={{if (eq variant "invalid") true}}
                />
                <Hds::Form::Textarea::Base
                  placeholder="Placeholder"
                  disabled={{if (eq variant "disabled") "disabled"}}
                  readonly={{if (eq variant "readonly") "readonly"}}
                  @isInvalid={{if (eq variant "invalid") true}}
                />
                <Hds::Form::Textarea::Base
                  @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
                  disabled={{if (eq variant "disabled") "disabled"}}
                  readonly={{if (eq variant "readonly") "readonly"}}
                  @isInvalid={{if (eq variant "invalid") true}}
                />
              </div>
            </div>
          {{/unless}}
        {{/each}}
      {{/each}}
    {{/let}}
  </div>
  <h5 class="dummy-h6">Custom layout</h5>
  <div class="dummy-form-textarea-base-sample">
    <div>
      <span class="dummy-text-small">With custom layout</span>
      <br />
      <div class="dummy-form-textarea-custom-layout">
        <div class="dummy-form-textarea-custom-layout__heading">
          <label for="my-custom-textare-example">Custom label</label>
          <span>Some content</span>
        </div>
        <Hds::Form::Textarea::Base
          id="my-custom-textare-example"
          class="dummy-form-textarea-custom-layout__control"
          @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        />
      </div>
    </div>
  </div>
  <h5 class="dummy-h5">Containers</h5>
  <div class="dummy-form-textarea-containers">
    {{#let (array "block" "flex" "grid") as |displays|}}
      {{#each displays as |display|}}
        <div>
          <span class="dummy-text-small">Parent with <code class="dummy-code">display: {{display}}</code></span>
          <br />
          <div class="dummy-form-textarea-containers__{{display}}">
            <Hds::Form::Textarea::Base @value="Default width" />
          </div>
          <br />
          <div class="dummy-form-textarea-containers__{{display}}">
            <Hds::Form::Textarea::Base @value="Custom width" @width="248px" />
          </div>
        </div>
      {{/each}}
    {{/let}}
  </div>

  <h4 class="dummy-h4">"Field" control</h4>
  <h5 class="dummy-h5">Content</h5>
  <div class="dummy-form-textarea-grid-sample">
    <div>
      <span class="dummy-text-small">Only label</span>
      <br />
      <Hds::Form::Textarea::Field @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco" as |F|>
        <F.Label>This is the label text</F.Label>
      </Hds::Form::Textarea::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Helper text</span>
      <br />
      <Hds::Form::Textarea::Field @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco" as |F|>
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </Hds::Form::Textarea::Field>
    </div>
  </div>
  <br />
  <div class="dummy-form-textarea-grid-sample">
    <div>
      <span class="dummy-text-small">Label + Error</span>
      <br />
      <Hds::Form::Textarea::Field
        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        @isInvalid={{true}}
        as |F|
      >
        <F.Label>This is the label</F.Label>
        <F.Error>This is the error</F.Error>
      </Hds::Form::Textarea::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Helper text + Error</span>
      <br />
      <Hds::Form::Textarea::Field
        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        @isInvalid={{true}}
        as |F|
      >
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error>This is the error</F.Error>
      </Hds::Form::Textarea::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Helper text + Errors</span>
      <br />
      <Hds::Form::Textarea::Field @isInvalid={{true}} as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error as |E|>
          <E.Message>First error message</E.Message>
          <E.Message>Second error message</E.Message>
        </F.Error>
      </Hds::Form::Textarea::Field>
    </div>
  </div>
  <h5 class="dummy-h5">Required and optional</h5>
  <div class="dummy-form-textarea-grid-sample">
    <div>
      <span class="dummy-text-small">Label + Required</span>
      <br />
      <Hds::Form::Textarea::Field
        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        @isRequired={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </Hds::Form::Textarea::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Optional</span>
      <br />
      <Hds::Form::Textarea::Field
        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        @isOptional={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </Hds::Form::Textarea::Field>
    </div>
  </div>
  <h5 class="dummy-h5">Containers</h5>
  <div class="dummy-form-textarea-containers">
    {{#let (array "block" "flex" "grid") as |displays|}}
      {{#each displays as |display|}}
        <div>
          <span class="dummy-text-small">Parent with <code class="dummy-code">display: {{display}}</code></span>
          <br />
          <div class="dummy-form-textarea-containers__{{display}}">
            <Hds::Form::Textarea::Field @value="Default width" @isInvalid={{true}} as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Error>This is the error</F.Error>
            </Hds::Form::Textarea::Field>
          </div>
          <br />
          <div class="dummy-form-textarea-containers__{{display}}">
            <Hds::Form::Textarea::Field @value="Custom width" @width="248px" @isInvalid={{true}} as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Error>This is the error</F.Error>
            </Hds::Form::Textarea::Field>
          </div>
        </div>
      {{/each}}
    {{/let}}
  </div>

</section>
