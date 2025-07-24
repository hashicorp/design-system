import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<section\n  class=\"hds-stepper-nav__panel\"\n  ...attributes\n  role={{if this.isNavInteractive \"tabpanel\"}}\n  id={{this._panelId}}\n  hidden={{not this.isVisible}}\n  aria-labelledby={{this.coupledStepId}}\n  {{this._setUpPanel this.didInsertNode this.willDestroyNode}}\n>\n  {{#if this.isVisible}}\n    {{yield}}\n  {{/if}}\n</section>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsStepperNavPanel extends Component {
  _panelId = 'panel-' + guidFor(this);
  _elementId;
  _setUpPanel = modifier((element, [insertCallbackFunction, destroyCallbackFunction]) => {
    if (typeof insertCallbackFunction === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      insertCallbackFunction(element);
    }
    return () => {
      if (typeof destroyCallbackFunction === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        destroyCallbackFunction(element);
      }
    };
  });
  get isNavInteractive() {
    return this.args.isNavInteractive != undefined ? this.args.isNavInteractive : true;
  }
  get nodeIndex() {
    return this.args.panelIds?.indexOf(this._panelId);
  }
  get coupledStepId() {
    return this.nodeIndex !== undefined ? this.args.stepIds?.[this.nodeIndex] : undefined;
  }
  get isVisible() {
    return this.nodeIndex === this.args.currentStep;
  }
  didInsertNode(element) {
    const {
      didInsertNode
    } = this.args;
    if (typeof didInsertNode === 'function') {
      this._elementId = element.id;
      didInsertNode();
    }
  }
  static {
    n(this.prototype, "didInsertNode", [action]);
  }
  willDestroyNode(element) {
    const {
      willDestroyNode
    } = this.args;
    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  }
  static {
    n(this.prototype, "willDestroyNode", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsStepperNavPanel);

export { HdsStepperNavPanel as default };
//# sourceMappingURL=panel.js.map
