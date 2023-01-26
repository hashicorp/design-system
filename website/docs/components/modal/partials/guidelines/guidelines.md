## Usage

### When to use

- When requesting an urgent or immediate response from the user.
- As a confirmation when performing a destructive action or action that will impact other areas of the application.
- For non-frequent tasks that can be interacted with quickly.

### When not to use

- When a user action is not immediately required.
- In place of an alert, instead use a [Toast](/components/toast) or other alert type.
- For complex editing, long forms, and experiences with a high level of detail. In these cases, the task or function should exist at the page level.

## Size

Small

<Hds::Modal @size="small" id="size-small-modal-first" open as |M|>
  <M.Header>
    Small Modal
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

Medium

<Hds::Modal @size="medium" id="size-medium-modal" open as |M|>
  <M.Header>
    Small Modal
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

Large

<Hds::Modal @size="large" id="size-large-modal" open as |M|>
  <M.Header>
    Large Modal
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

### Best practices

- Use a Modal size that best accounts for the complexity of the content and intended speed of interaction.
- The **medium** size accounts for the _majority_ of scenarios and is the default recommended size.

## Color

### Neutral

<Hds::Modal @size="medium" @color="neutral" open as |M|>
  <M.Header>
    Neutral Modal
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

**Neutral** should be used for the majority of Modal instances and is best used in circumstances where the outcome of the Modal’s function doesn’t change or alter areas of the application that aren’t directly tied to the current context of the user. Common usage examples include:

- functions for creating, editing, or updating objects
- simple requests of information from the user
- quick confirmations of actions taken by the user.

### Warning

<Hds::Modal @size="medium" @color="warning" open as |M|>
  <M.Header>
    Warning Modal
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

**Warning** indicates that the Modal’s action may impact a setting, item, or object and is used to message the potential impact while confirming that the user wants to continue.

This action may impact areas of the application outside of the scope of the current feature or function, but can also be tied to the context that the user is currently in. Common examples include:

- disabling or enabling an application-wide setting or feature
- archiving an item that can be recovered
- changing a setting that may require the user to re-authenticate or perform an action again.

### Critical

<Hds::Modal @size="medium" @color="critical" open as |M|>
  <M.Header>
    Critical Modal
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

**critical** is used to indicate a destructive action that is irreversible and will impact other settings, items, or objects within the current feature or in other areas of the application. Common examples include:

- deleting an item or object that cannot be recovered
- modifying a setting that cannot be changed or reversed in the future
- alerting the user of unsaved changes that will be discarded.

## Modal body

### Body type

![Modal body types](/assets/components/modal/modal-body-type.png)

- The **default** body type is meant for simple text-based content and could be used for a quick confirmation of an action or disclosure of information.
- The **custom** body type is suitable for the majority of use cases when collecting information or feedback from the user. It can accept any custom component and nested components by swapping out the placeholder instance with a local component or relevant HDS component.

## Modal footer

### Actions

#### General best practices

- The only property that should be changed in the actions within the footer is the text property, except in the case of a **critical** or destructive function (in which the button should reflect the destructive action).
- Action buttons should remain consistent with the variants defined in the number of actions in the footer; **primary**, **secondary**, and **tertiary**, in that order.
- Action buttons should not use an icon within the context of the Modal. In the context of a Modal the function should be apparent through the use of other elements like **title**, **tagline**, and **icon**.
- Most Modals should use two inverse actions; or two actions that perform opposite functions (i.e. “ok/cancel”, “yes/no”).

#### One action

<Hds::Modal::Footer>
  <Hds::ButtonSet>
    <Hds::Button @text="Confirm" />
  </Hds::ButtonSet>
</Hds::Modal::Footer>


#### Two actions

<Hds::Modal::Footer>
  <Hds::ButtonSet>
    <Hds::Button @text="Confirm" />
    <Hds::Button @text="Cancel" @color="secondary" />
  </Hds::ButtonSet>
</Hds::Modal::Footer>

#### Three actions

<Hds::Modal::Footer>
  <Hds::ButtonSet>
    <Hds::Button @text="Confirm" />
    <Hds::Button @text="Cancel" @color="secondary" />
    <Hds::Button @text="Tertiary" @color="tertiary" @iconPosition="leading" @icon="plus" />
  </Hds::ButtonSet>
</Hds::Modal::Footer>

#### Tertiary best practices

- If a tertiary action is necessary it should not be grouped with the button set of primary and secondary actions, as button grouping should be determined by functionality.
- Common examples of tertiary actions include:
    - Linking to external documentation
    - Linking to another related area or function within the application; best used to help the user better understand or collect the information needed to interact with the Modal.

#### Action content guidelines

**Modal actions should be concise and not written as sentences**

- Most of the time one or two words are adequate for an action, air on the side of simplicity whenever possible.
- The expected function of the action (positive/negative, confirm/cancel) is reinforced by the button type and visual language expressed within.
- Buttons in a Modal should follow the same content guidelines covered in the [button component](/components/button).

!!! Do

<Hds::Modal::Footer>
  <Hds::ButtonSet>
    <Hds::Button @text="Rename cluster" />
    <Hds::Button @text="Cancel" @color="secondary" />
  </Hds::ButtonSet>
