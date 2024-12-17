## How to use this component

The basic invocation requires `text` and `targetToCopy` to be passed:

```handlebars
<p id="clipboardTarget">
  The button will copy the text in this paragraph element.
</p>
<Hds::Copy::Button @text="Copy" @targetToCopy="#clipboardTarget" />
```

### Icon-only

```handlebars
<p id="clipboardTarget2">
  The button will copy the text in this paragraph element.
</p>
<Hds::Copy::Button @text="Copy" @isIconOnly={{true}} @targetToCopy="#clipboardTarget2" />
```

### Sizes

The component supports `small` and `medium` sizes (`medium` is the default):

```handlebars
<p id="clipboardTarget3">
  The button will copy the text in this paragraph element.
</p>
<Hds::Copy::Button @text="Copy" @size="small" @targetToCopy="#clipboardTarget3" />
```

### Full-width

This indicates that the component should take up the full-width of the parent container. It’s set to `false` by default.

```handlebars
<p id="clipboardTarget4">
  The button will copy the text in this paragraph element.
</p>
<Hds::Copy::Button @text="Copy" @targetToCopy="#clipboardTarget4" @isFullWidth={{true}} />
```

### Text to copy

The consumer can also indicate a string to be copied instead of indicating a target element:

```handlebars
<Hds::Copy::Button @text="Copy your secret key" @textToCopy="someSecretThingGoesHere" />
```

### Composition with form inputs

These representative examples showcase the compositional recommendations in the [guidelines](/components/copy/button#composition-with-other-components) using the [Fieldset](/components/form/primitives?tab=code#formfieldset) primitive.

#### With single line inputs

```handlebars
<Hds::Form::Fieldset @layout="vertical" as |F|>
  <F.Legend>Cluster name</F.Legend>
  <F.HelperText>This is some example helper text.</F.HelperText>
  <F.Control>
    <div class="doc-copy-button-composition-input-control">
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

#### With multi-line inputs

```handlebars
<Hds::Form::Fieldset @layout="vertical" as |F|>
  <F.Legend>Cluster secret</F.Legend>
  <F.HelperText>This is some example helper text.</F.HelperText>
  <F.Control>
    <div class="doc-copy-button-composition-input-control">
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