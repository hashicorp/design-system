import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<li class=\"hds-breadcrumb__item hds-breadcrumb__item--is-truncation\" ...attributes>\n  <Hds::MenuPrimitive>\n    <:toggle as |t|>\n      <button\n        type=\"button\"\n        class=\"hds-breadcrumb__truncation-toggle\"\n        aria-label={{this.ariaLabel}}\n        aria-expanded={{if t.isOpen \"true\" \"false\"}}\n        {{on \"click\" t.onClickToggle}}\n      >\n        <FlightIcon @name=\"more-horizontal\" @size=\"16\" @isInlineBlock={{false}} />\n      </button>\n    </:toggle>\n    <:content>\n      <div class=\"hds-breadcrumb__truncation-content\">\n        <ol class=\"hds-breadcrumb__sublist\">\n          {{yield}}\n        </ol>\n      </div>\n    </:content>\n  </Hds::MenuPrimitive>\n</li>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsBreadcrumbTruncationComponent extends Component {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'show more'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'show more';
  }
}
setComponentTemplate(TEMPLATE, HdsBreadcrumbTruncationComponent);

export { HdsBreadcrumbTruncationComponent as default };
//# sourceMappingURL=truncation.js.map
