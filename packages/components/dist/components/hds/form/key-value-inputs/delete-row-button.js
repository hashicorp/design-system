import Component from '@glimmer/component';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<span class=\"hds-form-key-value-inputs__delete-row-button-container\" {{this._onInsert}}>\n  <Hds::Button\n    @text={{this.text}}\n    @size=\"medium\"\n    @color=\"secondary\"\n    @icon=\"trash\"\n    @isIconOnly={{true}}\n    class=\"hds-form-key-value-inputs__delete-row-button\"\n    {{on \"click\" this.onClick}}\n    ...attributes\n  />\n</span>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
class HdsFormKeyValueInputsDeleteRowButton extends Component {
  _onInsert = modifier(() => {
    if (this.args.onInsert) {
      this.args.onInsert();
    }
    return () => {
      if (this.args.onRemove) {
        this.args.onRemove();
      }
      const {
        returnFocusTo
      } = this.args;
      if (returnFocusTo && returnFocusTo.isConnected) {
        returnFocusTo.focus();
      }
    };
  });
  get text() {
    return this.args.text ?? `Delete row ${this.args.rowIndex + 1}`;
  }
  onClick() {
    const {
      onClick
    } = this.args;
    if (typeof onClick === 'function') {
      onClick(this.args.rowData, this.args.rowIndex);
    }
  }
  static {
    n(this.prototype, "onClick", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsFormKeyValueInputsDeleteRowButton);

export { HdsFormKeyValueInputsDeleteRowButton as default };
//# sourceMappingURL=delete-row-button.js.map
