/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import {
  HdsStepperStatusesValues,
  HdsStepperStatusToIconsValues,
} from '../types.ts';
import type { HdsIconSignature } from '../../icon';
import type { HdsStepperStatuses } from '../types.ts';

export const DEFAULT_STATUS = HdsStepperStatusesValues.Incomplete;
export const STATUSES: HdsStepperStatuses[] = Object.values(
  HdsStepperStatusesValues
);

export const MAPPING_STATUS_TO_ICONS = HdsStepperStatusToIconsValues;

export interface HdsStepperTaskIndicatorSignature {
  Args: {
    status?: HdsStepperStatuses;
    isInteractive?: boolean;
  };
  Element: HTMLDivElement;
}

export default class HdsStepperTaskIndicator extends Component<HdsStepperTaskIndicatorSignature> {
  /**
   * @param status
   * @type {string}
   * @default "incomplete"
   */

  get status(): HdsStepperStatuses {
    const { status = DEFAULT_STATUS } = this.args;

    assert(
      `@status for "Hds::Stepper::Task::Indicator" must be one of the following: ${STATUSES.join(
        ', '
      )}; received: ${status}`,
      STATUSES.includes(status)
    );

    return status;
  }

  /**
   * @param isInteractive
   * @type {boolean}
   * @default false
   */

  get isInteractive(): boolean {
    return this.args.isInteractive || false;
  }

  /**
   * @param iconName
   * @type {string}
   */

  get iconName(): HdsIconSignature['Args']['name'] {
    return MAPPING_STATUS_TO_ICONS[this.status];
  }

  /**
   * Get the class names to apply to the component.
   * @method IndicatorTask#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-stepper-indicator-task'];

    // Based on the @status arg
    classes.push(`hds-stepper-indicator-task--status-${this.status}`);

    if (this.isInteractive) {
      classes.push(`hds-stepper-indicator-task--is-interactive`);
    }

    return classes.join(' ');
  }
}
