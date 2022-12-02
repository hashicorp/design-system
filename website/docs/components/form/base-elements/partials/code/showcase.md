<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">Label</h4>
  <span class="dummy-text-small">With simple text</span>
  <Hds::Form::Label>This is a simple label</Hds::Form::Label>
  <br />
  <span class="dummy-text-small">With required indicator</span>
  <Hds::Form::Label @isRequired={{true}}>This is the label</Hds::Form::Label>
  <br />
  <span class="dummy-text-small">With optional indicator</span>
  <Hds::Form::Label @isOptional={{true}}>This is the label</Hds::Form::Label>
  <br />
  <span class="dummy-text-small">With structured content (eg. a
    <code>flex</code>
    layout and a
    <code>&lt;Badge&gt;</code>)
  </span>
  <Hds::Form::Label>
    <div class="dummy-form-base-elements-label-with-badge">This is the label
      <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
    </div>
  </Hds::Form::Label>
  <br />
  <span class="dummy-text-small">With structured content (eg. a
    <code>flex</code>
    layout and a
    <code>&lt;Badge&gt;</code>) and required indicator
  </span>
  <div class="dummy-form-base-elements-label-with-badge">
    <Hds::Form::Label @isRequired={{true}}>
      This is the label
      <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
    </Hds::Form::Label>
  </div>
  <br />
  <span class="dummy-text-small">With structured content (eg. a
    <code>flex</code>
    layout and a
    <code>&lt;Badge&gt;</code>) and optional indicator
  </span>
  <div class="dummy-form-base-elements-label-with-badge">
    <Hds::Form::Label @isOptional={{true}}>
      This is the label
      <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
    </Hds::Form::Label>
  </div>
  <br />
  <span class="dummy-text-small">With text that spans multiple lines</span>
  <div class="dummy-form-base-elements-max-width-sample">
    <Hds::Form::Label>This is a very long label text that should go on multiple lines</Hds::Form::Label>
  </div>
  <br />
  <span class="dummy-text-small">With text that spans multiple lines and required indicator</span>
  <div class="dummy-form-base-elements-max-width-sample">
    <Hds::Form::Label @isRequired={{true}}>This is a very long label text that should go on multiple lines</Hds::Form::Label>
  </div>
  <br />
  <span class="dummy-text-small">With text that spans multiple lines and required indicator</span>
  <div class="dummy-form-base-elements-max-width-sample">
    <Hds::Form::Label @isOptional={{true}}>This is a very long label text that should go on multiple lines</Hds::Form::Label>
  </div>
  <br />
  <span class="dummy-text-small">With text that spans multiple lines, structured content (eg. a
    <code>flex</code>
    layout and a
    <code>&lt;Badge&gt;</code>) and required indicator
  </span>
  <div class="dummy-form-base-elements-max-width-sample dummy-form-base-elements-label-with-badge">
    <Hds::Form::Label @isRequired={{true}}>
      This is a very long label text that should go on multiple lines
      <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
    </Hds::Form::Label>
  </div>
  <br />

  {{! ###################### }}

  <hr class="dummy-divider" />

  <h4 class="dummy-h4">Helper text</h4>
  <span class="dummy-text-small">With simple text</span>
  <Hds::Form::HelperText>This is the helper text, usually used jointly with the label.</Hds::Form::HelperText>
  <br />
  <span class="dummy-text-small">With <code>&lt;Link::Inline&gt;</code></span>
  <Hds::Form::HelperText>This is a helper text
    <Hds::Link::Inline @route="index">with a link</Hds::Link::Inline></Hds::Form::HelperText>
  <br />
  <span class="dummy-text-small">With <code>&lt;Link::Inline&gt;</code> and <code>secondary</code> color</span>
  <Hds::Form::HelperText>This is a helper text
    <Hds::Link::Inline @route="index" @color="secondary">with a secondary link</Hds::Link::Inline></Hds::Form::HelperText>
  <br />
  <span class="dummy-text-small">With structured content (eg. HTML tags)</span>
  <Hds::Form::HelperText>
    A helper text may contain some
    <code>&lt;code&gt;</code>
    for example, or a
    <strong>&lt;strong&gt;</strong>.
  </Hds::Form::HelperText>
  <br />
  <span class="dummy-text-small">With text that spans multiple lines</span>
  <div class="dummy-form-base-elements-max-width-sample">
    <Hds::Form::HelperText>This is a very long helper text that should go on multiple lines</Hds::Form::HelperText>
  </div>

  {{! ###################### }}

  <hr class="dummy-divider" />

  <h4 class="dummy-h4">Indicator</h4>
  <div class="dummy-form-base-elements-base-sample">
    <div>
      <span class="dummy-text-small">isRequired</span>
      <br />
      <Hds::Form::Indicator @isRequired={{true}} />
    </div>
    <div>
      <span class="dummy-text-small">isOptional</span>
      <br />
      <Hds::Form::Indicator @isOptional={{true}} />
    </div>
    <div>
      <span class="dummy-text-small">No arguments</span>
      <br />
      <Hds::Form::Indicator />
    </div>
  </div>

  {{! ###################### }}

  <hr class="dummy-divider" />

  <h4 class="dummy-h4">Error</h4>
  <span class="dummy-text-small">With simple text</span>
  <Hds::Form::Error>This is a simple error message</Hds::Form::Error>
  <br />
  <span class="dummy-text-small">With text that spans multiple lines</span>
  <div class="dummy-form-base-elements-max-width-sample">
    <Hds::Form::Error>This is a very long error message that should span on multiple lines</Hds::Form::Error>
  </div>
  <br />
  <span class="dummy-text-small">With multiple error messages</span>
  <Hds::Form::Error as |Error|>
    {{#each this.SAMPLE_ERROR_MESSAGES as |message|}}
      <Error.Message>{{message}}</Error.Message>
    {{/each}}
  </Hds::Form::Error>

  {{! ###################### }}

  <hr class="dummy-divider" />

  <h4 class="dummy-h4">Legend</h4>
  <span class="dummy-text-small">With simple text</span>
  <Hds::Form::Legend>This is a simple legend</Hds::Form::Legend>
  <br />
  <span class="dummy-text-small">With <code>&lt;Link::Inline&gt;</code></span>
  <Hds::Form::Legend>This is a legend
    <Hds::Link::Inline @route="index">with a link</Hds::Link::Inline></Hds::Form::Legend>
  <br />
  <span class="dummy-text-small">With <code>&lt;Link::Inline&gt;</code> and <code>secondary</code> color</span>
  <Hds::Form::Legend>This is a legend
    <Hds::Link::Inline @route="index" @color="secondary">with a secondary link</Hds::Link::Inline></Hds::Form::Legend>
  <br />
  <span class="dummy-text-small">With required indicator</span>
  <Hds::Form::Legend @isRequired={{true}}>This is a simple legend</Hds::Form::Legend>
  <br />
  <span class="dummy-text-small">With optional indicator</span>
  <Hds::Form::Legend @isOptional={{true}}>This is a simple legend</Hds::Form::Legend>
  <br />
  <span class="dummy-text-small">With structured content (eg. a
    <code>flex</code>
    layout and a
    <code>&lt;Badge&gt;</code>)
  </span>
  <Hds::Form::Legend>
    <div class="dummy-form-base-elements-legend-with-badge">This is the legend
      <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
    </div>
  </Hds::Form::Legend>
  <br />
  <span class="dummy-text-small">With structured content (eg. a
    <code>flex</code>
    layout and a
    <code>&lt;Badge&gt;</code>) and required indicator
  </span>
  <div class="dummy-form-base-elements-legend-with-badge">
    <Hds::Form::Legend @isRequired={{true}}>
      This is the legend
      <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
    </Hds::Form::Legend>
  </div>
  <br />
  <span class="dummy-text-small">With structured content (eg. a
    <code>flex</code>
    layout and a
    <code>&lt;Badge&gt;</code>) and optional indicator
  </span>
  <div class="dummy-form-base-elements-legend-with-badge">
    <Hds::Form::Legend @isOptional={{true}}>
      This is the legend
      <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
    </Hds::Form::Legend>
  </div>
  <br />
  <span class="dummy-text-small">With text that spans multiple lines</span>
  <div class="dummy-form-base-elements-max-width-sample">
    <Hds::Form::Legend>This is a very long legend text that should go on multiple lines</Hds::Form::Legend>
  </div>
  <br />
  <span class="dummy-text-small">With text that spans multiple lines and required indicator</span>
  <div class="dummy-form-base-elements-max-width-sample">
    <Hds::Form::Legend @isRequired={{true}}>This is a very long legend text that should go on multiple lines</Hds::Form::Legend>
  </div>
  <br />
  <span class="dummy-text-small">With text that spans multiple lines and optional indicator</span>
  <div class="dummy-form-base-elements-max-width-sample">
    <Hds::Form::Legend @isOptional={{true}}>This is a very long legend text that should go on multiple lines</Hds::Form::Legend>
  </div>
  <br />
  <span class="dummy-text-small">With text that spans multiple lines, structured content (eg. a
    <code>flex</code>
    layout and a
    <code>&lt;Badge&gt;</code>) and required indicator
  </span>
  <div class="dummy-form-base-elements-legend-with-badge dummy-form-base-elements-max-width-sample">
    <Hds::Form::Legend @isRequired={{true}}>
      This is a very long legend text that should go on multiple lines
      <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
    </Hds::Form::Legend>
  </div>

  {{! ###################### }}

  <hr class="dummy-divider" />

  <h4 class="dummy-h4">Field</h4>
  <button id="dummy-toggle-highlight" type="button" {{on "click" this.toggleHighlight}}>{{if
      this.showHighlight
      "Hide"
      "Show"
    }}
    layout highlight</button>
  <div class="{{if this.showHighlight 'dummy-form-base-elements-layout-highlight'}}">
    <h5 class="dummy-h5">Layout</h5>
    <div class="dummy-form-base-elements-grid-sample">
      {{#let (array "vertical" "flag") as |layouts|}}
        {{#each layouts as |layout|}}
          <div>
            <span class="dummy-text-small">"{{layout}}" layout</span>
            <br />
            <Hds::Form::Field @layout={{layout}} as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Control>
                {{#if (eq layout "vertical")}}
                  <Doc::Placeholder
                    @text="control"
                    @width="100%"
                    @height="32"
                    @background="#eee"
                    class="hds-form-field__control"
                  />
                {{/if}}
                {{#if (eq layout "flag")}}
                  <Doc::Placeholder
                    @text="✔"
                    @width="16"
                    @height="16"
                    @background="#eee"
                    class="hds-form-field__control"
                  />
                {{/if}}
              </F.Control>
              <F.Error>This is the error</F.Error>
            </Hds::Form::Field>
          </div>
        {{/each}}
      {{/let}}
    </div>
    <br />
    {{#let (array "vertical" "flag") as |layouts|}}
      {{#each layouts as |layout|}}
        <h5 class="dummy-h5">Content / "{{layout}}" layout</h5>
        <div class="dummy-form-base-elements-grid-sample">
          <div>
            <span class="dummy-text-small">Only label</span>
            <br />
            <Hds::Form::Field @layout={{layout}} as |F|>
              <F.Label>This is the label text</F.Label>
              <F.Control>
                {{#if (eq layout "vertical")}}
                  <Doc::Placeholder
                    @text="control"
                    @width="100%"
                    @height="32"
                    @background="#eee"
                    class="hds-form-field__control"
                  />
                {{/if}}
                {{#if (eq layout "flag")}}
                  <Doc::Placeholder
                    @text="✔"
                    @width="16"
                    @height="16"
                    @background="#eee"
                    class="hds-form-field__control"
                  />
                {{/if}}
              </F.Control>
            </Hds::Form::Field>
          </div>
          <div>
            <span class="dummy-text-small">Label + Helper text</span>
            <br />
            <Hds::Form::Field @layout={{layout}} as |F|>
              <F.Label>This is the label text</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Control>
                {{#if (eq layout "vertical")}}
                  <Doc::Placeholder
                    @text="control"
                    @width="100%"
                    @height="32"
                    @background="#eee"
                    class="hds-form-field__control"
                  />
                {{/if}}
                {{#if (eq layout "flag")}}
                  <Doc::Placeholder
                    @text="✔"
                    @width="16"
                    @height="16"
                    @background="#eee"
                    class="hds-form-field__control"
                  />
                {{/if}}
              </F.Control>
            </Hds::Form::Field>
          </div>
          <div>
            <span class="dummy-text-small">Label + Helper text + Indicator</span>
            <br />
            <Hds::Form::Field @layout={{layout}} @isRequired={{true}} as |F|>
              <F.Label>This is the label text</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Control>
                {{#if (eq layout "vertical")}}
                  <Doc::Placeholder
                    @text="control"
                    @width="100%"
                    @height="32"
                    @background="#eee"
                    class="hds-form-field__control"
                  />
                {{/if}}
                {{#if (eq layout "flag")}}
                  <Doc::Placeholder
                    @text="✔"
                    @width="16"
                    @height="16"
                    @background="#eee"
                    class="hds-form-field__control"
                  />
                {{/if}}
              </F.Control>
            </Hds::Form::Field>
          </div>
        </div>
        <br />
        <div class="dummy-form-base-elements-grid-sample">
          <div>
            <span class="dummy-text-small">Label + Error</span>
            <br />
            <Hds::Form::Field @layout={{layout}} as |F|>
              <F.Label>This is the label</F.Label>
              <F.Control>
                {{#if (eq layout "vertical")}}
                  <Doc::Placeholder
                    @text="control"
                    @width="100%"
                    @height="32"
                    @background="#eee"
                    class="hds-form-field__control"
                  />
                {{/if}}
                {{#if (eq layout "flag")}}
                  <Doc::Placeholder
                    @text="✔"
                    @width="16"
                    @height="16"
                    @background="#eee"
                    class="hds-form-field__control"
                  />
                {{/if}}
              </F.Control>
              <F.Error>This is the error</F.Error>
            </Hds::Form::Field>
          </div>
          <div>
            <span class="dummy-text-small">Label + Helper text + Error</span>
            <br />
            <Hds::Form::Field @layout={{layout}} as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Control>
                {{#if (eq layout "vertical")}}
                  <Doc::Placeholder
                    @text="control"
                    @width="100%"
                    @height="32"
                    @background="#eee"
                    class="hds-form-field__control"
                  />
                {{/if}}
                {{#if (eq layout "flag")}}
                  <Doc::Placeholder
                    @text="✔"
                    @width="16"
                    @height="16"
                    @background="#eee"
                    class="hds-form-field__control"
                  />
                {{/if}}
              </F.Control>
              <F.Error>This is the error</F.Error>
            </Hds::Form::Field>
          </div>
          <div>
            <span class="dummy-text-small">Label + Helper text + Errors</span>
            <br />
            <Hds::Form::Field @layout={{layout}} as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Control>
                {{#if (eq layout "vertical")}}
                  <Doc::Placeholder
                    @text="control"
                    @width="100%"
                    @height="32"
                    @background="#eee"
                    class="hds-form-field__control"
                  />
                {{/if}}
                {{#if (eq layout "flag")}}
                  <Doc::Placeholder
                    @text="✔"
                    @width="16"
                    @height="16"
                    @background="#eee"
                    class="hds-form-field__control"
                  />
                {{/if}}
              </F.Control>
              <F.Error as |E|>
                <E.Message>First error message</E.Message>
                <E.Message>Second error message</E.Message>
              </F.Error>
            </Hds::Form::Field>
          </div>
        </div>
      {{/each}}
    {{/let}}

    {{#let (array "vertical" "flag") as |layouts|}}
      {{#each layouts as |layout|}}
        <h5 class="dummy-h5">Containers / "{{layout}}" layout</h5>
        <div class="dummy-form-base-elements-containers">
          {{#let (array "block" "flex" "grid") as |displays|}}
            {{#each displays as |display|}}
              <div>
                <span class="dummy-text-small">Parent with <code class="dummy-code">display: {{display}}</code></span>
                <br />
                <div class="dummy-form-base-elements-containers__{{display}}">
                  <Hds::Form::Field @layout={{layout}} @isRequired={{true}} as |F|>
                    <F.Label>This is the label</F.Label>
                    <F.HelperText>This is the helper text</F.HelperText>
                    <F.Control>
                      {{#if (eq layout "vertical")}}
                        <Doc::Placeholder
                          @text="control"
                          @width="100%"
                          @height="32"
                          @background="#eee"
                          class="hds-form-field__control"
                        />
                      {{/if}}
                      {{#if (eq layout "flag")}}
                        <Doc::Placeholder
                          @text="✔"
                          @width="16"
                          @height="16"
                          @background="#eee"
                          class="hds-form-field__control"
                        />
                      {{/if}}
                    </F.Control>
                    <F.Error>This is the error</F.Error>
                  </Hds::Form::Field>
                </div>
                <br />
                <div class="dummy-form-base-elements-containers__{{display}}">
                  <Hds::Form::Field @layout={{layout}} @isRequired={{true}} as |F|>
                    <F.Label>This is the label text that should go on multiple lines</F.Label>
                    <F.HelperText>This is the helper text that should go on multiple lines</F.HelperText>
                    <F.Control>
                      {{#if (eq layout "vertical")}}
                        <Doc::Placeholder
                          @text="control"
                          @width="100%"
                          @height="32"
                          @background="#eee"
                          class="hds-form-field__control"
                        />
                      {{/if}}
                      {{#if (eq layout "flag")}}
                        <Doc::Placeholder
                          @text="✔"
                          @width="16"
                          @height="16"
                          @background="#eee"
                          class="hds-form-field__control"
                        />
                      {{/if}}
                    </F.Control>
                    <F.Error as |E|>
                      <E.Message>This is the first error text</E.Message>
                      <E.Message>This is the second error text that should go on multiple lines</E.Message>
                    </F.Error>
                  </Hds::Form::Field>
                </div>
              </div>
            {{/each}}
          {{/let}}
        </div>
      {{/each}}
    {{/let}}
  </div>

  {{! ###################### }}

  <hr class="dummy-divider" />

  <h4 class="dummy-h4">Fieldset</h4>
  <button id="dummy-toggle-highlight-2" type="button" {{on "click" this.toggleHighlight}}>{{if
      this.showHighlight
      "Hide"
      "Show"
    }}
    layout highlight</button>
  <div class="{{if this.showHighlight 'dummy-form-base-elements-layout-highlight'}}">
    <h5 class="dummy-h5">Layout</h5>
    <div class="dummy-form-base-elements-fieldset-layout">
      {{#let (array "vertical" "horizontal") as |layouts|}}
        {{#each layouts as |layout|}}
          <div>
            <span class="dummy-text-small">"{{layout}}" layout</span>
            <br />
            <Hds::Form::Fieldset @layout={{layout}} as |F|>
              <F.Legend>This is the legend</F.Legend>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Control>
                <Doc::Placeholder
                  @text="field"
                  @width="120"
                  @height="32"
                  @background="#eee"
                  class="hds-form-group__control-field"
                />
              </F.Control>
              <F.Control>
                <Doc::Placeholder
                  @text="field"
                  @width="120"
                  @height="32"
                  @background="#eee"
                  class="hds-form-group__control-field"
                />
              </F.Control>
              <F.Control>
                <Doc::Placeholder
                  @text="field"
                  @width="120"
                  @height="32"
                  @background="#eee"
                  class="hds-form-group__control-field"
                />
              </F.Control>
              <F.Error>This is the error</F.Error>
            </Hds::Form::Fieldset>
          </div>
        {{/each}}
      {{/let}}
    </div>
    {{#let (array "vertical" "horizontal") as |layouts|}}
      {{#each layouts as |layout|}}
        <h5 class="dummy-h5">Containers / "{{layout}}" layout</h5>
        <div class="dummy-form-base-elements-containers">
          {{#let (array "block" "flex" "grid") as |displays|}}
            {{#each displays as |display|}}
              <div>
                <span class="dummy-text-small">Parent with <code class="dummy-code">display: {{display}}</code></span>
                <br />
                <div class="dummy-form-base-elements-containers__{{display}}">
                  <Hds::Form::Fieldset @layout={{layout}} @isRequired={{true}} as |F|>
                    <F.Legend>This is the legend</F.Legend>
                    <F.HelperText>This is the helper text</F.HelperText>
                    <F.Control>
                      <Doc::Placeholder
                        @text="field"
                        @width="120"
                        @height="32"
                        @background="#eee"
                        class="hds-form-group__control-field"
                      />
                    </F.Control>
                    <F.Control>
                      <Doc::Placeholder
                        @text="field"
                        @width="120"
                        @height="32"
                        @background="#eee"
                        class="hds-form-group__control-field"
                      />
                    </F.Control>
                    <F.Error>This is the error</F.Error>
                  </Hds::Form::Fieldset>
                </div>
                <br />
                <div class="dummy-form-base-elements-containers__{{display}}">
                  <Hds::Form::Fieldset @layout={{layout}} @isRequired={{true}} as |F|>
                    <F.Legend>This is the legend text that should go on multiple lines</F.Legend>
                    <F.HelperText>This is the helper text that should go on multiple lines</F.HelperText>
                    <F.Control>
                      <Doc::Placeholder
                        @text="field"
                        @width="120"
                        @height="32"
                        @background="#eee"
                        class="hds-form-group__control-field"
                      />
                    </F.Control>
                    <F.Control>
                      <Doc::Placeholder
                        @text="field"
                        @width="120"
                        @height="32"
                        @background="#eee"
                        class="hds-form-group__control-field"
                      />
                    </F.Control>
                    <F.Error as |E|>
                      <E.Message>This is the first error text</E.Message>
                      <E.Message>This is the second error text that should go on multiple lines</E.Message>
                    </F.Error>
                  </Hds::Form::Fieldset>
                </div>
              </div>
            {{/each}}
          {{/let}}
        </div>
      {{/each}}
    {{/let}}
  </div>

</section>