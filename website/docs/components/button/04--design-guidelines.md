---
category: components
component: button
section: design-guidelines
---

# Button - Design Guidelines

## When to use

- To trigger an action or event, like a form submission.

## When not to use

- When navigating to another destination, use an [Inline](/components/link/inline/overview) or [Standalone](/components/link/standalone/overview) link.
- To display multiple actions under a single button, use [Dropdown](/components/dropdown/overview).

---

## Anatomy

![Button anatomy](/assets/components/button/button-anatomy.png)

#### Text\*

Optional (see accessibility)

#### Container

Required

#### Leading Icon\*

Optional

#### Focus Ring

Focus state only

#### Trailing Icon\*

Optional

_\* One of these must be present_

---

## Size

<section>
  <Hds::Button @size="small" @text="Small" />
  <Hds::Button @size="medium" @text="Medium" />
  <Hds::Button @size="large" @text="Large" />
</section>

Medium is the preferred size, but use a button size that best fits the UI.

For example:

- don't use large buttons in tables.

_Banner (informational):_ Medium buttons are the same size as default Structure buttons. Small buttons are the same size as Compact Structure buttons.

<section>
  <Hds::Button @size="large" @isFullWidth={{true}} @text="Full-width button" />
</section>

Buttons are able to be manually stretched to accommodate a need for a full-width button. Full-width buttons should fill 100% of the parent container.

_Banner (informational):_ **Figma Tip:** Select the 'button' layer and manually adjust the width to the wdith needed, then select the child layer (ie '\_main/[size]') and change _Resizing_ for width to 'Fill Container'

---

## Type

<section>
  <Hds::Button @color="primary" @icon="arrow-right" @iconPosition="trailing" @text="Primary" />
</section>

Use **Primary** for the most important action on a page. Avoid using multiple Primary buttons on a page.

For example:

- for submitting a form

<section>
  <Hds::Button @color="secondary" @icon="arrow-right" @iconPosition="trailing" @text="Secondary" />
</section>

Use **Secondary** for less important actions or when multiple actions of the same importance are needed.

For example:

- for 'Cancel' next to a 'Submit' button
- when needing to let the user do things like 'Download' or 'Generate' a report but neither are the primary focus or goal of the page

<section>
  <Hds::Button @color="critical" @icon="arrow-right" @iconPosition="trailing" @text="Critical" />
</section>

Use **Critical** when users take an action that is potentially dangerous.

For example:

- deleting a cluster.

<section>
  <Hds::Button @color="tertiary" @icon="arrow-right" @iconPosition="trailing" @text="Tertiary" />
</section>

Use **Tertiary** for low-priority actions when lighter visual weight is required.

For example:

- for actions on a page that require even less visual weight or priority than a secondary button (our default for less important actions)
- for controlling form fields (such as adding an additional form field)

---

## State

Primary

![Example of primary button states](/assets/components/button/button-state-primary.png)

Secondary

![Example of secondary button states](/assets/components/button/button-state-secondary.png)

Tertiary

![Example of tertiary button states](/assets/components/button/button-state-tertiary.png)

Critical

![Example of critical button states](/assets/components/button/button-state-critical.png)

Disabled buttons should be used sparingly and with intention. Acceptable use cases for disabled buttons include:

- Incomplete flows (ie. user has not yet completed a required action needed to move forward).
- Permissions restriction.

---

## Icon position

<section>
  <Hds::ButtonSet>
    <Hds::Button @color="secondary" @text="No icon" />
    <Hds::Button @color="secondary" @text="Leading Icon" @icon="plus" @iconPosition="leading" />
    <Hds::Button @color="secondary" @text="Trailing Icon" @icon="arrow-right" @iconPosition="trailing" />
    <Hds::Button @color="secondary" @text="No text" @icon="plus" @isIconOnly={{true}} />
  </Hds::ButtonSet>
</section>

Buttons are provided with flexible icon use; allowing for leading, trailing, or icon only buttons. Use icons intentionally and only when they provide the user with extra value. Do not create buttons with both leading and trailing icons. Tertiary buttons are required to have either a leading or trailing icon layout to be accessible.

_Banner (highlight):_ Buttons used for a dropdown (with the Caret Icon in the Trailing Icon Spot) can be found in [Dropdown](/components/dropdown/overview).

---

## Button set

Button Sets are patterns when multiple buttons need to be displayed in a single row; not to be confused with Button Groups.

<section>
  <Hds::ButtonSet>
    <Hds::Button @color="primary" @text="Submit" />
    <Hds::Button @color="secondary" @text="Cancel" />
  </Hds::ButtonSet>
</section>

Primary buttons are displayed on the left, Secondary or Tertiary buttons on the right, with 16px between them.

---

## Content

- Text should be short and to the point (~25 characters). They should not consist of full sentences, but should provide enough context to be useful.
- Language should be used consistently within each product (ie. when using "Edit" on one page, use that same convention throughout the rest of the application, not "Change").

---

## Accessibility

Provide annotations alongside each design of the non-visual experience. This could look like:

![Accessibility annotation example](/assets/components/button/button-annotation_example.png)
