## Usage

### When to use

- To display the title or top-most heading within a page.
- To communicate metadata pertaining to the page; e.g., status, description, subtitle, etc.
- To highlight page-level actions and functions.

### When not to use

- To communicate page level information anywhere other than the top of the page.

## Title

Renders the title or topmost heading of the page. This should generally be limited to no more than four words  and not exceed 50 characters.

## Size

Size only pertains to the Figma component and accounts for the stacking of elements on smaller viewports. The Ember component supports a basic level of fluidity and responsiveness out of the box.

Refer to [responsiveness](#responsiveness) for more information on how the component adapts to different viewport and container sizes.

### Large

![Large Page Header variant](/assets/components/page-header/page-header-size-large.png)

### Small

![Small Page Header variant](/assets/components/page-header/page-header-size-small.png =300x*)

## Breadcrumb

Displays a Helios [Breadcrumb](/components/breadcrumb) to communicate the application hierarchy and location to the user.

<Hds::PageHeader as |PH|>
  <PH.Title>Manage users</PH.Title>
  <PH.Breadcrumb>
    <Hds::Breadcrumb>
      <Hds::Breadcrumb::Item @text="Organization" @icon="org" />
      <Hds::Breadcrumb::Item @text="Project" @icon="folder" />
      <Hds::Breadcrumb::Item @text="User" @icon="user" />
    </Hds::Breadcrumb>
  </PH.Breadcrumb>
</Hds::PageHeader>

## Icon Tile

Displays a Helios [IconTile](/components/icon-tile) as a visual indicator for the content of the page, the feature within the application, and product branding.

<Hds::PageHeader as |PH|>
  <PH.Title>Provision Terraform provider</PH.Title>
  <PH.IconTile @icon="terraform-color" @color="terraform" />
</Hds::PageHeader>

!!! Info

Only the `medium` size of the [IconTile](/components/icon-tile) is supported in the Page Header.

!!!

## Badges

Displays Helios [Badges](/components/badge) to communicate the status of the page and other high-priority metadata pertaining to the page. We recommend using a maximum of three Badges within the Page Header (this is the number supported in the Figma component) and prioritizing the most contextually relevant metadata.

Badges are especially useful when conveying metadata that is subject to change or variable depending on the status of the page.

<Hds::PageHeader as |PH|>
  <PH.Title>Boundary cluster</PH.Title>
  <PH.IconTile @logo="boundary" />
  <PH.Badges>
    <Hds::Badge @text="Running" @icon="running" color="highlight" />
  </PH.Badges>
</Hds::PageHeader>

!!! Do

Use badges to express similar or related metadata pertaining to the page content.

<Hds::PageHeader as |PH|>
  <PH.Title>boundary-cluster-4827</PH.Title>
  <PH.Badges>
    <Hds::Badge @text="Starting up" @icon="running" @color="highlight" />
    <Hds::Badge @text="Version 1.4" @color="neutral" />
  </PH.Badges>
</Hds::PageHeader>

!!!

!!! Dont

Don't use more than three badges within the Page Header, instead explore ways to express additional metadata in the `customMetadata` area or move the content to the main page.

<Hds::PageHeader as |PH|>
  <PH.Title>Boundary cluster</PH.Title>
  <PH.Badges>
    <Hds::Badge @text="Active" @icon="check" @color="success" />
    <Hds::Badge @text="v1" @color="neutral" />
    <Hds::Badge @text="Out of date" @icon="alert-triangle" @color="warning" />
    <Hds::Badge @text="Beta feature" @icon="beaker" @color="highlight" />
  </PH.Badges>
</Hds::PageHeader>

!!!

## Subtitle

Displays a subtitle beneath the title to communicate metadata that does not change frequently or is not subject to changes within the application. Common examples of this are organization name, project name, unique identifiers, resource names, etc.

<Hds::PageHeader as |PH|>
  <PH.Title>Packer Buckets</PH.Title>
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

Don't use full sentences in the subtitle, use a [description](#description) instead.

<Hds::PageHeader as |PH|>
  <PH.Title>Packer Buckets</PH.Title>
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

## Description

Displays a description beneath the title and subtitle to communicate more detailed information about the page, link out to external documentation and resources, and capture more generic information about the page. Not all pages need a description, especially if the title is explicit enough.

We recommend keeping a Page Header description to 1-2 sentences, if a longer description is required, consider linking to external documentation or moving more detailed content to an interstitial component like a [Flyout](/components/flyout)

<Hds::PageHeader as |PH|>
  <PH.Title>HCP Packer Dashboard</PH.Title>
  <PH.IconTile @icon="packer-color" @color="packer" />
  <PH.Description>
    Channel created and managed automatically for you by Packer.
  </PH.Description>
</Hds::PageHeader>

!!! Dont

Don't include overly complex details, long-form content, or instructions in the description. This can add too much visual weight to the Page Header and can detract from the content on the main page.

<Hds::PageHeader as |PH|>
  <PH.Title>HCP Packer Dashboard</PH.Title>
  <PH.IconTile @icon="packer-color" @color="packer" />
  <PH.Description>
    Channel created and managed automatically for you by Packer. With this channel you can manage your Packer registries, create new registries, and view analytics for all of your Packer resources. To get started, create a new registry or select an already existing registry.
  </PH.Description>
</Hds::PageHeader>

!!!

!!! Do

Instead, link to more complex content using an [Inline Link](/components/link/inline) with an optional icon to indicate the scope of the link (internal resource, external resource, etc).

<Hds::PageHeader as |PH|>
  <PH.Title>HCP Packer Dashboard</PH.Title>
  <PH.IconTile @icon="packer-color" @color="packer" />
  <PH.Description>
    Channel created and managed automatically for you by Packer. For more information on how this channel is managed refer to the Packer <Hds::Link::Inline @icon="external-link" @href="#">documentation</Hds::Link::Inline>.
  </PH.Description>
</Hds::PageHeader>

!!!

## Custom metadata

If necessary to include metadata like key/value pairs, multiple page-level statuses, or other structured content, custom metadata can be passed to the component via the `customMetadata` property in Figma, or the `<[PH].Generic>` contextual component in Ember.

<Hds::PageHeader as |PH|>
  <PH.Title>Terraform Workspace</PH.Title>
  <PH.IconTile @icon="terraform-color" @color="terraform" />
  <PH.Subtitle><strong>ID:</strong> wkdj293hfiw2liej234fklds</PH.Subtitle>
  <PH.Description>Terraform enables you to safely and predictably create, change, and improve your application infrastructure. <Hds::Link::Inline @href="#" @icon="external-link">Read more</Hds::Link::Inline>.</PH.Description>
  <PH.Generic>
    <Doc::Placeholder
      @text="generic metadata"
      @height="36"
      @width="350"
      @background="#eee"
    />
  </PH.Generic>
</Hds::PageHeader>

### Key/value pairs as custom metadata

Representing metadata with a set of key/value pairs is common in HashiCorp products and can be useful when communicating relational information between products, versioning, and other complex structured data.

![Custom metadata key/value pairs](/assets/components/page-header/page-header-custom-metadata.png =600x*)

!!! Dont

We recommend not exceeding more than four metadata objects or key/value pairs, this can result in unnecessarily complex content with the Page Header. Instead, move this content into the page.

![Complex metadata dont](/assets/components/page-header/page-header-custom-metadata-dont.png)

!!!

## Actions

Use [Buttons](/components/button) and [Dropdowns](/components/dropdown) in the Page Header to highlight page-level functions and actions that impact the page holistcally. Examples of this include:

- Creating new objects that are listed within the page
- Surfacing management details like connecting to an API
- Deleting or deactivating an object
- Pausing or refreshing a service pertaining the page

<Hds::PageHeader as |PH|>
  <PH.Title>Consul clusters</PH.Title>
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

### Primary button

Use a primary [Button](/components/button) in the Page Header to trigger the most important flow or action on the page. Examples of this include:

- A flow that creates an object that is related to the page, e.g., creating a new cluster or adding a new user.
- Launching or deploying a specific product instance

### Secondary button

Use a secondary [Button](/components/button) in the Page Header when needed to highlight actions such as editing the content on a page, managing access, etc.

### Tertiary button

Tertiary [Buttons](/components/button) can be useful when linking to external documentation or highlighting other low-priority actions.

<Hds::PageHeader as |PH|>
  <PH.Title>Page title</PH.Title>
  <PH.IconTile @logo="vault" />
  <PH.Actions>
    <Hds::Button
      @text="Vault documentation"
      @color="tertiary"
      @icon="external-link"
      @iconPosition="leading"
    />
    <Hds::Button
      @text="Create cluster"
      @color="primary"
      @icon="plus"
      @iconPosition="leading"
    />
  </PH.Actions>
</Hds::PageHeader>

### Dropdowns

Use a [Dropdown](/components/dropdown) in the Page Header to combine additional secondary functions, tasks, or elements that assist the user in managing the information or objects on the page. Examples of this include:

- Copying API credentials to manage the object remotely
- Editing or changing settings
- Deleting or deactivating an object
- Linking to documentation

When used in these scenarios and paired with a primary "create" action, use the secondary [Dropdown](/components/dropdown) variant.

!!! Do

Use a primary [Dropdown](/components/dropdown) when the same action can be done in multiple different contexts. For example, taking the same action through a different interface or path; GUI, CLI, or API call.

<Hds::PageHeader as |PH|>
  <PH.Title>Consul clusters</PH.Title>
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
      <DD.ToggleButton @text="Manage" @color="primary" />
      <DD.Description @text="Access via" />
      <DD.Interactive @route="components" @text="GUI" @icon="dashboard" />
      <DD.Interactive @route="components" @text="CLI" @icon="terminal-screen" />
      <DD.Interactive @route="components" @text="API" @icon="api" />
    </Hds::Dropdown>
  </PH.Actions>
</Hds::PageHeader>

!!!

!!! Dont

Don't use a primary [Dropdown](/components/dropdown) when combining different, unrelated actions.

<Hds::PageHeader as |PH|>
  <PH.Title>Consul clusters</PH.Title>
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
      <DD.ToggleButton @text="Manage" @color="primary" />
      <DD.Interactive @route="components" @text="Edit settings" @icon="edit" />
      <DD.Interactive @route="components" @text="Access via CLI" @icon="terminal-screen" />
      <DD.Interactive @route="components" @text="Delete cluster" @icon="trash" @color="critical" />
    </Hds::Dropdown>
  </PH.Actions>
</Hds::PageHeader>

!!!

### Action color and pairing

While the Page Header supports up to three actions in Figma, we recommend limiting the number actions to two for most pages. These actions should generally consist of a primary action (using the `@color="primary"` property) and a secondary action or management function (using the `@color="secondary"` property).

For more details on how to combine, order, and organize Buttons, refer to the [Button order, organization, and alignment](/patterns/button-organization) pattern documentation.

!!! Dont

Don't pair two primary actions in a Page Header. Instead, communicate the highest priority action for the user with a primary Button and other actions with a secondary Button or within a Dropdown.

<Hds::PageHeader as |PH|>
  <PH.Title>Two actions</PH.Title>
  <PH.Actions>
    <Hds::Button @text="Create object" @icon="plus" @iconPosition="leading" />
    <Hds::Button @text="Open Admin UI" @href="#" @icon="external-link" @iconPosition="leading" />
  </PH.Actions>
</Hds::PageHeader>

!!!

## Responsiveness

The Page Header component in Figma supports two sizes; `large` which accounts for the majority of desktop sizes and large tablets, and `small` which accounts for smaller tablet and mobile devices. The core difference between each variant is the vertical stacking of elements.

The Ember component uses a variety of different methods to ensure fluidity and responsiveness:

- By default, the component will fill the page layout it is used within. It does not have any padding or margin explicitly applied to adapt to different layout and spacing methods.
- The component has breakpoints by means of container queries (at `700px` and one at `400px`) that account for the majority of content within the component and stack elements in a single column as the container shrinks.
- Elements displayed inline with each other (e.g., title and badges) have `flex-wrap: wrap;` set to wrap elements when the available space reduces. 

!!! Info

Additional responsive characteristics are the responsibility of the consumer and dependent on the layout and spacing methods defined at the application level.

!!!

## Related

- [Breadcrumb](/components/breadcrumb)
- [IconTile](/components/icon-tile)
