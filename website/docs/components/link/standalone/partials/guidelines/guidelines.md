## Usage

### When to use

- To navigate to a new destination, either internally or externally.
- As a standalone element or within a [Button Set](/components/button-set).

### When not to use

- Within a body of text, consider [Inline Link](/components/link/inline).
- To trigger an action or event, like a form submission, consider [Button](/components/button).

## Size

We recommend using a medium size, but use whichever size fits best in the UI. For example, don’t use large links in tables.

<Doc::Layout @spacing="12px">
  <Hds::Link::Standalone @size="small" @text="Small" @icon="arrow-right" @iconPosition="trailing" @route="components" />
  <Hds::Link::Standalone @size="medium" @text="Medium" @icon="arrow-right" @iconPosition="trailing" @route="components" />
  <Hds::Link::Standalone @size="large" @text="Large" @icon="arrow-right" @iconPosition="trailing" @route="components" />
</Doc::Layout>

## Color

### Primary

!!! Info

Take care when needing multiple links on a page; too many primary links can distract from the end goal.
!!!

We recommend using the `primary` variant as the default and for more important links.

For example, when navigating the user to “View clusters”:

<Hds::Link::Standalone @text="View clusters" @icon="arrow-right" @iconPosition="trailing" @type="primary" @route="components" />

### Secondary

Use the Secondary variant for less important links, when the primary color can’t be used, or when creating a list of links.

For example, on an install page, when navigating the user to “Learn more about Vault”:

<Hds::Link::Standalone @text="Learn more about Vault" @icon="external-link" @iconPosition="trailing" @color="secondary" @route="components" />

## Icon position

A Standalone Link can include a leading or trailing icon. Avoid creating links with both leading and trailing icons.

### Leading

In most cases, use leading icons. Choose icons that add meaning and clarity to the action described in the link’s text.

<Doc::Layout @spacing="12px">
  <Hds::Link::Standalone @text="Download" @icon="download" @iconPosition="leading" @color="primary" @route="components" />
  <Hds::Link::Standalone @text="View connections" @icon="network-alt" @iconPosition="leading" @color="primary" @route="components" />
</Doc::Layout>

!!! Do

Consider directionality; if directing the user backward in a flow, use the leading position. 

<Doc::Layout @spacing="12px">
  <Hds::Link::Standalone @text="Back to Dashboard" @icon="chevron-left" @iconPosition="leading" @color="primary" @route="components" />
</Doc::Layout>

!!!

!!! Do

Always use the leading position for product or service icons (e.g., GitHub).

<Hds::Link::Standalone @text="Edit pages in GitHub" @icon="github" @iconPosition="leading" @color="primary" @route="components" />

<Doc::Layout @spacing="12px">
  <Hds::Link::Standalone @text="Boundary" @icon="boundary-color" @iconPosition="leading" @color="secondary" @route="components" />
  <Hds::Link::Standalone @text="Consul" @icon="consul-color" @iconPosition="leading" @color="secondary" @route="components" />
  <Hds::Link::Standalone @text="Vault" @icon="vault-color" @iconPosition="leading" @color="secondary" @route="components" />
  <Hds::Link::Standalone @text="Waypoint" @icon="waypoint-color" @iconPosition="leading" @color="secondary" @route="components" />
</Doc::Layout>

!!!

### Trailing

Consider trailing icons when there’s no other meaningful icon or when guiding the user forward through the product.

- Use `arrow-right` for internal links.
- Use `learn-link` for links to tutorials.
- Use `docs-link` for links to documentation or installation guides.
- Use `external-link` for external links.

!!! Do

<Doc::Layout @spacing="12px">
  <Hds::Link::Standalone @text="View billing" @icon="arrow-right" @iconPosition="trailing" @color="primary" @route="components" />
  <Hds::Link::Standalone @text="Service mesh tutorial" @icon="learn-link" @iconPosition="trailing" @color="primary" @route="components" />
  <Hds::Link::Standalone @text="Consul documentation" @icon="docs-link" @iconPosition="trailing" @color="primary" @route="components" />
  <Hds::Link::Standalone @text="Submit feedback" @icon="external-link" @iconPosition="trailing" @color="primary" @route="components" />
</Doc::Layout>

!!!

!!! Dont

Don’t put product or service icons in the trailing position. 

<Hds::Link::Standalone @text="Edit pages in GitHub" @icon="github" @iconPosition="trailing" @color="primary" @route="components" />

<Doc::Layout @spacing="12px">
  <Hds::Link::Standalone @text="Boundary" @icon="boundary-color" @iconPosition="trailing" @color="secondary" @route="components" />
  <Hds::Link::Standalone @text="Consul" @icon="consul-color" @iconPosition="trailing" @color="secondary" @route="components" />
  <Hds::Link::Standalone @text="Vault" @icon="vault-color" @iconPosition="trailing" @color="secondary" @route="components" />
  <Hds::Link::Standalone @text="Waypoint" @icon="waypoint-color" @iconPosition="trailing" @color="secondary" @route="components" />
</Doc::Layout>
!!!

To learn more about icon best practices, review our [Icon usage](/components/icon) guidelines.

## Spacing between links

### Vertical list

We recommend at least 8px between Standalone Links when placed in a horizontal list.

![Recommended spacing between Standalone Links in a vertical list](/assets/components/link/standalone/standalone-link-vertical-list.png)

!!! Dont

Don't stack Standalone Links without any space between them. This creates a cluttered visual and requires precise mouse interaction that may not make for an inclusive experience.

![Example of no space between Standalone Links in a vertical list](/assets/components/link/standalone/standalone-link-vertical-list-dont.png)
!!!

### Horizontal list

We recommend at least 16px between Standalone Links when placed in a horizontal list.

![Recommended spacing between Standalone Links in a horizontal list](/assets/components/link/standalone/standalone-link-horizontal-list.png)

## Common patterns

### Within Button Sets

Standalone Links often appear in [Button Sets](/components/button-set).

<Hds::ButtonSet>
  <Hds::Link::Standalone @text="Previous" @icon="chevron-left" @iconPosition="leading" @color="primary" @route="components" />
  <Hds::Button @text="Submit" @color="primary" />
  <Hds::Button @text="Cancel" @color="secondary" />
</Hds::ButtonSet>

## Content

- Text should be short and to the point (~25 characters). Text labels should not consist of full sentences but should provide enough context to be useful.
- Use language consistently within each product (e.g., if “Edit” is used on one page, use that same convention throughout, instead of a similar word such as "Change").
