<h1>Form::RadioCard Component - Showcase</h1>

<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">States</h4>
  <div class="dummy-form-radio-card-states-grid">
    {{#each @model.STATES as |state|}}
      <div>
        <span class="dummy-text-small">{{capitalize state}}</span>
        <br />
        <div mock-state-value={{state}} mock-state-selector="label">
          <Hds::Form::RadioCard {{on "change" this.onChange}} @disabled={{eq state "disabled"}} as |R|>
            <R.Icon @name="hexagon" />
            <R.Label>Label</R.Label>
            <R.Description>Description</R.Description>
          </Hds::Form::RadioCard>
        </div>
      </div>
    {{/each}}
  </div>
  <div class="dummy-form-radio-card-states-grid">
    {{#each @model.STATES as |state|}}
      <div>
        <span class="dummy-text-small">{{capitalize state}} selected</span>
        <br />
        <div mock-state-value={{state}} mock-state-selector="label">
          <Hds::Form::RadioCard {{on "change" this.onChange}} @checked={{true}} @disabled={{eq state "disabled"}} as |R|>
            <R.Icon @name="hexagon" />
            <R.Label>Label</R.Label>
            <R.Description>Description</R.Description>
          </Hds::Form::RadioCard>
        </div>
      </div>
    {{/each}}
  </div>

  <h4 class="dummy-h4">Card content</h4>
  <Hds::Form::RadioCard::Group @name="radio-card-default" as |G|>
    <G.Legend>Group legend</G.Legend>
    {{#each @model.RADIOCARDS as |item|}}
      <G.RadioCard @checked={{item.checked}} @value={{item.value}} {{on "change" this.onChange}} as |R|>
        <R.Icon @name="hexagon" />
        <R.Label>{{item.label}}</R.Label>
        <R.Badge @text={{item.badge}} />
        <R.Description>{{item.description}}</R.Description>
      </G.RadioCard>
    {{/each}}
  </Hds::Form::RadioCard::Group>
  <br />
  <span class="dummy-text-small">Custom content</span>
  <Hds::Form::RadioCard::Group @name="radio-card-custom" as |G|>
    <G.Legend>Group legend</G.Legend>
    {{#each @model.RADIOCARDS as |item|}}
      <G.RadioCard @checked={{item.checked}} @value={{item.value}} {{on "change" this.onChange}} as |R|>
        <R.Icon @name="hexagon" />
        <R.Label>{{item.label}}</R.Label>
        <R.Generic>
          <DummyPlaceholder @text={{item.generic}} @height="50" @background="#eee" />
        </R.Generic>
      </G.RadioCard>
    {{/each}}
  </Hds::Form::RadioCard::Group>
  <br />
  <span class="dummy-text-small">With different content height</span>
  <Hds::Form::RadioCard::Group @name="radio-card-group-custom" as |G|>
    <G.Legend>Group legend</G.Legend>
    <G.RadioCard @checked={{true}} {{on "change" this.onChange}} as |R|>
      <R.Icon @name="hexagon" />
      <R.Label>Radio card with normal label</R.Label>
      <R.Badge @text="Badge" />
      <R.Description>This is the radio card description text.</R.Description>
    </G.RadioCard>
    <G.RadioCard {{on "change" this.onChange}} as |R|>
      <R.Icon @name="hexagon" />
      <R.Label>Radio card with long label that spans multiple lines</R.Label>
      <R.Badge @text="Badge" />
      <R.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque erat elit, lacinia at magna
        eget, porttitor lobortis nulla.</R.Description>
    </G.RadioCard>
    <G.RadioCard {{on "change" this.onChange}} as |R|>
      <R.Label>Radio card without icon</R.Label>
      <R.Description>This is the radio card description text.</R.Description>
    </G.RadioCard>
  </Hds::Form::RadioCard::Group>
  <br />

  <h4 class="dummy-h4">Control position</h4>
  <span class="dummy-text-small">Bottom</span>
  <Hds::Form::RadioCard::Group @name="radio-card-position-bottom" @controlPosition="bottom" as |G|>
    <G.Legend>Group legend</G.Legend>
    {{#each @model.RADIOCARDS as |item|}}
      <G.RadioCard @checked={{item.checked}} @value={{item.value}} {{on "change" this.onChange}} as |R|>
        <R.Icon @name="hexagon" />
        <R.Label>{{item.label}}</R.Label>
        <R.Badge @text={{item.badge}} />
        <R.Description>{{item.description}}</R.Description>
      </G.RadioCard>
    {{/each}}
  </Hds::Form::RadioCard::Group>
  <br />
  <span class="dummy-text-small">Left</span>
  <Hds::Form::RadioCard::Group @name="radio-card-position-left" @controlPosition="left" as |G|>
    <G.Legend>Group legend</G.Legend>
    {{#each @model.RADIOCARDS as |item|}}
      <G.RadioCard @checked={{item.checked}} @value={{item.value}} {{on "change" this.onChange}} as |R|>
        <R.Icon @name="hexagon" />
        <R.Label>{{item.label}}</R.Label>
        <R.Badge @text={{item.badge}} />
        <R.Description>{{item.description}}</R.Description>
      </G.RadioCard>
    {{/each}}
  </Hds::Form::RadioCard::Group>
  <br />

  <h4 class="dummy-h4">Card alignment</h4>
  <span class="dummy-text-small">Left</span>
  <Hds::Form::RadioCard::Group @name="radio-card-align-left" @alignment="left" as |G|>
    <G.Legend>Group legend</G.Legend>
    {{#each @model.RADIOCARDS as |item|}}
      <G.RadioCard @checked={{item.checked}} @value={{item.value}} {{on "change" this.onChange}} as |R|>
        <R.Icon @name="hexagon" />
        <R.Label>{{item.label}}</R.Label>
        <R.Badge @text={{item.badge}} />
        <R.Description>{{item.description}}</R.Description>
      </G.RadioCard>
    {{/each}}
  </Hds::Form::RadioCard::Group>
  <br />
  <span class="dummy-text-small">Center</span>
  <Hds::Form::RadioCard::Group @name="radio-card-align-center" @alignment="center" as |G|>
    <G.Legend>Group legend</G.Legend>
    {{#each @model.RADIOCARDS as |item|}}
      <G.RadioCard @checked={{item.checked}} @value={{item.value}} {{on "change" this.onChange}} as |R|>
        <R.Icon @name="hexagon" />
        <R.Label>{{item.label}}</R.Label>
        <R.Badge @text={{item.badge}} />
        <R.Description>{{item.description}}</R.Description>
      </G.RadioCard>
    {{/each}}
  </Hds::Form::RadioCard::Group>
  <br />

  <h4 class="dummy-h4">Group content</h4>
  <span class="dummy-text-small">With legend</span>
  <Hds::Form::RadioCard::Group @name="radio-card-legend" as |G|>
    <G.Legend>Group legend</G.Legend>
    {{#each @model.RADIOCARDS as |item|}}
      <G.RadioCard @checked={{item.checked}} @value={{item.value}} {{on "change" this.onChange}} as |R|>
        <R.Icon @name="hexagon" />
        <R.Label>{{item.label}}</R.Label>
        <R.Description>{{item.description}}</R.Description>
      </G.RadioCard>
    {{/each}}
  </Hds::Form::RadioCard::Group>
  <br />
  <span class="dummy-text-small">With legend and helper text</span>
  <Hds::Form::RadioCard::Group @name="radio-card-helper-text" as |G|>
    <G.Legend>Group legend</G.Legend>
    <G.HelperText>Group helper text</G.HelperText>
    {{#each @model.RADIOCARDS as |item|}}
      <G.RadioCard @checked={{item.checked}} @value={{item.value}} {{on "change" this.onChange}} as |R|>
        <R.Icon @name="hexagon" />
        <R.Label>{{item.label}}</R.Label>
        <R.Description>{{item.description}}</R.Description>
      </G.RadioCard>
    {{/each}}
  </Hds::Form::RadioCard::Group>
  <br />
  <span class="dummy-text-small">With legend and error</span>
  <Hds::Form::RadioCard::Group @name="radio-card-error" as |G|>
    <G.Legend>Group legend</G.Legend>
    {{#each @model.RADIOCARDS as |item|}}
      <G.RadioCard @checked={{item.checked}} @value={{item.value}} {{on "change" this.onChange}} as |R|>
        <R.Icon @name="hexagon" />
        <R.Label>{{item.label}}</R.Label>
        <R.Description>{{item.description}}</R.Description>
      </G.RadioCard>
    {{/each}}
    <G.Error>Group error message</G.Error>
  </Hds::Form::RadioCard::Group>
  <br />
  <span class="dummy-text-small">With legend and required</span>
  <Hds::Form::RadioCard::Group @name="radio-card-required" @isRequired={{true}} as |G|>
    <G.Legend>Group legend</G.Legend>
    {{#each @model.RADIOCARDS as |item|}}
      <G.RadioCard @checked={{item.checked}} @value={{item.value}} {{on "change" this.onChange}} as |R|>
        <R.Icon @name="hexagon" />
        <R.Label>{{item.label}}</R.Label>
        <R.Description>{{item.description}}</R.Description>
      </G.RadioCard>
    {{/each}}
  </Hds::Form::RadioCard::Group>
  <br />
</section>
