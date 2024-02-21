## Usage

### When to use

- When requesting an urgent or immediate response from the user.
- As a confirmation when performing a destructive action or action that will impact other areas of the application.
- For non-frequent tasks that can be interacted with quickly.

### When not to use

- When a user action is not immediately required.
- In place of an alert, consider [Toast](/components/toast) or [Alert](/components/alert).
- For complex editing, long forms, and experiences with a high level of detail. In these cases, the task or function should exist at the page level.

## Color

### Neutral

Use **Neutral** for most Modal instances, such as when the outcome of the Modal’s function doesn’t change areas of the application that aren’t directly tied to the user’s current context. 

Common examples include:

- Functions for creating, editing, or updating objects.
- Simple requests of information from the user.
- Quick confirmations of actions taken by the user.

<Hds::Modal @size="medium" @color="neutral" class="doc-modal-demo" open as |M|>
  <M.Header>
    Neutral modal
  </M.Header>
  <M.Body>
    <p class="hds-typography-body-300 hds-foreground-primary">Modal content</p>
  </M.Body>
  <M.Footer>
    <Hds::ButtonSet>
      <Hds::Button type="submit" @text="Confirm" />
      <Hds::Button type="button" @text="Cancel" @color="secondary" />
    </Hds::ButtonSet>
  </M.Footer>
</Hds::Modal>

### Warning

Use **Warning** to indicate that the Modal’s action may impact a setting, item, or object. Warning Modals simultaneously alert of the potential impact while confirming the action. 

Common examples include:

- Disabling or enabling an application-wide setting or feature.
- Archiving an item that can be recovered.
- Changing a setting that may require the user to re-authenticate or perform an action again.

<Hds::Modal @size="medium" @color="warning" class="doc-modal-demo" open as |M|>
  <M.Header>
    Warning modal
  </M.Header>
  <M.Body>
    <p class="hds-typography-body-300 hds-foreground-primary">Modal content</p>
  </M.Body>
  <M.Footer>
    <Hds::ButtonSet>
      <Hds::Button type="submit" @text="Confirm" />
      <Hds::Button type="button" @text="Cancel" @color="secondary" />
    </Hds::ButtonSet>
  </M.Footer>
</Hds::Modal>

### Critical

Use **Critical** to indicate an irreversible destructive action that will impact other settings, items, or objects within the current feature or in other application areas.

Common examples include:

- Deleting an item or object that cannot be recovered.
- Modifying a setting that cannot be changed or reversed in the future.
- Alerting the user of unsaved changes that will be discarded.

<Hds::Modal @size="medium" @color="critical" class="doc-modal-demo" open as |M|>
  <M.Header>
    Critical Modal
  </M.Header>
  <M.Body>
    <p class="hds-typography-body-300 hds-foreground-primary">Modal content</p>
  </M.Body>
  <M.Footer>
    <Hds::ButtonSet>
      <Hds::Button type="submit" @text="Delete" @color="critical" />
      <Hds::Button type="button" @text="Cancel" @color="secondary" />
    </Hds::ButtonSet>
  </M.Footer>
</Hds::Modal>

!!! Info

In Figma, the `critical` Modal color is coupled with the `critical` Button color. However, in code, the Modal footer `yields` components passed to it and can accept any Button type or color. We recommend matching the `critical` colors for both the Modal and Button components to better communicate the severity of a destructive action.
!!!

## Size

### Width

We recommend using the **medium** size Modal for most scenarios, but use the size that best accounts for the complexity of the content and intended speed of interaction. We do not recommend resizing the Modal manually.

<Hds::Modal @size="small" id="size-small-modal-first" class="doc-modal-demo" open as |M|>
  <M.Header>
    Small modal
  </M.Header>
  <M.Body>
    <p class="hds-typography-body-300 hds-foreground-primary">Modal content</p>
  </M.Body>
  <M.Footer>
    <Hds::ButtonSet>
      <Hds::Button type="submit" @text="Confirm" />
      <Hds::Button type="button" @text="Cancel" @color="secondary" />
    </Hds::ButtonSet>
  </M.Footer>
</Hds::Modal>

<Hds::Modal @size="medium" id="size-medium-modal" class="doc-modal-demo" open as |M|>
  <M.Header>
    Medium modal
  </M.Header>
  <M.Body>
    <p class="hds-typography-body-300 hds-foreground-primary">Modal content</p>
  </M.Body>
  <M.Footer>
    <Hds::ButtonSet>
      <Hds::Button type="submit" @text="Confirm" />
      <Hds::Button type="button" @text="Cancel" @color="secondary" />
    </Hds::ButtonSet>
  </M.Footer>
</Hds::Modal>

<Hds::Modal @size="large" id="size-large-modal" class="doc-modal-demo" open as |M|>
  <M.Header>
    Large modal
  </M.Header>
  <M.Body>
    <p class="hds-typography-body-300 hds-foreground-primary">Modal content</p>
  </M.Body>
  <M.Footer>
    <Hds::ButtonSet>
      <Hds::Button type="submit" @text="Confirm" />
      <Hds::Button type="button" @text="Cancel" @color="secondary" />
    </Hds::ButtonSet>
  </M.Footer>
</Hds::Modal>

### Height

The Modal should hug the body content and expand to a maximum height of 100% of the viewport height minus 16px from the edge. If the body content exceeds the maximum height of the viewport, scroll will be introduced within the Modal body, while the header and footer remain fixed. 

![Mobile layout of the Modal](/assets/components/modal/modal-mobile-sizes.png =672x*)

## Position

Modals should be positioned in the center of the viewport, paired with the overlay component, and on top of **all** parent page content (including the navigation).

![Modal positioning](/assets/components/modal/modal-positioning.png =798x*)

