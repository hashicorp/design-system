## Usage

### When to use

- When an application encounters an issue or error during its operation.
- When emphasis is needed on the creation of a new object within a null state.

### When not to use

- When the absence of content is expected and does not require an explanation to the user.
- When there is a clear and intuitive way to add or populate content.

## Alignment

The Application State supports two alignment options: `left` (default) and `center`. The alignment affects text alignment, action placement/alignment in the footer, and media placement; however, it does not change the default page alignment.

!!! Info

By default, the Application State has horizontal auto margins applied to it, always centering it on the page or containing element. This can be overridden with CSS properties.

!!!

### Center alignment

![Center aligned application state](/assets/components/application-state/application-state-alignment-center.png)

### Left alignment

![Left aligned application state](/assets/components/application-state/application-state-alignment-left.png)

## Media

The media slot is used to add illustrations to increase the visual impact of the Application State.

This provides additional visual prominence while also elevating the brand experience. If the illustration has a circular container, we recommend setting the `alignment` to `center`.

![Empty state for Vault Secrets, guiding user to create new secrets or importing them](/assets/components/application-state/application-state-media-slot-spot-illustration-center-alignment.png)


## Header

### Icon

When set, the icon is displayed side by side with the title.

![Showing an icon left of the title, with some body text below it.](/assets/components/application-state/application-state-icon-usage.png)

This is commonly used when displaying an error state for application failures. The icon must always be accompanied by a title.

### Title

The title should be short and provide a clear and concise message.

### Error code

If enabled and available, an error code will be shown, providing additional information associated with the title.

## Body

Focus on relevant information and avoid unnecessary details. If there is an error, include suggestions or guidance for how the user can resolve the issue, if possible. If no objects are found (zero/empty state), provide a brief explanation on how creating this new object will benefit the user. 

The body allows for two types of content: `text` and `generic`.

![Showing two different kind of body content types, one as text and another as generic yielded content](/assets/components/application-state/application-state-body-content-types.png)


## Footer
The Application State supports up to three actions, including [Dropdown](/components/dropdown), [Standalone Link](/components/link/standalone), and [Button](/components/button) components. Use footer actions to help users resolve errors or access issues with actionable steps.

![A button set showing a dropdown, secondary button, and stand alone link](/assets/components/application-state/application-state-footer-action-types.png)

### Using buttons or links

Buttons, along with links, are used to emphasize the importance of the action in the Application State with visual hierarchy, and are the most common actions used in the footer.

!!! Dont

When there is an empty state that occupies the majority of the page, do not display two similar actions in different areas of the UI. In this example, there is a primary button in the Page Header and in the Application State. 

![Showing an empty state with a primary button and a page header with a primary button](/assets/components/application-state/application-state-empty-state-dont-duplicate-buttons.png)

!!!

!!! Do

Instead, use the Application State as the only means of drawing attention to the primary action.

![Showing an empty state with a primary button with a page header with out a primay button](/assets/components/application-state/application-state-empty-state-do-keep-one-primary-cta.png)

!!!

### Using dropdowns

Dropdowns can be used as actions in the footer in rare cases. Limit dropdowns to one per Application State.

![Showing an empty state with a primary button with a page header with out one](/assets/components/application-state/application-state-dropdown-actions.png)

## Width constraints

The Application State’s content has a max width of 480 pixels. This is done for better readability, ensuring that the max character count is close to 70 characters per line.

## Examples

Here are some common use cases for the Application State, however, it is not limited to just these two examples.

### Error state

Error states are used when the application encounters an issue or error during its operation. It shows the associated error code, icon, messages, and actions to help users find a solution.

![Showing an example of an error state with a 404 error code and two links](/assets/components/application-state/application-state-error-state.png)

### Empty state

An empty state occurs when a user has yet to create an object. Illustrations are placed using the `media` slot to further elevate the experience and express the purpose of the object.

![Showing an empty state with a primary and secondary button along with a stand alone link](/assets/components/application-state/application-state-empty-state.png)