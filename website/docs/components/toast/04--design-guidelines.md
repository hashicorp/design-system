<!-- <h1>Toast component - Design Guidelines</h1>

<section data-section="design-guidelines">
  
  <div class="dummy-design-guidelines">
    <p class="dummy-paragraph"><a
        href="https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?node-id=6484%3A17367"
        target="_blank"
        rel="noopener noreferrer"
      >Figma UI Kit</a></p>
    <br />
    <img class="dummy-figma-docs" src="/assets/images/toast-design-usage.png" alt="" role="none" />
  </div>
</section> -->

# Toast

## When to use

- To display contextual information as a result of a user or system-triggered action.
- To communicate an ongoing process, e.g. "Creating cluster".

## When not to use

- To display persistent messages. Consider using [Alert](/components/alert).
- As a dialog to confirm an action. Consider using a [Dialog](/components/dialog).
- To display promotional content. Consider using [AlertInline](/components/alert-inline).

---

## Anatomy

All alert types share the same anatomy except for AlertCompact.

![Toast Anatomy](/assets/components/toast/toast-anatomy.png)

#### Icon

Optional (recommended)

#### Title

Required only when description is false. Optional otherwise.

#### Description

Required only when title is false. Optional otherwise.

#### Actions

Optional

#### Container

Required

#### Dismiss button

Optional

#### Content

Required

---

## Color

<!-- <Hds::Toast @color="neutral" @onDismiss={{...}} as |T|>
    <T.Title>Neutral toast title</T.Title>
    <T.Description>Lorem ipsum dolor sit amet, consecteu adipiscig elit nulla dignissim felis.</T.Description>
    <T.Button @text="Button" @color="secondary" @onClick={{ your function here }} />
    <T.Link::Standalone @color="secondary" @icon="plus" @text="Link text" @route="..." @color="secondary" />
</Hds::Toast>

<Hds::Toast @color="highlight" @onDismiss={{...}} as |T|>
    <T.Title>Highlight toast title</T.Title>
    <T.Description>Lorem ipsum dolor sit amet, consecteu adipiscig elit nulla dignissim felis.</T.Description>
    <T.Button @text="Button" @color="secondary" @onClick={{ your function here }} />
    <T.Link::Standalone @color="secondary" @icon="plus" @text="Link text" @route="..." @color="secondary" />
</Hds::Toast>

<Hds::Toast @color="success" @onDismiss={{...}} as |T|>
    <T.Title>Success toast title</T.Title>
    <T.Description>Lorem ipsum dolor sit amet, consecteu adipiscig elit nulla dignissim felis.</T.Description>
    <T.Button @text="Button" @color="secondary" @onClick={{ your function here }} />
    <T.Link::Standalone @color="secondary" @icon="plus" @text="Link text" @route="..." @color="secondary" />
</Hds::Toast>

<Hds::Toast @color="warning" @onDismiss={{...}} as |T|>
    <T.Title>Warning toast title</T.Title>
    <T.Description>Lorem ipsum dolor sit amet, consecteu adipiscig elit nulla dignissim felis.</T.Description>
    <T.Button @text="Button" @color="secondary" @onClick={{ your function here }} />
    <T.Link::Standalone @color="secondary" @icon="plus" @text="Link text" @route="..." @color="secondary" />
</Hds::Toast>

<Hds::Toast @color="critical" @onDismiss={{...}} as |T|>
    <T.Title>Critical toast title</T.Title>
    <T.Description>Lorem ipsum dolor sit amet, consecteu adipiscig elit nulla dignissim felis.</T.Description>
    <T.Button @text="Button" @color="secondary" @onClick={{ your function here }} />
    <T.Link::Standalone @color="secondary" @icon="plus" @text="Link text" @route="..." @color="secondary" />
</Hds::Toast> -->

Use color logically.

- **Nuetral** to provide general information to the user about an ongoing process.
- **Highlight** use interchangeably with neutral when more prominence is needed. Use it sparingly.
- **Success** to inform users that an action has been completed successfully.
- **Warning** to indicate that an action was executed successfully but may have triggered a related issue. Provide guidance and actions if possible.
- **Critical** to indicate error or critical issues as a result of a failed action.

---

## Icons

All toasts come with icons by default. They are intentionally tied to the toast type. Icons in Neutral and Highlight alerts can be swapped out with any other icon from Flight, including animated ones. Change them only when the new icon provides the user with extra value; otherwise, leaving the default icon is recommended.

<!-- <Hds::Toast @color="neutral" @icon="running" @onDismiss={{...}} as |T|>
    <T.Title>Plan running</T.Title>
    <T.Button @text="Button" @color="secondary" @onClick={{ your function here }} />
    <T.Link::Standalone @color="secondary" @icon="plus" @text="Link text" @route="..." @color="secondary" />
</Hds::Toast>

<Hds::Toast @color="success" @icon="check-circle" @onDismiss={{...}} as |T|>
    <T.Title>Plan finished</T.Title>
    <T.Button @text="Button" @color="secondary" @onClick={{ your function here }} />
    <T.Link::Standalone @color="secondary" @icon="plus" @text="Link text" @route="..." @color="secondary" />
</Hds::Toast> -->

---

## Actions

