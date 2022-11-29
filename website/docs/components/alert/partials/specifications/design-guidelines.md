## When to use

- To display a concise, important message that requires the user's attention.

## When not to use

- To communicate feedback on a user's action. Use [Toast](/components/toast/overview) in this case.
- As a dialog to confirm an action. Consider using a dialog or [Modal](/components/modal/overview).
- As feature flags, such as "In Preview", "Beta", "New", etc. Consider [Badge](/components/badge/overview).

---

_Page, Inline_

## Anatomy

All alert types share the same anatomy except for AlertCompact.

![Anatomy of the page Alert](/assets/components/alert/alert-anatomy-page.png)

![Anatomy of the inline Alert](/assets/components/alert/alert-anatomy-inline.png)

#### Icon

Optional (recommended)

#### Title

Required only when description is false, optional otherwise

#### Description

Required only when Title is false, optional otherwise

#### Actions

Optional

#### Dismiss Button

Optional

#### Container

Optional

#### Content

Required

---

_Compact_

## Anatomy

![Anatomy of the compact Alert](/assets/components/alert/alert-anatomy-compact.png)

---

## Color

<section style="display: flex; gap: 1rem;">
  <Hds::Alert @type="inline" @color="neutral" as |A|>
    <A.Title>Neutral alert title</A.Title>
    <A.Description>Lorem ipsum dolar sit amet.</A.Description>
    <A.Button @text="Button" @color="secondary" @onClick={{this.noop}} />
    <A.Link::Standalone @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Alert>
  <Hds::Alert @type="inline" @color="highlight" as |A|>
    <A.Title>Highlight alert title</A.Title>
    <A.Description>Lorem ipsum dolar sit amet.</A.Description>
    <A.Button @text="Button" @color="secondary" @onClick={{this.noop}} />
    <A.Link::Standalone @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Alert>
  <Hds::Alert @type="inline" @color="success" as |A|>
    <A.Title>Success alert title</A.Title>
    <A.Description>Lorem ipsum dolar sit amet.</A.Description>
    <A.Button @text="Button" @color="secondary" @onClick={{this.noop}} />
    <A.Link::Standalone @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Alert>
  <Hds::Alert @type="inline" @color="warning" as |A|>
    <A.Title>Warning alert title</A.Title>
    <A.Description>Lorem ipsum dolar sit amet.</A.Description>
    <A.Button @text="Button" @color="secondary" @onClick={{this.noop}} />
    <A.Link::Standalone @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Alert>
  <Hds::Alert @type="inline" @color="critical" as |A|>
    <A.Title>Critical alert title</A.Title>
    <A.Description>Lorem ipsum dolar sit amet.</A.Description>
    <A.Button @text="Button" @color="secondary" @onClick={{this.noop}} />
    <A.Link::Standalone @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Alert>
</section>

Use color logically.

- **Neutral** to provide general information to the user regarding the current context or relevant actions.
- **Highlight** to provide general or promotional information to the user prominently.
- **Success** to indivate a successful action. Use the success variant sparingly; to communicate success after an action is performed, use [Toast](/components/toast/overview).
- **Warning** to help users avoid an issue. Provide guidance and actions if possible.
- **Critical** to indicate critical issues that need immediate action or help users understand a critical error.

_Insert banner (informational):_ Use **Neutral** or **Highlight** as equivalents to **Information** in **Structure Banners** depending on the level of prominence desired.

---

_Page, Inline_

## Dismissal

All alerts except for compact can be set to dismiss. They are, however, set to be persistent by default.

- We recommend neutral and highlight alerts to be dismissible as they are not critical for users to complete their journey.

#### Persistent

<section>
  <Hds::Alert @type="inline" @color="warning" as |A|>
    <A.Title>Your organization will delete soon</A.Title>
    <A.Description>Your organization and account will be deleted on April 24 2022.</A.Description>
    <A.Button @text="Cancel deletion" @color="secondary" @onClick={{this.noop}} />
  </Hds::Alert>
</section>

## Dismissible

