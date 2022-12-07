## When to use

- When requesting an urgent or immediate response from the user.
- As a confirmation when performing a destructive action or action that will impact other areas of the application.
- For non-frequent tasks that can be interacted with quickly.

## When not to use

- When a user action is not immediately required.
- In place of an alert, instead use a [Toast](/components/toast) or other alert type.
- For complex editing, long forms, and experiences with a high level of detail. In these cases the task or function should exist at the page level.

---

## Anatomy

![Anatomy of a modal](/assets/components/modal/modal-anatomy.png)

### Header

#### Title

Required

#### Title icon

Optional

#### Tagline

Optional

#### Dismiss

Required, all modals are dismissible

### Body

#### Content

Required; either default (simple text) or custom. Determined by bodyType.

### Footer

#### Actions

Required; either one, two, or three

---

## Size

Small

<!--Insert small modal here -->

Medium

<!--Insert medium modal here -->

Large

<!--Insert large modal here -->

### Best practices

- Use a modal size that best accounts for the complexity and intended speed of interaction.
- The **medium** size accounts for the _majority_ of scendarios and is the default recommended size.

---

## Color

![Neutral modal](/assets/components/modal/modal-color_neutral.png)

#### Usage

- The **neutral** color should be used for the majority of modal instances and is best used in circumstances where the outcome of the function doesn't change or alter areas of the application that aren't directly tied to the current context of the user.
- Common usage examples include:
  - functions for creating, editing, or updating objects
  - simple requests of information from the user
  - quick confirmations of actions taken by the user.

![Warning modal](/assets/components/modal/modal-color_warning.png)

#### Usage

- A **warning** modal indicates that the modal action may impact a setting, item, or object and is used to message the potential impact while confirming that the user wants to continue.
- This action may impact areas of the application outside of the scope of the current feature or function, but can also be tied to the context that the user is currently in.
- Common examples include:
  - disabling or enabling an application-wide setting or feature
  - archiving an item that can be recovered
  - changing a setting that may require the user to re-authenticate or perform an action again.

![Critical modal](/assets/components/modal/modal-color_critical.png)

#### Usage

- A **critical** modal is used to indicate a destructive action that is irreversible and will impact other settings, items, or objects within the current feature or in other areas of the application.
- Common examples include:
  - deleting an item or object that cannot be recovered
  - modifying a setting that cannot be changed or reversed in the future
  - alerting the user of unsaved changes that will be discarded.

### Best practices

- A **titleIcon** can help reinforce the severity, strength, and importance of the **warning** and **critical** color variants.
- The primary action in the **critical** variant should use a critical action button variant.

---

_Modal body_

## Body type

![Modal body types](/assets/components/modal/modal-body_types.png)

### Usage

- The **default** body type is meant for simple text-based content and could be used for a quick confirmation of an action or disclosure of information.
- The **custom** body type is suitable for the majority of use cases when collecting information or feedback from the user. It can accept any custom component and nested components by swapping out the placeholder instance with a local component or relevant HDS component.

---

_Modal footer_

## Actions

### General best practices

- To main consistency the only property that should be changed in the actions within the footer is the text property. An exception to this is in the case of a modal with critical or destruction function, in which the primary button should be changed to **critical**.
- Action buttons should remain consistent with the variants defined in the number of actions in the footer; **primary**, **secondary**, and **tertiary**, in that order.
- Action buttons should not use an icon within the context of the modal. Pairing an icon with text in a button is meant to more clearly outline the button function, in the context of a modal the function should be apparent through the use of other elements like **title**, **tagline**, and **icon**.
- Action buttons should use size **medium** to maintain hierarchy and visual weight.

### One action

<section>
  <Hds::Modal::Footer>
    <Hds::ButtonSet>
      <Hds::Button @text="Confirm" />
    </Hds::ButtonSet>
  </Hds::Modal::Footer>
</section>

### Two actions

