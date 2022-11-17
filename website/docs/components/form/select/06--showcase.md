---
title: Form::Select
category: components
group: form
component: select
section: showcase
---


<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">"Base" control</h4>
  <h5 class="dummy-h6">Interaction status</h5>
  <div class="dummy-form-select-base-sample">
    <div>
      <span class="dummy-text-small">Default</span>
      <br />
      <Hds::Form::Select::Base as |C|>
        <C.Options>
          <option>Lorem ipsum dolor</option>
          <option>Sine qua non est</option>
        </C.Options>
      </Hds::Form::Select::Base>
    </div>
  </div>
  <h5 class="dummy-h6">States</h5>
  <div class="dummy-form-select-grid-sample">
    {{#let (array "base" "invalid" "disabled") as |variants|}}
      {{#each variants as |variant|}}
        {{#each @model.STATES as |state|}}
          {{! template-lint-disable simple-unless }}
          {{#unless (and (eq variant "disabled") (eq state "focus"))}}
            <div>
              <span class="dummy-text-small">{{capitalize variant}} / {{capitalize state}}:</span>
              <br />
              <div class="dummy-form-select-sublist" mock-state-value={{state}} mock-state-selector="select">
                <Hds::Form::Select::Field
                  disabled={{if (eq variant "disabled") "disabled"}}
                  @isInvalid={{if (eq variant "invalid") true}}
                  as |F|
                >
                  <F.Options>
                    <option>Lorem ipsum dolor</option>
                    <option>Sine qua non est</option>
                  </F.Options>
                </Hds::Form::Select::Field>
              </div>
            </div>
          {{/unless}}
        {{/each}}
      {{/each}}
    {{/let}}
  </div>
  <h5 class="dummy-h6">Custom layout</h5>
  <div class="dummy-form-select-base-sample">
    <div>
      <span class="dummy-text-small">With custom layout</span>
      <br />
      <div class="dummy-form-select-custom-layout">
        <label for="my-custom-select-example">Custom label</label>
        <Hds::Form::Select::Base id="my-custom-select-example" as |C|>
          <C.Options>
            <option>Lorem ipsum dolor</option>
            <option>Sine qua non est</option>
          </C.Options>
        </Hds::Form::Select::Base>
        <button type="button">Apply</button>
      </div>
    </div>
  </div>
  <h5 class="dummy-h5">Containers</h5>
  <div class="dummy-form-select-containers">
    {{#let (array "block" "flex" "grid") as |displays|}}
      {{#each displays as |display|}}
        <div>
          <span class="dummy-text-small">Parent with <code class="dummy-code">display: {{display}}</code></span>
          <br />
          <div class="dummy-form-select-sublist">
            <div class="dummy-form-select-containers__{{display}}">
              <Hds::Form::Select::Base as |C|>
                <C.Options>
                  <option>Default width</option>
                  <option>Lorem ipsum dolor</option>
                  <option>Sine qua non est</option>
                </C.Options>
              </Hds::Form::Select::Base>
            </div>
            <div class="dummy-form-select-containers__{{display}}">
              <Hds::Form::Select::Base @width="248px" as |C|>
                <C.Options>
                  <option>Custom width</option>
                  <option>Lorem ipsum dolor</option>
                  <option>Sine qua non est</option>
                </C.Options>
              </Hds::Form::Select::Base>
            </div>
          </div>
        </div>
      {{/each}}
    {{/let}}
  </div>

  <h4 class="dummy-h4">"Field" control</h4>
  <h5 class="dummy-h5">Content</h5>
  <div class="dummy-form-select-grid-sample">
    <div>
      <span class="dummy-text-small">Only label</span>
      <br />
      <Hds::Form::Select::Field as |F|>
        <F.Label>Lorem ipsum dolor</F.Label>
        <F.Options>
          <option>Lorem ipsum dolor</option>
          <option>Sine qua non est</option>
        </F.Options>
      </Hds::Form::Select::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Helper text</span>
      <br />
      <Hds::Form::Select::Field as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Options>
          <option>Lorem ipsum dolor</option>
          <option>Sine qua non est</option>
        </F.Options>
      </Hds::Form::Select::Field>
    </div>
  </div>
  <br />
  <div class="dummy-form-select-grid-sample">
    <div>
      <span class="dummy-text-small">Label + Error</span>
      <br />
      <Hds::Form::Select::Field @isInvalid={{true}} as |F|>
        <F.Label>This is the label</F.Label>
        <F.Options>
          <option>Lorem ipsum dolor</option>
          <option>Sine qua non est</option>
        </F.Options>
        <F.Error>This is the error</F.Error>
      </Hds::Form::Select::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Helper text + Error</span>
      <br />
      <Hds::Form::Select::Field @isInvalid={{true}} as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Options>
          <option>Lorem ipsum dolor</option>
          <option>Sine qua non est</option>
        </F.Options>
        <F.Error>This is the error</F.Error>
      </Hds::Form::Select::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Helper text + Errors</span>
      <br />
      <Hds::Form::Select::Field @isInvalid={{true}} as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Options>
          <option>Lorem ipsum dolor</option>
          <option>Sine qua non est</option>
        </F.Options>
        <F.Error as |E|>
          <E.Message>First error message</E.Message>
          <E.Message>Second error message</E.Message>
        </F.Error>
      </Hds::Form::Select::Field>
    </div>
  </div>
  <h5 class="dummy-h5">Required and optional</h5>
  <div class="dummy-form-select-grid-sample">
    <div>
      <span class="dummy-text-small">Label + Required</span>
      <br />
      <Hds::Form::Select::Field @isRequired={{true}} as |F|>
        <F.Label>Lorem ipsum dolor</F.Label>
        <F.Options>
          <option>Lorem ipsum dolor</option>
          <option>Sine qua non est</option>
        </F.Options>
      </Hds::Form::Select::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Optional</span>
      <br />
      <Hds::Form::Select::Field @isOptional={{true}} as |F|>
        <F.Label>Lorem ipsum dolor</F.Label>
        <F.Options>
          <option>Lorem ipsum dolor</option>
          <option>Sine qua non est</option>
        </F.Options>
      </Hds::Form::Select::Field>
    </div>
  </div>
  <h5 class="dummy-h5">Containers</h5>
  <div class="dummy-form-select-containers">
    {{#let (array "block" "flex" "grid") as |displays|}}
      {{#each displays as |display|}}
        <div>
          <span class="dummy-text-small">Parent with <code class="dummy-code">display: {{display}}</code></span>
          <br />
          <div class="dummy-form-select-containers__{{display}}">
            <Hds::Form::Select::Field @isInvalid={{true}} as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Options>
                <option>Lorem ipsum dolor</option>
                <option>Sine qua non est</option>
              </F.Options>
              <F.Error>This is the error</F.Error>
            </Hds::Form::Select::Field>
          </div>
        </div>
      {{/each}}
    {{/let}}
  </div>

</section>
