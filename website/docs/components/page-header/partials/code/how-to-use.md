## How to use this component

A simple invocation of the component requires an `@title` argument which renders the title of the page in an `<h1>`.

```handlebars
<Hds::PageHeader @title="Page title" />
```

### Contextual components

The `PageHeader` uses a variety of contextual components that either yield their content or render a specific Helios component. 

```handlebars
<Hds::PageHeader @title="Page title" as |PH|>
  <PH.Breadcrumb>
    <Hds::Breadcrumb>
      <Hds::Breadcrumb::Item @text="Organization" @icon="org" />
      <Hds::Breadcrumb::Item @text="Project" @icon="folder" />
      <Hds::Breadcrumb::Item @text="Clusters" @icon="server-cluster" />
    </Hds::Breadcrumb>
  </PH.Breadcrumb>
  <PH.IconTile @icon="server-cluster" @color="consul" />
  <PH.Badges>
    <Hds::Badge @text="Active" @icon="check" @color="success" />
  </PH.Badges>
  <PH.Subtitle>Subtitle</PH.Subtitle>
  <PH.Description>This is the description of the page</PH.Description>
  <PH.Actions>
    <Hds::Button
      @text="Create cluster"
      @icon="plus"
      @iconPosition="leading"
      @color="primary"
    />
  </PH.Actions>
</Hds::PageHeader>
```

### Custom content

Pass custom metadata to the component with a 

```handlebars
<Hds::PageHeader @title="Page title" as |PH|>
  <PH.IconTile @icon="folder" />
  <PH.Actions>
    <Hds::Dropdown as |DD|>
      <DD.ToggleButton @text="Manage" @color="secondary" />
      <DD.Interactive @route="components" @text="Item One" />
      <DD.Interactive @route="components" @text="Item Two" />
      <DD.Interactive @route="components" @text="Item Three" />
      <DD.Separator />
      <DD.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
    </Hds::Dropdown>
  </PH.Actions>
  <PH.Generic>
    <Doc::Placeholder
      @text="generic metadata"
      @height="36"
      @background="#eee"
    />
  </PH.Generic>
</Hds::PageHeader>
```
