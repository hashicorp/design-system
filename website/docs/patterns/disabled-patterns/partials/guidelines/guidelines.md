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

When buttons are disabled, a user is unable to interact with it, meaning that any on hover, focus or click effects will not be usable.

!!!


!!! Do

Instead, it's recommended to replace the content with contextual guidance to allow users to understand why this function isn't available yet. This then provides clear steps to take to enable this feature.

![Showing an interface with a compact alert explaining why the expected behavior isn't there with guidance.](/assets/patterns/disabled-patterns/conditional-availability-example-explanation.png)

!!!


### Upgrading

When a user has permissions to upgrade, premium features can be visible for better discoverability. This gives us an opportunity to market these features to the user in a graceful way.

A great example of this is Figma's "create branch" function that is only available on enterprise users. Having permissions to upgrade, clicking "create a branch" in figma opens a marketing modal that entices me to upgrade to gain access to this feature.

![Screen shot of figma's modal showing information about how to upgrade to enterprise to gain access to creating branches](/assets/patterns/disabled-patterns/upgrade-modal-example.png)


### Service outage

Enable, give a message to guide the user what to do and add link to [our status page](https://status.hashicorp.com/)

![Non-tabular data set](/assets/patterns/disabled-patterns/service-outage-example.png)

### Incomplete flow

Enable the action if a user is in the middle of a stepped process or form. If the user clicks on the action, we provide descriptive, helpful errors.

On the cluster create form, if I haven't entered a required input, I can still click "Create cluster" after which I'm shown an error on the missing steps.

![Non-tabular data set](/assets/patterns/disabled-patterns/incomplete-flow-example.png)

### Quota limitation

Hide the action, but provide instructions or shortcuts to upgrading or removing used quota if necessary. Add a CTA that directs to a form if possible, so the user can make a request. 

The HVN quota has been met and none are in regions supported by Consul.

### Feature is not ready

Task user preference to see upcoming features.
(We want to avoid inundating the user with up sells that feel disingenuous.)