<section>
  <Hds::Modal::Footer>
    <Hds::ButtonSet>
      <Hds::Button @text="Confirm" />
      <Hds::Button @text="Cancel" @color="secondary" />
    </Hds::ButtonSet>
  </Hds::Modal::Footer>
</section>

#### Action best practices

- Most modals should use two inverse actions; or two actions which perform opposite functions (i.e. “ok/cancel”, “yes/no”).
- In the case of a single action, the dismiss acts as an escape hatch if the user needs to return to the main page content.
  - Depending on the information being requested a secondary action that closes or cancels the model may not perform the same function as dismissing the modal. For example; responding “no” to a “yes/no” question is not the same as dismissing the modal, the latter of which does not submit a response.
  - While certain experiences may only call for a single action button, most modal instances should have a “cancel” button as a more explicit method to close the modal.

### Three actions

<section>
  <Hds::Modal::Footer>
    <Hds::ButtonSet>
      <Hds::Button @text="Confirm" />
      <Hds::Button @text="Cancel" @color="secondary" />
      <Hds::Button @text="Tertiary" @color="tertiary" @iconPosition="leading" @icon="plus" />
    </Hds::ButtonSet>
  </Hds::Modal::Footer>
</section>

#### Tertiary best practices

- If a tertiary action is necessary it should not be grouped with the button set of primary and secondary actions.
  - Button grouping should be determined by functionality; since the primary and secondary buttons are performing related (inverse) functions they are grouped. In the case of a tertiary button within a modal, it’s function is generally unrelated to the primary and secondary actions and therefore shouldn’t be grouped in the same way.
- Common examples of tertiary actions include:
  - Linking to external documentation
  - Linking to another related area or function within the application; best used to help the user better understand or collect the information needed to interact with the modal.

### Action content guidelines

_Banner (information):_ Buttons in a modal should follow the same content guidelines covered in the [button component](/components/button).

**Modal actions should be concise and not written as sentences**

- Most of the time one or two works are adequate for an action, air on the side of simplicity whenever possible.
- The expected function of the action (positive/negative, confirm/cancel) is reinforced by the button type and visual language expressed within.

<section>
  <Hds::Modal::Footer>
    <Hds::ButtonSet>
      <Hds::Button @text="Rename cluster" />
      <Hds::Button @text="Cancel" @color="secondary" />
    </Hds::ButtonSet>
  </Hds::Modal::Footer>
</section>

**Do**

<section>
  <Hds::Modal::Footer>
    <Hds::ButtonSet>
      <Hds::Button @text="Rename this cluster" />
      <Hds::Button @text="Don't rename this cluster" @color="secondary" />
    </Hds::ButtonSet>
  </Hds::Modal::Footer>
</section>

**Don't**

**If using two actions within a modal, the messages (and functions) should be inverses of each other**

- Adhering to an inverse action pattern is mor pragmatic and straightforward to the user. This pattern clearly communicates the outcome and intended results of whatever action the user chooses.
- Most modals should have a low to medium level of complexity and promote interaction with a simple "yes/no" or "ok/cancel".
- If the complexity of the modal breaks this pattern, consider moving the function being performed by the modal to it's own page.

---

## Title

### Title icon

#### with Title icon

<section>
  <Hds::Modal::Header @icon="info">Title</Hds::Modal::Header>
</section>

#### without Title icon

<section>
  <Hds::Modal::Header @icon="info">Title</Hds::Modal::Header>
</section>

##### Usage

- An icon paired with the title can help reinforce the purpose and function of the modal while also drawing the eye to the header and title area.
  - Icons can be used to communicate the severity and importance of interacting with a modal and are especially useful in a **warning** or **critical** color modal.
- The purpose and function of the modal should not rely solely on an icon, instead the title should be explicit and pragmatic while the icon provides visual support.

### Tagline

#### with Tagline

<section>
  <Hds::Modal::Header @tagline="Tagline">Title</Hds::Modal::Header>
</section>

#### with Tagline + Icon

<section>
  <Hds::Modal::Header @tagline="Tagline" @icon="info">Title</Hds::Modal::Header>
