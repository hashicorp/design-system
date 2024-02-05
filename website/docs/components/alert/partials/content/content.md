## General recommendations

- Keep the title short, as this will be the most prominent element when users scan the Alert.
- Avoid ending the title with a period.
- Alert descriptions should be short but clear enough to explain what’s happening. We recommend keeping messages under 90 characters.
- For warning and critical alerts, guide the users on how to prevent or fix the issue.

## Actions

Use small buttons to avoid competing with other actions on the page. Use more than two actions sparingly.

We recommend using the `secondary` button variant for primary actions and the `tertiary` button variant for secondary actions.

<Hds::Alert @type="inline" as |A|>
  <A.Title>Recommended button usage</A.Title>
  <A.Description>Lorem ipsum dolar sit amet.</A.Description>
  <A.Button @text="Your action" @color="secondary" @onClick={{this.noop}} />
  <A.Button @color="tertiary" @icon="arrow-right" @iconPosition="trailing" @text="Tertiary" />
</Hds::Alert>

For content guidelines on actions, refer to [Button](/components/button) and 
[Link](/components/link/standalone) documentation.

### Usage of critical buttons

Avoid using critical buttons in alerts. We handle the prominence and importance via the styling of the alert container itself. If you need to confirm that the user intended to interact with the action, consider displaying a confirmation modal.

!!! Dont
<Hds::Alert @type="inline" @color="critical" as |A|>
  <A.Title>Critical button usage</A.Title>
  <A.Description>Lorem ipsum dolar sit amet.</A.Description>
  <A.Button @text="Your action" @color="critical" @onClick={{this.noop}} />
</Hds::Alert>
!!!

### Links

#### Within page and inline Alerts

When linking to internal and external resources in the Alert, default to using a `secondary` [Standalone Link](/components/link/standalone) in the `actions` area. In the Ember component, these elements are passed as [contextual components](?tab=code#actions).

<Hds::Alert @type="inline" @color="highlight" as |A|>
  <A.Title>Links in alerts</A.Title>
  <A.Description>Lorem ipsum dolar sit amet.</A.Description>
  <A.LinkStandalone @icon="arrow-right" @iconPosition="trailing" @color="secondary" @text="Standalone link" @href="#" />
</Hds::Alert>

Within the Alert description, use the `secondary` [Inline Link](/components/link/inline) as the default link color. A common use case for this is when linking to multiple resources.

<Hds::Alert @type="inline" @color="warning" as |A|>
  <A.Title>Links in the description</A.Title>
  <A.Description>
    Lorem ipsum dolor sit amet, <Hds::Link::Inline @href="#" @color="secondary">consectetur</Hds::Link::Inline> adipiscing elit, sed do <Hds::Link::Inline @href="#" @color="secondary">eiusmod</Hds::Link::Inline> tempor incididunt ut <Hds::Link::Inline @href="#" @color="secondary">labore</Hds::Link::Inline> et dolore magna aliqua.
  </A.Description>
</Hds::Alert>

Wrap links to multiple related items on the same page in a list, e.g., when highlighting multiple form validation errors.

<Hds::Alert @type="inline" @color="critical" as |A|>
  <A.Title>Error submitting the form</A.Title>
  <A.Description>
    The follow fields must be corrected before submitting the form:
    <li class="hds-typography-body-200">
      <Hds::Link::Inline @color="secondary" @href="#">Email address</Hds::Link::Inline>
    </li>
    <li class="hds-typography-body-200">
      <Hds::Link::Inline @color="secondary" @href="#">First name</Hds::Link::Inline>
    </li>
    <li class="hds-typography-body-200">
      <Hds::Link::Inline @color="secondary" @href="#">Billing address</Hds::Link::Inline>
    </li>
  </A.Description>
</Hds::Alert>

#### Within compact Alerts

As `compact` Alerts don’t support a title or actions, use `secondary` [Inline Links](/components/link/inline) in the description of the component. This matches the intended hierarchy of the component relative to other Alert types and supports linking to multiple resources.

<Hds::Alert @type="compact" @color="success" as |A|>
  <A.Description>
    You’ve successfully configured your account. Next, <Hds::Link::Inline @href="#" @color="secondary">create a cluster</Hds::Link::Inline>, <Hds::Link::Inline @href="#" @color="secondary">invite your teammates</Hds::Link::Inline>, or create a <Hds::Link::Inline @href="#" @color="secondary">HashiCorp Virtual Network (HVN)</Hds::Link::Inline>.
  </A.Description>
</Hds::Alert>

If there is only one link within the `compact` alert, it’s acceptable to use the `primary` color, but this will result in increased prominence and elevated hierarchy.

<Hds::Alert @type="compact" @color="success" as |A|>
  <A.Description>
    You’ve successfully configured your account. Next, <Hds::Link::Inline @href="#" @color="primary">create your first cluster</Hds::Link::Inline>.
  </A.Description>
</Hds::Alert>

!!! Dont

Don’t mix and match different link colors in the same `compact` Alert.

<Hds::Alert @type="compact" @color="success" as |A|>
  <A.Description>
    You’ve successfully configured your account. Next, <Hds::Link::Inline @href="#" @color="primary">create a cluster</Hds::Link::Inline>, <Hds::Link::Inline @href="#" @color="secondary">invite your teammates</Hds::Link::Inline>, or create a <Hds::Link::Inline @href="#" @color="secondary">HashiCorp Virtual Network (HVN)</Hds::Link::Inline>.
  </A.Description>
</Hds::Alert>
!!!

!!! Dont

Don’t use a [Standalone Link](/components/link/standalone) in the description of a `compact` Alert. The description area is intended for inline content, while the Standalone Link is a block-level element.

![Standalone Link inside of compact Alert](/assets/components/alert/standalone-link-inside-compact-alert.png)
!!!

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
  <A.LinkStandalone @color="secondary" @icon="arrow-right" @iconPosition="trailing" @text="Learn more" @href="#" />
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