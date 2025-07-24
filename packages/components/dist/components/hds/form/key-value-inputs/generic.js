import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class=\"hds-form-key-value-inputs__generic-container\" {{this._onInsert}} ...attributes>\n  {{yield}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFormKeyValueInputsGeneric extends Component {
  _onInsert = modifier(() => {
    if (this.args.onInsert) {
      this.args.onInsert();
    }
    return () => {
      if (this.args.onRemove) {
        this.args.onRemove();
      }
    };
  });
}
setComponentTemplate(TEMPLATE, HdsFormKeyValueInputsGeneric);

export { HdsFormKeyValueInputsGeneric as default };
//# sourceMappingURL=generic.js.map
