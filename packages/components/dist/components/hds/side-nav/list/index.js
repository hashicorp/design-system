import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<nav class=\"hds-side-nav__list-wrapper\" aria-labelledby=\"hds-side-nav-header\" ...attributes>\n  {{yield (hash ExtraBefore=(component \"hds/yield\"))}}\n  <ul class=\"hds-side-nav__list\" role=\"list\" aria-labelledby={{this.titleIds}}>\n    {{yield\n      (hash\n        Item=(component \"hds/side-nav/list/item\")\n        BackLink=(component \"hds/side-nav/list/back-link\")\n        Title=(component \"hds/side-nav/list/title\" didInsertTitle=this.didInsertTitle)\n        Link=(component \"hds/side-nav/list/link\")\n      )\n    }}\n  </ul>\n  {{yield (hash ExtraAfter=(component \"hds/yield\"))}}\n</nav>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsSideNavList extends Component {
  static {
    g(this.prototype, "_titleIds", [tracked], function () {
      return [];
    });
  }
  #_titleIds = (i(this, "_titleIds"), void 0);
  get titleIds() {
    return this._titleIds.join(' ');
  }
  didInsertTitle(titleId) {
    this._titleIds = [...this._titleIds, titleId];
  }
  static {
    n(this.prototype, "didInsertTitle", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsSideNavList);

export { HdsSideNavList as default };
//# sourceMappingURL=index.js.map
