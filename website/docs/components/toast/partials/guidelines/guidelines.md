## Usage

### When to use

- To display contextual information resulting from a user’s action.
- To communicate an ongoing process, e.g., “Creating cluster”.

### When not to use

- To display persistent messages or promotional content, consider [Alert](/components/alert).
- As a dialog to confirm an action, consider [Dialog](/components/dialog).

## Color

<Doc::Layout @spacing="12px">
  <Hds::Toast @onDismiss={{this.noop}} as |T|>
    <T.Title>Neutral toast title</T.Title>
    <T.Description>Lorem ipsum dolar sit amet, consecteu adipiscig elit null dignissim felis.</T.Description>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
  <Hds::Toast @color="highlight" @onDismiss={{this.noop}} as |T|>
    <T.Title>Highlight toast title</T.Title>
    <T.Description>Lorem ipsum dolar sit amet, consecteu adipiscig elit null dignissim felis.</T.Description>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
  <Hds::Toast @color="success" @onDismiss={{this.noop}} as |T|>
    <T.Title>Success toast title</T.Title>
    <T.Description>Lorem ipsum dolar sit amet, consecteu adipiscig elit null dignissim felis.</T.Description>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
  <Hds::Toast @color="warning" @onDismiss={{this.noop}} as |T|>
    <T.Title>Warning toast title</T.Title>
    <T.Description>Lorem ipsum dolar sit amet, consecteu adipiscig elit null dignissim felis.</T.Description>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
  <Hds::Toast @color="critical" @onDismiss={{this.noop}} as |T|>
    <T.Title>Critical toast title</T.Title>
    <T.Description>Lorem ipsum dolar sit amet, consecteu adipiscig elit null dignissim felis.</T.Description>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
</Doc::Layout>

Use color logically.

- **Neutral** to provide general information to the user about an ongoing process.
- **Highlight** use interchangeably with `neutral` when more prominence is needed. Use it sparingly.
- **Success** to indicate a successful action was completed.
- **Warning** to indicate a successful action was completed but may have triggered a related issue. Provide guidance and actions if possible.
- **Critical** to indicate error or critical issues resulting from a failed action.

## Icons

All Toasts have icons by default that are intentionally tied to the Toast color.

Icons within `neutral` and `highlight` Toasts can be replaced with other Helios icons. Change them only when the new icon provides the user with extra value; otherwise, use the default icon provided.

<Doc::Layout @spacing="12px" @direction="vertical">
  <Hds::Toast @color="neutral" @icon="running" @onDismiss={{this.noop}} as |T|>
    <T.Title>Plan running</T.Title>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
  <Hds::Toast @color="success" @icon="check-circle" @onDismiss={{this.noop}} as |T|>
    <T.Title>Plan finished</T.Title>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
</Doc::Layout>

## Actions

Use small Buttons to avoid competing with other actions on the page. Use more than two actions sparingly.

### Buttons

We recommend using the `secondary` Button variant for primary actions and the `tertiary` Button variant for secondary actions.

<Hds::Toast @color="neutral" @onDismiss={{this.noop}} as |T|>
  <T.Title>Recommended button usage</T.Title>
  <T.Description>Lorem ipsum dolar sit amet, consecteu adipiscig elit null dignissim felis.</T.Description>
  <T.Button @text="Button" @color="secondary" />
  <T.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
</Hds::Toast>

#### Usage of critical Buttons

Avoid using critical Buttons in Toasts. We handle the prominence and importance via the styling of the Toast container itself. If needing to confirm that the user intended to interact with the action, consider displaying a confirmation [Modal](/components/modal). 

!!! Dont

<Hds::Toast @color="critical" @onDismiss={{this.noop}} as |T|>
  <T.Title>Critical button usage</T.Title>
  <T.Description>Lorem ipsum dolar sit amet, consecteu adipiscig elit null dignissim felis.</T.Description>
  <T.Button @text="Your action" @color="critical" />
</Hds::Toast>
!!!

### Links

