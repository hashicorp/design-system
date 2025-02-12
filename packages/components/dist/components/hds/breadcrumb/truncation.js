import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<li class=\"hds-breadcrumb__item hds-breadcrumb__item--is-truncation\" ...attributes>\n  <Hds::PopoverPrimitive @enableClickEvents={{true}} as |PP|>\n    <div {{PP.setupPrimitiveContainer}}>\n      <button\n        type=\"button\"\n        class=\"hds-breadcrumb__truncation-toggle\"\n        aria-label={{this.ariaLabel}}\n        aria-expanded={{if PP.isOpen \"true\" \"false\"}}\n        {{PP.setupPrimitiveToggle}}\n      >\n        <Hds::Icon @name=\"more-horizontal\" @size=\"16\" />\n      </button>\n      <div\n        class=\"hds-breadcrumb__truncation-content\"\n        {{PP.setupPrimitivePopover anchoredPositionOptions=(hash placement=\"bottom-start\" offsetOptions=4)}}\n      >\n        <ol class=\"hds-breadcrumb__sublist\">\n          {{yield}}\n        </ol>\n      </div>\n    </div>\n  </Hds::PopoverPrimitive>\n</li>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsBreadcrumbTruncation extends Component {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'show more'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'show more';
  }
}
setComponentTemplate(TEMPLATE, HdsBreadcrumbTruncation);

export { HdsBreadcrumbTruncation as default };
//# sourceMappingURL=truncation.js.map
