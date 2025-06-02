## Usage

### When to use

- To display the title or topmost heading within a page.
- To communicate metadata pertaining to the page; e.g., status, description, subtitle, etc.
- To highlight page-level actions and functions.

### When not to use

- To communicate page-level information anywhere other than the top of the page.

## Title

Displays the title or topmost heading of the page. We recommend not exceeding 50 characters in length, but in the case of a longer value (e.g., a user or automatically generated value) the title will wrap to multiple lines.

!!! Warning

The Page Header renders the title as an `<h1>` element. Ensure this is the only `<h1>` on the page, as more than one `<h1>` can confuse screen readers and impact the semantic hierarchy of the page.

!!!

## Breadcrumb

Displays a [Breadcrumb](/components/breadcrumb) to communicate the application hierarchy and location to the user.

![Page Header Breadcrumb](/assets/components/page-header/page-header-breadcrumb.png =700x*)

!!! Warning

**Multiple Breadcrumb components**

The [Breadcrumb](/components/breadcrumb) uses a landmark `<nav>` element. Ensure that there is only one Breadcrumb on the page, or differentiate between Breadcrumbs by passing them different `ariaLabel` arguments. Refer to the [Breadcrumb API](/components/breadcrumb?tab=code#component-api) for more details.

!!!

## Icon Tile

Displays a Helios [IconTile](/components/icon-tile) as a visual indicator for the content of the page, object, or product branding.

![Page Header Icon Tile](/assets/components/page-header/page-header-icon-tile.png =700x*)

!!! Info

For consistency and to avoid competing visually with the title, only the `medium` size of the [IconTile](/components/icon-tile) is supported in the Page Header.

!!!

## Badges

Displays Helios [Badges](/components/badge) to communicate high-priority metadata like the status of the page and metadata that is subject to change. We recommend using a maximum of three Badges within the Page Header and prioritizing the most contextually relevant metadata.

![Page Header Badges](/assets/components/page-header/page-header-badges.png =700x*)

!!! Do

Use badges to express similar or related metadata pertaining to the page content.

![Page Header Badges Metadata](/assets/components/page-header/page-header-badges-do-metadata.png =700x*)

!!!

!!! Dont

Don’t use more than three badges within the Page Header, instead explore ways to express additional metadata in the `generic` area of the component or move the content to the main page.

![Page Header Badges Metadata](/assets/components/page-header/page-header-badges-dont-many-badges.png =700x*)

!!!

## Subtitle

Displays a subtitle beneath the title to communicate metadata that does not change frequently or is not subject to changes within the application. Common examples of this are organization name, project name, unique IDs, resource names, etc.

![Page Header Subtitle](/assets/components/page-header/page-header-subtitle.png =700x*)

!!! Dont

Don’t use full sentences in the subtitle, use a [description](#description) instead.

![Page Header Full Sentence Subtitle](/assets/components/page-header/page-header-subtitle-dont-full-sentence.png =700x*)

!!!

## Description

Displays a description beneath the title and subtitle to communicate more detailed information about the page, link out to external documentation and resources, and capture more generic information about the page. Not all pages need a description, especially if the title is explicit enough.

We recommend limiting the Page Header description to 1–2 sentences. If a longer description is required, consider linking to external documentation or moving more detailed content to an interstitial component like a [Flyout](/components/flyout).

![Page Header Description](/assets/components/page-header/page-header-description.png =700x*)

!!! Dont

Don’t include overly complex details, long-form content, or instructions in the description. This can add too much visual weight to the Page Header and can detract from the content on the main page.

![Page Header Long Form Description](/assets/components/page-header/page-header-description-dont-long-form.png =700x*)

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

!!! Insight

**Hand-off note:** Nesting a [Link Inline](/components/link/inline) with an icon inside of the description is not supported in the Figma component. Instead, override the description text with the correct text style and color, and ensure that this detail is accounted for in the engineering hand-off.

!!!

## Custom content

If necessary to include metadata like key/value pairs, multiple page-level statuses, or other structured content, custom content can be passed to the component via the `hasGenericInstance` property in Figma, and to the generic contextual component in Ember.

![Page Header custom metadata](/assets/components/page-header/page-header-custom-metadata-example.png =700x*)

### Key/value pairs as custom metadata

Representing metadata with a set of key/value pairs is common in HashiCorp products and can be useful when communicating relational information between products, versioning, and other structured data.

![Custom metadata key/value pairs](/assets/components/page-header/page-header-custom-metadata.png =600x*)

!!! Dont

We recommend not exceeding more than four key/value pairs; this can result in unnecessarily complex content within the Page Header. Instead, move this content to the page.

![Complex metadata dont](/assets/components/page-header/page-header-custom-metadata-dont.png)

!!!

## Actions

Use [Buttons](/components/button) and [Dropdowns](/components/dropdown) in the Page Header to highlight functions and actions that impact the page as a whole. Examples of this include:

- Creating new objects that are listed within the page.
- Surfacing management details like connecting to an API.
- Pausing or refreshing a service pertaining to the page.

![Page Header Actions](/assets/components/page-header/page-header-actions.png =853x*)

### Primary button

Use a `primary` [Button](/components/button) in the Page Header to highlight the most important flow or action on the page. Examples of this include:

- A flow that creates an object that is related to the page, e.g., creating a new cluster or adding a new user.
- Launching or deploying a specific product instance.

### Secondary button

Use a `secondary` [Button](/components/button) in the Page Header when highlighting actions that are less important than the primary action, such as editing the content on a page, managing access, etc.

### Tertiary button

A `tertiary` [Button](/components/button) should be used sparingly in the Page Header, but can be used to highlight low-priority actions like terminal instructions or to trigger a component like a [Flyout](/components/flyout) to enhance the content on the main page.

Depending on the intended function, consider consolidating a `tertiary` Button into a [Dropdown](/components/dropdown).

![Page Header Actions Tertiary Button](/assets/components/page-header/page-header-actions-tertiary-button.png =700x*)

### Dropdowns

Use a [Dropdown](/components/dropdown) in the Page Header to combine multiple secondary functions, tasks, or elements that assist the user in managing the information or objects on the page. Examples of this include:

- Copying API credentials to manage the object remotely.
- Editing or changing settings.
- Deleting or deactivating an object.
- Linking to documentation.

When used in these scenarios and paired with a `primary` button, use a `secondary` [Dropdown](/components/dropdown).

!!! Do

Use a primary [Dropdown](/components/dropdown) when the same action can be done in multiple different contexts. For example, taking the same action through a different interface or path; GUI, CLI, or API call.

![Page Header primary dropdown](/assets/components/page-header/page-header-actions-do-primary-dropdown.png =853x*)

!!!

!!! Dont

Don’t use a `primary` color [Dropdown](/components/dropdown) when combining different, unrelated actions. Instead, use the `secondary` color.

![Page Header primary dropdown](/assets/components/page-header/page-header-actions-dont-primary-dropdown.png =853x*)

!!!

### Action color and pairing

While the Page Header supports up to three actions in Figma, we recommend limiting the number of actions to two for most pages. These actions should generally consist of a primary action (e.g. "Create" or "Deploy") and a secondary action (e.g., "Manage").

For more details on how to combine, order, and organize buttons, refer to the [Button order, organization, and alignment](/patterns/button-organization) pattern documentation.

!!! Dont

Don’t pair two primary actions in a Page Header. Instead, communicate the highest priority action for the user with a primary Button or Dropdown and other actions with a secondary Button or Dropdown.

![Page Header two primary actions](/assets/components/page-header/page-header-dont-two-actions.png =700x*)

!!!

## Size

Size only pertains to the Figma component and accounts for smaller viewports by stacking elements. The Ember component supports a basic level of fluidity and responsiveness out of the box.

### Large

![Large Page Header variant](/assets/components/page-header/page-header-size-large.png =945x*)

### Small

![Small Page Header variant](/assets/components/page-header/page-header-size-small.png =300x*)

### Responsiveness

The Page Header component in Figma supports two sizes; `large` which accounts for the majority of desktop sizes and large tablets, and `small` which accounts for smaller tablet and mobile devices. The core difference between each variant is the vertical stacking of elements.

The Ember component uses a variety of different methods to ensure fluidity and responsiveness:

- By default, the component will fill the page layout it is used within. It does not have any padding or margin explicitly applied, allowing it to adapt to different layout and spacing methods.
- The component has breakpoints by means of container queries (at `768px` and one at `400px`) that account for the majority of content within the component and stack elements in a single column as the container shrinks.
- Elements displayed inline with each other (e.g., title and badges) have `flex-wrap: wrap;` set to wrap elements when the available space is reduced.

!!! Info

Additional responsive characteristics are the responsibility of the consumer and dependent on the layout and spacing methods defined at the application level.

!!!
