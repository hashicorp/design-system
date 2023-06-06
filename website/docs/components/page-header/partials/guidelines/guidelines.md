## Usage

### When to use

- To display the title or top-most heading within a page.
- To communicate metadata pertaining to the page; e.g., status, description, subtitle, etc.
- To highlight page-level actions and functions.

### When not to use

- To communicate page level information anywhere other than the top of the page.

### Size

Size only pertains to the Figma component, and accounts for the stacking of elements on smaller viewports. The Ember component supports a basic level of fluidity and responsiveness out of the box.

#### Large

![Large Page Header variant](/assets/components/page-header/page-header-size-large.png)

#### Small

![Small Page Header variant](/assets/components/page-header/page-header-size-small.png =300x*)

### Breadcrumb

Displays a Helios [Breadcrumb](/components/breadcrumb) to communicate the application hierarchy and location to the user.

<Hds::PageHeader @title="Manage users" as |PH|>
  <PH.Breadcrumb>
    <Hds::Breadcrumb>
      <Hds::Breadcrumb::Item @text="Organization" @icon="org" />
      <Hds::Breadcrumb::Item @text="Project" @icon="folder" />
      <Hds::Breadcrumb::Item @text="User" @icon="user" />
    </Hds::Breadcrumb>
  </PH.Breadcrumb>
</Hds::PageHeader>

### Icon Tile

Displays a Helios [IconTile](/components/icon-tile) component that is used as a visual indicator for the content of the page, the feature within the application, and product branding.

<Hds::PageHeader @title="Provision Terraform provider" as |PH|>
  <PH.IconTile @icon="terraform-color" @color="terraform" />
</Hds::PageHeader>

### Badges

Displays Helios [Badges](/components/badge) that should be used to communicate the status of the page and other high-priority metadata pertaining to the page. We recommend using a maximum of two Badges within the Page Header (this is the number supported in the Figma component) and prioritizing the most contextually relevant metadata.

Badges are especially useful when conveying metadata that is subject to change or variable depending on the status of the page.

<Hds::PageHeader @title="Boundary cluster" as |PH|>
  <PH.Badges>
    <Hds::Badge @text="Running" @icon="running" color="highlight" />
  </PH.Badges>
</Hds::PageHeader>

### Subtitle

Displays a subtitle beneath the title to communicate metadata that does not change frequently or is not subject to changes within the application. Common examples of this are organization name, project name, unique identifiers, resource names, etc.

<Hds::PageHeader @title="Packer Buckets" as |PH|>
  <PH.IconTile @icon="packer-color" @color="packer" />
  <PH.Breadcrumb>
    <Hds::Breadcrumb>
      <Hds::Breadcrumb::Item @icon="org" @text="Organization" />
      <Hds::Breadcrumb::Item @icon="packer" @text="Packer Buckets" />
    </Hds::Breadcrumb>
  </PH.Breadcrumb>
  <PH.Subtitle>packer-registry</PH.Subtitle>
</Hds::PageHeader>

!!! Dont

