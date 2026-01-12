---
"@hashicorp/design-system-components": major
---

Removed `ember-engines` as a peer dependency. If your application uses Ember engines, it is now necessary to add a configuration to the `app.js` file.

```js
import { setLinkToExternal } from '@hashicorp/design-system-components/utils/hds-link-to-external';

setLinkToExternal(LinkToExternalComponent);
```
