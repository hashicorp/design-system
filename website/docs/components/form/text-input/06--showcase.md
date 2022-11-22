---
title: Form::TextInput
category: components
group: form
component: text-input
section: showcase
---


<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">"Base" control</h4>
  <h5 class="dummy-h6">Interaction status</h5>
  <div class="dummy-form-text-input-base-sample">
    <div>
      <span class="dummy-text-small">Default</span>
      <br />
      <Hds::Form::TextInput::Base />
    </div>
    <div>
      <span class="dummy-text-small">With placeholder</span>
      <br />
      <Hds::Form::TextInput::Base placeholder="Lorem ipsum dolor" />
    </div>
    <div>
      <span class="dummy-text-small">With value</span>
      <br />
      <Hds::Form::TextInput::Base @value="Lorem ipsum dolor" />
    </div>
  </div>
  <h5 class="dummy-h5">Types (native)</h5>
  <div class="dummy-form-text-input-types-grid">
    {{#each @model.TYPES as |type|}}
      <div>
        <span class="dummy-text-small">{{capitalize type}}:</span>
        <br />
        <Hds::Form::TextInput::Base @type={{type}} @value={{type}} />
      </div>
    {{/each}}
  </div>
  <h5 class="dummy-h6">States</h5>
  <div class="dummy-form-text-input-grid-sample">
    {{#let (array "base" "invalid" "readonly" "disabled") as |variants|}}
      {{#each variants as |variant|}}
        {{#each @model.STATES as |state|}}
          {{! template-lint-disable simple-unless }}
          {{#unless (and (eq variant "disabled") (eq state "focus"))}}
            <div>
              <span class="dummy-text-small">{{capitalize variant}} / {{capitalize state}}:</span>
              <br />
              <div class="dummy-form-text-input-sublist" mock-state-value={{state}} mock-state-selector="input">
                <div>
                  <Hds::Form::TextInput::Base
                    disabled={{if (eq variant "disabled") "disabled"}}
                    readonly={{if (eq variant "readonly") "readonly"}}
                    @isInvalid={{if (eq variant "invalid") true}}
                  />
                </div>
                <div>
                  <Hds::Form::TextInput::Base
                    placeholder="Placeholder"
                    disabled={{if (eq variant "disabled") "disabled"}}
                    readonly={{if (eq variant "readonly") "readonly"}}
                    @isInvalid={{if (eq variant "invalid") true}}
                  />
                </div>
                <div>
                  <Hds::Form::TextInput::Base
                    @value="Lorem ipsum dolor"
                    disabled={{if (eq variant "disabled") "disabled"}}
                    readonly={{if (eq variant "readonly") "readonly"}}
                    @isInvalid={{if (eq variant "invalid") true}}
                  />
                </div>
                <div>
                  <Hds::Form::TextInput::Base
                    @type="password"
                    @value="Lorem ipsum dolor"
                    disabled={{if (eq variant "disabled") "disabled"}}
                    readonly={{if (eq variant "readonly") "readonly"}}
                    @isInvalid={{if (eq variant "invalid") true}}
                  />
                </div>
                <div>
                  <Hds::Form::TextInput::Base
                    @type="search"
                    @value="Lorem ipsum dolor"
                    disabled={{if (eq variant "disabled") "disabled"}}
                    readonly={{if (eq variant "readonly") "readonly"}}
                    @isInvalid={{if (eq variant "invalid") true}}
                  />
                </div>
                <div>
                  <Hds::Form::TextInput::Base
                    @type="date"
                    @value="Lorem ipsum dolor"
                    disabled={{if (eq variant "disabled") "disabled"}}
                    readonly={{if (eq variant "readonly") "readonly"}}
                    @isInvalid={{if (eq variant "invalid") true}}
                  />
                </div>
                <div>
                  <Hds::Form::TextInput::Base
                    @type="time"
                    @value="Lorem ipsum dolor"
                    disabled={{if (eq variant "disabled") "disabled"}}
                    readonly={{if (eq variant "readonly") "readonly"}}
                    @isInvalid={{if (eq variant "invalid") true}}
                  />
                </div>
              </div>
            </div>
          {{/unless}}
        {{/each}}
      {{/each}}
    {{/let}}
  </div>
  <h5 class="dummy-h6">Custom layout</h5>
  <div class="dummy-form-text-input-base-sample">
    <div>
      <span class="dummy-text-small">With custom layout</span>
      <br />
      <div class="dummy-form-text-input-custom-layout">
        <label for="my-custom-text-input-example">Custom label</label>
        <Hds::Form::TextInput::Base id="my-custom-text-input-example" @value="Lorem ipsum dolor" />
        <span class="dummy-form-text-input-custom-layout__append-text">Some content</span>
      </div>
    </div>
  </div>
  <h5 class="dummy-h5">Containers</h5>
  <div class="dummy-form-text-input-containers">
    {{#let (array "block" "flex" "grid") as |displays|}}
      {{#each displays as |display|}}
        <div>
          <span class="dummy-text-small">Parent with <code class="dummy-code">display: {{display}}</code></span>
          <br />
          <div class="dummy-form-text-input-sublist">
            <div class="dummy-form-text-input-containers__{{display}}">
              <Hds::Form::TextInput::Base @value="Default width" />
            </div>
            <div class="dummy-form-text-input-containers__{{display}}">
              <Hds::Form::TextInput::Base @value="Custom width" @width="248px" />
            </div>
            <div class="dummy-form-text-input-containers__{{display}}">
              <Hds::Form::TextInput::Base @type="date" />
            </div>
            <div class="dummy-form-text-input-containers__{{display}}">
              <Hds::Form::TextInput::Base @type="time" />
            </div>
          </div>
        </div>
      {{/each}}
    {{/let}}
  </div>

  <h4 class="dummy-h4">"Field" control</h4>
  <h5 class="dummy-h5">Content</h5>
  <div class="dummy-form-text-input-grid-sample">
    <div>
      <span class="dummy-text-small">Only label</span>
      <br />
      <Hds::Form::TextInput::Field @value="Lorem ipsum dolor" as |F|>
        <F.Label>This is the label text</F.Label>
      </Hds::Form::TextInput::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Helper text</span>
      <br />
      <Hds::Form::TextInput::Field @value="Lorem ipsum dolor" as |F|>
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </Hds::Form::TextInput::Field>
    </div>
  </div>
  <br />
  <div class="dummy-form-text-input-grid-sample">
    <div>
      <span class="dummy-text-small">Label + Error</span>
      <br />
      <Hds::Form::TextInput::Field @value="Lorem ipsum dolor" @isInvalid={{true}} as |F|>
        <F.Label>This is the label</F.Label>
        <F.Error>This is the error</F.Error>
      </Hds::Form::TextInput::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Helper text + Error</span>
      <br />
      <Hds::Form::TextInput::Field @value="Lorem ipsum dolor" @isInvalid={{true}} as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error>This is the error</F.Error>
      </Hds::Form::TextInput::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Helper text + Errors</span>
      <br />
      <Hds::Form::TextInput::Field @value="Lorem ipsum dolor" @isInvalid={{true}} as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error as |E|>
          <E.Message>First error message</E.Message>
          <E.Message>Second error message</E.Message>
        </F.Error>
      </Hds::Form::TextInput::Field>
    </div>
  </div>
  <h5 class="dummy-h5">Required and optional</h5>
  <div class="dummy-form-text-input-grid-sample">
    <div>
      <span class="dummy-text-small">Label + Required</span>
      <br />
      <Hds::Form::TextInput::Field @value="Lorem ipsum dolor" @isRequired={{true}} as |F|>
        <F.Label>This is the label text</F.Label>
      </Hds::Form::TextInput::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Optional</span>
      <br />
      <Hds::Form::TextInput::Field @value="Lorem ipsum dolor" @isOptional={{true}} as |F|>
        <F.Label>This is the label text</F.Label>
      </Hds::Form::TextInput::Field>
    </div>
  </div>
  <h5 class="dummy-h5">Containers</h5>
  <div class="dummy-form-text-input-containers">
    {{#let (array "block" "flex" "grid") as |displays|}}
      {{#each displays as |display|}}
        <div>
          <span class="dummy-text-small">Parent with <code class="dummy-code">display: {{display}}</code></span>
          <br />
          <div class="dummy-form-text-input-containers__{{display}}">
            <Hds::Form::TextInput::Field @value="Default width" as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
            </Hds::Form::TextInput::Field>
          </div>
          <br />
          <div class="dummy-form-text-input-containers__{{display}}">
            <Hds::Form::TextInput::Field @value="Custom width" @width="120px" @isInvalid={{true}} as |F|>
              <F.Label>This is the label text that should go on multiple lines</F.Label>
              <F.HelperText>This is the helper text that should go on multiple lines</F.HelperText>
              <F.Error as |E|>
                <E.Message>This is the first error text</E.Message>
                <E.Message>This is the second error text that should go on multiple lines</E.Message>
              </F.Error>
            </Hds::Form::TextInput::Field>
          </div>
        </div>
      {{/each}}
    {{/let}}
  </div>

</section>