Generally, the subtitle should not be used to convey information that requires a full sentence, or other detailed information. Use a [description](#description) instead.

<Hds::PageHeader @title="Packer Buckets" as |PH|>
  <PH.IconTile @icon="packer-color" @color="packer" />
  <PH.Breadcrumb>
    <Hds::Breadcrumb>
      <Hds::Breadcrumb::Item @icon="org" @text="Organization" />
      <Hds::Breadcrumb::Item @icon="packer" @text="Packer Buckets" />
    </Hds::Breadcrumb>
  </PH.Breadcrumb>
  <PH.Subtitle>Create a new packer registry.</PH.Subtitle>
</Hds::PageHeader>

!!!

### Description

Displays a description beneath the title and subtitle to communicate more detailed information about the page, link out to external documentation and resources, and capture more generic information about the page.

Not all pages need a description, especially if the title is explicit enough. We recommend keeping a Page Header description to 1-2 sentences, if a longer description is required, consider linking to external documentation or moving more detailed content to an interstitial component like a [Flyout](/components/flyout)

<Hds::PageHeader @title="HCP Packer Dashboard" as |PH|>
  <PH.IconTile @icon="packer-color" @color="packer" />
  <PH.Description>
    Channel created and managed automatically for you by Packer.
  </PH.Description>
</Hds::PageHeader>

!!! Dont

Don't include overly complex details, long-form content, or instructions in the description. This can add too much visual weight to the Page Header and has the potential to detract from the content on the main page.

<Hds::PageHeader @title="HCP Packer Dashboard" as |PH|>
  <PH.IconTile @icon="packer-color" @color="packer" />
  <PH.Description>
    Channel created and managed automatically for you by Packer. With this channel you can manage your Packer registries, create new registries, and view analytics for all of your Packer resources. To get started, create a new registry or select an already existing registry.
  </PH.Description>
</Hds::PageHeader>

!!!

!!! Do

Instead, link to more complex content using an [Inline Link](/components/link/inline) with an optional icon to indicate the scope of the link (internal resource, external resource, etc).

<Hds::PageHeader @title="HCP Packer Dashboard" as |PH|>
  <PH.IconTile @icon="packer-color" @color="packer" />
  <PH.Description>
    Channel created and managed automatically for you by Packer. For more information on how this channel is managed refer to the Packer <Hds::Link::Inline @icon="external-link" @href="#">documentation</Hds::Link::Inline>.
  </PH.Description>
</Hds::PageHeader>

!!!

### Custom metadata

If necessary to include metadata like key/value pairs, multiple page-level statuses, or other non-string-based content, use the `customMetadata` property in Figma to expose a placeholder. In the Ember component we expose a `generic` container that yields it's content.

<Hds::PageHeader @title="Terraform Workspace" as |PH|>
  <PH.IconTile @icon="terraform-color" @color="terraform" />
  <PH.Subtitle><strong>ID:</strong> wkdj293hfiw2liej234fklds</PH.Subtitle>
  <PH.Description>Terraform enables you to safely and predictably create, change, and improve...[<Hds::Link::Inline @href="#" @icon="external-link">read more</Hds::Link::Inline>]</PH.Description>
  <PH.Generic>
    <Doc::Placeholder
      @text="generic metadata"
      @height="36"
      @width="350"
      @background="#eee"
    />
  </PH.Generic>
</Hds::PageHeader>

#### Key/value pairs as custom metadata

![Custom metadata key/value pairs](/assets/components/page-header/page-header-custom-metadata.png =600x*)

!!! Dont

Don't exceed more than three metadata objects, this can result in unnecessarily complex content with the Page Header. Instead, move this content into the page itself.

![Complex metadata dont](/assets/components/page-header/page-header-custom-metadata-dont.png)

!!!

### Actions

Use actions in the Page Header to facilitate page-level functions and actions that impact the page as a whole. Common components used to perform actions within the Page Header are [Buttons](/components/button) and [Dropdowns](/components/dropdown) and can include:

- Creating new objects that are contained within the page
- Surfacing management details like connecting to an API
- Deleting the object that the page represents
- Pausing or refreshing a service pertaining the page.

<Hds::PageHeader @title="Consul clusters" as |PH|>
  <PH.Breadcrumb>
    <Hds::Breadcrumb>
      <Hds::Breadcrumb::Item @text="Organization" @icon="org" />
      <Hds::Breadcrumb::Item @text="Consul clusters" @icon="consul-color" />
    </Hds::Breadcrumb>
  </PH.Breadcrumb>
  <PH.IconTile @icon="consul-color" @color="consul" />
  <PH.Description>Create and manage your remote Consul clusters</PH.Description>
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
    <Hds::Button @text="Create cluster" @icon="plus" @iconPosition="leading" />
  </PH.Actions>
</Hds::PageHeader>

#### Action usage

While the Page Header supports up to three actions in Figma, we recommend limiting the number actions to one or two for most scenarios. These actions should generally consist of a primary action (using the `@color="primary"` property) and a secondary action or management function (using the `@color="secondary"` property). This more easily highlights the primary action on the page visually and establishes and implied inverse relationship between each action.

For more details on how to combine, order, and organize Buttons, refer to the [Button order, organization, and alignment](/patterns/button-organization) pattern documentation.

!!! Dont

Don't pair two primary actions in a Page Header.

<Hds::PageHeader @title="Two actions" as |PH|>
  <PH.Actions>
    <Hds::Button @text="Create object" @icon="plus" @iconPosition="leading" />
    <Hds::Button @text="Open Admin UI" @href="#" @icon="external-link" @iconPosition="leading" />
  </PH.Actions>
</Hds::PageHeader>

!!!

## Responsiveness

## Content

## Related

- [Breadcrumb](/components/breadcrumb)
- [IconTile](/components/icon-tile)
