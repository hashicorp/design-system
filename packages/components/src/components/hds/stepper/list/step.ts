/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

import {
  HdsStepperStatusesValues,
  HdsStepperTitleTagValues,
} from '../types.ts';
import {
  type HdsStepperStatuses,
  type HdsStepperTitleTags,
  type HdsStepperListStepIds,
  HdsStepperStatusToSrOnlyText,
} from '../types.ts';

export const DEFAULT_STATUS = HdsStepperStatusesValues.Incomplete;
export const STATUSES: string[] = Object.values(HdsStepperStatusesValues);
export const MAPPING_STATUS_TO_SR_ONLY_TEXT = HdsStepperStatusToSrOnlyText;

export interface HdsStepperListStepSignature {
  Args: {
    status: HdsStepperStatusesValues;
    currentStep: number;
    stepNumber?: number;
    titleTag?: HdsStepperTitleTags;
    stepIds: HdsStepperListStepIds;
    didInsertNode?: (element: HTMLElement) => void;
  };
  Blocks: {
    title: [];
    description?: [];
    content?: [];
  };
  Element: HTMLElement;
}

export default class HdsStepperListStep extends Component<HdsStepperListStepSignature> {
  /**
   * Generate a unique ID for the Step
   * @return {string}
   * @param _stepId
   */
  private _stepId = 'step-' + guidFor(this);

  /**
   * Get the index of the step from the _stepIds list
   * @param nodeIndex
   * @type {number}
   */
  get nodeIndex(): number | undefined {
    return this.args.stepIds?.indexOf(this._stepId);
  }

  /**
   * Get the step number that should be displayed
   * @param stepNumber
   * @type {number}
   */
  get stepNumber(): number | undefined {
    return this.args.stepNumber ?? this.args.stepIds?.indexOf(this._stepId) + 1;
  }

  /**
   * @param status
   * @type {HdsStepperStatuses}
   * @default "incomplete"
   */
  get status(): HdsStepperStatuses {
    const { status = DEFAULT_STATUS } = this.args;

    assert(
      `@status for "Hds::Stepper::Step::Indicator" must be one of the following: ${STATUSES.join(
        ', '
      )}; received: ${status}`,
      STATUSES.includes(status)
    );

    return status;
  }

  /**
   * Get the screen reader only text that should be added based on the step status
   * @param statusSrOnlyText
   * @type {string}
   * @default ''
   */
  get statusSrOnlyText(): string {
    return MAPPING_STATUS_TO_SR_ONLY_TEXT[this.status];
  }

  /**
   * Get the DOM tag that should be used for the title
   * @param titleTag
   * @type {HdsStepperTitleTags}
   * @default 'div'
   */
  get titleTag(): HdsStepperTitleTags {
    return this.args.titleTag ?? HdsStepperTitleTagValues.Div;
  }

  @action
  didInsertNode(element: HTMLElement): void {
    const { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function' && this._stepId != undefined) {
      didInsertNode(element);
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-stepper-list__step'];

    return classes.join(' ');
  }
}
