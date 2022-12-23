## Usage

### When to use

- To trigger an action or event, like a form submission.

### When not to use

- When navigating to another destination, use an [Inline](/components/link/inline/overview) or [Standalone](/components/link/standalone/overview) link.
- To display multiple actions under a single button, use [Dropdown](/components/dropdown/overview).

### Sizes

<Hds::Button @size="small" @text="Small" />

<Hds::Button @size="medium" @text="Medium" />

<Hds::Button @size="large" @text="Large" />

<Hds::Button @size="large" @isFullWidth={{true}} @text="Full-width button" />

!!! Insight

**Migrating Tip** 

Medium buttons are the same size as default Structure buttons. Small buttons are the same size as compact Structure buttons.

!!!

Medium is the preferred size, but use a button size that best fits the UI (i.e., don’t use a `large` button in a table).

Buttons are able to be manually stretched to accommodate a need for a full-width button. Full-width buttons should fill 100% of the parent container.




### Types

#### Primary

<Hds::Button @color="primary" @icon="arrow-right" @iconPosition="trailing" @text="Primary" />

Use **Primary** for the most important action on a page. Avoid using multiple Primary buttons on a page.

For example:

- for submitting a form

  <Hds::Button @color="secondary" @icon="arrow-right" @iconPosition="trailing" @text="Secondary" />

#### Secondary

Use **Secondary** for less important actions or when multiple actions of the same importance are needed.

For example:

- for `Cancel` next to a `Submit` button
- when needing to let the user do things like `Download` or `Generate` a report but neither are the primary focus or goal of the page

  <Hds::Button @color="critical" @icon="arrow-right" @iconPosition="trailing" @text="Critical" />

#### Critical

Use **Critical** when users take an action that is potentially dangerous.

For example:

- deleting a cluster.

<Hds::Button @color="tertiary" @icon="arrow-right" @iconPosition="trailing" @text="Tertiary" />

#### Tertiary

Use **Tertiary** for low-priority actions when lighter visual weight is required.

For example:

- for actions on a page that require even less visual weight or priority than a secondary button (our default for less important actions)
- for controlling form fields (such as adding an additional form field)

### State

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

### Icon position

  <Hds::ButtonSet>
    <Hds::Button @color="secondary" @text="No icon" />
    <Hds::Button @color="secondary" @text="Leading Icon" @icon="plus" @iconPosition="leading" />
    <Hds::Button @color="secondary" @text="Trailing Icon" @icon="arrow-right" @iconPosition="trailing" />
    <Hds::Button @color="secondary" @text="No text" @icon="plus" @isIconOnly={{true}} />
  </Hds::ButtonSet>

Buttons are provided with flexible icon use; allowing for leading, trailing, or icon only buttons. Use icons intentionally and only when they provide the user with extra value. Do not create buttons with both leading and trailing icons. Tertiary buttons are required to have either a leading or trailing icon layout to be accessible.

!!! Insight

**Looking for Dropdowns?**

Buttons used for a dropdown (with the Caret Icon in the Trailing Icon Spot) can be found in [Dropdown](/components/dropdown/overview).

!!!

### Button set

Button Sets are patterns when multiple buttons need to be displayed in a single row; not to be confused with Button Groups.

  <Hds::ButtonSet>
    <Hds::Button @color="primary" @text="Submit" />
    <Hds::Button @color="secondary" @text="Cancel" />
  </Hds::ButtonSet>

Primary buttons are displayed on the left, Secondary or Tertiary buttons on the right, with 16px between them.

## Content

- Text should be short and to the point (~25 characters). They should not consist of full sentences, but should provide enough context to be useful.
- Language should be used consistently within each product (ie. when using "Edit" on one page, use that same convention throughout the rest of the application, not "Change").
