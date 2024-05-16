import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<nav class=\"hds-side-nav__list-wrapper\" ...attributes>\n  {{yield (hash ExtraBefore=(component \"hds/yield\"))}}\n  <ul class=\"hds-side-nav__list\" role=\"list\">\n    {{yield\n      (hash\n        Item=(component \"hds/side-nav/list/item\")\n        BackLink=(component \"hds/side-nav/list/back-link\")\n        Title=(component \"hds/side-nav/list/title\")\n        Link=(component \"hds/side-nav/list/link\")\n      )\n    }}\n  </ul>\n  {{yield (hash ExtraAfter=(component \"hds/yield\"))}}\n</nav>");

var index = setComponentTemplate(TEMPLATE, templateOnly());

export { index as default };
//# sourceMappingURL=index.js.map