Use [Standalone Links](/components/link/standalone) when an action takes the user to a new destination (URL). Follow the Standalone Link [usage guidelines](/components/link/standalone#type) to determine what variant to use.

<Hds::Toast @color="neutral" @onDismiss={{this.noop}} as |T|>
  <T.Title>Links in Toasts</T.Title>
  <T.Description>Lorem ipsum dolar sit amet, consecteu adipiscig elit null dignissim felis.</T.Description>
  <T.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
</Hds::Toast>

## Size

Toasts can be sized between 360px and 500px wide. Anything wider than 500px will lead to implementation issues and take up too much of the screen space. 

## Placement

!!! Warning 

HCP’s notification service doesn’t currently support the recommended placement. Discuss possible solutions and alternatives with your product team before using the Toast.
!!!

Toasts should appear in the bottom right corner of the screen with a margin of 32px from the bottom and a 24px from the right side of the viewport. 

![Toast placement example](/assets/components/toast/toast-placement.png =600x*)

### Displaying multiple Toasts

When displaying multiple Toasts, they should stack vertically with a 16px margin between each Toast.

![Multiple toast examples stacked](/assets/components/toast/toast-placement-multiple.png =600x*)

## Composition

Toasts can be configured in a variety of ways. For example:

### With icon and title

<Hds::Toast @icon="info" @onDismiss={{this.noop}} as |T|>
  <T.Title>With icon and title</T.Title>
</Hds::Toast>

### With icon, title, and description

<Hds::Toast @icon="info" @onDismiss={{this.noop}} as |T|>
  <T.Title>With icon, title, and description</T.Title>
  <T.Description>Lorem ipsum dolar sit amet, consectetur adi.</T.Description>
</Hds::Toast>

### Title and description only

The title or description should contain the Toast color type, e.g., “Warning,” if no icon is present.

<Hds::Toast @color="warning" @icon={{false}} @onDismiss={{this.noop}} as |T|>
  <T.Title>Warning: the action could not be completed</T.Title>
</Hds::Toast>

### With actions

<Hds::Toast @color="success" @icon="check-circle" @onDismiss={{this.noop}} as |T|>
  <T.Title>Toast with actions</T.Title>
  <T.Description>Lorem ipsum dolar sit amet, consectetur adi.</T.Description>
  <T.Button @text="Button" @color="secondary" />
  <T.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
</Hds::Toast>

### With generic content

<Hds::Toast @color="success" @icon="check-circle" @onDismiss={{this.noop}} as |T|>
  <T.Title>Toast with extra/custom content</T.Title>
  <T.Description>
    In special cases, you can pass extra content to the Toast using the
    <code>A.Generic</code>
    contextual component.
  </T.Description>
  <T.Generic>
    <Doc::Placeholder @text="some generic content" @height="50" @background="#eee" />
  </T.Generic>
</Hds::Toast>

## Content

- Keep the title short, as this will be the most prominent element when users scan the Toast.
- Avoid ending the title with a period.
- Toast descriptions should be short but clear enough to explain what’s happening. We recommend keeping messages under 90 characters.
- For warning and critical Toasts, guide the users on how to prevent or fix the issue.
- For content guidelines on actions, refer to [Button](/components/button) and [Link](/components/link/standalone) documentation.

<Doc::Layout @spacing="12px" @direction="vertical">
  <Hds::Toast @color="success" @icon="check-circle" @onDismiss={{this.noop}} as |T|>
    <T.Title>Cost estimation enabled</T.Title>
    <T.Description>Future runs will now include this step. You can manage this preference in <Hds::Link::Inline @href="#">Organization settings</Hds::Link::Inline>.</T.Description>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
  <Hds::Toast @color="critical" @icon="alert-diamond" @onDismiss={{this.noop}} as |T|>
    <T.Title>Placement failures</T.Title>
    <T.Description>Batch, <strong>3 unplaced</strong></T.Description>
    <T.Description>Resources exhausted on 5 modes</T.Description>
    <T.Description>Missing driver "java" on 5 nodes</T.Description>
    <T.Button @text="Button" @color="secondary" />
    <T.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Toast>
</Doc::Layout>