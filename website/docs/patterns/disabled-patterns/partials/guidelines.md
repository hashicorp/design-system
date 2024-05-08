### Permissions 

Hide navigation for pages that the user doesn’t have permission to any aspect of CRUD. Show the user what permissions they’re missing if they hit a 403 error. Hide actions that a user doesn’t have appropriate permissions for if it does not impact a flow they do have permission for

![If the role "Viewer" cannot "deploy a cluster", they should not see the action](/assets/patterns/disabled-pattern-application-state.png)

### Upgrading

Enable If the user has permission to upgrade. In some cases, it may also be worth informing to users what they could do if they did have permission, but be mindful of not annoying users or making them feel advertised to. 

### Updating

Enable if the user has permission to update

### Service outage

Enable, give a message to guide the user what to do and add link to our status page

![Example of image](/assets/components/patterns/disabled-pattern-application-state.png)

### Incomplete flow

Enable the action if a user is in the middle of a stepped process or form. If the user clicks on the action, we provide descriptive, helpful errors.

![On the cluster create form, if I haven't entered a required input, I can still click "Create cluster" after which I'm shown an error on the missing steps.](/assets/components/alert/.png)

### Quota limitation

Hide the action, but provide instructions or shortcuts to upgrading or removing used quota if necessary. Add CTA that directs to a form if possible, so the user can make a request. The HVN quota has been met and none are in regions supported by Consul.

### Feature is not ready

Task user preference to see upcoming features.
(We want to avoid inundating the user with upsells that feel disingenuous.)

 