- We recommend using the secondary button variant for primary actions and the tertiary button variant for secondary actions.
- Use LinkStandalone when an action expects to take the user to a new destination (URL) instead of triggering an action within the same page.Follow LinkStandalone [usage guidelines](/components/link-standalone/#usage-guidelines) to determine what variant "type" to use.
- To keep hierarchy and avoid competing with other actions on the page, using “small” size variants is recommended.
- Avoid using critical buttons in alerts. If used, consider adding a confirmation modal as an extra step, after the action is triggered.
  Up to two action should be used.

Some common examples are:

#### Button secondary only

![Button secondary only](/assets/components/toast/toast-button.png)

#### Link only

[Link only](/assets/toast-link-only.png)

#### Button secondary + tertiary

![Button secondary + tertiary](/assets/components/toast/toast-button-secondary-tertiary.png)

<!-- <Banner
    type="warning"
    text="When using links, avoid using CTA link; it may take users' attention away from other actions on the page. Use LinkStandalone instead."
/> -->

---

## Composition

Alerts are very flexible and highly configurable except for the AlertCompact, in which all properties are required. Some common use-cases are:

#### With icon and title

<!-- <Hds::Toast @color="success" @icon="check-circle" @onDismiss={{...}} as |T|>
    <T.Title>Neutral toast title</T.Title>
    <T.Button @text="Button" @color="secondary" @onClick={{ your function here }} />
    <T.Link::Standalone @color="secondary" @icon="plus" @text="Link text" @route="..." @color="secondary" />
</Hds::Toast> -->

#### With icon, title, and description

<!-- <Hds::Toast @color="success" @icon="check-circle" @onDismiss={{...}} as |T|>
    <T.Title>Success toast title</T.Title>
    <T.Description>Lorem ipsum dolar sit amet, consectetur adi.</T.Description>
    <T.Button @text="Button" @color="secondary" @onClick={{ your function here }} />
    <T.Link::Standalone @color="secondary" @icon="plus" @text="Link text" @route="..." @color="secondary" />
</Hds::Toast> -->

#### Title and description only

<!-- <Hds::Toast @color="success" @onDismiss={{...}} as |T|>
    <T.Title>Success toast title</T.Title>
    <T.Description>Lorem ipsum dolar sit amet, consectetur adi.</T.Description>
    <T.Button @text="Button" @color="secondary" @onClick={{ your function here }} />
    <T.Link::Standalone @color="secondary" @icon="plus" @text="Link text" @route="..." @color="secondary" />
</Hds::Toast>

<Banner
    type="warning"
    text="When icon=false, the title or description text should contain the alert type in it, ie. “Success”."
/> -->

#### With actions

<!-- <Hds::Toast @color="success" @icon="check-circle" @onDismiss={{...}} as |T|>
    <T.Title>Success toast title</T.Title>
    <T.Description>Lorem ipsum dolor sit amet, consectetur adi.</T.Description>
    <T.Button @text="Button" @color="secondary" @onClick={{ your function here }} />
    <T.Link::Standalone @color="secondary" @icon="plus" @text="Link text" @route="..." @color="secondary" />
</Hds::Toast> -->

#### With custom custom

![Toast with custom content](/assets/components/toast/toast-custom-content.png)

<!-- <Banner
    type="warning"
    text="Use this method with caution. It can be very helpful, but may require additional time to get it set up correctly. We recommend reaching out the design system team before proceeding."
/> -->

#### With custom actions

![Toast with custom actions](/assets/components/toast/toast-custom-actions.png)

<!-- <Banner
    type="warning"
    text="Use this method with caution. It can be very helpful, but may require additional time to get it set up correctly. We recommend reaching out the design system team before proceeding."
/> -->

---

## Placement

Toasts should appear in the bottom right corner of the screen. They have a margin of 32px from the bottom and a 24px from the right side of the viewport. They should stack vertically with a 16px margin between each toast when multiple toasts are triggered.

![Toast placement example](/assets/components/toast/toast-placement.png)

<!-- <Banner
    type="informational"
    text="Currently, HCP’s notification service doesn’t support the recommended placement. We recommend reaching out to your engineering partner and discussing it first."
/>

<Banner
    type="warning"
    text="Toast width: The Figma component is 360px, which is the minimum width. You can manually stretch it up to 500px. Wider than this size will lead to issues during implementation."
/> -->

---

## Content

- Keep the title short, as this will be the most prominent element when users scan the toast.
- Do not end the title with a period.
- Toast messages should be short bu clear and descriptive enough to explain what's happening and guide users on how to prevent or fix the issue. We recommend keeping messages under 90 characters.
- Text formatting capabilities such as inline links, bold, italic, code, and bulleted lists are supported.
- For actions, refer to [Button](/components/button) and [Link](/components/link) content guidelines.

#### Examples

<!-- <Hds::Toast @color="success" @icon="check-circle" @onDismiss={{...}} as |T|>
    <T.Title>Cost estimation enabled</T.Title>
    <T.Description>Future runs will now include this step. You can manage this preference in <Hds::Link::Standalone @text="Organization settings." @href="..." /></T.Description>
    <T.Button @text="Button" @color="secondary" @onClick={{ your function here }} />
    <T.Link::Standalone @color="secondary" @icon="plus" @text="Link text" @route="..." @color="secondary" />
</Hds::Toast>

<Hds::Toast @color="critical" @icon="alert-diamond" @onDismiss={{...}} as |T|>
    <T.Title>Placement failures</T.Title>
    <T.Description>Batch, <strong>3 unplaced</strong></T.Description>
    <T.Description>Resources exhausted on 5 nodes</T.Description>
    <T.Description>Missing driver "java" on 5 nodes</T.Description>
    <T.Button @text="Button" @color="secondary" @onClick={{ your function here }} />
    <T.Link::Standalone @color="secondary" @icon="plus" @text="Link text" @route="..." @color="secondary" />
</Hds::Toast> -->

---

## Accessibility

<!-- <Banner
    type="informational"
    text="Animations on Toast will not take place if the user has `prefers-reduced-motion’ enabled in their browser or operating system."
/> -->

