import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-disclosure-primitive\" ...attributes>\n  <div class=\"hds-disclosure-primitive__toggle\">\n    {{yield (hash onClickToggle=this.onClickToggle isOpen=this.isOpen) to=\"toggle\"}}\n  </div>\n  {{#if this.isOpen}}\n    <div class=\"hds-disclosure-primitive__content\">\n      {{yield (hash close=this.close) to=\"content\"}}\n    </div>\n  {{/if}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsDisclosurePrimitiveComponent extends Component {
  static {
    g(this.prototype, "isOpen", [tracked], function () {
      return this.args.isOpen ?? false;
    });
  }
  #isOpen = (i(this, "isOpen"), void 0);
  onClickToggle() {
    this.isOpen = !this.isOpen;
  }
  static {
    n(this.prototype, "onClickToggle", [action]);
  }
  close() {
    // we schedule this afterRender to avoid an error in tests caused by updating `isOpen` multiple times in the same computation
    schedule('afterRender', () => {
      this.isOpen = false;
      // we call the "onClose" callback if it exists (and is a function)
      if (this.args.onClose && typeof this.args.onClose === 'function') {
        this.args.onClose();
      }
    });
  }
  static {
    n(this.prototype, "close", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsDisclosurePrimitiveComponent);

export { HdsDisclosurePrimitiveComponent as default };
//# sourceMappingURL=index.js.map