</Hds::Modal::Footer>
!!!

!!! Dont

<Hds::Modal::Footer>
  <Hds::ButtonSet>
    <Hds::Button @text="Rename this cluster" />
    <Hds::Button @text="Don’t rename this cluster" @color="secondary" />
  </Hds::ButtonSet>
</Hds::Modal::Footer>
!!!

**If using two actions within a Modal, the messages (and functions) should be inverses of each other**

- Adhering to an inverse action pattern is more pragmatic and straightforward to the user. This pattern clearly communicates the outcome and intended results of whatever action the user chooses.
- Most Modals should have a low to medium level of complexity and promote interaction with a simple "yes/no" or "ok/cancel".
- If the complexity of the Modal breaks this pattern, consider moving the function being performed by the Modal to its own page.

## Modal header

### Title icon

**With title icon**

<Hds::Modal::Header @icon="info" @onDismiss={{this.noop}}>Title</Hds::Modal::Header>

**Without title icon**

<Hds::Modal::Header @onDismiss={{this.noop}}>Title</Hds::Modal::Header>

#### Usage

An icon paired with the title can help reinforce the purpose and function of the Modal while also drawing the eye to the header and title area.

Icons can be used to communicate the severity and importance of interacting with a Modal and are especially useful in a **warning** or **critical** color Modal.

The purpose and function of the Modal should not rely solely on an icon, instead the title should be explicit and pragmatic while the icon provides visual support.

### Tagline

**With tagline**

<Hds::Modal::Header @tagline="Tagline" @onDismiss={{this.noop}}>Title</Hds::Modal::Header>

**With tagline and icon**

<Hds::Modal::Header @tagline="Tagline" @icon="info" @onDismiss={{this.noop}}>Title</Hds::Modal::Header>

#### Usage

A **tagline** helps the user maintain the context of the feature, function, or flow the Modal was triggered by. Since a Modal disables and obscures the main page content, adding a tagline can help the user understand the relationship between the Modal and the main page content.

The **tagline** should directly reference the page, function, or feature title to reinforce the relationship of the Modal to the main page content.

!!! Warning

Even though adding a title icon and tagline can help the user better understand the function and importance of the task they are performing, both elements add visual weight which might not be suitable or necessary for all Modals.

!!!

## Dismissal

The most common dismissal method for a Modal is via the dismiss button in the Modal header. This acts as a simple escape hatch for the user and helps prevent the user from getting stuck.

- It is recommended to provide the user with a clear dismissal option in most Modal instances, most easily handled by the dismiss button.
- A Modal lacking a dismiss action should be rare, but can be done to elevate the importance of the Modal and lower the possibility of accidental dismissal.
- In the case of a single action, the dismiss acts as an escape hatch if the user needs to return to the main page content.
    - Depending on the information being requested a secondary action that closes or cancels the model may not perform the same function as dismissing the Modal. For example; responding “no” to a “yes/no” question is not the same as dismissing the Modal, the latter of which does not submit a response.
    - While certain experiences may only call for a single action button, most Modal instances should have a “cancel” button as a more explicit method to close the Modal.

The entry point for a Modal should be straightforward enough that if a user accidentally dismisses it, the Modal can be easily triggered again.

### Dismissal actions

The following actions will dismiss or close the Modal except if `isDismissDisabled` is set to true in the production component:

- Dismiss button in the Modal header
- Clicking with a mouse outside of the Modal on the overlay
- Hitting the escape (`ESC`) key on the keyboard
- A cancel or close button in the footer can also act as a way to dismiss the Modal, but doesn’t always function in the same way (see the section on actions for more details).

![Dismissal options for the Modal](/assets/components/modal/modal-dismissal-actions.png)

If a user attempts to dismiss a Modal that contains a partially filled form or other interactive elements, ensure that the following criteria are met to promote a positive user experience:

- The default browser notification is being triggered calling attention to a potential misstep.
- Partially filled form data is persisted within the application to prevent duplicative work.

!!! Info

Note: Both of the above steps are recommendations of the HDS team, but are the responsibility of consumers to implement at the application level.

!!!

![Default browser notification](/assets/components/modal/modal-default-browser-notification.png)

## Position and responsive sizing

![Modal positioning](/assets/components/modal/modal-positioning.png)

Modals should be positioned in the center of the viewport, paired with the overlay component, and on top of the main page content.

- This is true regardless of if there is a sidebar or navigational element that persists on the page. The intention of the overlay is to sit on top of _all_ page content, including navigation.

![Mobile layout of the Modal](/assets/components/modal/modal-mobile-sizes.png)

The Modal should hug the height of the body content and expand to a maximum height of 100% of the viewport height minus a 16px margin from the viewport edge.

- If the body content exceeds the maximum height of the viewport, scroll will be introduced within the Modal body.
- The header and footer are not included in the scrolling section, only the body content. These elements should always be visible for the user to more easily understand the intended function and possible actions.

!!! Info

As a general rule of thumb, the Modal should not be resized manually, rather select the size that best accommodates the content.

!!!