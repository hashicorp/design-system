import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsStepperStatusesValues, HdsStepperStatusToIconsValues } from '../types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class={{this.classNames}} ...attributes>\n  <FlightIcon class=\"hds-stepper-indicator-task__icon\" @name={{this.iconName}} @size=\"16\" />\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_STATUS = HdsStepperStatusesValues.Incomplete;
const STATUSES = Object.values(HdsStepperStatusesValues);
const MAPPING_STATUS_TO_ICONS = HdsStepperStatusToIconsValues;
class HdsStepperTaskIndicatorComponent extends Component {
  /**
   * @param status
   * @type {string}
   * @default "incomplete"
   */

  get status() {
    const {
      status = DEFAULT_STATUS
    } = this.args;
    assert(`@status for "Hds::Stepper::Task::Indicator" must be one of the following: ${STATUSES.join(', ')}; received: ${status}`, STATUSES.includes(status));
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
   * @param iconName
   * @type {string}
   */

  get iconName() {
    return MAPPING_STATUS_TO_ICONS[this.status];
  }

  /**
   * Get the class names to apply to the component.
   * @method IndicatorTask#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-stepper-indicator-task'];

    // Based on the @status arg
    classes.push(`hds-stepper-indicator-task--status-${this.status}`);
    if (this.isInteractive) {
      classes.push(`hds-stepper-indicator-task--is-interactive`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsStepperTaskIndicatorComponent);

export { DEFAULT_STATUS, MAPPING_STATUS_TO_ICONS, STATUSES, HdsStepperTaskIndicatorComponent as default };
//# sourceMappingURL=indicator.js.map
