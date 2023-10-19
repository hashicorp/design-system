## Usage

### When to use

- To display a concise, important message that requires the user’s attention.

### When not to use

- To communicate successful feedback on a user’s action, consider [Toast](/components/toast).
- As a dialog to confirm an action, consider [Modal](/components/modal).
- To flag new features (e.g., "In Preview", "Beta", "New", etc), consider [Badge](/components/badge).

## Types of alerts

There are three types of alerts: page, inline, and compact.

### Page

Use page-level alerts on the top of the page, between the navigation and the breadcrumb to inform users of an event that may require the user’s attention or action.

### Inline

Use inline alerts when the message is contextual or specific to the section it’s placed in.

### Compact

Use compact alerts when a less prominent alert is needed.

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

Use critical alerts to convey crucial information or errors, such as validation errors that require user attention or action. 

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

Use the Alert to communicate validation errors. For more details, refer to the [form validation patterns](/patterns/form-patterns?tab=validation).

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