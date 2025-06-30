## How to use this component

The basic invocation of the Key Value Inputs requires the `@data` argument. This is used as the initial data to create the rows of inputs.

```handlebars
<Hds::Form::KeyValueInputs @data={{array
    (hash name="Judith Maxene" email="j.maxene@randatmail.com")
    (hash name="Elmira Aishah" email="e.aishah@randatmail.com")
  }}>
  <:header as |H|>
    <H.Legend>Invite multiple users to your organization</H.Legend>
    <H.HelperText>
      Users without organization roles cannot view or edit anything inside their organization until project-level or workspace-level roles are assigned to them after they accept their invitation.
    </H.HelperText>
  </:header>
  <:row as |R|>
    <R.Field as |F|>
      <F.Label>
        Email address for invitee
      </F.Label>
      <F.TextInput @value={{R.rowData.email}} />
    </R.Field>
    <R.Field as |F|>
      <F.Label>
        Name of invitee
      </F.Label>
      <F.TextInput @value={{R.rowData.name}} />
    </R.Field>
    <R.DeleteRowButton />
  </:row>
  <:footer as |F|>
    <F.AddRowButton @text="Add user" />
  </:footer>
</Hds::Form::KeyValueInputs>
```

### Required vs. optional

Use the `@isRequired` and `@isOptional` arguments to add a visual indicator that the entire Key Value Inputs is required or optional.

```handlebars
<Hds::Form::KeyValueInputs @isRequired={{true}} @data={{array
    (hash name="Judith Maxene" email="j.maxene@randatmail.com")
  }}>
  <:header as |H|>
    <H.Legend>Invite multiple users to your organization</H.Legend>
  </:header>
  <:row as |R|>
    <R.Field as |F|>
      <F.Label>
        Email address for invitee
      </F.Label>
      <F.TextInput @value={{R.rowData.email}} />
    </R.Field>
    <R.Field as |F|>
      <F.Label>
        Name of invitee
      </F.Label>
      <F.TextInput @value={{R.rowData.name}} />
    </R.Field>
    <R.DeleteRowButton />
  </:row>
</Hds::Form::KeyValueInputs>
<hr />
<Hds::Form::KeyValueInputs @isOptional={{true}} @data={{array
    (hash name="Judith Maxene" email="j.maxene@randatmail.com")
  }}>
  <:header as |H|>
    <H.Legend>Invite multiple users to your organization</H.Legend>
  </:header>
  <:row as |R|>
    <R.Field as |F|>
      <F.Label>
        Email address for invitee
      </F.Label>
      <F.TextInput @value={{R.rowData.email}} />
    </R.Field>
    <R.Field as |F|>
      <F.Label>
        Name of invitee
      </F.Label>
      <F.TextInput @value={{R.rowData.name}} />
    </R.Field>
    <R.DeleteRowButton />
  </:row>
</Hds::Form::KeyValueInputs>
```
### Validation

The Key Value Inputs can be validated at the fieldset level or on each individual field. You can choose which level is appropriate depending on the use case, but it is best practice to make any error message as specific as possible. Avoid putting the error on the fieldset if the issue occurs on a single field.

To display an error on a field, set the `isInvalid` argument on the `[R].Field` yielded component, and use the `[F].Error` yielded component.

```handlebars
<Hds::Form::KeyValueInputs @data={{array
    (hash name="Judith Maxene" email="")
  }}>
  <:header as |H|>
    <H.Legend>Invite multiple users to your organization</H.Legend>
    <H.HelperText>
      Users without organization roles cannot view or edit anything inside their organization until project-level or workspace-level roles are assigned to them after they accept their invitation.
    </H.HelperText>
  </:header>
  <:row as |R|>
    <R.Field @isInvalid={{true}} as |F|>
      <F.Label>
        Email address for invitee
      </F.Label>
      <F.TextInput @value={{R.rowData.email}} />
      <F.Error>Email is required.</F.Error>
    </R.Field>
    <R.Field as |F|>
      <F.Label>
        Name of invitee
      </F.Label>
      <F.TextInput @value={{R.rowData.name}} />
    </R.Field>
    <R.DeleteRowButton />
  </:row>
  <:footer as |F|>
    <F.AddRowButton @text="Add user" />
  </:footer>
</Hds::Form::KeyValueInputs>
```

