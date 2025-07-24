import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { HdsStepperTitleTagValues, HdsStepperNavStatusesValues, HdsStepperNavStatusToIndicatorStatus, HdsStepperNavStatusToSrOnlyText } from '../types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! template-lint-disable require-context-role no-invalid-role }}\n{{! template-lint-disable require-presentational-children }}\n{{#if this.isNavInteractive}}\n  <li class={{this.classNames}} ...attributes role={{if this.isNavInteractive \"presentation\"}}>\n    <button\n      class=\"hds-stepper-nav__step-content hds-stepper-nav__step-button\"\n      id={{this._stepId}}\n      tabindex={{unless (eq this.status \"active\") \"-1\"}}\n      type=\"button\"\n      role=\"tab\"\n      aria-controls={{this.coupledPanelId}}\n      aria-selected={{if (eq this.status \"active\") \"true\" \"false\"}}\n      aria-disabled={{if (eq this.status \"incomplete\") \"true\" \"false\"}}\n      {{on \"click\" this.onStepChange}}\n      {{on \"keyup\" this.onKeyUp}}\n      {{this._setUpStep this.didInsertNode this.willDestroyNode}}\n    >\n      <div class=\"hds-stepper-nav__step-progress\">\n        <Hds::Stepper::Step::Indicator\n          @text=\"{{this.stepNumber}}\"\n          @status={{this.stepIndicatorStatus}}\n          @isInteractive={{true}}\n          class=\"hds-stepper-nav__step-indicator\"\n        />\n      </div>\n      <div class=\"hds-stepper-nav__step-text\">\n        <Hds::Text::Body class=\"hds-stepper-nav__step-title\" @tag={{this.titleTag}} @size=\"200\" @weight=\"semibold\">\n          {{yield to=\"title\"}}\n          <span class=\"sr-only\">{{this.statusSrOnlyText}}</span>\n        </Hds::Text::Body>\n        {{#if (has-block \"description\")}}\n          <Hds::Text::Body class=\"hds-stepper-nav__step-description\" @tag=\"div\" @size=\"100\" @weight=\"regular\">\n            {{yield to=\"description\"}}\n          </Hds::Text::Body>\n        {{/if}}\n      </div>\n    </button>\n  </li>\n{{else}}\n  <li\n    class={{this.classNames}}\n    ...attributes\n    role={{if this.isNavInteractive \"presentation\"}}\n    aria-current={{if (eq this.status \"active\") \"step\" \"false\"}}\n  >\n    <div\n      class=\"hds-stepper-nav__step-content\"\n      id={{this._stepId}}\n      {{this._setUpStep this.didInsertNode this.willDestroyNode}}\n    >\n      <div class=\"hds-stepper-nav__step-progress\">\n        <Hds::Stepper::Step::Indicator\n          @text=\"{{this.stepNumber}}\"\n          @status={{this.stepIndicatorStatus}}\n          @isInteractive={{false}}\n          aria-hidden=\"true\"\n          class=\"hds-stepper-nav__step-indicator\"\n        />\n      </div>\n      <div class=\"hds-stepper-nav__step-text\">\n        <Hds::Text::Body class=\"hds-stepper-nav__step-title\" @tag={{this.titleTag}} @size=\"200\" @weight=\"semibold\">\n          {{yield to=\"title\"}}\n          <span class=\"sr-only\">{{this.statusSrOnlyText}}</span>\n        </Hds::Text::Body>\n        {{#if (has-block \"description\")}}\n          <Hds::Text::Body class=\"hds-stepper-nav__step-description\" @tag=\"div\" @size=\"100\" @weight=\"regular\">\n            {{yield to=\"description\"}}\n          </Hds::Text::Body>\n        {{/if}}\n      </div>\n    </div>\n  </li>\n{{/if}}\n{{! template-lint-enable require-presentational-children }}\n{{! template-lint-enable require-context-role no-invalid-role }}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const MAPPING_STATUS_TO_INDICATOR_STATUS = HdsStepperNavStatusToIndicatorStatus;
const MAPPING_STATUS_TO_SR_ONLY_TEXT = HdsStepperNavStatusToSrOnlyText;
class HdsStepperNavStep extends Component {
  _stepId = 'step-' + guidFor(this);
  _elementId;
  _setUpStep = modifier((element, [insertCallbackFunction, destroyCallbackFunction]) => {
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
  get titleTag() {
    return this.args.titleTag ?? HdsStepperTitleTagValues.Div;
  }
  get isNavInteractive() {
    return this.args.isNavInteractive != undefined ? this.args.isNavInteractive : true;
  }
  get nodeIndex() {
    return this.args.stepIds?.indexOf(this._stepId);
  }
  get stepNumber() {
    return this.args.stepIds ? this.args.stepIds.indexOf(this._stepId) + 1 : undefined;
  }
  get coupledPanelId() {
    return this.nodeIndex !== undefined ? this.args.panelIds?.[this.nodeIndex] : undefined;
  }
  get status() {
    if (this.nodeIndex != undefined && this.nodeIndex >= 0) {
      if (this.nodeIndex === this.args.currentStep) {
        return HdsStepperNavStatusesValues.Active;
      } else if (this.nodeIndex < this.args.currentStep) {
        return HdsStepperNavStatusesValues.Complete;
      } else {
        return HdsStepperNavStatusesValues.Incomplete;
      }
    } else {
      return HdsStepperNavStatusesValues.Incomplete;
    }
  }
  get stepIndicatorStatus() {
    return MAPPING_STATUS_TO_INDICATOR_STATUS[this.status];
  }
  get statusSrOnlyText() {
    return MAPPING_STATUS_TO_SR_ONLY_TEXT[this.status];
  }
  get isInteractive() {
    return this.isNavInteractive && this.status === HdsStepperNavStatusesValues.Complete;
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
  onStepChange(event) {
    const {
      onStepChange
    } = this.args;
    if (this.isInteractive && this.nodeIndex !== undefined && typeof onStepChange === 'function') {
      onStepChange(event, this.nodeIndex);
    } else {
      return false;
    }
  }
  static {
    n(this.prototype, "onStepChange", [action]);
  }
  onKeyUp(event) {
    const {
      onKeyUp
    } = this.args;
    if (!(this.status === HdsStepperNavStatusesValues.Incomplete) && this.nodeIndex !== undefined && typeof onKeyUp === 'function') {
      onKeyUp(this.nodeIndex, event);
    }
  }
  static {
    n(this.prototype, "onKeyUp", [action]);
  }
  get classNames() {
    const classes = ['hds-stepper-nav__step'];
    classes.push(`hds-stepper-nav__step--${this.status}`);
    if (this.isInteractive) {
      classes.push('hds-stepper-nav__step--interactive');
    }
    if (this.isNavInteractive) {
      classes.push('hds-stepper-nav__step--nav-interactive');
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsStepperNavStep);

export { MAPPING_STATUS_TO_INDICATOR_STATUS, MAPPING_STATUS_TO_SR_ONLY_TEXT, HdsStepperNavStep as default };
//# sourceMappingURL=step.js.map
