import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-dialog-primitive__footer {{@contextualClass}}\" ...attributes>\n  {{yield (hash close=this.onDismiss)}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const NOOP = () => {};
class HdsDialogPrimitiveFooter extends Component {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onDismiss() {
    const {
      onDismiss
    } = this.args;

    // notice: this is to make sure the function is always defined when consumers add `{{on 'click' F.close}}` to a button in the DialogFooter.
    // in reality it's always used inside the main components as a yielded component, so the onDismiss handler is always defined
    if (typeof onDismiss === 'function') {
      return onDismiss;
    } else {
      return NOOP;
    }
  }
}
setComponentTemplate(TEMPLATE, HdsDialogPrimitiveFooter);

export { HdsDialogPrimitiveFooter as default };
//# sourceMappingURL=footer.js.map
