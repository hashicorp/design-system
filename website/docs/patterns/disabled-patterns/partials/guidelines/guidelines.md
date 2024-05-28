## Permissions 

When a user does not have permissions, hide the related actions, navigation items and views.

In this example, the user's role is **viewer**, and they cannot deploy or destroy a cluster. An explanation is unnecessary as users do not require additional functionality for their day-to-day tasks.

![Image showing two dropdown with lists open, one with only one menu item that is reader specific, while the other has more options that allow for further capabilities.](/assets/patterns/disabled-patterns/permissions-example.png)

When a user lands on a page they can't access, indicate why it's unavailable and provide guidance so the user can fix the error. Consider displaying a call to action so the user doesn't feel stuck.

![Showing a 403 error page with information about what is going on, with a way to go back and a way to log in with a different token](/assets/patterns/disabled-patterns/permissions-example-3.png)

## Conditional availability

When other steps must be taken to enable a feature or function, provide context in place of that feature so users can enable this feature.

!!! Dont

In this example, the button is disabled without context, leaving the user confused and unaware of the steps to enable the feature.

![Showing an interface with a disabled button that doesn't describe why that button is disabled. This is not a recommended experience.](/assets/patterns/disabled-patterns/conditional-availability-example-disabled.png)

Disabled elements lack interactive states, preventing users from hovering, focusing, or clicking. For users with assistive technology, e.g., a screen reader, disabled elements (including their text) are almost entirely ignored.

!!!


!!! Do

Instead, we recommended replacing the disabled element with contextual guidance to help users to understand why this feature isn't available, and providing them with clear steps to enable it.

![Showing an interface with a compact alert explaining why the expected behavior isn't there with guidance.](/assets/patterns/disabled-patterns/conditional-availability-example-explanation.png)

If possible, provide CTAs directly to the place where users can take immediate action.

!!!


## Upgrading

When premium features are available and a user has the necessary permissions, highlighting a path to upgrade provides a graceful marketing opportunity.

An example of this is Figma's "create branch" function that is only available at the enterprise tier. Clicking "create a branch" in Figma opens a marketing modal that entices users to upgrade to gain access to this feature.

![Screen shot of figma's modal showing information about how to upgrade to enterprise to gain access to creating branches.](/assets/patterns/disabled-patterns/upgrade-modal-example.png)

A note: when space is limited, and the action itself is the only means of communicating a feature


## Service outage

In instances where outages may occur, provide a clear message to users on what they can do and add a link to [our status page](https://status.hashicorp.com/).

![Displaying Instagram's login page with an error below notifying the user they have no connection to instagram.](/assets/patterns/disabled-patterns/service-outage-example.png)

## Incomplete flow

In a form, always enable the submit button. When buttons are disabled, users are often left confused and frustrated because they can't move forward. Instead, show users what errors occurred so they can fix them and proceed. 

!!! Do

When a user clicks "Create cluster" but has failed to enter a value into a `required` input, an error will display, informing the user how to fix the issue.

![Image showing an input field with an error explaining what was missed.](/assets/patterns/disabled-patterns/incomplete-flow-example.png)

!!!

## Quota limitation

When a quota has been reached, hide the action allowing them to create more objects. If a user can increase the quota, replace the original action with an action that allows them to do so. If the user cannot increase the quota, e.g., they don't have permission, direct them to a form.

![Image showing a title with a button that allows a user to create a new service, with a table below it.](/assets/patterns/disabled-patterns/create-new-limitation-example.png)

Once the quota has been reached, the "Create" action is hidden, and an [`Alert`](https://helios.hashicorp.design/components/alert) is displayed, indicating why new objects can no longer be created.

![Image showing a title with an alert message below and a table below that.](/assets/patterns/disabled-patterns/create-new-limitation-reached-example.png)