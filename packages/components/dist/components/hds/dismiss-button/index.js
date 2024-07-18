import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<button class=\"hds-dismiss-button\" type=\"button\" aria-label={{this.ariaLabel}} ...attributes>\n  <FlightIcon @name=\"x\" @size=\"16\" @isInlineBlock={{false}} />\n</button>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsDismissButtonComponent extends Component {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Dismiss'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'Dismiss';
  }
}
setComponentTemplate(TEMPLATE, HdsDismissButtonComponent);

export { HdsDismissButtonComponent as default };
//# sourceMappingURL=index.js.map
