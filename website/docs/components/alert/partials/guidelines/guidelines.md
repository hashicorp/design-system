## Usage
### When to use

- To display a concise, important message that requires the user's attention.

### When not to use

- To communicate feedback on a user's action, consider [Toast](/components/toast/overview).
- As a dialog to confirm an action, consider using a dialog or [Modal](/components/modal/overview).
- As feature flags, such as "In Preview", "Beta", "New", etc, consider [Badge](/components/badge/overview).

### Color
<div style="display: flex; gap: 1rem;">
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
</div>
<div style="display: flex; gap: 1rem; margin: 16px 0px;">
  <Hds::Alert @type="inline" @color="warning" as |A|>
    <A.Title>Warning alert title</A.Title>
    <A.Description>Lorem ipsum dolar sit amet.</A.Description>
  </Hds::Alert>
  <Hds::Alert @type="inline" @color="critical" as |A|>
    <A.Title>Critical alert title</A.Title>
    <A.Description>Lorem ipsum dolar sit amet.</A.Description>
  </Hds::Alert>
</div>

Use color logically.

- **Neutral** to provide general information to the user regarding the current context or relevant actions.
- **Highlight** to provide general or promotional information to the user prominently.
- **Success** to indicate a successful action.
    - Use the success variant sparingly. To communicate success after a user action is performed, use [Toast](/components/toast/overview).
- **Warning** to help users avoid an issue. Provide guidance and actions if possible.
- **Critical** to indicate critical issues that need immediate action or help users understand a critical error.

!!! Insight

**Migration tip**

Use `neutral` or `hightlight` as equivalents to Structure's `information` banner depending on the level of prominence desired.
!!!

### Dismissal
#### Persistent
All alerts are set to persist by default. Compact alerts are always persistent.

#### Dismissible
Page and inline alerts can be dismissible. 

We recommend setting `neutral` and `highlight` alerts to be dismissible, as they are not critical for users to complete their journey.

!!! Do
<Hds::Alert @type="inline" @color="neutral" @onDismiss={{this.noop}} as |A|>
  <A.Title>Neutral alert title</A.Title>
  <A.Description>Lorem ipsum dolar sit amet.</A.Description>
</Hds::Alert>
!!!

We recommend keeping `critical` alerts non-dismissible as they are essential to the user's journey and can get dismissed by mistake. 

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

### Icons
All alerts have icons by default. They are intentially tied to the alert type. Icons in `neutral` and `highlight` can be swapped out with any other icon, including animated ones. Change them only when the new icon provides the user with extra value. Otherwise, we recommend using the default icons provided.

<Hds::Alert @type="inline" @color="highlight" @onDismiss={{this.noop}} @icon="gift" as |A|>
  <A.Title>New features available</A.Title>
  <A.Description>Starting with Terraform 0.15, you can now upgrade to a new version and your workflows will continue to be oprational, just as they were in prior versions.</A.Description>
  <A.Link::Standalone @color="secondary" @icon="arrow-right" @iconPosition="trailing" @text="Release notes" @href="#" />
</Hds::Alert>

### Actions
Use small buttons to avoid competing with other actions on the page. Use more than two actions sparingly.

#### Buttons
We recommend using the `secondary` button variant for primary actions and the `tertiary` button variant for secondary actions.

<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
  <A.Button @text="Your action" @color="secondary" @onClick={{this.noop}} />
  <A.Link::Standalone @icon="arrow-right" @iconPosition="trailing" @text="Another action" @href="#" />
</Hds::Alert>

##### A note about critical buttons
Avoid using critical buttons in alerts as the prominence and importance are handled by the styling of the alert container itself. If needed, consider adding a confirmation modal after the action is triggered.

!!! Dont
<Hds::Alert @type="inline" @color="critical" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
  <A.Button @text="Your action" @color="critical" @onClick={{this.noop}} />
</Hds::Alert>
!!!

#### Links
Use [LinkStandalone](/components/link/standalone/overview) when an action takes the user to a new destination (URL). Follow LinkStandalone's [usage guidelines](https://www.figma.com/file/8I4u10OyhYZIea4MpXwJwm/Design-guidelines-migration?node-id=2522%3A8014) to determine what variant "type" to use.

<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
  <A.Link::Standalone @icon="arrow-right" @iconPosition="trailing" @text="Another action" @href="#" />
</Hds::Alert>

### Composition
Page and inline alerts can be configured in a variety of ways. For instance: 

#### With icon and title
<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
</Hds::Alert>

#### With icon, title, and description
<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>

#### Title and description only
When displaying an alert without an icon, the title or description should contain the alert type, ie. "Warning".

<Hds::Alert @type="inline" @color="warning" @icon={{false}} as |A|>
  <A.Title>Warning: the action could not be completed</A.Title>
</Hds::Alert>

#### With actions
<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>Success alert</A.Title>
  <A.Description>Description here</A.Description>
  <A.Button @text="Your action" @color="secondary" @onClick={{this.noop}} />
  <A.Link::Standalone @icon="arrow-right" @iconPosition="trailing" @text="Learn more" @href="#" />
</Hds::Alert>

#### With custom content or custom actions
Building alerts with custom content may require additional time to set up correctly. Use this method with caution and reach out to us if needing help.

![Example of an Alert with custom content](/assets/components/alert/alert-with_custom_content.png)

![Example of an Alert with custom actions](/assets/components/alert/alert-with_custom_actions.png)


### Placement
#### Page
Page alerts are placed between the global header navigation and the breadcrumb, next to the left navigation.

![Placement of page alert](/assets/components/alert/alert-placement-page.png)

#### Inline
Inline alerts can be wrapped within a section or component of the page or inline with content.

![Placement of inline alert](/assets/components/alert/alert-placement-inline.png)

#### Compact
Compact alerts can be wrapped with a section or component of the page or inline with content.

![Placement of compact Alert](/assets/components/alert/alert-placement-compact.png)


## Content
- Keep the title short, as this will be the most prominent element when users scan the alert.
- Do not end the title with a period.
- Alert descriptions should be short but clear enough to explain what's happening. We recommend keeping messages under 90 characters.
- For warning and critical alerts, guide the users on how to prevent or fix the issue.
- We support basic text formatting capabilities, such as inline links, bold, italic, code, and bulleted lists.
- For actions, refer to [Button](/components/button) and [Link](/components/link/standalone) content guidelines.