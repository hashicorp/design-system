## Usage

### When to use

- To trigger an action or event, like a form submission.
- For links that require more prominence, such as CTAs (calls-to-action), see [Links as Buttons](/components/button#links-as-buttons).
- For links that are part of an [inverse button group](/patterns/button-organization#grouping), see [Links as Buttons](/components/button#links-as-buttons).

### When not to use

- For links that are not CTAs or part of an [inverse button group](/patterns/button-organization#grouping), consider [Inline](/components/link/inline) or [Standalone](/components/link/standalone) link.
- To display multiple actions under a single button, use [Dropdown](/components/dropdown).

## Sizes

Medium is the preferred size, but use a Button size that best fits the UI (e.g., don’t use a `large` button in a table).

<Doc::Layout @spacing="16px">
  <Hds::Button @size="small" @text="Small" />
  <Hds::Button @size="medium" @text="Medium" />
  <Hds::Button @size="large" @text="Large" />
</Doc::Layout>

Full-width buttons fill 100% of the parent container. Use full-width Buttons sparingly.

<Hds::Button @size="large" @isFullWidth={{true}} @text="Full-width button" />

## Colors

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

In most cases, use leading icons. Choose icons that add meaning and clarity to the action described in the button’s text.

<Hds::ButtonSet>
  <Hds::Button @color="secondary" @text="Unlock" @icon="unlock" @iconPosition="leading" />
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

Consider trailing icons when guiding the user forward through the product.

Use `chevron-right` to indicate moving forward in a multi-step flow.

<Hds::Button @color="primary" @text="Next" @icon="chevron-right" @iconPosition="trailing" />

Use `arrow-right` when using the Button for internal links. In most cases, consider using a [Standalone Link](/components/link/standalone) instead. For more details, please refer to the [code documentation](/components/button?tab=code#links).

<Hds::Button @color="secondary" @text="Continue with HCP account" @icon="arrow-right" @iconPosition="trailing" @href="https://hashicorp.com" />

Use `external-link` when using the Button for external links. In most cases, consider using a [Standalone Link](/components/link/standalone) instead. For more details, please refer to the [code documentation](/components/button?tab=code#links).

<Hds::Button @color="secondary" @text="Authenticate with GitHub" @icon="external-link" @iconPosition="trailing" @href="https://hashicorp.com" />

## Links as Buttons

The Button component accepts an `@href` or `@route` argument, which results in a link with the visual appearance of a button. While in general, we advise against this approach because it can cause confusion for keyboard-only users, there are a few instances where this may be appropriate for improved visual hierarchy, such as:

For links that require more prominence and CTAs (calls-to-action).

<Hds::Button @color="primary" @text="Sign up for free" @size="large" @href="#" />

<Hds::Alert @type="inline" @color="neutral" as |A|>
  <A.Title>Modifying user permissions</A.Title>
  <A.Description>
    This page displays all users in the organization who have permissions in this project. A user must be invited to the org first before you can change the user’s role at the project level.
  </A.Description>
  <A.Button @text="Go to HCP Design Sandbox" @color="secondary" @href="#" />
  <A.LinkStandalone @text="View documentation" @color="primary" @icon="docs-link" @iconPosition="trailing" @href="#" />
</Hds::Alert>

For links that are part of an [inverse button group](/patterns/button-organization#grouping).

<Hds::ButtonSet>
  <Hds::Button @color="primary" @text="Submit" />
  <Hds::Button @color="secondary" @text="Cancel" @href="#" />
</Hds::ButtonSet>

Learn more about [how semantic use helps make our products more conformant](/components/button?tab=accessibility#button-vs-link).

## Button set

ButtonSet is a layout component that provides consistent spacing between multiple Buttons. Refer to the [ButtonSet](/components/button-set) documentation to learn more. ButtonSet is only available in code.

<Hds::ButtonSet>
  <Hds::Button @color="primary" @text="Edit cluster" />
  <Hds::Button @color="secondary" @text="Create cluster" />
</Hds::ButtonSet>

More detailed examples and guidance on button organization can be found in the [button organization](/patterns/button-organization) pattern documentation.

## Content

- Text should be short and to the point (~25 characters). Buttons should not consist of full sentences, but should provide enough context to be useful.
- Language should be used consistently within each product (e.g., when using "Edit" on one page, use that same convention throughout the rest of the application, not "Change").