<section>
  <Hds::Alert @type="inline" @color="warning" @onDismiss={{this.noop}} as |A|>
    <A.Title>Your organization will delete soon</A.Title>
    <A.Description>Your organization and account will be deleted on April 24 2022.</A.Description>
    <A.Button @text="Cancel deletion" @color="secondary" @onClick={{this.noop}} />
  </Hds::Alert>
</section>
<!-- For some reason I couldn't get the dismiss to work here. Probably something in the model that I would need to add? -->

## Critical alerts

- We recommend keeping critical alerts non-dissmissible as they are essential to the user's journey and can get dismissed by mistake.

<section>
  <Hds::Alert @type="inline" @color="critical" as |A|>
    <A.Title>Your organization will delete soon</A.Title>
    <A.Description>Your organization and account will be deleted on April 24 2022.</A.Description>
    <A.Button @text="Cancel deletion" @color="secondary" @onClick={{this.noop}} />
  </Hds::Alert>
</section>

Do

<section>
  <Hds::Alert @type="inline" @color="critical" @onDismiss={{this.noop}} as |A|>
    <A.Title>Your organization will delete soon</A.Title>
    <A.Description>Your organization and account will be deleted on April 24 2022.</A.Description>
    <A.Button @text="Cancel deletion" @color="secondary" @onClick={{this.noop}} />
  </Hds::Alert>
</section>

Don't

---

## Icons

All alerts have icons by default. They are intentionally tied to the alert type. Icons in Neutral and Highlight alerts can be swapped out with any other icon from Flight, including animated ones. Change them only when the new icon provides the user with extra value; otherwise, leaving the default icon is recommended.

<section>
  <Hds::Alert @type="inline" @color="highlight" @onDismiss={{this.noop}} @icon="gift" as |A|>
    <A.Title>New features available</A.Title>
    <A.Description>Starting with Terraform 0.15, you can now upgrade to a new version and your workflows will continue to be oprational, just as they were in prior versions.</A.Description>
    <A.Link::Standalone @color="secondary" @icon="arrow-right" @iconPosition="trailing" @text="Release notes" @href="#" />
  </Hds::Alert>
</section>

---

## Actions

