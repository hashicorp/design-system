---
category: components
group: link
component: standalone
section: design-guidelines
---

# Link (Standalone) - Design Guidelines

## When to use

- To navigate to a new destination, either internally or externally.
- As a standalone element or within a Button Set, use a **(Link) Standalone**

## When not to use

- Within a body of text, use a **Link (Inline)**
- To trigger an action or event, like a form submission, use a [Button](/components/button/overview)

---

## Anatomy

![Anatomy of the Standalone Link](/assets/components/link/standalone/link_standalone-anatomy.png)

#### Leading Icon\*

Optional

#### Text

Required

#### Trailing Icon\*

Optional

#### Focus Ring

Focs state only

\*A Link (Standalone) should always include an icon

---

## Size

Medium is the preferred size, but use a link size that best fits the UI.

For example:

- Don't use large links in tables.

<section>
  <Hds::Link::Standalone @size="large" @text="Large" @icon="arrow-right" @iconPosition="trailing" @route="components" />
  <Hds::Link::Standalone @size="medium" @text="Medium" @icon="arrow-right" @iconPosition="trailing" @route="components" />
  <Hds::Link::Standalone @size="small" @text="Small" @icon="arrow-right" @iconPosition="trailing" @route="components" />
</section>

---

## Type

### Primary

Use the Primary variant as the default and for more importan links. Take care when needing multiple links on a page; using too many primary links can detract from the end goal.

For example:

- when navigating the user to 'View clusters'

<section>
  <Hds::Link::Standalone @text="View clusters" @icon="arrow-right" @iconPosition="trailing" @type="primary" @route="components" />
</section>

### Secondary

Use the Secondary variant for less important links, when the action color can't be used, or when creating a list of links.

For example:

- in an Install page, 'Learn more about Vault'

<section>
  <Hds::Link::Standalone @text="View clusters" @icon="external-link" @iconPosition="trailing" @color="secondary" @route="components" />
</section>

---

## State

### Primary

<section>
  <Hds::Link::Standalone @text="Default" @icon="plus" @iconPosition="leading" @color="primary" @route="components" mock-state-value="default" />
  <Hds::Link::Standalone @text="Hover" @icon="plus" @iconPosition="leading" @color="primary" @route="components" mock-state-value="hover" />
  <Hds::Link::Standalone @text="Active" @icon="plus" @iconPosition="leading" @color="primary" @route="components" mock-state-value="active" />
  <Hds::Link::Standalone @text="Focus" @icon="plus" @iconPosition="leading" @color="primary" @route="components" mock-state-value="focus" />
</section>

### Secondary

<section>
  <Hds::Link::Standalone @text="Default" @icon="plus" @iconPosition="leading" @color="secondary" @route="components" mock-state-value="default" />
  <Hds::Link::Standalone @text="Hover" @icon="plus" @iconPosition="leading" @color="secondary" @route="components" mock-state-value="hover" />
  <Hds::Link::Standalone @text="Active" @icon="plus" @iconPosition="leading" @color="secondary" @route="components" mock-state-value="active" />
  <Hds::Link::Standalone @text="Focus" @icon="plus" @iconPosition="leading" @color="secondary" @route="components" mock-state-value="focus" />
</section>

---

## Icon position

A **Link (Standalone)** can include leading or trailing icons. Avoid creating links with both leading and trailing icons.

### Leading

In most cases, use leading icons. Choose icons that add meaning and clarity to the action described in the link's text.

You may also want to use the leading position when using service icons (i.e. GitHub).

<section>
  <Hds::Link::Standalone @text="Deploy with Terraform" @icon="zap" @iconPosition="leading" @color="primary" @route="components" />
  <Hds::Link::Standalone @text="Edit pages in GitHub" @icon="github" @iconPosition="leading" @color="primary" @route="components" />
  <Hds::Link::Standalone @text="Download" @icon="download" @iconPosition="leading" @color="primary" @route="components" />
  <Hds::Link::Standalone @text="View connections" @icon="network-alt" @iconPosition="leading" @color="primary" @route="components" />
</section>

<section>
  <Hds::Link::Standalone @text="Deploy with Terraform" @icon="zap" @iconPosition="leading" @color="secondary" @route="components" />
  <Hds::Link::Standalone @text="Edit pages in GitHub" @icon="github" @iconPosition="leading" @color="secondary" @route="components" />
  <Hds::Link::Standalone @text="Download" @icon="download" @iconPosition="leading" @color="secondary" @route="components" />
  <Hds::Link::Standalone @text="View connections" @icon="network-alt" @iconPosition="leading" @color="secondary" @route="components" />
</section>

### Trailing

When none of the icons from Flight add any meaning to the link or meet your needs, we recommend using a simple <span><FlightIcon @name="arrow-right" @color="var(--token-color-palette-blue-200)" /></span> (arrow-right) trailing icon if it is an internal link.

Using the <span><FlightIcon @name="external-link" @color="var(--token-color-palette-blue-200)" /></span> (external-link) icon in the trailing position is highly recommended for external links if the link points to an external URL.

<section>
  <Hds::Link::Standalone @text="View billing" @icon="arrow-right" @iconPosition="trailing" @color="primary" @route="components" />
  <Hds::Link::Standalone @text="Submit feedback" @icon="external-link" @iconPosition="trailing" @color="primary" @route="components" />
  <Hds::Link::Standalone @text="Consul documentation" @icon="docs-link" @iconPosition="trailing" @color="primary" @route="components" />
  <Hds::Link::Standalone @text="Service mesh tutorial" @icon="learn-link" @iconPosition="trailing" @color="primary" @route="components" />
</section>

<section>
  <Hds::Link::Standalone @text="View billing" @icon="arrow-right" @iconPosition="trailing" @color="secondary" @route="components" />
  <Hds::Link::Standalone @text="Submit feedback" @icon="external-link" @iconPosition="trailing" @color="secondary" @route="components" />
  <Hds::Link::Standalone @text="Consul documentation" @icon="docs-link" @iconPosition="trailing" @color="secondary" @route="components" />
  <Hds::Link::Standalone @text="Service mesh tutorial" @icon="learn-link" @iconPosition="trailing" @color="secondary" @route="components" />
</section>

_Banner (informational):_ If adding a specific icon is relevant to the user experience, and none of the icons available in Flight fit your use case, consider [requesting a custom icon](https://github.com/hashicorp/design-system/issues/new/choose).

---

## Common patterns

### Within button sets

**Link (Standalone)** can commonly be seen within **button sets**.

<section>
  <Hds::ButtonSet>
    <Hds::Link::Standalone @text="Previous" @icon="chevron-left" @iconPosition="leading" @color="primary" @route="components" />
    <Hds::Button @text="Submit" @color="primary" />
    <Hds::Button @text="Cancel" @color="secondary" />
  </Hds::ButtonSet>
</section>

Often when included in a button set, Link (Standalone) is used for navigating between steps in a multi-page form (ie. directing the user back to the previous step). As such, they should be displayed as the left most button in the row.

---

## Content

- Text should be short and to the point (~25 characters). They should not consist of full sentences, but should provide enough context to be useful.
- Language should be used consistently within each product (ie. when using "Edit" on one page, use that same convention throughout the rest of the application, not "Change").

---

## Accessibility

Provide annotations alongside each design of the non-visual experience. This could look like:

![Annotation of focus order of the link](/assets/components/link/standalone/link_standalone-accessibility-focus_order.png)

_Banner (informational):_ Animations or transitions will not take place if the user has `prefers-reduced-motion` enabled in their browser.
