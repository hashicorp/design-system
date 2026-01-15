---
"@hashicorp/design-system-components": minor
---

<!-- START components/breadcrumb -->
`Breadcrumb` - Added `@href` argument to `Breadcrumb::Item`.
<!-- END -->

<!-- START utilities/interactive -->
`Interactive` - Refactored the component to use the `hds-link-to-external` utility. If your application uses Ember engines, it is now necessary to add a configuration to the `app.js` file.

```js
import LinkToExternal from 'ember-engines/components/link-to-external';
import { setLinkToExternal } from '@hashicorp/design-system-components/utils/hds-link-to-external';

setLinkToExternal(LinkToExternalComponent);
```
<!-- END -->
