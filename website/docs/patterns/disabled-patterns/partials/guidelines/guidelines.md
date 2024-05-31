## Permissions 

When a user does not have permissions, hide the related actions, navigation items, and views.

### Hide/show relevant UI

In this example, the user's role is **viewer**, and they cannot deploy or destroy a cluster. An explanation is unnecessary as users do not require additional functionality for their day-to-day tasks.

![Image showing two open dropdown lists with number of items shown based on user permissions, one with only one menu item, while the other has more options that allow for further capabilities.](/assets/patterns/disabled-patterns/permissions-example.png)

Similarly, if a user has the permissions to update, show the relevant UI allowing them to do just that.


### Provide guidance

When a user lands on a page they can't access, indicate why it's unavailable and provide guidance so the user can fix the error. Consider displaying a call to action so the user doesn't feel stuck.

![Showing a 403 error page with information about what is going on, with a way to go back and a way to log in with a different token](/assets/patterns/disabled-patterns/permissions-example-3.png)

## Conditional availability

When other steps must be taken to enable a feature or function, provide context in place of that feature so users can enable it.

!!! Dont

In this example, the button is disabled without context, leaving the user confused and unaware of the steps to enable the feature.

![Showing an interface with a disabled button that doesn't describe why that button is disabled. This is not a recommended experience.](/assets/patterns/disabled-patterns/conditional-availability-example-disabled.png)

Disabled elements lack interactive states, preventing users from hovering, focusing, or clicking. For users with assistive technology, e.g., a screen reader, disabled elements (including their text) are almost entirely ignored.

!!!


!!! Do

Instead, we recommended replacing the disabled element with contextual guidance to help users understand why this feature isn't available, and providing them with clear steps to enable it.

![Showing an interface with a compact alert explaining why the expected behavior isn't there with guidance.](/assets/patterns/disabled-patterns/conditional-availability-example-explanation.png)

If possible, provide CTAs directly to the place where users can take immediate action.

!!!


## Upgrading

When upgradable features are available and a user has the necessary permissions, highlighting a path to upgrade provides a graceful marketing opportunity. However, be mindful not to overdo it and make the user feel overly advertised to.

There are two ways to showcase an upgradable feature:

- Space to explain
- Interrupting an action

### Space to explain

In this example, "Terraform Health" is a an upgradable feature and is contextually relevant in the workspace. The UI has space to entice the user by explaining a bit of what this service can do for them.

![Screen shot of Terraform workspace highlighting Terraform Health on the side bar below information.](/assets/patterns/disabled-patterns/upgrade-inline-example.png)

### Interrupting an action

In this example, a user is about to perform an action and notices something new within the list of options, one with a "Beta" badge. 

![Showing an open dropdown list, with two list items. One for creating a static secret, and another using an auto-rotating secret with a beta badge next to it.](/assets/patterns/disabled-patterns/upgrade-modal-example-1.png)

Enticed, they click it to use this feature, however, they are not enrolled in this tier and are interrupted by a modal explaining this feature a little more.

![A modal explaining beta to the user, with a CTA to learn more, or close the modal.](/assets/patterns/disabled-patterns/upgrade-modal-example-2.png)

Interrupting the action with a modal helps a user understand more without fully committing, and if more details are necessary they can be directed to an informational page.


## Service outage

In instances where outages may occur, provide a clear message to users on what they can do and add a link to [our status page](https://status.hashicorp.com/).

![Displaying Hashicorp's 500 internal error, providing a retry button and a link to the the status page.](/assets/patterns/disabled-patterns/service-outage-example.png)

## Incomplete flow

In a form, always enable the submit button. When buttons are disabled, users are often left confused and frustrated because they can't move forward. Instead, show users what errors occurred so they can fix them and proceed. 

!!! Do

When a user clicks "Create cluster" but has failed to enter a value into a `required` input, an error will display, informing the user how to fix the issue.

![Image showing an input field with an error explaining what was missed in a form context.](/assets/patterns/disabled-patterns/incomplete-flow-example.png)

!!!

Learn more about [form validation patterns](/patterns/form-patterns?tab=validation).

## Quota limitation

When the quota has been reached, hide the action allowing the user to create more objects. If they can opt to increase the quota, replace the original action with an action permitting them to do so. If the user cannot increase the quota, e.g., they don't have permission, direct them to a form.

![Image showing a table of services with a button allowing the user to create a new service.](/assets/patterns/disabled-patterns/create-new-limitation-example.png)

Once the quota has been reached, the "Create" action is hidden, and an [`Alert`](https://helios.hashicorp.design/components/alert) is displayed, indicating why new objects can no longer be created.

![Image showing a table of services with an alert message explaining that the services limitation has been reached and providing them with an upgrade link.](/assets/patterns/disabled-patterns/create-new-limitation-reached-example.png)