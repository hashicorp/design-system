### Permissions 

When a user does not have CRUD permissions, hide those related actions.

In this example, our user's role is **viewer** and they cannot **deploy** or **destroy** a cluster. An explanation is not needed as users understand that their account has limited permissions and that they require an additional user's help to gain these permissions (often someone with admin or similar roles).

![Image showing two dropdown with lists open, one with only one menu item that is reader specific, while the other has more options that allow for further capabilities.](/assets/patterns/disabled-patterns/permissions-example.png)

In scenarios where a user lands on a 403 error page, provide a reason why with guidance so that users understand what steps they can take to rectify the error. Having call to actions provide a path forward so that users don't feel stuck.

![Showing a 403 error page with information about what is going on, with a way to go back and a way to log in with a different token](/assets/patterns/disabled-patterns/permissions-example-3.png)

### Conditional availability

When a feature or function is conditionally available depending on other steps that must be taken, provide context in place of that action so that users are able to take those steps to enable this feature.

!!! Dont

In this example, the button is disabled and no context is provided, leaving the user confused and unaware of the steps required to enable this feature.

![Showing an interface with a disabled button that doesn't describe why that button is disabled. This is not a recommended experience.](/assets/patterns/disabled-patterns/conditional-availability-example-disabled.png)

When buttons are disabled, a user is unable to interact with it, meaning that any on hover, focus or click effects will not function.

!!!


!!! Do

Instead, it's recommended to replace the content with contextual guidance to allow users to understand why this function isn't available yet. This then provides clear steps to take to enable this feature.

![Showing an interface with a compact alert explaining why the expected behavior isn't there with guidance.](/assets/patterns/disabled-patterns/conditional-availability-example-explanation.png)

If possible, provide CTAs directly to the place where users can take immediate action.

!!!


### Upgrading

When a user has permissions to upgrade, premium features can be visible for better discoverability. This provides a graceful marketing opportunity.

An example of this is Figma's "create branch" function that is only available at the enterprise tier. Clicking "create a branch" in figma opens a marketing modal that entices users to upgrade to gain access to this feature.

![Screen shot of figma's modal showing information about how to upgrade to enterprise to gain access to creating branches.](/assets/patterns/disabled-patterns/upgrade-modal-example.png)


### Service outage

In instances where outages may occur, provide a clear message to users on what they can do and add a link to [our status page](https://status.hashicorp.com/).

An example of this is Instagram's login page. When a user has no connection to their servers, a message will appear on submit.

![Displaying Instagram's login page with an error below notifying the user they have no connection to instagram.](/assets/patterns/disabled-patterns/service-outage-example.png)

### Incomplete flow

Regardless of the progress of a form, always enable submission, even if there appear to be obvious steps missing. This allows a user to proceed in their workflow, even if it results in an error. When we disable the only way to move forward, users are often left confused and frustrated. Instead, allow users to understand what erorrs took place so that they can fix them and proceed in the form's completion.

In this example, creating a cluster has requried inputs. Clicking "create cluster" will yield errors where applicable, allowing the user to understand where the problems are to remediate them.

![Image showing an input field with an error explaining what was missed.](/assets/patterns/disabled-patterns/incomplete-flow-example.png)

### Quota limitation

When a quota limitation has been hit, hide the action and replace it with contextual guidance with a call to action to increase the quota (when possible). If the user does not have permissions to upgrade, instead guide them to communicate with the persons responsible with increasing the limitation.

In this example, there is a limit in creating a new "service." When the limit isn't reached yet, the button is present and functions as normal.

![Image showing a title with a button that allows a user to create a new service, with a table below it.](/assets/patterns/disabled-patterns/create-new-limitation-example.png)

Once the user has hit the max limitation of creating a new "service," the button is hidden, and a message is placed below indicating why they are no longer able to create a new service. 

![Image showing a title with an alert message below and a table below that.](/assets/patterns/disabled-patterns/create-new-limitation-reached-example.png)