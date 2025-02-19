/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

import {
  HdsStepperStatusesValues,
  HdsStepperTitleTagValues,
} from '../types.ts';
import type {
  HdsStepperTitleTags,
  HdsStepperNavigationStepIds,
  HdsStepperStatuses,
} from '../types.ts';

export const DEFAULT_STATUS = HdsStepperStatusesValues.Incomplete;
export const STATUSES: string[] = Object.values(HdsStepperStatusesValues);

export interface HdsStepperNavigationStepSignature {
  Args: {
    currentStep: number;
    stepNumber?: number;
    isInteractive?: boolean;
    isComplete?: boolean;
    titleTag?: HdsStepperTitleTags;
    stepIds: HdsStepperNavigationStepIds;
    didInsertNode?: (element: HTMLElement) => void;
    onStepChange?: (event: MouseEvent, nodeIndex: number) => void;
    onKeyUp?: (nodeIndex: number, event: KeyboardEvent) => void;
  };
  Blocks: {
    title: [];
    description?: [];
  };
  Element: HTMLElement;
}

export default class HdsStepperNavigationStep extends Component<HdsStepperNavigationStepSignature> {
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
   * Get the status that should be set on the Step::Indicator
   * @param status
   * @type {HdsStepperStatuses}
   * @default 'incomplete'
   */
  get status(): HdsStepperStatuses {
    if (this.isActive) {
      return HdsStepperStatusesValues.Progress;
    } else if (this.isComplete) {
      return HdsStepperStatusesValues.Complete;
    } else {
      return HdsStepperStatusesValues.Incomplete;
    }
  }

  /**
   * Get the screen reader only text that should be added based on the step status
   * @param statusSrOnlyText
   * @type {string}
   * @default ''
   */
  get statusSrOnlyText(): string {
    if (this.isActive) {
      return 'Current: ';
    } else if (this.isComplete) {
      return 'Complete: ';
    } else {
      return '';
    }
  }

  /**
   * Check if the step number matches the currentStep value
   * @param isActive
   * @type {boolean}
   */
  get isActive(): boolean {
    return (
      this.nodeIndex !== undefined && this.nodeIndex === this.args.currentStep
    );
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

  /**
   * @param isInteractive
   * @type {boolean}
   * @default false
   */
  get isInteractive(): boolean {
    return this.args.isInteractive || false;
  }

  /**
   * @param isComplete
   * @type {boolean}
   * @default false
   */
  get isComplete(): boolean {
    return this.args.isComplete || false;
  }

  @action
  didInsertNode(element: HTMLElement): void {
    const { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function' && this._stepId != undefined) {
      didInsertNode(element);
    }
  }

  @action
  onStepChange(event: MouseEvent): false | undefined {
    const { onStepChange } = this.args;

    if (typeof onStepChange === 'function' && this.nodeIndex !== undefined) {
      onStepChange(event, this.nodeIndex);
    } else {
      return false;
    }
  }

  @action
  onKeyUp(event: KeyboardEvent): void {
    const { onKeyUp } = this.args;

    if (typeof onKeyUp === 'function' && this.nodeIndex !== undefined) {
      onKeyUp(this.nodeIndex, event);
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-stepper-navigation__step'];

    if (this.isActive) {
      classes.push('hds-stepper-navigation__step-active');
    } else if (this.isComplete) {
      classes.push('hds-stepper-navigation__step-complete');
    } else {
      classes.push('hds-stepper-navigation__step-incomplete');
    }

    if (this.isInteractive) {
      classes.push('hds-stepper-navigation__step-interactive');
    }

    return classes.join(' ');
  }
}