To display an error for the entire fieldset (the whole group of inputs), use the `[F].Error` component yielded by the `:footer` named block.

```handlebars
<Hds::Form::KeyValueInputs @data={{array
    (hash name="Judith Maxene" email="j.maxene@randatmail.com")
  }}>
  <:header as |H|>
    <H.Legend>Invite multiple users to your organization</H.Legend>
    <H.HelperText>
      Users without an organization role cannot view or edit anything inside their organization until a project-level or workspace-level role is assigned to them after they accept their invitation.
    </H.HelperText>
  </:header>
  <:row as |R|>
    <R.Field as |F|>
      <F.Label>
        Email address for invitee
      </F.Label>
      <F.TextInput @value={{R.rowData.email}} />
    </R.Field>
    <R.Field as |F|>
      <F.Label>
        Name of invitee
      </F.Label>
      <F.TextInput @value={{R.rowData.name}} />
    </R.Field>
    <R.DeleteRowButton />
  </:row>
  <:footer as |F|>
    <F.AddRowButton @text="Add user" />
    <F.Error>Unable to invite users.</F.Error>
  </:footer>
</Hds::Form::KeyValueInputs>
```

### Input types

The `Form::KeyValueInputs::Field` component yields [File Input](/components/form/file-input?tab=code#formfileinputbase-1), [Masked Input](/components/form/masked-input?tab=code#formmaskedinputbase-1), [Select](/components/form/select?tab=code#formselectbase-1), [SuperSelect::Single](/components/form/super-select?tab=code#superselectsinglebase), [SuperSelect::Multiple](/components/form/super-select?tab=code#superselectmultiplebase), [TextInput](/components/form/text-input?tab=code#formtextinputbase-1), and [Textarea](/components/form/textarea?tab=code#formtextareabase-1) inputs.

```handlebars
<Hds::Form::KeyValueInputs @data={{array
    (hash os="darwin")
    (hash os="linux")
    (hash os="windows")
  }}>
  <:header as |H|>
    <H.Legend>Plugin binaries</H.Legend>
    <H.HelperText>
      A zipped binary file for each supported OS and architecture pair.
    </H.HelperText>
  </:header>
  <:row as |R|>
    <R.Field as |F|>
      <F.Label>
        OS and architecture
      </F.Label>
      <F.Select>
        <option selected={{if (eq R.rowData.os "darwin") true}}>darwin - arm64</option>
        <option selected={{if (eq R.rowData.os "linux") true}}>linux - 386</option>
        <option selected={{if (eq R.rowData.os "windows") true}}>windows - amd64</option>
      </F.Select>
    </R.Field>
    <R.Field as |F|>
      <F.Label>
       File
      </F.Label>
      <F.FileInput />
    </R.Field>
    <R.DeleteRowButton />
  </:row>
  <:footer as |F|>
    <F.AddRowButton @text="Add configuration" />
  </:footer>
</Hds::Form::KeyValueInputs>
```

### Generic content 

If there is additional content needed in the header or a need for an unsupported input type, there are generic slots available.

```handlebars
<Hds::Form::KeyValueInputs @data={{array
    (hash email="j.maxene@randatmail.com" hasOrgRole=true)
    (hash email="e.aishah@randatmail.com" hasOrgRole=false)
  }}>
  <:header as |H|>
    <H.Legend>Grant access to HCP resources for your team members</H.Legend>
    <H.HelperText>
      Users without an organization role cannot view or edit anything inside their organization until a project-level or workspace-level role is assigned to them after they accept their invitation.
    </H.HelperText>
    <H.Generic>
      <Hds::Button @color="tertiary" @text="What can each role do?" @icon="help" />
    </H.Generic>
  </:header>
  <:row as |R|>
    <R.Field as |F|>
      <F.Label>
        Email address for invitee
      </F.Label>
      <F.TextInput @value={{R.rowData.email}} />
    </R.Field>
    <R.Generic>
      <Hds::Form::Toggle::Field checked={{R.rowData.hasOrgRole}} as |T|>
        <T.Label>Assign this user an organization role</T.Label>
      </Hds::Form::Toggle::Field>
    </R.Generic>
    <R.DeleteRowButton />
  </:row>
  <:footer as |F|>
    <F.AddRowButton @text="Add user" />
  </:footer>
</Hds::Form::KeyValueInputs>
```

### Updating the rows

You are responsible for handling the logic to add or remove a row. To do this, use the `onClick` argument to pass a callback function on the yielded `[F].AddRowButton` in the `:footer` named block or the yielded `[R].DeleteRowButton` in the `:row` named block.

```handlebars
<Hds::Form::KeyValueInputs @data={{this.updatingRowsExampleData}}>
  <:header as |H|>
    <H.Legend>Invite multiple users to your organization</H.Legend>
    <H.HelperText>
      Users without an organization role cannot view or edit anything inside their organization until a project-level or workspace-level role is assigned to them after they accept their invitation.
    </H.HelperText>
  </:header>
  <:row as |R|>
    <R.Field as |F|>
      <F.Label>
        Email address for invitee
      </F.Label>
      <F.TextInput @value={{R.rowData.email}} />
    </R.Field>
    <R.Field as |F|>
      <F.Label>
        Name of invitee
      </F.Label>
      <F.TextInput @value={{R.rowData.name}} />
    </R.Field>
    <R.DeleteRowButton
      @onClick={{this.updatingRowsExampleOnRemoveRow}}
    />
  </:row>
  <:footer as |F|>
    <F.AddRowButton
      @text="Add user"
      @onClick={{this.updatingRowsExampleOnAddRow}}
    />
  </:footer>
</Hds::Form::KeyValueInputs>
```

### Maximum number of rows

Consumers are responsible for implementing the logic for the maximum number of rows a user can add. If they have reached the maximum number of rows, you can use the yielded Alert in the `:footer` named block to notify them.

```handlebars
<Hds::Form::KeyValueInputs @data={{array
    (hash os="darwin")
    (hash os="linux")
    (hash os="windows")
  }}>
  <:header as |H|>
    <H.Legend>Plugin binaries</H.Legend>
    <H.HelperText>
      A zipped binary file for each supported OS and architecture pair.
    </H.HelperText>
  </:header>
  <:row as |R|>
    <R.Field as |F|>
      <F.Label>
        OS and architecture
      </F.Label>
      <F.Select>
        <option selected={{if (eq R.rowData.os "darwin") true}}>darwin - arm64</option>
        <option selected={{if (eq R.rowData.os "linux") true}}>linux - 386</option>
        <option selected={{if (eq R.rowData.os "windows") true}}>windows - amd64</option>
      </F.Select>
    </R.Field>
    <R.Field as |F|>
      <F.Label>
       File
      </F.Label>
      <F.FileInput />
    </R.Field>
    <R.DeleteRowButton />
  </:row>
  <:footer as |F|>
    <F.Alert as |A|>
      <A.Description>Only 3 binaries can be added at a time.</A.Description>
    </F.Alert>
  </:footer>
</Hds::Form::KeyValueInputs>
```

### Field width

Fields are equal width by default. Use the Field’s `width` argument to customize field widths.

```handlebars
<Hds::Form::KeyValueInputs @data={{array
    (hash tag="production" description="This is a tag meant to indicate production environments.")
    (hash tag="staging" description="")
  }}>
  <:header as |H|>
    <H.Legend>Custom tags</H.Legend>
  </:header>
  <:row as |R|>
    <R.Field as |F|>
      <F.Label>
        Name
      </F.Label>
      <F.TextInput @value={{R.rowData.tag}} />
    </R.Field>
    <R.Field @width="2fr" as |F|>
      <F.Label>
        Description
      </F.Label>
      <F.Textarea @value={{R.rowData.description}} />
    </R.Field>
    <R.DeleteRowButton />
  </:row>
  <:footer as |F|>
    <F.AddRowButton @text="Add tag" />
  </:footer>
</Hds::Form::KeyValueInputs>
```
