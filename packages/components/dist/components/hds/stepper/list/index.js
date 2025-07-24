import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { HdsStepperTitleTagValues } from '../types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<ol class=\"hds-stepper-list\" aria-label={{@ariaLabel}} ...attributes>\n  {{yield\n    (hash\n      Step=(component\n        \"hds/stepper/list/step\"\n        titleTag=this.titleTag\n        stepIds=this._stepIds\n        didInsertNode=this.didInsertStep\n        willDestroyNode=this.willDestroyStep\n      )\n    )\n  }}\n</ol>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsStepperList extends Component {
  static {
    g(this.prototype, "_stepIds", [tracked], function () {
      return [];
    });
  }
  #_stepIds = (i(this, "_stepIds"), void 0);
  get titleTag() {
    return this.args.titleTag ?? HdsStepperTitleTagValues.Div;
  }
  didInsertStep(element) {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', () => {
      this._stepIds = [...this._stepIds, element.id];
    });
  }
  static {
    n(this.prototype, "didInsertStep", [action]);
  }
  willDestroyStep(element) {
    this._stepIds = this._stepIds.filter(stepId => stepId !== element.id);
  }
  static {
    n(this.prototype, "willDestroyStep", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsStepperList);

export { HdsStepperList as default };
//# sourceMappingURL=index.js.map
