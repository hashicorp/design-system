## Usage

### When to use

- To allow users to turn on and off two mutually exclusive options providing an immediate response.

### When not to use

- When users could check and uncheck an option, consider [Checkbox](/components/form/checkbox).
- When users need to select more than one option from a list, consider [Checkbox](/components/form/checkbox).
- When only one choice can be selected, consider [Radio](/components/form/radio) buttons.

## Layout

We recommend using vertical Toggle groups, especially with short option lists.

<Doc::Layout @spacing="48px">
  <Hds::Form::Toggle::Group @layout="vertical" as |G|>
    <G.Legend>Vertical group</G.Legend>
    <G.ToggleField name="demo-group-option-1" @@id="group-option-1" as |F|>
      <F.Label>Option 1</F.Label>
    </G.ToggleField>
    <G.ToggleField name="demo-group-option-2" @id="group-option-2" as |F|>
      <F.Label>Option 2</F.Label>
    </G.ToggleField>
    <G.ToggleField name="demo-group-option-3" @id="group-option-3" as |F|>
      <F.Label>Option 3</F.Label>
    </G.ToggleField>
  </Hds::Form::Toggle::Group>
  <Hds::Form::Toggle::Group @layout="horizontal" as |G|>
    <G.Legend>Horizontal group</G.Legend>
    <G.ToggleField name="demo-group-option-1" @id="group-option-1" as |F|>
      <F.Label>Option 1</F.Label>
    </G.ToggleField>
    <G.ToggleField name="demo-group-option-2" @id="group-option-2" as |F|>
      <F.Label>Option 2</F.Label>
    </G.ToggleField>
    <G.ToggleField name="demo-group-option-3" @id="group-option-3" as |F|>
      <F.Label>Option 3</F.Label>
    </G.ToggleField>
  </Hds::Form::Toggle::Group>
</Doc::Layout>

## Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns?tab=validation) documentation.