</section>

##### Usage

- A **tagline** helps the user maintain the context of the feature, function, or flow the modal was triggered by. Since a modal disables and obscures the main page content, adding a **tagline** can help the user understand the relationship between the modal and the main page content.
- The **tagline** should directly reference the page, function, or feature title to reinforce the relationship of the modal to the main page content.

_Banner (warning):_ Even though adding a title icon and tagline can help the user better understand the function and importance of the task they are performing, both elements add visual weight which might not be suitable or necessary for all modals.

---

## Content

While the content contained within the modal body is variable and customizable, there are some types of content that should not be contained within a modal. For more concrete examples to help guide when and when not to use a modal, view the usage guidelines.

---

## Dismissal

- The most common dismissal method for a modal is via the dismiss button in the modal header. This acts as a simple escape hatch for the user and helps prevent the user from getting stuck.
  - It is recommended to provide the user with a clear dismissal option in most modal instances, most easily handled by the dismiss button.
  - A modal lacking a dismiss action should be rare, but can be done to elevate the importance of the modal and lower the possibility of accidental dismissal.
- The entry point for a modal should be straightforward enough that if a user accidentally dismisses it, the modal can be easily triggered again.

The following actions will dismiss or close the modal except if **isDismissDisabled** is set to true in the production component:

- Dismiss button in the modal header
- Clicking with a mouse outside of the modal on the overlay
- Hitting the escape (ESC) key on the keyboard
- A cancel or close button in the footer can also act as a way to dismiss the modal, but doesn't always function in the same way (see the section on actions for more details).

![Dismissal options for the modal](/assets/components/modal/modal-dismissal_options.png)

If a user attempts to dismiss a modal that containing a partially filled form or other interactive element, ensure that the following criteria are met to promote a positive user experience:

- The default browser notification is being triggered calling attention to a potential mis-step.
- Partially filled form data is persisted within the application to prevent duplicative work.

_Banner (informational):_ Note: Both of the above steps are recommendations of the HDS team, but are the responsibility of consumers to implement at the application level.

![Default browser notification](/assets/components/modal/modal-default_browser_notification.png)

---

## Position and responsive sizing

![Modal positioning](/assets/components/modal/modal-positioning.png)

Modals should be positioned in the center of the viewport, paired with the overlay component, and on top of the main page content.

- This is true regardless of if there is a sidebar or navigational element that persists on the page. The intention of the overlay is to sit on top of _all_ page content, including navigation.

![Mobile layout of the modal](/assets/components/modal/modal-mobile_layout.png)

The modal should hug the height of the body content and expand to a maximum height of 100% of the viewport height minus a 16px margin from the viewport edge.

- If the body content exceeds the maximum height of the viewport, scroll will be introduced within the modal body.
- The header and footer are not included in the scrolling section, only the body content. These elements should always be visible for the user to more easily understand the intended function and possible actions.

_Banner (informational):_ As a general rule of thumb, the modal should not be resized manually, rather select the size that best accommodates the content.

---

## Accessibility

- When the modal is triggered via the keyboard, focus is trapped within the modal.
  - If there are no interactive elements within the body of the modal the dismiss button should receive focus as the first interactive element in the [DOM (document object model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction).
  - If there is an interactive element within the body of the modal (like a form input or link), that element should be targeted for focus first.
- Since a modal is a complex pattern that can contain any combination of nested components and content, nested elements must adhere to their individual accessibility criteria.

### Focus order within a simple modal

Given the modal is triggered via a keyboard, the dismiss button is first in the focus order since there isn't any content within the body eligible to receive focus.

![Simple focus within a modal](/assets/components/modal/modal-simple_focus_order.png)

### Focus order within a complex modal

- If the modal body contains interactive content, the first element should receive focus first.
- This is true regardless of how the modal is triggered; either via a mouse click or via the keyboard.

![Complex focus within a modal](/assets/components/modal/modal-complex_focus_order.png)
