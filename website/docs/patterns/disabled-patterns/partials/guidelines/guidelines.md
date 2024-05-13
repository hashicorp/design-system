### Permissions 

When a user does not have CRUD permissions, hide those related actions.

In this example, our user's role is **viewer** and they cannot **deploy** or **destroy** a cluster. An explanation is not needed as users understand that their account has limited permissions and that they require an additional user's help to gain these permissions (often someone with admin or similar roles).

![Image showing two dropdown with lists open, one with only one menu item that is reader specific, while the other has more options that allow for further capabilities.](/assets/patterns/disabled-patterns/permissions-example.png)

In scenarios where a user lands on a 403 error page, provide a reason why with guidance so that users understand what steps they can take to rectify the error. Having call to actions provide a path forward so that users don't feel stuck.

![Showing a 403 error page with information about what is going on, with a way to go back and a way to log in with a different token](/assets/patterns/disabled-patterns/permissions-example-3.png)

### Conditional availability

When a feature or funciton is conditionally available depending on other conditions that must be met, ensure that the user is aware of those conditions by either displaying a message in place of the call to action or the entire section.

### Upgrading

If a user has permissions to upgrade their account, show features that give a user the opportunity to learn more about these features.

In this example, our user is on the lowest paid tier, and they are an individual account with the ability to upgrade. Showing 

### Updating

Enable if the user has permission to update.

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