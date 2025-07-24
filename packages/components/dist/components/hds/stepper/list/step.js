import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';
import { HdsStepperStatusesValues, HdsStepperStatusToSrOnlyText, HdsStepperTitleTagValues } from '../types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<li class={{this.classNames}} ...attributes id={{this._stepId}} {{this._setUpStep @didInsertNode @willDestroyNode}}>\n  <div class=\"hds-stepper-list__step-progress\">\n    <Hds::Stepper::Step::Indicator\n      @text=\"{{this.stepNumber}}\"\n      @status={{this.status}}\n      @isInteractive={{false}}\n      class=\"hds-stepper-list__step-indicator\"\n    />\n  </div>\n  <div class=\"hds-stepper-list__step-text\">\n    <Hds::Text::Body\n      class=\"hds-stepper-list__step-title\"\n      @tag={{this.titleTag}}\n      @size=\"200\"\n      @weight=\"semibold\"\n      @color=\"strong\"\n    >\n      {{yield to=\"title\"}}\n      <span class=\"sr-only\">{{this.statusSrOnlyText}}</span>\n    </Hds::Text::Body>\n    {{#if (has-block \"description\")}}\n      <Hds::Text::Body\n        class=\"hds-stepper-list__step-description\"\n        @tag=\"div\"\n        @size=\"100\"\n        @weight=\"regular\"\n        @color=\"primary\"\n      >\n        {{yield to=\"description\"}}\n      </Hds::Text::Body>\n    {{/if}}\n    {{#if (has-block \"content\")}}\n      <div class=\"hds-stepper-list__step-content\">\n        {{yield to=\"content\"}}\n      </div>\n    {{/if}}\n  </div>\n</li>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_STATUS = HdsStepperStatusesValues.Incomplete;
const STATUSES = Object.values(HdsStepperStatusesValues);
const MAPPING_STATUS_TO_SR_ONLY_TEXT = HdsStepperStatusToSrOnlyText;
class HdsStepperListStep extends Component {
  _stepId = 'step-' + guidFor(this);
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
  get stepNumber() {
    return this.args.stepIds ? this.args.stepIds.indexOf(this._stepId) + 1 : undefined;
  }
  get status() {
    const {
      status = DEFAULT_STATUS
    } = this.args;
    assert(`@status for "Hds::Stepper::List::Step" must be one of the following: ${STATUSES.join(', ')}; received: ${status}`, STATUSES.includes(status));
    return status;
  }
  get statusSrOnlyText() {
    return MAPPING_STATUS_TO_SR_ONLY_TEXT[this.status];
  }
  get titleTag() {
    return this.args.titleTag ?? HdsStepperTitleTagValues.Div;
  }
  get classNames() {
    const classes = ['hds-stepper-list__step'];
    classes.push(`hds-stepper-list__step--${this.status}`);
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsStepperListStep);

export { DEFAULT_STATUS, MAPPING_STATUS_TO_SR_ONLY_TEXT, STATUSES, HdsStepperListStep as default };
//# sourceMappingURL=step.js.map
