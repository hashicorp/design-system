## How to use this component

Use the `Form` to contain other Form layout components and form content. This establishes consistent spacing for each `FormSection` and the other content.

### Form

```handlebars{data-execute=false}
<Hds::Form>
  Add form content here.
</Hds::Form>
```

The `Form` renders as an HTML `form` element by default. Use the `tag` argument to optionally use an HTML `div` instead.

```handlebars{data-execute=false}
<Hds::Form @tag="div">
  This “form” is actually just a div.
</Hds::Form>
```

### Form Header, Title, & Description

Use the optional `FormHeader` to include a `Title` and `Description` for your `Form`.

```handlebars
<Hds::Form as |FORM|>
  <FORM.Header>
    <FORM.HeaderTitle>My form title</FORM.HeaderTitle>
    <FORM.HeaderDescription>A brief description of my form content.</FORM.HeaderDescription>
  </FORM.Header>
</Hds::Form>
```

### Form Section

Use `FormSection` components to wrap and group together related Form Fields and other form content. This establishes a consistent max-width and spacing for the content.

Note: You should use at least one `FormSection` to wrap Form Field content otherwise the content won't be spaced properly or use a max-width.

While the `FormSection` is typically used to contain Form Fields, it can also be used to contain and set a consistent max-width for other content as needed such as an `Alert`.

```handlebars
<Hds::Form as |FORM|>
  <FORM.Section>
    <Hds::Alert @type="inline" @color="critical" as |A|>
      <A.Title @tag="h2">Form submission error</A.Title>
      <A.Description>Correct the formatting of the following field:</A.Description>
      <A.Description>
        <Hds::Link::Inline @href="#" @color="secondary">Expiration date</Hds::Link::Inline>
      </A.Description>
    </Hds::Alert>
  </FORM.Section>

  <FORM.Section>
    <Hds::Form::TextInput::Field name="field-1-name" as |F|>
      <F.Label>Field 1</F.Label>
    </Hds::Form::TextInput::Field>

    <Hds::Form::Radio::Group @layout="horizontal" @name="field-2-name" as |G|>
      <G.Legend>Field 2</G.Legend>
      <G.RadioField as |F|>
        <F.Label>Option 1</F.Label>
      </G.RadioField>
      <G.RadioField as |F|>
        <F.Label>Option 2</F.Label>
      </G.RadioField>
      <G.RadioField as |F|>
        <F.Label>Option 3</F.Label>
      </G.RadioField>
    </Hds::Form::Radio::Group>

    <Hds::Form::Select::Field name="field-3-name" as |F|>
      <F.Label>Field 3</F.Label>
      <F.Options>
        <option value="Kubernetes">Kubernetes</option>
        <option value="Other" selected>Selected</option>
      </F.Options>
    </Hds::Form::Select::Field>

    <Hds::Form::Textarea::Field name="field-4-name" as |F|>
      <F.Label>Field 4</F.Label>
    </Hds::Form::Textarea::Field>
  </FORM.Section>
</Hds::Form>
```

Pass an `isFullWidth` argument to override the default max-width of an individual `FormSection` if needed.

```handlebars
<Hds::Form as |FORM|>
  <FORM.Section @isFullWidth={{true}}>
    <Hds::Form::RadioCard::Group @name="radio-card-basic-example" @alignment="center" as |G|>
      <G.Legend>Create connection</G.Legend>
        <G.RadioCard @checked={{true}} {{on "change" this.onChange}} as |R|>
          <R.Icon @name="aws-color" />
          <R.Label>Quick peering with Quick Links</R.Label>
          <R.Badge @text="2-5 min" />
          <R.Description>Quick peering with quick links will provide the fastest way to connect to your providers’ network.</R.Description>
        </G.RadioCard>
        <G.RadioCard {{on "change" this.onChange}} as |R|>
          <R.Icon @name="aws-color" />
          <R.Label>Manual peering using AWS CLI</R.Label>
          <R.Badge @text="5-10 min" />
          <R.Description>Provide you AWS CLI template to apply connection settings.</R.Description>
        </G.RadioCard>
        <G.RadioCard {{on "change" this.onChange}} as |R|>
          <R.Icon @name="hcp" />
          <R.Label>Manual peering using HCP and AWS web console</R.Label>
          <R.Badge @text="30-60 min" />
          <R.Description>Manually follow UI instructions to complete configuring a connection at provider side.</R.Description>
        </G.RadioCard>
    </Hds::Form::RadioCard::Group>
  </FORM.Section>
</Hds::Form>
```

