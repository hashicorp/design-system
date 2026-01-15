---
"@hashicorp/design-system-components": major
---

Removed `ember-engines` as a peer dependency, and added the `hds-link-to-external` utility. If your application uses Ember engines, it is now necessary to add a configuration to the `app.js` file.

```js
import LinkToExternal from 'ember-engines/components/link-to-external';
import { setLinkToExternal } from '@hashicorp/design-system-components/utils/hds-link-to-external';

setLinkToExternal(LinkToExternalComponent);
```
