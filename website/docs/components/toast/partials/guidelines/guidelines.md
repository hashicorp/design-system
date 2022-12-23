## Usage

### When to use

- To display contextual information as a result of a user or system-triggered action.
- To communicate an ongoing process, e.g. "Creating cluster".

### When not to use

- To display persistent messages. Consider using [Alert](/components/alert).
- As a dialog to confirm an action. Consider using a [Dialog](/components/dialog).
- To display promotional content. Consider using [AlertInline](/components/alert-inline).

### Color
<div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 20px;">
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
</div>

Use color logically.

- **Nuetral** to provide general information to the user about an ongoing process.
- **Highlight** use interchangeably with neutral when more prominence is needed. Use it sparingly.
- **Success** to inform users that an action has been completed successfully.
- **Warning** to indicate that an action was executed successfully but may have triggered a related issue. Provide guidance and actions if possible.
- **Critical** to indicate error or critical issues as a result of a failed action.

---

### Icons

All toasts come with icons by default. They are intentionally tied to the toast type. Icons in Neutral and Highlight alerts can be swapped out with any other icon from Flight, including animated ones. Change them only when the new icon provides the user with extra value; otherwise, leaving the default icon is recommended.

<div style="display: flex; gap: 1rem; flex-direction: column;">
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
</div>

### Actions

- We recommend using the secondary button variant for primary actions and the tertiary button variant for secondary actions.
- Use LinkStandalone when an action expects to take the user to a new destination (URL) instead of triggering an action within the same page. Follow LinkStandalone [usage guidelines](/components/link/link-standalone/#usage-guidelines) to determine what variant "type" to use.
- To keep hierarchy and avoid competing with other actions on the page, using “small” size variants is recommended.
- Avoid using critical buttons in alerts. If used, consider adding a confirmation modal as an extra step, after the action is triggered.
  Up to two action should be used.

Some common examples are:

#### Button secondary only

<Hds::Button @color="secondary" @text="Send reminder email" @size="small" />

#### Link only

<Hds::Link::Standalone @color="primary" @iconPosition="trailing" @icon="arrow-right" @text="View snapshots" @href="#" />

#### Button secondary + tertiary

<div style="display: flex; gap: 1rem;">
  <Hds::Button @color="secondary" @text="Send reminder email" @size="small" />
  <Hds::Link::Standalone @color="primary" @iconPosition="leading" @icon="x-circle" @text="Cancel invitation" @href="#" />
</div>

!!! Warning

When using links, avoid using CTA link; it may take users' attention away from other actions on the page. Use [LinkStandalone](/components/link/link-standalone/overview)
!!!

### Composition

Alerts are very flexible and highly configurable except for the AlertCompact, in which all properties are required. Some common use-cases are:

#### With icon and title

<Hds::Toast @color="success" @icon="check-circle" @onDismiss={{this.noop}} as |T|>
  <T.Title>Success toast title</T.Title>
</Hds::Toast>

#### With icon, title, and description

<Hds::Toast @color="success" @icon="check-circle" @onDismiss={{this.noop}} as |T|>
  <T.Title>Success toast title</T.Title>
  <T.Description>Lorem ipsum dolar sit amet, consectetur adi.</T.Description>
</Hds::Toast>

#### Title and description only

<Hds::Toast @color="success" @icon={{false}} @onDismiss={{this.noop}} as |T|>
  <T.Title>Success toast title</T.Title>
  <T.Description>Lorem ipsum dolar sit amet, consectetur adi.</T.Description>
</Hds::Toast>

!!! Warning 

When `icon=false`, the title or description text should contain the alert type in it, ie. "Success."
!!!

#### With actions

<Hds::Toast @color="success" @icon="check-circle" @onDismiss={{this.noop}} as |T|>
  <T.Title>Success toast title</T.Title>
  <T.Description>Lorem ipsum dolar sit amet, consectetur adi.</T.Description>
  <T.Button @text="Button" @color="secondary" />
  <T.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
</Hds::Toast>

#### With custom content

![Toast with custom content](/assets/components/toast/toast-custom-content.png)

#### With custom actions

![Toast with custom actions](/assets/components/toast/toast-custom-actions.png)

### Placement

Toasts should appear in the bottom right corner of the screen. They have a margin of 32px from the bottom and a 24px from the right side of the viewport. They should stack vertically with a 16px margin between each toast when multiple toasts are triggered.

![Toast placement example](/assets/components/toast/toast-placement.png)

!!! Info 

Currently, HCP’s notification service doesn’t support the recommended placement. We recommend reaching out to your engineering partner and discussing it first.
!!!

!!! Warning

Toast width: The Figma component is 360px, which is the minimum width. You can manually stretch it up to 500px. Wider than this size will lead to issues during implementation.
!!!

## Content

- Keep the title short, as this will be the most prominent element when users scan the toast.
- Do not end the title with a period.
- Toast messages should be short bu clear and descriptive enough to explain what's happening and guide users on how to prevent or fix the issue. We recommend keeping messages under 90 characters.
- Text formatting capabilities such as inline links, bold, italic, code, and bulleted lists are supported.
- For actions, refer to [Button](/components/button/overview) and [Link](/components/link/overview) content guidelines.

### Examples

<div style="display: flex; gap: 1rem; flex-direction: column;">
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
</div>

