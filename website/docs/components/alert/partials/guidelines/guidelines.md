## Usage

### When to use

- To display a concise, important message that requires the user’s attention.

### When not to use

- To communicate feedback on a user’s action, consider [Toast](/components/toast).
- As a dialog to confirm an action, consider [Modal](/components/modal).
- To flag new features (e.g., "In Preview", "Beta", "New", etc), consider [Badge](/components/badge).

## Color

<Doc::Layout @spacing="12px">
  <Hds::Alert @type="inline" @color="neutral" as |A|>
    <A.Title>Neutral alert title</A.Title>
    <A.Description>Lorem ipsum dolar sit amet.</A.Description>
  </Hds::Alert>
  <Hds::Alert @type="inline" @color="highlight" as |A|>
    <A.Title>Highlight alert title</A.Title>
    <A.Description>Lorem ipsum dolar sit amet.</A.Description>
  </Hds::Alert>
  <Hds::Alert @type="inline" @color="success" as |A|>
    <A.Title>Success alert title</A.Title>
    <A.Description>Lorem ipsum dolar sit amet.</A.Description>
  </Hds::Alert>
  <Hds::Alert @type="inline" @color="warning" as |A|>
    <A.Title>Warning alert title</A.Title>
    <A.Description>Lorem ipsum dolar sit amet.</A.Description>
  </Hds::Alert>
  <Hds::Alert @type="inline" @color="critical" as |A|>
    <A.Title>Critical alert title</A.Title>
    <A.Description>Lorem ipsum dolar sit amet.</A.Description>
  </Hds::Alert>
</Doc::Layout>

Use color logically.

- **Neutral** to provide general information to the user regarding the current context or relevant actions.
- **Highlight** to provide general or promotional information to the user prominently.
- **Success** to indicate a successful action.
    - Use the success variant sparingly. To communicate success after a user action is performed, use [Toast](/components/toast).
- **Warning** to help users avoid an issue. Provide guidance and actions, if possible.
- **Critical** to indicate critical errors that need immediate action.

### Critical alerts

!!! Do

Use the Alert for more intrusive message communication about errors or critical disruptions at an application, page, or section level where users need to take immediate action.

<Hds::Alert @type="inline" @color="critical" as |A|>
    <A.Title>You have exceeded 50 applies this month</A.Title>
    <A.Description>You may only invoke applies that destroy managed resources. Upgrade now and access additional product features, unlimited applies, and increased concurrency.</A.Description>
    <A.Button @text="Upgrade" @color="secondary" @onClick={{this.noop}} />
    <A.Link::Standalone @color="secondary" @icon="arrow-right" @iconPosition="trailing" @text="View usage" @href="#" />
  </Hds::Alert>
!!!

!!! Do

Use the Alert to communicate validation errors. For more details, refer to the [form validation patterns](/patterns/form-patterns).

<Hds::Alert @type="inline" @color="critical" as |A|>
    <A.Title>Form submission error</A.Title>
    <A.Description>Correct the formatting of the following fields to update your user profile:
    </A.Description>
    <A.Description>
    <Hds::Link::Inline @href="..." @color="secondary">Email address</Hds::Link::Inline>
    </A.Description>
  </Hds::Alert>
!!!

!!! Dont

Don't use alerts to provide non-intrusive feedback to users about the failure of an ongoing task or request. For example, a failure while deleting a cluster. Use the [Toast](/components/toast) instead.

<Hds::Alert @type="inline" @color="critical" as |A|>
    <A.Title>Module error</A.Title>
    <A.Description>This module encountered an error during publishing. You may need to republish.
    </A.Description>
  </Hds::Alert>
!!!

!!! Dont

Don't use alerts to communicate error messages that are not caused by the user. For example, an unsuccessful Vault cluster creation due to a failure while validating the deployment. Use the [Toast](/components/toast) instead.

<Hds::Alert @type="inline" @color="critical" as |A|>
    <A.Title>Vault cluster update failed</A.Title>
    <A.Description>**test-cluster_1** configuration update failed.</A.Description>
  </Hds::Alert>
!!!

## Icons

All alerts have icons by default that are intentionally tied to the alert type.

Icons within the `neutral` and `highlight` alerts can be replaced with other icons. Change them only when the new icon provides the user with extra value; otherwise, use the default icon provided.

<Hds::Alert @type="inline" @color="highlight" @onDismiss={{this.noop}} @icon="gift" as |A|>
  <A.Title>New features available</A.Title>
  <A.Description>Starting with Terraform 0.15, you can now upgrade to a new version and your workflows will continue to be operational, just as they were in prior versions.</A.Description>
  <A.Link::Standalone @color="secondary" @icon="arrow-right" @iconPosition="trailing" @text="Release notes" @href="#" />
</Hds::Alert>

## Dismissal

### Persistent

All alerts are persistent by default, while compact alerts are always persistent.

### Dismissible

Page and inline alerts can be dismissible.

We recommend setting `neutral` and `highlight` alerts to be dismissible, as they are not critical for users to complete their journey.

