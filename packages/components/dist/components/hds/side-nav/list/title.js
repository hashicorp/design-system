import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::SideNav::List::Item>\n  <div\n    class=\"hds-side-nav__list-title hds-typography-body-100 hds-font-weight-semibold\"\n    id={{this.titleId}}\n    {{did-insert this.didInsertTitle}}\n    ...attributes\n  >{{~yield~}}</div>\n</Hds::SideNav::List::Item>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsSideNavListTitle extends Component {
  /*  Generate a unique ID for each Title */
  titleId = 'title-' + guidFor(this);
  didInsertTitle(element) {
    const {
      didInsertTitle
    } = this.args;
    if (typeof didInsertTitle === 'function') {
      didInsertTitle(element.id);
    }
  }
  static {
    n(this.prototype, "didInsertTitle", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsSideNavListTitle);

export { HdsSideNavListTitle as default };
//# sourceMappingURL=title.js.map
