<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">"Base" control</h4>
  <h5 class="dummy-h6">Interaction status</h5>
  <div class="dummy-form-toggle-base-sample">
    <div>
      <span class="dummy-text-small">Unchecked</span>
      <br />
      <Hds::Form::Toggle::Base aria-label="Unchecked toggle" />
    </div>
    <div>
      <span class="dummy-text-small">Checked</span>
      <br />
      <Hds::Form::Toggle::Base checked="checked" aria-label="Checked toggle" />
    </div>
  </div>
  <h5 class="dummy-h6">States (Base / Disabled)</h5>
  <div class="dummy-form-toggle-states-grid">
    {{#each this.STATES as |state|}}
      <div>
        <span class="dummy-text-small">{{capitalize state}}:</span>
        <br />
        <div class="dummy-form-toggle-states-subgrid" mock-state-value={{state}} mock-state-selector="input">
          <Hds::Form::Toggle::Base aria-label="Toggle" />
          <Hds::Form::Toggle::Base checked="checked" aria-label="Checked toggle" />
          {{! template-lint-disable simple-unless }}
          {{#unless (eq state "focus")}}
            <Hds::Form::Toggle::Base disabled="disabled" aria-label="Disabled toggle" />
            <Hds::Form::Toggle::Base checked="checked" disabled="disabled" aria-label="Checked, disabled toggle" />
          {{/unless}}
        </div>
      </div>
    {{/each}}
  </div>
  <h5 class="dummy-h6">Custom layout</h5>
  <div class="dummy-form-toggle-base-sample">
    <div>
      <span class="dummy-text-small">With custom layout</span>
      <br />
      <div class="dummy-form-toggle-custom-layout">
        <label for="my-custom-toggle-example">Custom label</label>
        <Hds::Form::Toggle::Base id="my-custom-toggle-example" />
        <span>Some extra content</span>
      </div>
    </div>
  </div>

  <h4 class="dummy-h4">"Field" control</h4>
  <h5 class="dummy-h5">Content</h5>
  <div class="dummy-form-toggle-grid-sample">
    <div>
      <span class="dummy-text-small">Only label</span>
      <br />
      <Hds::Form::Toggle::Field as |F|>
        <F.Label>This is the label text</F.Label>
      </Hds::Form::Toggle::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Helper text</span>
      <br />
      <Hds::Form::Toggle::Field checked="checked" as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </Hds::Form::Toggle::Field>
    </div>
  </div>
  <br />
  <div class="dummy-form-toggle-grid-sample">
    <div>
      <span class="dummy-text-small">Label + Error</span>
      <br />
      <Hds::Form::Toggle::Field as |F|>
        <F.Label>This is the label</F.Label>
        <F.Error>This is the error</F.Error>
      </Hds::Form::Toggle::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Helper text + Error</span>
      <br />
      <Hds::Form::Toggle::Field checked="checked" as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error>This is the error</F.Error>
      </Hds::Form::Toggle::Field>
    </div>
    <div>
      <span class="dummy-text-small">Label + Helper text + Errors</span>
      <br />
      <Hds::Form::Toggle::Field checked="checked" as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error as |E|>
          <E.Message>First error message</E.Message>
          <E.Message>Second error message</E.Message>
        </F.Error>
      </Hds::Form::Toggle::Field>
    </div>
  </div>

  <h4 class="dummy-h4">"Group" of controls</h4>
  <h5 class="dummy-h5">Vertical layout / Single field</h5>
  <div class="dummy-form-toggle-grid-sample">
    <div>
      <span class="dummy-text-small">With legend</span>
      <br />
      <Hds::Form::Toggle::Group as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.Toggle::Field checked="checked" as |F|>
          <F.Label>This is the label</F.Label>
        </G.Toggle::Field>
      </Hds::Form::Toggle::Group>
    </div>
    <div>
      <span class="dummy-text-small">With legend / With helper text</span>
      <br />
      <Hds::Form::Toggle::Group as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.Toggle::Field checked="checked" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
        </G.Toggle::Field>
      </Hds::Form::Toggle::Group>
    </div>
    <div>
      <span class="dummy-text-small">With helper text at group level</span>
      <br />
      <Hds::Form::Toggle::Group as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.HelperText>Helper text for the entire group</G.HelperText>
        <G.Toggle::Field checked="checked" as |F|>
          <F.Label>This is the label</F.Label>
        </G.Toggle::Field>
      </Hds::Form::Toggle::Group>
    </div>
    <div>
      <span class="dummy-text-small">With error at group level</span>
      <br />
      <Hds::Form::Toggle::Group as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.Toggle::Field checked="checked" as |F|>
          <F.Label>This is the label</F.Label>
        </G.Toggle::Field>
        <G.Error>Error for the entire group</G.Error>
      </Hds::Form::Toggle::Group>
    </div>
  </div>

  <h5 class="dummy-h5">Vertical layout / Multiple fields</h5>
  <div class="dummy-form-toggle-grid-sample">
    <div>
      <span class="dummy-text-small">With legend</span>
      <br />
      <Hds::Form::Toggle::Group as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.Toggle::Field>
        <G.Toggle::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.Toggle::Field>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.Toggle::Field>
      </Hds::Form::Toggle::Group>
    </div>
    <div>
      <span class="dummy-text-small">With legend / With helper text</span>
      <br />
      <Hds::Form::Toggle::Group as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #1</F.Label>
          <F.HelperText>Helper text for control #1</F.HelperText>
        </G.Toggle::Field>
        <G.Toggle::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
          <F.HelperText>Helper text for control #2</F.HelperText>
        </G.Toggle::Field>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #3</F.Label>
          <F.HelperText>Helper text for control #3</F.HelperText>
        </G.Toggle::Field>
      </Hds::Form::Toggle::Group>
    </div>
    <div>
      <span class="dummy-text-small">Without legend</span>
      <br />
      <Hds::Form::Toggle::Group as |G|>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.Toggle::Field>
        <G.Toggle::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.Toggle::Field>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.Toggle::Field>
      </Hds::Form::Toggle::Group>
    </div>
    <div>
      <span class="dummy-text-small">Without Legend / With helper text</span>
      <br />
      <Hds::Form::Toggle::Group as |G|>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #1</F.Label>
          <F.HelperText>Helper text for control #1</F.HelperText>
        </G.Toggle::Field>
        <G.Toggle::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
          <F.HelperText>Helper text for control #2</F.HelperText>
        </G.Toggle::Field>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #3</F.Label>
          <F.HelperText>Helper text for control #3</F.HelperText>
        </G.Toggle::Field>
      </Hds::Form::Toggle::Group>
    </div>
    <div>
      <span class="dummy-text-small">With helper text at group level</span>
      <br />
      <Hds::Form::Toggle::Group as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.HelperText>Helper text for the entire group</G.HelperText>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.Toggle::Field>
        <G.Toggle::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.Toggle::Field>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.Toggle::Field>
      </Hds::Form::Toggle::Group>
    </div>
    <div>
      <span class="dummy-text-small">With error at group level</span>
      <br />
      <Hds::Form::Toggle::Group as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.Toggle::Field>
        <G.Toggle::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.Toggle::Field>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.Toggle::Field>
        <G.Error>Error for the entire group</G.Error>
      </Hds::Form::Toggle::Group>
    </div>
  </div>

  <h5 class="dummy-h5">Horizontal layout</h5>
  <span class="dummy-text-small">With legend</span>
  <br />
  <Hds::Form::Toggle::Group @layout="horizontal" as |G|>
    <G.Legend>Legend of the group</G.Legend>
    <G.Toggle::Field as |F|>
      <F.Label>Label of control #1</F.Label>
    </G.Toggle::Field>
    <G.Toggle::Field checked="checked" as |F|>
      <F.Label>Label of control #2</F.Label>
    </G.Toggle::Field>
    <G.Toggle::Field as |F|>
      <F.Label>Label of control #3</F.Label>
    </G.Toggle::Field>
  </Hds::Form::Toggle::Group>
  <br />
  <span class="dummy-text-small">Without legend</span>
  <br />
  <Hds::Form::Toggle::Group @layout="horizontal" as |G|>
    <G.Toggle::Field as |F|>
      <F.Label>Label of control #1</F.Label>
    </G.Toggle::Field>
    <G.Toggle::Field checked="checked" as |F|>
      <F.Label>Label of control #2</F.Label>
    </G.Toggle::Field>
    <G.Toggle::Field as |F|>
      <F.Label>Label of control #3</F.Label>
    </G.Toggle::Field>
  </Hds::Form::Toggle::Group>
  <br />
  <span class="dummy-text-small">With helper text at group level</span>
  <br />
  <Hds::Form::Toggle::Group @layout="horizontal" as |G|>
    <G.Legend>Legend of the group</G.Legend>
    <G.HelperText>Helper text for the entire group</G.HelperText>
    <G.Toggle::Field as |F|>
      <F.Label>Label of control #1</F.Label>
    </G.Toggle::Field>
    <G.Toggle::Field checked="checked" as |F|>
      <F.Label>Label of control #2</F.Label>
    </G.Toggle::Field>
    <G.Toggle::Field as |F|>
      <F.Label>Label of control #3</F.Label>
    </G.Toggle::Field>
  </Hds::Form::Toggle::Group>
  <br />
  <span class="dummy-text-small">With error at group level</span>
  <br />
  <Hds::Form::Toggle::Group @layout="horizontal" as |G|>
    <G.Legend>Legend of the group</G.Legend>
    <G.Toggle::Field as |F|>
      <F.Label>Label of control #1</F.Label>
    </G.Toggle::Field>
    <G.Toggle::Field checked="checked" as |F|>
      <F.Label>Label of control #2</F.Label>
    </G.Toggle::Field>
    <G.Toggle::Field as |F|>
      <F.Label>Label of control #3</F.Label>
    </G.Toggle::Field>
    <G.Error>Error for the entire group</G.Error>
  </Hds::Form::Toggle::Group>
  <br />
  <span class="dummy-text-small">With controls on multiple lines</span>
  <br />
  <div class="dummy-form-toggle-max-width-container">
    <Hds::Form::Toggle::Group @layout="horizontal" as |G|>
      <G.Legend>Lorem ipsum dolor</G.Legend>
      <G.Toggle::Field as |F|>
        <F.Label>Sit amet</F.Label>
      </G.Toggle::Field>
      <G.Toggle::Field checked="checked" as |F|>
        <F.Label>Consectetur adipiscing</F.Label>
      </G.Toggle::Field>
      <G.Toggle::Field as |F|>
        <F.Label>Elit</F.Label>
      </G.Toggle::Field>
      <G.Toggle::Field as |F|>
        <F.Label>Pellentesque erat</F.Label>
      </G.Toggle::Field>
      <G.Toggle::Field as |F|>
        <F.Label>Lacinia</F.Label>
      </G.Toggle::Field>
      <G.Toggle::Field checked="checked" as |F|>
        <F.Label>At magna</F.Label>
      </G.Toggle::Field>
    </Hds::Form::Toggle::Group>
  </div>
  <h5 class="dummy-h5">Required and optional</h5>
  <div class="dummy-form-toggle-grid-sample">
    <div>
      <span class="dummy-text-small">With legend + Required</span>
      <br />
      <Hds::Form::Toggle::Group @isRequired={{true}} as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.Toggle::Field>
        <G.Toggle::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.Toggle::Field>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.Toggle::Field>
      </Hds::Form::Toggle::Group>
    </div>
    <div>
      <span class="dummy-text-small">With legend + Optional</span>
      <br />
      <Hds::Form::Toggle::Group @isOptional={{true}} as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.Toggle::Field>
        <G.Toggle::Field checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.Toggle::Field>
        <G.Toggle::Field as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.Toggle::Field>
      </Hds::Form::Toggle::Group>
    </div>
  </div>
</section>