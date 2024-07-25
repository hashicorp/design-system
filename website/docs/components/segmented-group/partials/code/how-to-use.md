## How to use this component

### Within a filter pattern

```handlebars
<Hds::SegmentedGroup as |SG|>
  <SG.TextInput @type="search" placeholder="Search" aria-label="Search" />
  <SG.Dropdown as |D|>
    <D.ToggleButton @color="secondary" @text="Across" @count="2" />
    <D.Checkbox checked>Metadata</D.Checkbox>
    <D.Checkbox checked>Tags</D.Checkbox>
    <D.Checkbox>Service name</D.Checkbox>
  </SG.Dropdown>
</Hds::SegmentedGroup>
```

For complex filters we recommend grouping related filter criteria into a Segmented Group.

```handlebars
<Hds::SegmentedGroup as |SG|>
  <SG.Dropdown as |D|>
    <D.ToggleButton @color="secondary" @text="Health status" />
    <D.Checkbox>Passing</D.Checkbox>
    <D.Checkbox>Warning</D.Checkbox>
    <D.Checkbox>Failing</D.Checkbox>
  </SG.Dropdown>
  <SG.Dropdown as |D|>
    <D.ToggleButton @color="secondary" @text="Source" />
    <D.Checkbox>Consul</D.Checkbox>
    <D.Checkbox>Kubernetes</D.Checkbox>
  </SG.Dropdown>
  <SG.Dropdown as |D|>
    <D.ToggleButton @color="secondary" @text="Type" />
    <D.Checkbox>Service</D.Checkbox>
    <D.Checkbox>Debug service</D.Checkbox>
  </SG.Dropdown>
</Hds::SegmentedGroup>
```

### Within a form

When used within a form we recommend using component composition, passing a `SegmentedGroup` in a [`Form::Field`](/components/form/primitives?tab=code#formfield-1). The `Form::Field` exposes two attributes, `id` and `ariaDescribedBy`, that are used to associate the input with the label, helper text, and error.

```handlebars
<Hds::Form::Field @layout="vertical" as |F|>
  <F.Label>New API Key</F.Label>
  <F.HelperText>Your org must have at least one key and at most five keys</F.HelperText>
  <F.Control>
    <Hds::SegmentedGroup as |SG|>
      <SG.TextInput id={{F.id}} aria-describedby={{F.ariaDescribedBy}} size="32" />
      <SG.Button @color="secondary" @text="Generate" />
    </Hds::SegmentedGroup>
  </F.Control>
</Hds::Form::Field>
```

### Generic Segment

Use the `Generic` block to pass custom Segments to the group". The predefined Segments adjust their styles automatically depending on their placement within the group. You will need to ensure similar styling for your custom Segment.

```handlebars
<Hds::SegmentedGroup as |SG|>
  <SG.TextInput aria-label="input leading generic segment" size="32" />
  <SG.Generic>
    <Doc::Placeholder @text="generic segment" @height="36" @background="#eee" />
  </SG.Generic>
</Hds::SegmentedGroup>
```
