/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import {
  HdsStepperStatusesValues,
  HdsStepperStatusToIconsValues,
} from '../types.ts';
import HdsIcon from '../../icon/index.gts';

import type { HdsIconSignature } from '../../icon/index.gts';
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

  get isInteractive(): boolean {
    return this.args.isInteractive || false;
  }

  get iconName(): HdsIconSignature['Args']['name'] {
    return MAPPING_STATUS_TO_ICONS[this.status];
  }

  get classNames(): string {
    const classes = ['hds-stepper-indicator-task'];

    // Based on the @status arg
    classes.push(`hds-stepper-indicator-task--status-${this.status}`);

    if (this.isInteractive) {
      classes.push(`hds-stepper-indicator-task--is-interactive`);
    }

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      <HdsIcon
        class="hds-stepper-indicator-task__icon"
        @name={{this.iconName}}
        @size="16"
      />
    </div>
  </template>
}
