## How to use this component

A simple invocation of the component requires a contextual `<PH.Title>` which yields its content within an `<h1>`.

```handlebars
<Hds::PageHeader as |PH|>
  <PH.Title>Page title</PH.Title>
</Hds::PageHeader>
```

### Contextual components

The Page Header uses a number of contextual components that either yield their content or render a specific Helios component.

!!! Info

The layout of this component is responsive and adjusts based on the width of its bounding container. The examples captured here may not be indicative of how the component will render within a specific application or layout.

!!!

```handlebars
<Hds::PageHeader as |PH|>
  <PH.Title>Page title</PH.Title>
  <PH.Breadcrumb>
    <Hds::Breadcrumb>
      <Hds::Breadcrumb::Item @text="Organization" @icon="dashboard" />
      <Hds::Breadcrumb::Item @text="Project" @icon="file-text" />
      <Hds::Breadcrumb::Item @text="Clusters" @icon="server-cluster" />
    </Hds::Breadcrumb>
  </PH.Breadcrumb>
  <PH.IconTile @icon="server-cluster" @color="consul" />
  <PH.Badges>
    <Hds::Badge @text="Status badge" @icon="award" @color="highlight" />
  </PH.Badges>
  <PH.Subtitle>Page subtitle</PH.Subtitle>
  <PH.Description>Description of the page</PH.Description>
  <PH.Actions>
    <Hds::Button
      @text="Create"
      @icon="plus"
      @iconPosition="leading"
      @color="primary"
    />
  </PH.Actions>
</Hds::PageHeader>
```

### Custom content

Pass custom metadata to the component with a `generic` contextual component that yields its contents.

```handlebars
<Hds::PageHeader as |PH|>
  <PH.Title>Page title</PH.Title>
  <PH.IconTile @icon="folder" />
  <PH.Actions>
    <Hds::Dropdown as |DD|>
      <DD.ToggleButton @text="Manage" @color="secondary" />
      <DD.Interactive @route="components" @text="Item One" />
      <DD.Interactive @route="components" @text="Item Two" />
      <DD.Interactive @route="components" @text="Item Three" />
      <DD.Separator />
      <DD.Interactive
        @route="components"
        @text="Delete"
        @color="critical"
        @icon="trash"
      />
    </Hds::Dropdown>
  </PH.Actions>
  <PH.Generic>
    <Doc::Placeholder
      @text="generic metadata"
      @height="36"
      @width="350"
      @background="#eee"
    />
  </PH.Generic>
</Hds::PageHeader>
```
