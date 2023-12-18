## Composition with form inputs

These representative examples showcase the compositional recommendations in the [guidelines](/components/copy/button#composition-with-other-components) using the [Fieldset](/components/form/primitives?tab=code#formfieldset) primitive.

### With single line inputs

```handlebars
<Hds::Form::Fieldset @layout="vertical" as |F|>
  <F.Legend>Cluster name</F.Legend>
  <F.HelperText>This is some example helper text.</F.HelperText>
  <F.Control>
    <div style="display: flex; flex-direction: row; gap: 8px; align-items: flex-start;">
      <Hds::Form::TextInput::Base
        @value="aws-east-cluster-01"
        id="cluster-name-example-text-input"
      />
      <Hds::Copy::Button
        @text="Copy"
        @isIconOnly={{true}} 
        @targetToCopy="#cluster-name-example-text-input"
      />
    </div>
  </F.Control>
  <F.Error>This is example error text.</F.Error>
</Hds::Form::Fieldset>
```

### With multi-line inputs

```handlebars
<Hds::Form::Fieldset @layout="vertical" as |F|>
  <F.Legend>Cluster secret</F.Legend>
  <F.HelperText>This is some example helper text.</F.HelperText>
  <F.Control>
    <div style="display: flex; flex-direction: row; gap: 8px; align-items: flex-start;">
      <Hds::Form::Textarea::Base
        @value="C9WhJuvE70CnTcqvNqptMhmnBHmMNXuj"
        id="cluster-name-example-textarea"
      />
      <Hds::Copy::Button
        @text="Copy"
        @isIconOnly={{true}}
        @targetToCopy="#cluster-name-example-textarea"
      />
    </div>
  </F.Control>
  <F.Error>This is example error text.</F.Error>
</Hds::Form::Fieldset>
```