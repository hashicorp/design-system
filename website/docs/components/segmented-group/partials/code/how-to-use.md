## How to use this component

### Within a filter pattern

```handlebars
<Hds::SegmentedGroup as |S|>
  <S.TextInput @type="search" placeholder="Search" aria-label="Search" />
  <S.Dropdown as |DD|>
    <DD.ToggleButton @color="secondary" @text="Across" @count="2" />
    <DD.Checkbox checked>Metadata</DD.Checkbox>
    <DD.Checkbox checked>Tags</DD.Checkbox>
    <DD.Checkbox>Service name</DD.Checkbox>
  </S.Dropdown>
</Hds::SegmentedGroup> 
```

For complex filters we recommend grouping related filter criteria into a Segmented Group.

```handlebars
<Hds::SegmentedGroup as |S|>
  <S.Dropdown as |DD|>
    <DD.ToggleButton @color="secondary" @text="Health status" />
    <DD.Checkbox>Passing</DD.Checkbox>
    <DD.Checkbox>Warning</DD.Checkbox>
    <DD.Checkbox>Failing</DD.Checkbox>
  </S.Dropdown>
  <S.Dropdown as |DD|>
    <DD.ToggleButton @color="secondary" @text="Source" />
    <DD.Checkbox>Consul</DD.Checkbox>
    <DD.Checkbox>Kubernetes</DD.Checkbox>
  </S.Dropdown>
  <S.Dropdown as |DD|>
    <DD.ToggleButton @color="secondary" @text="Type" />
    <DD.Checkbox>Service</DD.Checkbox>
    <DD.Checkbox>Debug service</DD.Checkbox>
  </S.Dropdown>
</Hds::SegmentedGroup>
```

### Within a form

When used within a form we recommend using component composition, passing a `SegmentedGroup` in a [`Form::Field`](/components/form/primitives?tab=code#formfield-1). The `Form::Field` exposes two attributes, `id` and `ariaDescribedBy`, that are used to associate the input with the label, helper text, and error.

```handlebars
<Hds::Form::Field @layout="vertical" as |F|>
  <F.Label>New API Key</F.Label>
  <F.HelperText>Your org must have at least one key and at most five keys</F.HelperText>
  <F.Control>
    <Hds::SegmentedGroup as |S|>
      <S.TextInput id={{F.id}} aria-describedby={{F.ariaDescribedBy}} size="32" />
      <S.Button @color="secondary" @text="Generate" />
    </Hds::SegmentedGroup>
  </F.Control>
</Hds::Form::Field>
```

### Generic Segment

Use the `Generic` block to pass custom Segments to the group". The predefined Segments adjust their styles automatically depending on their placement within the group. You will need to ensure similar styling for your custom Segment.

```handlebars
<Hds::SegmentedGroup as |S|>
  <S.TextInput aria-label="input leading generic segment" size="32" />
  <S.Generic>
    <Doc::Placeholder @text="generic segment" @height="36" @background="#eee" />
  </S.Generic>
</Hds::SegmentedGroup>
```
