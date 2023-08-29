## Usage

### When to use

- To display contextual information resulting from a user’s action.
- To communicate an ongoing process, e.g., “Creating cluster”.

### When not to use

- To display persistent messages or promotional content, consider [Alert](/components/alert).
- As a dialog to confirm an action, consider [Modal](/components/modal).

## Color

<Doc::Layout @spacing="12px">
  <Hds::Toast @onDismiss={{this.noop}} as |T|>
    <T.Title>Neutral toast title</T.Title>
    <T.Description>Lorem ipsum dolar sit amet, consecteu adipiscig elit null dignissim felis.</T.Description>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="secondary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
  <Hds::Toast @color="highlight" @onDismiss={{this.noop}} as |T|>
    <T.Title>Highlight toast title</T.Title>
    <T.Description>Lorem ipsum dolar sit amet, consecteu adipiscig elit null dignissim felis.</T.Description>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="secondary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
  <Hds::Toast @color="success" @onDismiss={{this.noop}} as |T|>
    <T.Title>Success toast title</T.Title>
    <T.Description>Lorem ipsum dolar sit amet, consecteu adipiscig elit null dignissim felis.</T.Description>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="secondary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
  <Hds::Toast @color="warning" @onDismiss={{this.noop}} as |T|>
    <T.Title>Warning toast title</T.Title>
    <T.Description>Lorem ipsum dolar sit amet, consecteu adipiscig elit null dignissim felis.</T.Description>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="secondary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
  <Hds::Toast @color="critical" @onDismiss={{this.noop}} as |T|>
    <T.Title>Critical toast title</T.Title>
    <T.Description>Lorem ipsum dolar sit amet, consecteu adipiscig elit null dignissim felis.</T.Description>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="secondary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
</Doc::Layout>

Use color logically.

- **Neutral** to provide general information to the user about an ongoing process.
- **Highlight** use interchangeably with `neutral` when more prominence is needed. Use it sparingly.
- **Success** to indicate a successful action was completed.
- **Warning** to indicate a successful action was completed but may have triggered a related issue. Provide guidance and actions if possible.

- **Critical** to indicate error or critical issues resulting from a failed action.

### Critical toasts

!!! Do

Use the Toast to provide non-intrusive feedback to users about the failure of an ongoing task or request. For example, a failure while deleting a cluster.

<Hds::Toast @color="critical" @onDismiss={{this.noop}} as |T|>
    <T.Title>Module error</T.Title>
    <T.Description>This module encountered an error during publishing. You may need to republish.</T.Description>
  </Hds::Toast>
!!!

!!! Do

Use the Toast to communicate error messages that are not caused by the user. For example, an unsuccessful Vault cluster creation due to a failure while validating the deployment.

<Hds::Toast @color="critical" @onDismiss={{this.noop}} as |T|>
    <T.Title>Vault cluster update failed</T.Title>
    <T.Description>**test-cluster_1** configuration update failed.</T.Description>
  </Hds::Toast>
!!!

!!! Dont

Don't use toasts for intrusive message communication about errors or critical disruptions at an application, page, or section level. Use the [Alert](/components/alert) instead.

<Hds::Toast @color="critical" @onDismiss={{this.noop}} as |T|>
    <T.Title>You have exceeded 50 applies this month</T.Title>
    <T.Description>You may only invoke applies that destroy managed resources. Upgrade now and access additional product features, unlimited applies, and increased concurrency.
    </T.Description>
  </Hds::Toast>
!!!

!!! Dont

Don't use toasts to communicate validation errors. Use the [Alert](/components/alert) instead.

<Hds::Toast @color="critical" @onDismiss={{this.noop}} as |T|>
    <T.Title>Form submission error</T.Title>
    <T.Description>Correct the formatting of the following fields to update your user profile:
    </T.Description>
    <T.Description>
    <Hds::Link::Inline @href="...">Email address</Hds::Link::Inline>
    </T.Description>
  </Hds::Toast>
!!!

## Icons

All Toasts have icons by default that are intentionally tied to the Toast color.

Icons within `neutral` and `highlight` Toasts can be replaced with other icons. Change them only when the new icon provides the user with extra value; otherwise, use the default icon provided.

<Doc::Layout @spacing="12px" @direction="vertical">
  <Hds::Toast @color="neutral" @icon="running" @onDismiss={{this.noop}} as |T|>
    <T.Title>Plan running</T.Title>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="secondary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
  <Hds::Toast @color="success" @icon="check-circle" @onDismiss={{this.noop}} as |T|>
    <T.Title>Plan finished</T.Title>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="secondary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
</Doc::Layout>

## Size

Toasts can be sized between 360px and 500px wide. Anything wider than 500px will lead to implementation issues and take up too much of the screen space. 

## Placement

Toasts should appear in the bottom right corner of the screen with a margin of 32px from the bottom and a 24px from the right side of the viewport. 

![Toast placement example](/assets/components/toast/toast-placement.png =600x*)

### Displaying multiple Toasts

When displaying multiple Toasts, they should stack vertically with a 16px margin between each Toast.

![Multiple toast examples stacked](/assets/components/toast/toast-placement-multiple.png =600x*)