- We recommend using the secondary button variant for primary actions and the tertiary button variant for secondary actions.
- Use [LinkStandalone](/components/link/standalone/overview) when an action expects to take the user to a new destination (URL) instead of triggering an action within the same page. Follow `LinkStandalone` [usage guidelines](https://www.figma.com/file/8I4u10OyhYZIea4MpXwJwm/Design-guidelines-migration?node-id=2522%3A8014) to determine what variant "type" to use.
- To keep hierarchy and avoid competing with other actions on the page, using "small" size variants is recommended.
- Avoid using critical buttons in alerts. If used, consider adding a confirmation modal as an extra step, after the action is triggered.
- Up to two actions should be used.

Some common examples are:

#### Button secondary only

<section>
  <Hds::Button @color="secondary" @text="Send reminder email" @size="small" />
</section>

#### Link only

<section>
  <Hds::Link::Standalone @color="primary" @iconPosition="trailing" @icon="arrow-right" @text="View snapshots" @href="#" />
</section>

#### Button secondary + tertiary

<section style="display: flex; gap: 1rem;">
  <Hds::Button @color="secondary" @text="Send reminder email" @size="small" />
  <Hds::Link::Standalone @color="primary" @iconPosition="leading" @icon="x-circle" @text="Cancel invitation" @href="#" />
</section>

---

_Page, Inline_

## Composition

Alerts are very flexible and highly configurable except for `AlertCompact`, in which all properties are required. Some common use-cases are:

#### With icon and title

<section>
  <Hds::Alert @type="inline" @color="neutral" @onDismiss={{this.noop}} as |A|>
    <A.Title>Neutral alert title</A.Title>
    <A.Button @text="Button" @color="secondary" @onClick={{this.noop}} />
    <A.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Alert>
</section>

#### With icon, title, and description

<section>
  <Hds::Alert @type="inline" @color="neutral" @onDismiss={{this.noop}} as |A|>
    <A.Title>Neutral alert title</A.Title>
    <A.Description>Lorem ipsum dolar sit amet, consectetur adipiscing elit nulla degnissim felis.</A.Description>
    <A.Button @text="Button" @color="secondary" @onClick={{this.noop}} />
    <A.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Alert>
</section>

#### Title and description only

<section>
  <Hds::Alert @type="inline" @color="neutral" @icon={{false}} @onDismiss={{this.noop}} as |A|>
    <A.Title>Neutral alert title</A.Title>
    <A.Description>Lorem ipsum dolar sit amet, consectetur adipiscing elit nulla degnissim felis.</A.Description>
    <A.Button @text="Button" @color="secondary" @onClick={{this.noop}} />
    <A.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Alert>
</section>

_Insert banner (warning):_ When icon=false, the title or description should contain the alert type, ie. "Warning".

#### With actions

<section>
  <Hds::Alert @type="inline" @color="neutral" @onDismiss={{this.noop}} as |A|>
    <A.Title>Neutral alert title</A.Title>
    <A.Description>Lorem ipsum dolar sit amet, consectetur adipiscing elit nulla degnissim felis.</A.Description>
    <A.Button @text="Button" @color="secondary" @onClick={{this.noop}} />
    <A.Link::Standalone @color="primary" @icon="plus" @iconPosition="leading" @text="Link text" @href="#" />
  </Hds::Alert>
</section>

#### With custom content

![Example of an Alert with custom content](/assets/components/alert/alert-with_custom_content.png)

_Insert banner (warning):_ Use this method with caution. It can be very helpful, but may require additional time to get it set up correctly. We recommend reacing out to the design system team before proceeding.

#### With custom actions

![Example of an Alert with custom actions](/assets/components/alert/alert-with_custom_actions.png)

_Insert banner (warning):_ Use this method with caution. It can be very helpful, but may require additional time to get it set up correctly. We recommend reacing out to the design system team before proceeding.

---

## Placement

#### Page

Page alerts are placed between the global header navigation and the breadcrumb, next to the left navigation.

![Example placement of an Alert at the page level](/assets/components/alert/alert-placement_page.png)

#### Inline

Inline alerts can be wrapped within the section or component of the page or inline with content.

![Example placement of an Alert inline](/assets/components/alert/alert-placement_inline.png)

#### Compact

Compact alerts can be wrapped within a section or component of the page or inline with content.

![Example placement of compact alert](/assets/components/alert/alert-placement_compact.png)

---

## Content

- Keep the title short, as this will be the most prominent element when users scan the alert.
- Do not end the title with a period.
- Alert messages should be short but clear and descriptive enough to explain what's happening and guide users on how to prevent or fix the issue. We recommend keeping messages under 90 characters.
- Text formatting capabilities such as inline links, bold, italic, code, and bulleted lists are supported.
- For actions, refer to [Button](/components/button/overview) and [Link](/components/link/standalone/overview) content guidelines.

### Examples

<section style="display: flex; flex-direction: column; gap: 1rem;">
  <Hds::Alert @type="inline" @color="neutral" as |A|>
    <A.Title>Tip</A.Title>
    <A.Description>The AMI ID used in this configuration is specific to the <code>us-west-2</code> region. If you would like to use a different region, see the <Hds::Link::Inline @href="#">Troubleshooting guide</Hds::Link::Inline> or visit the CLI <code>state</code> command documentation for guidance.</A.Description>
  </Hds::Alert>
    <Hds::Alert @type="inline" @color="highlight" as |A|>
    <A.Title>Note</A.Title>
    <A.Description>The space between <code>\{{ / }}</code> and the values/functions are optional. For instance: <code>\{{.DisplayName}}</code> is equivalent to <code>\{{.DisplayName}}</code>.</A.Description>
  </Hds::Alert>
    <Hds::Alert @type="inline" @color="warning" as |A|>
    <A.Title>Warning</A.Title>
    <A.Description>This token <strong>will not be displayed again,</strong> so make sure to save it to a safe place.</A.Description>
  </Hds::Alert>
</section>
