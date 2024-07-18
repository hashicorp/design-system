import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text::Body class=\"hds-pagination-info\" @tag=\"div\" @size=\"100\" @weight=\"medium\" ...attributes>\n  {{@itemsRangeStart}}–{{@itemsRangeEnd}}\n  {{#if this.showTotalItems}}\n    of\n    {{@totalItems}}\n  {{/if}}\n</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsPaginationInfoComponent extends Component {
  /**
   * @param showTotalItems
   * @type {boolean}
   * @description Controls the visibility of the total items
   */
  get showTotalItems() {
    return this.args.showTotalItems ?? true;
  }
}
setComponentTemplate(TEMPLATE, HdsPaginationInfoComponent);

export { HdsPaginationInfoComponent as default };
//# sourceMappingURL=index.js.map
