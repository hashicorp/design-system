## Usage

### When to use

- To communicate a background process that has either started or ended, e.g., “Creating cluster”.
- To allow a user to quickly revert a destructive action.

### When not to use

- To display contextual associative errors (e.g., form validation) or promotional content, consider [Alert](/components/alert).
- As a dialog to confirm an action, consider [Modal](/components/modal).

## Color

Use color logically:

- **Neutral**: provide general information to the user about an ongoing process.
- **Highlight**: use interchangeably with `neutral` when more prominence is needed. Use sparingly.
- **Success**: indicate a successful action was completed.
- **Warning**: indicate a successful action was completed but may have triggered a related issue. Provide guidance and actions if possible.
- **Critical**: indicate an error or critical issues resulting from a failed action.

![The color argument changes the background and title color: neutral is grey, highlight is purple, success is green, warning is orange, critical is red.](/assets/components/toast/toast-colors.png)

### Critical toasts

Critical Toasts often persist (until dismissed) as they hold important information that requires the user's attention. Read more about [when a toast should persist or timeout](#when-to-persist-or-timeout).

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

![A toast showing the user has exceeded their applies limit.](/assets/components/toast/toast-dont-intrusive-message.png)

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

Toasts can be sized between 360px and 500px wide. Anything wider than 500px is considered disruptive to the user experience and may cover important information on the page.

## Placement

Toasts appear in the bottom right corner of the viewport with a margin of 32px from the bottom and 24px from the right side of the viewport. If a warning or error is contextual to a specific UI feature, such as a form, directly associate an Alert to that feature instead of using a Toast.

![](/assets/components/toast/toast-placement.png =600x*)

### Displaying multiple Toasts

When displaying multiple Toasts, they should stack vertically with a 16px margin between each Toast. For consistency, each stacked Toast should be the same width.

![](/assets/components/toast/toast-placement-multiple.png =600x*)

## When to persist or timeout

A Toast can either persist until the user dismisses it or be automatically dismissed via a timeout. 

If a Toast contains actions or critical information (often associated with a warning or critical toast), it should persist until the user dismisses it. Keep in mind that when a Toast persists, it will remain visible across all pages until dismissed.

![Showing a critical Toast with a cluster failure message with a button that says retry and a link that says view cluster](/assets/components/toast/toast-persist-critical-retry.png)

### Timeout best practices

When a Toast is set to timeout, it should auto dismiss after seven seconds. Content within Toasts that time out should be as concise as possible with only a few words, e.g., “Cluster created,” to allow enough time for a user to notice and read the contents before it auto dismisses. 

<video width="100%" controls loop>
  <source
    src="/assets/components/toast/toast-video-auto-dismiss.mp4"
    type="video/mp4"
  />
</video>

We recommend setting a timeout for neutral, highlight, or success Toasts only. This ensures that critical information or information that requires immediate attention is not missed.