/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { assert } from '@ember/debug';
import { modifier } from 'ember-modifier';
import type { ComponentLike } from '@glint/template';

import type { HdsStepperNavigationStepSignature } from './step';
import type { HdsStepperNavigationPanelSignature } from './panel';
import { HdsStepperTitleTagValues } from '../types.ts';
import type {
  HdsStepperTitleTags,
  HdsStepperNavigationStepIds,
  HdsStepperNavigationStep,
  HdsStepperNavigationPanelIds,
} from '../types.ts';

export interface HdsStepperNavigationSignature {
  Args: {
    steps?: HdsStepperNavigationStep[];
    currentStep?: number;
    isInteractive?: boolean;
    titleTag?: HdsStepperTitleTags;
    onStepChange?: (event: MouseEvent, stepNumber: number) => void;
  };
  Blocks: {
    body?: [];
    default: [
      {
        Step?: ComponentLike<HdsStepperNavigationStepSignature>;
        Panel?: ComponentLike<HdsStepperNavigationPanelSignature>;
      },
    ];
  };
  Element: HTMLElement;
}

export default class HdsStepperNavigation extends Component<HdsStepperNavigationSignature> {
  @tracked private _stepIds: HdsStepperNavigationStepIds = [];
  @tracked private _stepNodes: HTMLElement[] = [];
  @tracked private _panelNodes: HTMLElement[] = [];
  @tracked private _panelIds: HdsStepperNavigationPanelIds = [];

  private _setUpStepperNavigation = modifier(() => {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      assert(
        'The number of Steps must be equal to the number of Panels',
        this._stepNodes.length === this._panelNodes.length
      );
    });

    return () => {};
  });

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

  /**
   * @param isInteractive
   * @type {boolean}
   * @default false
   */
  get isInteractive(): boolean {
    return this.args.isInteractive || false;
  }

  /**
   * @param titleTag
   * @type {HdsStepperTitleTags}
   * @default 'div'
   */
  get titleTag(): HdsStepperTitleTags {
    return this.args.titleTag ?? HdsStepperTitleTagValues.Div;
  }

  @action
  didInsertStep(element: HTMLElement, stepId: string): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._stepIds = [...this._stepIds, stepId];
      this._stepNodes = [...this._stepNodes, element];
    });
  }

  @action
  willDestroyStep(element: HTMLElement): void {
    this._stepNodes = this._stepNodes.filter(
      (node): boolean => node.id !== element.id
    );
    this._stepIds = this._stepIds.filter(
      (stepId): boolean => stepId !== element.id
    );
  }

  @action
  didInsertPanel(element: HTMLElement, panelId: string): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._panelIds = [...this._panelIds, panelId];
      this._panelNodes = [...this._panelNodes, element];
    });
  }

  @action
  willDestroyPanel(element: HTMLElement): void {
    this._panelNodes = this._panelNodes.filter(
      (node): boolean => node.id !== element.id
    );
    this._panelIds = this._panelIds.filter(
      (panelId): boolean => panelId !== element.id
    );
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
    let isNewStepInteractive = this.isStepInteractive(
      this._stepNodes[newStepIndex]!
    );
    while (!isNewStepInteractive) {
      newStepIndex = (newStepIndex + increment) % this._stepIds.length;
      isNewStepInteractive = this.isStepInteractive(
        this._stepNodes[newStepIndex]!
      );
    }
    return newStepIndex;
  }

  private isStepInteractive(el: HTMLElement): boolean {
    return !(el.getAttribute('aria-disabled') === 'true');
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
