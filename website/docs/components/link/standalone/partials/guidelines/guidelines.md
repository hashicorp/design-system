## Usage

### When to use

- To navigate to a new destination, either internally or externally.
- As a standalone element or within a Button Set, use a **(Link) Standalone**

### When not to use

- Within a body of text, use a **Link (Inline)**
- To trigger an action or event, like a form submission, use a [Button](/components/button/overview)

### Size

<Hds::Link::Standalone @size="large" @text="Large" @icon="arrow-right" @iconPosition="trailing" @route="components" />

<Hds::Link::Standalone @size="medium" @text="Medium" @icon="arrow-right" @iconPosition="trailing" @route="components" />

<Hds::Link::Standalone @size="small" @text="Small" @icon="arrow-right" @iconPosition="trailing" @route="components" />

In most cases use a medium size, but use a link size that best fits the UI.

For example:

- Don't use large links in tables.

### Type

#### Primary

Use the `primary` variant as the default and for more important links. 

For example when navigating the user to `View clusters`:

<Hds::Link::Standalone @text="View clusters" @icon="arrow-right" @iconPosition="trailing" @type="primary" @route="components" />

!!! Info

Take care when needing multiple links on a page; using too many primary links can detract from the end goal.
!!!
#### Secondary

Use the Secondary variant for less important links, when the action color can't be used, or when creating a list of links.

For example in an Install page, 'Learn more about Vault'

<Hds::Link::Standalone @text="View clusters" @icon="external-link" @iconPosition="trailing" @color="secondary" @route="components" />

### Icon position

A **Link (Standalone)** can include leading or trailing icons. Avoid creating links with both leading and trailing icons.

#### Leading

In most cases, use leading icons. Choose icons that add meaning and clarity to the action described in the link's text.

You may also want to use the leading position when using service icons (i.e. GitHub).

<Hds::Link::Standalone @text="Deploy with Terraform" @icon="zap" @iconPosition="leading" @color="primary" @route="components" />
<Hds::Link::Standalone @text="Edit pages in GitHub" @icon="github" @iconPosition="leading" @color="primary" @route="components" />
<Hds::Link::Standalone @text="Download" @icon="download" @iconPosition="leading" @color="primary" @route="components" />
<Hds::Link::Standalone @text="View connections" @icon="network-alt" @iconPosition="leading" @color="primary" @route="components" />

<Hds::Link::Standalone @text="Deploy with Terraform" @icon="zap" @iconPosition="leading" @color="secondary" @route="components" />
<Hds::Link::Standalone @text="Edit pages in GitHub" @icon="github" @iconPosition="leading" @color="secondary" @route="components" />
<Hds::Link::Standalone @text="Download" @icon="download" @iconPosition="leading" @color="secondary" @route="components" />
<Hds::Link::Standalone @text="View connections" @icon="network-alt" @iconPosition="leading" @color="secondary" @route="components" />

#### Trailing

If the link is internal and when none of the icons add any meaning to the link or meet your needs, we recommend using a simple <span><FlightIcon @name="arrow-right" @color="var(--token-color-palette-blue-200)" /></span> (arrow-right).

Using the <span><FlightIcon @name="external-link" @color="var(--token-color-palette-blue-200)" /></span> (external-link) icon in the trailing position is highly recommended for external links if the link points to an external URL.

  <Hds::Link::Standalone @text="View billing" @icon="arrow-right" @iconPosition="trailing" @color="primary" @route="components" />
  <Hds::Link::Standalone @text="Submit feedback" @icon="external-link" @iconPosition="trailing" @color="primary" @route="components" />
  <Hds::Link::Standalone @text="Consul documentation" @icon="docs-link" @iconPosition="trailing" @color="primary" @route="components" />
  <Hds::Link::Standalone @text="Service mesh tutorial" @icon="learn-link" @iconPosition="trailing" @color="primary" @route="components" />

  <Hds::Link::Standalone @text="View billing" @icon="arrow-right" @iconPosition="trailing" @color="secondary" @route="components" />
  <Hds::Link::Standalone @text="Submit feedback" @icon="external-link" @iconPosition="trailing" @color="secondary" @route="components" />
  <Hds::Link::Standalone @text="Consul documentation" @icon="docs-link" @iconPosition="trailing" @color="secondary" @route="components" />
  <Hds::Link::Standalone @text="Service mesh tutorial" @icon="learn-link" @iconPosition="trailing" @color="secondary" @route="components" />

!!! Info

If adding a specific icon is relevant to the user experience, and none of the icons available in Flight fit your use case, consider [requesting a custom icon](https://github.com/hashicorp/design-system/issues/new/choose).
!!!

## Common patterns

### Within button sets

**Link (Standalone)** can commonly be seen within **button sets**.

<Hds::ButtonSet>
  <Hds::Link::Standalone @text="Previous" @icon="chevron-left" @iconPosition="leading" @color="primary" @route="components" />
  <Hds::Button @text="Submit" @color="primary" />
  <Hds::Button @text="Cancel" @color="secondary" />
</Hds::ButtonSet>

When included in a ButtonSet, Link (Standalone) is generally used for navigating between steps in a multi-page form (ie. directing the user back to the previous step) or for linking to external documentation. As such, they should be displayed as the right most button in the row.

## Content

- Text should be short and to the point (~25 characters). Text labels should not consist of full sentences, but should provide enough context to be useful.
- Language should be used consistently within each product (ie. when using "Edit" on one page, use that same convention throughout the rest of the application, not "Change").