### Form Section Header, Title, & Description

Similarly to the `Form`, each `FormSection` can optionally include its own `SectionHeader` with `Title` and `Description`.

```handlebars
<Hds::Form as |FORM|>
  <FORM.Section>
    <FORM.SectionHeader>
      <FORM.SectionHeaderTitle>Section header title</FORM.SectionHeaderTitle>
      <FORM.SectionHeaderDescription>
        Section Header description
      </FORM.SectionHeaderDescription>
    </FORM.SectionHeader>
  </FORM.Section>
</Hds::Form>
```

### Form Separator

If further visual separation between Form Sections is desired, add a `FormSeparator` in-between.

```handlebars
<Hds::Form as |FORM|>
  <FORM.Section>
    <Hds::Text::Body>First section</Hds::Text::Body>
  </FORM.Section>

  <FORM.Separator />

  <FORM.Section>
    <Hds::Text::Body>Second section</Hds::Text::Body>
  </FORM.Section>
</Hds::Form>
```

### Form Section Multi Field Group

To lay out related Form Fields or controls in a row, use the `SectionMultiFieldGroup`.

```handlebars
<Hds::Form as |FORM|>
  <FORM.Section>
    <FORM.SectionMultiFieldGroup>
      <Hds::Form::TextInput::Field as |F|>
        <F.Label>First name</F.Label>
      </Hds::Form::TextInput::Field>

      <Hds::Form::TextInput::Field as |F|>
        <F.Label>Last name</F.Label>
      </Hds::Form::TextInput::Field>
    </FORM.SectionMultiFieldGroup>
  </FORM.Section>
</Hds::Form>
```

To control the widths of individual elements within a `SectionMultiFieldGroup`, you can wrap the element with an `Item` and pass in a `width` value. Fields not wrapped with an `Item` will take up the remaining available width.

```handlebars
<Hds::Form as |FORM|>
  <FORM.Section>
    <FORM.SectionMultiFieldGroup as |FG|>
      <Hds::Form::TextInput::Field as |F|>
        <F.Label>City</F.Label>
      </Hds::Form::TextInput::Field>

      <FG.Item @width="auto">
        <Hds::Form::Select::Field as |F|>
          <F.Label>State</F.Label>
          <F.Options>
            <option value="state-1">Ohio</option>
            <option value="state-2">Massachusetts</option>
            <option value="state-3">Washington</option>
            <option value="state-4">Florida</option>
            <option value="state-4">North Carolina</option>
          </F.Options>
        </Hds::Form::Select::Field>
      </FG.Item>

      <FG.Item @width="8em">
        <Hds::Form::TextInput::Field as |F|>
          <F.Label>Zip</F.Label>
        </Hds::Form::TextInput::Field>
      </FG.Item>
    </FORM.SectionMultiFieldGroup>
  </FORM.Section>
</Hds::Form>
```

#### Responsive layout

In screen widths below 768px (the “md” breakpoint), the `SectionMultiFieldGroup` content layout will automatically stack.

```handlebars
<Hds::Form class="doc-form-layout-mobile-view" as |FORM|>
  <FORM.Section>
    <FORM.SectionMultiFieldGroup as |FG|>
      <Hds::Form::TextInput::Field as |F|>
        <F.Label>City</F.Label>
      </Hds::Form::TextInput::Field>

      <FG.Item @width="auto">
        <Hds::Form::Select::Field as |F|>
          <F.Label>State</F.Label>
          <F.Options>
            <option value="state-1">Ohio</option>
            <option value="state-2">Massachusetts</option>
            <option value="state-3">Washington</option>
            <option value="state-4">Florida</option>
            <option value="state-4">North Carolina</option>
          </F.Options>
        </Hds::Form::Select::Field>
      </FG.Item>

      <FG.Item @width="6em">
        <Hds::Form::TextInput::Field as |F|>
          <F.Label>Zip</F.Label>
        </Hds::Form::TextInput::Field>
      </FG.Item>
    </FORM.SectionMultiFieldGroup>
  </FORM.Section>
</Hds::Form>
```

### Form Footer

The `FormFooter` should be used at the bottom of the other `Form` content to contain form actions for the form content. Use a `ButtonSet` to wrap 

```handlebars
<Hds::Form as |FORM|>
</Hds::Form>
```
