<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">"Base" control</h4>
  <h5 class="dummy-h6">Interaction status</h5>
  <div class="dummy-form-checkbox-base-sample">
    <div>
      <span class="dummy-text-small">Unchecked</span>
      <br />
      <Hds::Form::Checkbox::Base aria-label="Unchecked checkbox" />
    </div>
    <div>
      <span class="dummy-text-small">Checked</span>
      <br />
      <Hds::Form::Checkbox::Base checked="checked" aria-label="Checked checkbox" />
    </div>
  </div>
  <h5 class="dummy-h6">States (Base / Disabled)</h5>
  <div class="dummy-form-checkbox-states-grid">
    {{#each @model.STATES as |state|}}
      <div>
        <span class="dummy-text-small">{{capitalize state}}:</span>
        <br />
        <div class="dummy-form-checkbox-states-subgrid" mock-state-value={{state}} mock-state-selector="input">
          <Hds::Form::Checkbox::Base aria-label="Checkbox" />
          <Hds::Form::Checkbox::Base checked="checked" aria-label="Checked checkbox" />
          {{! template-lint-disable simple-unless }}
          {{#unless (eq state "focus")}}
            <Hds::Form::Checkbox::Base disabled="disabled" aria-label="Disabled checkbox" />
            <Hds::Form::Checkbox::Base checked="checked" disabled="disabled" aria-label="Checked, disabled checkbox" />
          {{/unless}}
        </div>
      </div>
    {{/each}}
  </div>
  <h5 class="dummy-h6">Custom layout</h5>
  <div class="dummy-form-checkbox-base-sample">
    <div>
      <span class="dummy-text-small">With custom layout</span>
      <br />
      <div class="dummy-form-checkbox-custom-layout">
        <label for="my-custom-checkbox-example">Custom label</label>
        <Hds::Form::Checkbox::Base id="my-custom-checkbox-example" />
        <span>Some extra content</span>
      </div>
    </div>
  </div>

  <h4 class="dummy-h4">"Field" control</h4>
  <h5 class="dummy-h5">Content</h5>
  <div class="dummy-form-checkbox-grid-sample">
    <div>
      <span class="dummy-text-small">Only label</span>
      <br />
      <Hds::Form::Checkbox::Field as |F|>
        <F.Label>This is the label text</F.Label>
      </Hds::Form::Checkbox::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Helper text</span>
      <br />
      <Hds::Form::Checkbox::Field checked="checked" as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </Hds::Form::Checkbox::Field>
    </div>
  </div>
  <br />
  <div class="dummy-form-checkbox-grid-sample">
    <div>
      <span class="dummy-text-small">Label + Error</span>
      <br />
      <Hds::Form::Checkbox::Field as |F|>
        <F.Label>This is the label</F.Label>
        <F.Error>This is the error</F.Error>
      </Hds::Form::Checkbox::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Helper text + Error</span>
      <br />
      <Hds::Form::Checkbox::Field checked="checked" as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error>This is the error</F.Error>
      </Hds::Form::Checkbox::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Helper text + Errors</span>
      <br />
      <Hds::Form::Checkbox::Field checked="checked" as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error as |E|>
          <E.Message>First error message</E.Message>
          <E.Message>Second error message</E.Message>
        </F.Error>
      </Hds::Form::Checkbox::Field>
    </div>
  </div>

  <h4 class="dummy-h4">"Group" of controls</h4>
  <h5 class="dummy-h5">Vertical layout</h5>
  <div class="dummy-form-checkbox-grid-sample">
    <div>
      <span class="dummy-text-small">With legend</span>
      <br />
      <Hds::Form::Checkbox::Group @name="control-vertical-01" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.Checkbox::Field>
        <G.Checkbox::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.Checkbox::Field>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.Checkbox::Field>
      </Hds::Form::Checkbox::Group>
    </div>
    <div>
      <span class="dummy-text-small">With legend / With helper text</span>
      <br />
      <Hds::Form::Checkbox::Group @name="control-vertical-02" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #1</F.Label>
          <F.HelperText>Helper text for control #1</F.HelperText>
        </G.Checkbox::Field>
        <G.Checkbox::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
          <F.HelperText>Helper text for control #2</F.HelperText>
        </G.Checkbox::Field>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #3</F.Label>
          <F.HelperText>Helper text for control #3</F.HelperText>
        </G.Checkbox::Field>
      </Hds::Form::Checkbox::Group>
    </div>
    <div>
      <span class="dummy-text-small">Without legend</span>
      <br />
      <Hds::Form::Checkbox::Group @name="control-vertical-03" as |G|>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.Checkbox::Field>
        <G.Checkbox::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.Checkbox::Field>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.Checkbox::Field>
      </Hds::Form::Checkbox::Group>
    </div>
    <div>
      <span class="dummy-text-small">Without Legend / With helper text</span>
      <br />
      <Hds::Form::Checkbox::Group @name="control-vertical-04" as |G|>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #1</F.Label>
          <F.HelperText>Helper text for control #1</F.HelperText>
        </G.Checkbox::Field>
        <G.Checkbox::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
          <F.HelperText>Helper text for control #2</F.HelperText>
        </G.Checkbox::Field>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #3</F.Label>
          <F.HelperText>Helper text for control #3</F.HelperText>
        </G.Checkbox::Field>
      </Hds::Form::Checkbox::Group>
    </div>
    <div>
      <span class="dummy-text-small">With helper text at group level</span>
      <br />
      <Hds::Form::Checkbox::Group @name="control-vertical-05" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.HelperText>Helper text for the entire group</G.HelperText>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.Checkbox::Field>
        <G.Checkbox::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.Checkbox::Field>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.Checkbox::Field>
      </Hds::Form::Checkbox::Group>
    </div>
    <div>
      <span class="dummy-text-small">With error at group level</span>
      <br />
      <Hds::Form::Checkbox::Group @name="control-vertical-06" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.Checkbox::Field>
        <G.Checkbox::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.Checkbox::Field>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.Checkbox::Field>
        <G.Error>Error for the entire group</G.Error>
      </Hds::Form::Checkbox::Group>
    </div>
  </div>

  <h5 class="dummy-h5">Horizontal layout</h5>
  <span class="dummy-text-small">With legend</span>
  <br />
  <Hds::Form::Checkbox::Group @layout="horizontal" @name="control-horizontal-01" as |G|>
    <G.Legend>Legend of the group</G.Legend>
    <G.Checkbox::Field as |F|>
      <F.Label>Label of control #1</F.Label>
    </G.Checkbox::Field>
    <G.Checkbox::Field checked="checked" as |F|>
      <F.Label>Label of control #2</F.Label>
    </G.Checkbox::Field>
    <G.Checkbox::Field as |F|>
      <F.Label>Label of control #3</F.Label>
    </G.Checkbox::Field>
  </Hds::Form::Checkbox::Group>
  <br />
  <span class="dummy-text-small">Without legend</span>
  <br />
  <Hds::Form::Checkbox::Group @layout="horizontal" @name="control-horizontal-02" as |G|>
    <G.Checkbox::Field as |F|>
      <F.Label>Label of control #1</F.Label>
    </G.Checkbox::Field>
    <G.Checkbox::Field checked="checked" as |F|>
      <F.Label>Label of control #2</F.Label>
    </G.Checkbox::Field>
    <G.Checkbox::Field as |F|>
      <F.Label>Label of control #3</F.Label>
    </G.Checkbox::Field>
  </Hds::Form::Checkbox::Group>
  <br />
  <span class="dummy-text-small">With helper text at group level</span>
  <br />
  <Hds::Form::Checkbox::Group @layout="horizontal" @name="control-horizontal-03" as |G|>
    <G.Legend>Legend of the group</G.Legend>
    <G.HelperText>Helper text for the entire group</G.HelperText>
    <G.Checkbox::Field as |F|>
      <F.Label>Label of control #1</F.Label>
    </G.Checkbox::Field>
    <G.Checkbox::Field checked="checked" as |F|>
      <F.Label>Label of control #2</F.Label>
    </G.Checkbox::Field>
    <G.Checkbox::Field as |F|>
      <F.Label>Label of control #3</F.Label>
    </G.Checkbox::Field>
  </Hds::Form::Checkbox::Group>
  <br />
  <span class="dummy-text-small">With error at group level</span>
  <br />
  <Hds::Form::Checkbox::Group @layout="horizontal" @name="control-horizontal-04" as |G|>
    <G.Legend>Legend of the group</G.Legend>
    <G.Checkbox::Field as |F|>
      <F.Label>Label of control #1</F.Label>
    </G.Checkbox::Field>
    <G.Checkbox::Field checked="checked" as |F|>
      <F.Label>Label of control #2</F.Label>
    </G.Checkbox::Field>
    <G.Checkbox::Field as |F|>
      <F.Label>Label of control #3</F.Label>
    </G.Checkbox::Field>
    <G.Error>Error for the entire group</G.Error>
  </Hds::Form::Checkbox::Group>
  <br />
  <span class="dummy-text-small">With controls on multiple lines</span>
  <br />
  <div class="dummy-form-checkbox-max-width-container">
    <Hds::Form::Checkbox::Group @layout="horizontal" @name="control-horizontal-05" as |G|>
      <G.Legend>Lorem ipsum dolor</G.Legend>
      <G.Checkbox::Field as |F|>
        <F.Label>Sit amet</F.Label>
      </G.Checkbox::Field>
      <G.Checkbox::Field checked="checked" as |F|>
        <F.Label>Consectetur adipiscing</F.Label>
      </G.Checkbox::Field>
      <G.Checkbox::Field as |F|>
        <F.Label>Elit</F.Label>
      </G.Checkbox::Field>
      <G.Checkbox::Field as |F|>
        <F.Label>Pellentesque erat</F.Label>
      </G.Checkbox::Field>
      <G.Checkbox::Field as |F|>
        <F.Label>Lacinia</F.Label>
      </G.Checkbox::Field>
      <G.Checkbox::Field checked="checked" as |F|>
        <F.Label>At magna</F.Label>
      </G.Checkbox::Field>
    </Hds::Form::Checkbox::Group>
  </div>

  <h5 class="dummy-h5">Required and optional</h5>
  <div class="dummy-form-checkbox-grid-sample">
    <div>
      <span class="dummy-text-small">With legend + Required</span>
      <br />
      <Hds::Form::Checkbox::Group @isRequired={{true}} @name="control-required" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.Checkbox::Field>
        <G.Checkbox::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.Checkbox::Field>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.Checkbox::Field>
      </Hds::Form::Checkbox::Group>
    </div>
    <div>
      <span class="dummy-text-small">With legend + Optional</span>
      <br />
      <Hds::Form::Checkbox::Group @isOptional={{true}} @name="control-optional" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.Checkbox::Field>
        <G.Checkbox::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.Checkbox::Field>
        <G.Checkbox::Field as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.Checkbox::Field>
      </Hds::Form::Checkbox::Group>
    </div>
  </div>
</section>