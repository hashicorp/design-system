## Usage

### When to use

- To trigger an action or event, like a form submission.

### When not to use

- When navigating to another destination, consider [Inline](/components/link/inline) or [Standalone](/components/link/standalone) link.
- To display multiple actions under a single button, use [Dropdown](/components/dropdown).

## Sizes

Medium is the preferred size, but use a Button size that best fits the UI (e.g., don’t use a `large` button in a table).

!!! Insight

**Migration tip** 

Medium buttons are the same size as default Structure buttons. Small buttons are the same size as compact Structure buttons.
!!!

<Doc::Layout @spacing="16px">
  <Hds::Button @size="small" @text="Small" />
  <Hds::Button @size="medium" @text="Medium" />
  <Hds::Button @size="large" @text="Large" />
</Doc::Layout>

Full-width buttons fill 100% of the parent container. Use full-width Buttons sparingly.

<Hds::Button @size="large" @isFullWidth={{true}} @text="Full-width button" />

## Types

### Primary

Use **Primary** for the most important action on a page, e.g., for submitting a form. Avoid using multiple Primary buttons on a single page.

<Hds::Button @color="primary" @icon="arrow-right" @iconPosition="trailing" @text="Primary" />

### Secondary

Use **Secondary** for less important actions or when multiple actions of the same importance are needed.

For example:

- for `Cancel` next to a `Submit` button.
- when needing to let the user do things like `Download` or `Generate` a report but neither are the primary focus or goal of the page.

<Hds::Button @color="secondary" @icon="arrow-right" @iconPosition="trailing" @text="Secondary" />

### Critical

Use **Critical** when users take an action that is potentially dangerous. For example, when deleting a cluster.

<Hds::Button @color="critical" @icon="arrow-right" @iconPosition="trailing" @text="Critical" />

### Tertiary

Use **Tertiary** for low-priority actions when lighter visual weight is required.

For example:

- for actions on a page that require even less visual weight or priority than a secondary button (our default for less important actions).
- for controlling form fields (such as adding an additional form field).

<Hds::Button @color="tertiary" @icon="arrow-right" @iconPosition="trailing" @text="Tertiary" />

## Icon position

Buttons are provided with flexible icon use; allowing for leading, trailing, or icon only buttons. Use icons intentionally and only when they provide the user with extra value. Do not create buttons with both leading and trailing icons. Tertiary buttons are required to have either a leading or trailing icon layout to be accessible.

!!! Info

**Looking for Dropdowns?**

Buttons used for a Dropdown (with the chevron icon) can be found in [Dropdown](/components/dropdown).
!!!

<Hds::ButtonSet>
  <Hds::Button @color="secondary" @text="No icon" />
  <Hds::Button @color="secondary" @text="Leading Icon" @icon="plus" @iconPosition="leading" />
  <Hds::Button @color="secondary" @text="Trailing Icon" @icon="arrow-right" @iconPosition="trailing" />
  <Hds::Button @color="secondary" @text="No text" @icon="plus" @isIconOnly={{true}} />
</Hds::ButtonSet>

### Leading

In most cases, use leading icons. Choose icons that add meaning and clarity to the action described in the link’s text.

<Hds::ButtonSet>
  <Hds::Button @color="secondary" @text="Unlock" @icon="unlock" @iconPosition="leading" />
  <Hds::Button @color="secondary" @text="Show more results" @icon="eye" @iconPosition="leading" />
  <Hds::Button @color="critical" @text="Delete" @icon="trash" @iconPosition="leading" />
  <Hds::Button @color="tertiary" @text="Previous" @icon="chevron-left" @iconPosition="leading" />
</Hds::ButtonSet>

!!! Do

Use the leading position when creating or adding a new object.

<Hds::ButtonSet>
  <Hds::Button @color="primary" @text="Create variable" @icon="plus" @iconPosition="leading" />
  <Hds::Button @color="secondary" @text="Add repository" @icon="plus" @iconPosition="leading" />
</Hds::ButtonSet>

!!!

### Trailing

Consider trailing icons when there’s no other meaningful icon or when guiding the user forward through the product.

Use `chevron-right` to indicate moving forward in a multi-step flow.

<Hds::Button @color="primary" @text="Next" @icon="chevron-right" @iconPosition="trailing" />

Use `arrow-right` when using the Button for internal links. In most cases, consider using the [Standalone Link](/components/link/standalone) instead. For more details, please refer to the [code documentation](/components/button?tab=code#links).

<Hds::Button @color="secondary" @text="Continue with HCP account" @icon="arrow-right" @iconPosition="trailing" @href="https://hashicorp.com" />


Use `external-link` when using the Button for external links. In most cases, consider using the [Standalone Link](/components/link/standalone) instead. For more details, please refer to the [code documentation](/components/button?tab=code#links).

<Hds::Button @color="secondary" @text="Authenticate with GitHub" @icon="external-link" @iconPosition="trailing" @href="https://hashicorp.com" />

## Button set

[ButtonSets](/components/button-set) are patterns when multiple Buttons need to be displayed in a single row.

<Hds::ButtonSet>
  <Hds::Button @color="primary" @text="Submit" />
  <Hds::Button @color="secondary" @text="Cancel" />
</Hds::ButtonSet>

More detailed examples and guidance on button organization can be found in the [button organization](/patterns/button-organization) pattern documentation.

## Content

- Text should be short and to the point (~25 characters). Buttons should not consist of full sentences, but should provide enough context to be useful.
- Language should be used consistently within each product (e.g., when using "Edit" on one page, use that same convention throughout the rest of the application, not "Change").
