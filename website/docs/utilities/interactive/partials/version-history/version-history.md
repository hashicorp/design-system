## 6.0.0

Refactored the component to use the `hds-link-to-external` utility. If your application uses Ember engines, it is now necessary to add a configuration to the `app.js` file.

```js
import LinkToExternal from "ember-engines/components/link-to-external";
import { setLinkToExternal } from "@hashicorp/design-system-components/utils/hds-link-to-external";

setLinkToExternal(LinkToExternalComponent);
```


Converted component to gts format.


