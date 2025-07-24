import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class=\"hds-form__section-multi-field-group-item\" {{style this.widthStyle}} ...attributes>{{yield}}</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFormSectionMultiFieldGroupItem extends Component {
  get widthStyle() {
    const widthStyle = {};
    if (this.args.width) {
      widthStyle['--hds-form-section-multi-field-group-item-width'] = this.args.width;
    }
    return widthStyle;
  }
}
setComponentTemplate(TEMPLATE, HdsFormSectionMultiFieldGroupItem);

export { HdsFormSectionMultiFieldGroupItem as default };
//# sourceMappingURL=item.js.map
