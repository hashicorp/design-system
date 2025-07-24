import Component from '@glimmer/component';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Button\n  @text={{this.text}}\n  @size=\"medium\"\n  @color=\"secondary\"\n  @icon=\"plus\"\n  @iconPosition=\"leading\"\n  class=\"hds-form-key-value-inputs__add-row-button\"\n  aria-description=\"Adds a new row of one or more inputs at the end of the form field. Press shift tab to move focus back to the newly added row.\"\n  {{on \"click\" this.onClick}}\n  ...attributes\n/>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
class HdsFormKeyValueInputsAddRowButton extends Component {
  get text() {
    return this.args.text ?? 'Add row';
  }
  onClick() {
    const {
      onClick
    } = this.args;
    if (typeof onClick === 'function') {
      onClick();
    }
  }
  static {
    n(this.prototype, "onClick", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsFormKeyValueInputsAddRowButton);

export { HdsFormKeyValueInputsAddRowButton as default };
//# sourceMappingURL=add-row-button.js.map
