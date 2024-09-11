## Usage

### When to use

- To display contextual information resulting from a user’s action.
- To communicate a background process that has either started or ended, e.g., “Creating cluster”.

### When not to use

- To display contextual associative errors (e.g. form validation), or promotional content, consider [Alert](/components/alert).
- As a dialog to confirm an action, consider [Modal](/components/modal).

## Color

![A list different types of toasts, starting from neutral all the way to critical](/assets/components/toast/toast-colors.png)

Use color logically:

- **Neutral**: provide general information to the user about an ongoing process.
- **Highlight**: used interchangeably with `neutral` when more prominence is needed. Use sparingly.
- **Success**: indicate a successful action was completed.
- **Warning**: indicate a successful action was completed but may have triggered a related issue. Provide guidance and actions if possible.
- **Critical**: indicate error or critical issues resulting from a failed action.

### Critical toasts

!!! Do

Use the Toast to provide non-intrusive feedback to users about the failure of an ongoing task or request. For example, a failure while deleting a cluster.

![A toast showing a module error](/assets/components/toast/toast-do-non-intrusive-notification.png)

!!!

!!! Do

Use the Toast to communicate error messages that are not caused by the user. For example, an unsuccessful Vault cluster creation due to a failure while validating the deployment.

![A toast showing a vault cluster update failure](/assets/components/toast/toast-do-system-notifications.png)

!!!

!!! Dont

Don't use toasts for intrusive message communication about errors or critical disruptions at an application, page, or section level. Use the [Alert](/components/alert) instead.

![A toast with an intrusive message](/assets/components/toast/toast-dont-intrusive-message.png)

!!!

!!! Dont

Don't use toasts to communicate validation errors. Use the [Alert](/components/alert) instead.

![A toast with a form validation error message](/assets/components/toast/toast-dont-validation-messages.png)

!!!

## Icons

All Toasts have icons by default that are intentionally tied to the Toast color.

Icons within `neutral` and `highlight` Toasts can be replaced with other icons. Change them only when the new icon provides the user with extra value; otherwise, use the default icon provided.

![Two toasts, one neutral with a non-standard icon and one success with a standard icon.](/assets/components/toast/toast-icon-neutral-and-success.png)

## Size

Toasts can be sized between 360px and 500px wide. Anything wider than 500px will take up too much of the screen space.

## Placement

Toasts should appear in the bottom right corner of the viewport with a margin of 32px from the bottom and 24px from the right side of the viewport. Because of the placement of Toasts, any page-specific feedback to the user should be directly associated with the UI element. 

![Toast placement example](/assets/components/toast/toast-placement.png =600x*)

### Displaying multiple Toasts

When displaying multiple Toasts, they should stack vertically with a 16px margin between each Toast. For consistency, each stacked Toast should be the same width.

![Multiple toast examples stacked](/assets/components/toast/toast-placement-multiple.png =600x*)

## When to persist or time-out

A Toast can either persist (until dismissed) or automatically dismiss (time-out) after seven seconds. If a Toast contains actions or critical information (often associated with warning or critical toasts, but not limited to), it is recommended to persist until the user dismisses it, otherwise, it should time-out after 7 seconds.

### Time-out best practices

When a Toast is set to time-out, the content within should be no longer than 5 words (e.g. “Cluster created”). It is recommended that the neutral, highlight or success colors be used for time-out experiences, ensuring that the criticality is at a minimum, and that users are not missing important information that requires their immediate attention.