!!! Do
<Hds::Alert @type="inline" @color="neutral" @onDismiss={{this.noop}} as |A|>
  <A.Title>Neutral alert title</A.Title>
  <A.Description>Lorem ipsum dolar sit amet.</A.Description>
</Hds::Alert>
!!!

We recommend keeping `critical` alerts non-dismissible as they are essential to the user’s journey and can get dismissed by mistake.

!!! Do
<Hds::Alert @type="inline" @color="critical" as |A|>
  <A.Title>Critical alert title</A.Title>
  <A.Description>Lorem ipsum dolar sit amet.</A.Description>
</Hds::Alert>
!!!

!!! Dont
<Hds::Alert @type="inline" @color="critical" @onDismiss={{this.noop}} as |A|>
  <A.Title>Critical alert title</A.Title>
  <A.Description>Lorem ipsum dolar sit amet.</A.Description>
</Hds::Alert>
!!!

### Actions

Use small buttons to avoid competing with other actions on the page. Use more than two actions sparingly.

### Buttons

We recommend using the `secondary` button variant for primary actions and the `tertiary` button variant for secondary actions.

<Hds::Alert @type="inline" as |A|>
  <A.Title>Recommended button usage</A.Title>
  <A.Description>Lorem ipsum dolar sit amet.</A.Description>
  <A.Button @text="Your action" @color="secondary" @onClick={{this.noop}} />
  <A.Button @color="tertiary" @icon="arrow-right" @iconPosition="trailing" @text="Tertiary" />
</Hds::Alert>

#### Usage of critical buttons

Avoid using critical buttons in alerts. We handle the prominence and importance via the styling of the alert container itself. If needing to confirm that the user intended to interact with the action, consider displaying a confirmation modal.

!!! Dont
<Hds::Alert @type="inline" @color="critical" as |A|>
  <A.Title>Critical button usage</A.Title>
  <A.Description>Lorem ipsum dolar sit amet.</A.Description>
  <A.Button @text="Your action" @color="critical" @onClick={{this.noop}} />
</Hds::Alert>
!!!

### Links

Use [Standalone Link](/components/link/standalone) when an action takes the user to a new destination (URL).

We recommend using the secondary standalone link to maintain visual hierarchy and avoid competing prominence when used with the secondary button.

<Hds::Alert @type="inline" @color="highlight" as |A|>
  <A.Title>Links in alerts</A.Title>
  <A.Description>Lorem ipsum dolar sit amet.</A.Description>
  <A.Button @text="Your action" @color="secondary" @onClick={{this.noop}} />
  <A.Link::Standalone @icon="arrow-right" @iconPosition="trailing" @color="secondary" @text="Standalone link" @href="#" />
</Hds::Alert>

## Placement

### Page

Page alerts are placed between the global header navigation and the breadcrumb, next to the left navigation.

![Placement of page alert](/assets/components/alert/alert-placement-page.png =600x*)

### Inline

Inline alerts can be added to a section or component or inline with content.

![Placement of inline alert](/assets/components/alert/alert-placement-inline.png =600x*)

### Compact

Compact alerts can be added to a section or component or inline with content.

![Placement of compact Alert](/assets/components/alert/alert-placement-compact.png =600x*)

## Composition

Page and inline alerts can be configured in a variety of ways. For example: 

### With icon and title

<Hds::Alert @type="inline" as |A|>
  <A.Title>With icon and title</A.Title>
</Hds::Alert>

### With icon, title, and description

<Hds::Alert @type="inline" as |A|>
  <A.Title>With icon, title, and description</A.Title>
  <A.Description>Lorem ipsum dolar sit amet.</A.Description>
</Hds::Alert>

### Title and description only

The title or description should contain the alert type, e.g., “Warning,” if no icon is present.

<Hds::Alert @type="inline" @color="warning" @icon={{false}} as |A|>
  <A.Title>Warning: the action could not be completed</A.Title>
</Hds::Alert>

### With actions

<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>Alert with actions</A.Title>
  <A.Description>Lorem ipsum dolar sit amet.</A.Description>
  <A.Button @text="Your action" @color="secondary" @onClick={{this.noop}} />
  <A.Link::Standalone @color="secondary" @icon="arrow-right" @iconPosition="trailing" @text="Learn more" @href="#" />
</Hds::Alert>

### With generic content

<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>An alert with extra/custom content</A.Title>
  <A.Description>In special cases, you can pass extra content to the alert using the
    <code>A.Generic</code>
    contextual component.</A.Description>
  <A.Generic>
    <Doc::Placeholder @text="some generic content" @height="50" @background="#eee" />
  </A.Generic>
</Hds::Alert>

## Content

- Keep the title short, as this will be the most prominent element when users scan the alert.
- Avoid ending the title with a period.
- Alert descriptions should be short but clear enough to explain what’s happening. We recommend keeping messages under 90 characters.
- For warning and critical alerts, guide the users on how to prevent or fix the issue.
- For content guidelines on actions, refer to [Button](/components/button) and [Link](/components/link/standalone) documentation.