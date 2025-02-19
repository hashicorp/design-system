/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import type { ComponentLike } from '@glint/template';
import type { HdsStepperNavigationStepSignature } from './step';

import { HdsStepperTitleTagValues } from '../types.ts';
import type {
  HdsStepperTitleTags,
  HdsStepperNavigationStepIds,
  HdsStepperNavigationStep,
} from '../types.ts';

export interface HdsStepperNavigationSignature {
  Args: {
    steps?: HdsStepperNavigationStep[];
    currentStep?: number;
    titleTag?: HdsStepperTitleTags;
    onStepChange?: (event: MouseEvent, stepNumber: number) => void;
  };
  Blocks: {
    steps?: [
      {
        Step?: ComponentLike<HdsStepperNavigationStepSignature>;
      },
    ];
    body?: [];
  };
  Element: HTMLElement;
}

export default class HdsStepperNavigation extends Component<HdsStepperNavigationSignature> {
  @tracked private _stepIds: HdsStepperNavigationStepIds = [];
  @tracked private _stepNodes: HTMLElement[] = [];

  /**
   * @param titleTag
   * @type {HdsStepperTitleTags}
   * @default 'div'
   */
  get titleTag(): HdsStepperTitleTags {
    return this.args.titleTag ?? HdsStepperTitleTagValues.Div;
  }

  /**
   * @param currentStep
   * @type {number}
   * @default 0
   */
  get currentStep(): number {
    const { currentStep } = this.args;

    if (currentStep) {
      if (currentStep < 0) {
        return 0;
      } else {
        return currentStep;
      }
    } else {
      return 0;
    }
  }

  @action
  didInsertStep(element: HTMLElement): void {
    this._stepIds = [...this._stepIds, element.id];
    this._stepNodes = [...this._stepNodes, element];
  }

  @action
  onKeyUp(currentStepIndex: number, event: KeyboardEvent): void {
    const leftArrow = 'ArrowLeft';
    const rightArrow = 'ArrowRight';

    if (event.key === rightArrow) {
      const nextStepIndex = this.findNextInteracticeStepIndex(
        currentStepIndex,
        1
      );
      this.focusStep(nextStepIndex, event);
    } else if (event.key === leftArrow) {
      const prevStepIndex = this.findNextInteracticeStepIndex(
        currentStepIndex,
        this._stepIds.length - 1
      );
      this.focusStep(prevStepIndex, event);
    }
  }

  // Find the next interactive step to focus based on keyboard input
  private findNextInteracticeStepIndex(
    currentStepIndex: number,
    increment: number
  ): number {
    let newStepIndex = (currentStepIndex + increment) % this._stepIds.length;
    let isNewStepInteractive = this._stepNodes[
      newStepIndex
    ]?.classList.contains('hds-stepper-navigation__step__btn');
    while (!isNewStepInteractive) {
      newStepIndex = (newStepIndex + increment) % this._stepIds.length;
      isNewStepInteractive = this._stepNodes[newStepIndex]?.classList.contains(
        'hds-stepper-navigation__step__btn'
      );
    }
    return newStepIndex;
  }

  // Focus step for keyboard & mouse navigation
  private focusStep(stepIndex: number, event: KeyboardEvent): void {
    event.preventDefault();
    const step = this._stepNodes[stepIndex];
    step?.focus();
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-stepper-navigation'];

    return classes.join(' ');
  }
}
