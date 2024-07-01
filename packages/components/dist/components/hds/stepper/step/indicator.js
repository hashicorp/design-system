import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsStepperStatusesValues } from '../types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class={{this.classNames}} ...attributes>\n  <div class=\"hds-stepper-indicator-step__svg-hexagon\">\n    <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n      <path\n        d=\"m3.664 6.264 6.99-4.42a2.5 2.5 0 0 1 2.67-.002l7.01 4.422A2.5 2.5 0 0 1 21.5 8.38v7.242a2.5 2.5 0 0 1-1.166 2.115l-7.01 4.422a2.5 2.5 0 0 1-2.67-.002l-6.99-4.42A2.5 2.5 0 0 1 2.5 15.623V8.377a2.5 2.5 0 0 1 1.164-2.113Z\"\n        stroke-width=\"1\"\n      ></path>\n    </svg>\n  </div>\n  <div class=\"hds-stepper-indicator-step__status\">\n    {{#if (eq @status \"processing\")}}\n      <FlightIcon class=\"hds-stepper-indicator-step__icon\" @name=\"loading\" @size=\"16\" />\n    {{else if (eq @status \"complete\")}}\n      <FlightIcon class=\"hds-stepper-indicator-step__icon\" @name=\"check\" @size=\"16\" />\n    {{else}}\n      <Hds::Text::Body\n        class=\"hds-stepper-indicator-step__text\"\n        @tag=\"span\"\n        @size=\"100\"\n        @weight=\"medium\"\n      >{{@text}}</Hds::Text::Body>\n    {{/if}}\n  </div>\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_STATUS = HdsStepperStatusesValues.Incomplete;
const STATUSES = Object.values(HdsStepperStatusesValues);
class HdsStepperStepIndicatorComponent extends Component {
  /**
   * @param status
   * @type {string}
   * @default "incomplete"
   */

  get status() {
    const {
      status = DEFAULT_STATUS
    } = this.args;
    assert(`@status for "Hds::Stepper::Step::Indicator" must be one of the following: ${STATUSES.join(', ')}; received: ${status}`, STATUSES.includes(status));
    return status;
  }

  /**
   * @param isInteractive
   * @type {boolean}
   * @default false
   */

  get isInteractive() {
    return this.args.isInteractive || false;
  }

  /**
   * Get the class names to apply to the component.
   * @method IndicatorStep#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-stepper-indicator-step'];

    // Based on the @status arg
    classes.push(`hds-stepper-indicator-step--status-${this.status}`);
    if (this.isInteractive) {
      classes.push(`hds-stepper-indicator-step--is-interactive`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsStepperStepIndicatorComponent);

export { DEFAULT_STATUS, STATUSES, HdsStepperStepIndicatorComponent as default };
//# sourceMappingURL=indicator.js.map
