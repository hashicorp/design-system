## Permissions 

When a user does not have permissions, hide the related actions, navigation items, and views.

### Hide/show relevant UI

In this example, the user's role is **viewer**, and they cannot deploy or destroy a cluster. An explanation is unnecessary as users do not require additional functionality for their day-to-day tasks.

![Two open dropdown lists with number of items shown based on user permissions. The Viewer only has the option "View" and the Admin has the options "View", "Deploy", and "Delete".](/assets/patterns/disabled-patterns/permissions-example.png)

Similarly, if a user has the permissions to update, show the relevant UI allowing them to do just that.


### Provide guidance

When a user lands on a page they can't access, indicate why it's unavailable and provide guidance so the user can fix the error. Consider displaying a call to action so the user doesn't feel stuck.

![A card with the title "You are not authorized" and sub heading "Error 403". The paragraph reads "you must have service:read and node:read permissions on at least one node and an associated service to access the view. Ask your administrator if you think you should have this access". There is a link to go back and a button to log in with a different token.](/assets/patterns/disabled-patterns/permissions-example-3.png)

## Conditional availability

When other steps must be taken to enable a feature or function, provide context in place of that feature so users can enable it.

!!! Dont

In this example, the button is disabled without context, leaving the user confused and unaware of the steps to enable the feature.

![A heading "Destruction and Deletion" with the subheading "Delete this instance", the paragraph "Deleting this instance will permanently remove it from your org and history. This action cannot be undone". The "Permanently delete" button is disabled.](/assets/patterns/disabled-patterns/conditional-availability-example-disabled.png)

Disabled elements lack interactive states, preventing users from hovering, focusing, or clicking. For users with assistive technology, e.g., a screen reader, disabled elements (including their text) are almost entirely ignored.

!!!


!!! Do

Instead, we recommended replacing the disabled element with contextual guidance to help users understand why this feature isn't available, and providing them with clear steps to enable it.

![A heading "Destruction and Deletion" with an information alert that says the instance cannot be removed until the provisions are removed. There is a link to go to the page to remove the provisions.](/assets/patterns/disabled-patterns/conditional-availability-example-explanation.png)

If possible, provide CTAs directly to the place where users can take immediate action.

!!!


## Upgrading

When upgradable features are available and a user has the necessary permissions, highlighting a path to upgrade provides a graceful marketing opportunity. However, be mindful not to overdo it and make the user feel overly advertised to.

There are two ways to showcase an upgradable feature:

- Feature spotlight
- Interrupting an action

### Feature spotlight

When the page has space to showcase an upgradable feature, use it to explain how that feature can be a net positive to the user upon upgrading, and provide a CTA as a path forward.

![A "Terraform Health" feature spotlight within a larger dashboard UI. It is dismissable, has a heading "Health" with text "Automatically detect drift and custom condition failures", and a link to enable.](/assets/patterns/disabled-patterns/upgrade-inline-example.png)
<Doc::ImageCaption @text='"Terraform Health" is an upgradable feature and is contextually relevant in the workspace. The UI has space to entice the user by explaining a bit of what this service can do for them.'/>

### Interrupting an action

In this example, a user is about to perform an action and notices something new within the list of options. 

![A dropdown list, with two list items: create a static secret, and auto-rotating secret with a beta badge next to it.](/assets/patterns/disabled-patterns/upgrade-modal-example-1.png)

Enticed, they click it to use this feature, however, they are not enrolled in this tier and are interrupted by a modal explaining this feature a little more.

![A modal with the heading "Join the beta program", with subheadings "Why Secret Rotation?" and "What do we offer?". Each has a paragraph explaining the feature. There is a link to request beta access, the primary action to learn more, and a secondary button to cancel.](/assets/patterns/disabled-patterns/upgrade-modal-example-2.png)

Interrupting the action with a modal helps a user understand more without fully committing, and if more details are necessary they can be directed to an informational page.


## Service outage

In instances where outages may occur, provide a clear message to users on what they can do and add a link to [our status page](https://status.hashicorp.com/).

![A card with the title "Internal server error" and sub heading "Error 500". The paragraph reads "the server had an internal error or misconfiguration and was unable to complete your request". There is a button to retry and a link to the Hashicorp status page.](/assets/patterns/disabled-patterns/service-outage-example.png)

## Incomplete flow

In a form, always enable the submit button. When buttons are disabled, users are often left confused and frustrated because they can't move forward. Instead, show users what errors occurred so they can fix them and proceed. 

!!! Do

If a user clicks a form submit button but has failed to enter a value in a required field, display an error informing them how to fix the issue.

![A form after submission with an errored out input field with an error message explaining how to resolve the issue. The submit button is still enabled.](/assets/patterns/disabled-patterns/incomplete-flow-example.png)

!!!

Learn more about [form validation patterns](/patterns/form-patterns?tab=validation).

## Quota limitation

When the quota has not been reached, display the action that allows the user to create more objects.

![Services table with a "Create new" button.](/assets/patterns/disabled-patterns/create-new-limitation-example.png)

When the quota has been reached, hide the action allowing the user to create more objects. If they can opt to increase the quota, replace the original action with an action permitting them to do so. If the user cannot increase the quota, e.g., they don't have permission, display an [`Alert`](https://helios.hashicorp.design/components/alert) indicating why new objects can no longer be created and direct them to a way to upgrade.


![Services table with an information alert above that reads "Service limitation reached. You've used your 20 services limit on the free tier. Unlock access to more services by upgrading tiers now". "Upgrading tiers now" is a link.](/assets/patterns/disabled-patterns/create-new-limitation-reached-example.png)