## Modal header

!!! Info

Although adding a title icon and tagline can help the user better understand the function and importance of the task they are performing, both elements add visual weight which might not be suitable or necessary for all Modals.
!!!

### Title icon

The purpose and function of the Modal should not rely solely on an icon, instead the title should be explicit and pragmatic while the icon provides visual support.

#### With title icon

An icon paired with the title can help reinforce the purpose and function of the Modal while also drawing the eye to the header and title area. Icons can be used to communicate the severity and importance of interacting with a Modal and are especially useful in a **warning** or **critical** color Modal.

![Modal header title with icon and dismiss button](/assets/components/dialog-primitives/dialog-primitives-header-icon-and-title.jpg)

#### Without title icon

![Modal header title only and dismiss button](/assets/components/dialog-primitives/dialog-primitives-header-title-only.jpg)

### Tagline

A tagline helps the user maintain the context of the feature, function, or flow the Modal was triggered by. Since a Modal disables and obscures the parent page content, adding a tagline can help the user understand the relationship between the Modal and the parent page content. The tagline should directly reference the page, function, or feature title to reinforce the relationship of the Modal to the parent page content.

#### With tagline

![Modal header tagline, title and dismiss button](/assets/components/dialog-primitives/dialog-primitives-header-tagline-and-title.jpg)

#### With tagline and icon

![Modal header title icon, tagline, title and dismiss button](/assets/components/dialog-primitives/dialog-primitives-header-tagline-and-icon-and-title.jpg)

## Modal body

Modals can take on many different types of content, from text-based content to simple forms. 

<Hds::Modal @size="small" @color="neutral" class="doc-modal-demo" open as |M|>
  <M.Header>
    Default
  </M.Header>
  <M.Body>
    <Doc::Placeholder @text="some generic content" @height="50" @background="#eee" />
  </M.Body>
  <M.Footer>
    <Hds::ButtonSet>
      <Hds::Button type="submit" @text="Confirm" />
      <Hds::Button type="button" @text="Cancel" @color="secondary" />
    </Hds::ButtonSet>
  </M.Footer>
</Hds::Modal>

## Modal footer

Most Modals should have a low to medium level of complexity and promote interaction with a simple “yes/no” or “ok/cancel”. If the complexity of the Modal breaks this pattern, consider moving the function performed by the Modal to the parent page.

### Action patterns

#### One action

We recommend using the Primary Button when only one action is present in the Modal.

![Modal footer with one action](/assets/components/dialog-primitives/dialog-primitives-footer-actions-one.png)

#### Two actions

We recommend using a [ButtonSet](/components/button-set) (Primary Button followed by a Secondary Button) when two actions are present in the Modal.

![Modal footer with two actions](/assets/components/dialog-primitives/dialog-primitives-footer-actions-two.png)

#### Three actions

We recommend using a [ButtonSet](/components/button-set) (Primary Button followed by a Secondary Button) plus a Tertiary Button or [Standalone Link](/components/link/standalone) when three actions are present in the Modal. If a tertiary action is needed, it should not be grouped in the ButtonSet, as functionality should determine button grouping.

Common examples of tertiary actions include:

- Linking to external documentation.
- Linking to another related area or function within the application; best used to help the user better understand or collect the information needed to interact with the Modal.

![Modal footer with three actions](/assets/components/dialog-primitives/dialog-primitives-footer-actions-three.png)

### Action content guidelines

- Modal actions should be concise and not written as sentences. Most of the time, one or two words are adequate for an action. 
- We generally don’t recommend using icons on actions within Modals.
- Buttons in a Modal should follow the same content guidelines as the [Button](/components/button) component.

!!! Do

![Modal footer example with two buttons, primary saying 'Rename cluster' and the secondary saying 'Cancel'](/assets/components/modal/modal-action-content-do.png)
!!!

!!! Dont

![Modal footer example with two buttons, primary saying 'Rename this cluster' and the secondary saying 'Dont rename this cluster'](/assets/components/modal/modal-action-content-dont.png)
!!!

## Dismissal

The following actions will dismiss or close the Modal unless `isDismissDisabled` is set to true:

- Dismiss button in the Modal header
- Clicking outside the Modal on the overlay
- Hitting the escape (`ESC`) key on the keyboard
- A cancel or close button in the footer can also act as a way to dismiss the Modal, but doesn’t always function in the same way.

![Dismissal options for the Modal](/assets/components/modal/modal-dismissal-actions.png =798x*)

In addition to having proper ways for the user to dismiss a Modal, ensure the entry point for a Modal is straightforward enough that if a user accidentally dismisses it, the Modal can be easily triggered again.

### Via dismiss button

The most common dismissal method for a Modal is via the dismiss button in the Modal header. This acts as an escape hatch for the user and helps prevent the user from getting stuck. 

While we typically don’t recommend removing or hiding the dismiss button, it can be done to elevate the importance of the Modal and lower the possibility of accidental dismissal, in which case, a “cancel” button could be added as an escape hatch.

### Via “cancel” button
While certain experiences may only call for a single action button, we recommend adding a “cancel” button as a more explicit method to close the Modal.

Depending on the information being requested, a secondary action that closes or cancels the model may not perform the same function as dismissing the Modal. For example, responding “no” to a “yes/no” question is not the same as dismissing the Modal, the latter of which does not submit a response.

**Best practices for avoiding data loss**

If a user attempts to dismiss a Modal that contains a partially filled form or other interactive elements, we recommend ensuring that the following criteria are met to promote a positive user experience:

- The default browser notification is being triggered calling attention to a potential misstep.
- Partially filled form data is persisted within the application to prevent duplicative work.

![Default browser notification](/assets/components/modal/modal-default-browser-notification.png =271x*)
