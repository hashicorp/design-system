import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class=\"hds-app-footer__copyright\" ...attributes>\n  <Hds::Icon @name=\"hashicorp\" />\n  <Hds::Text::Body @tag=\"span\" @size=\"100\">© {{this.year}} HashiCorp</Hds::Text::Body>\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAppFooterCopyright extends Component {
  /**
   * @param year
   * @type {string}
   * @description The copyright year
   * @default The current year (calculated via `Date()`)
   */
  get year() {
    return this.args.year ?? new Date().getFullYear();
  }
}
setComponentTemplate(TEMPLATE, HdsAppFooterCopyright);

export { HdsAppFooterCopyright as default };
//# sourceMappingURL=copyright.js.map
