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

import type { HdsStepperNavStepSignature } from './step';
import type { HdsStepperNavPanelSignature } from './panel';
import { HdsStepperTitleTagValues } from '../types.ts';
import type {
  HdsStepperTitleTags,
  HdsStepperNavStepIds,
  HdsStepperNavStep,
  HdsStepperNavPanelIds,
} from '../types.ts';

export interface HdsStepperNavSignature {
  Args: {
    steps?: HdsStepperNavStep[];
    currentStep?: number;
    isInteractive?: boolean;
    titleTag?: HdsStepperTitleTags;
    ariaLabel: string;
    onStepChange?: (event: MouseEvent, stepNumber: number) => void;
  };
  Blocks: {
    body?: [];
    default: [
      {
        Step?: ComponentLike<HdsStepperNavStepSignature>;
        Panel?: ComponentLike<HdsStepperNavPanelSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsStepperNav extends Component<HdsStepperNavSignature> {
  @tracked private _stepIds: HdsStepperNavStepIds = [];
  @tracked private _stepNodes: HTMLElement[] = [];
  @tracked private _panelNodes: HTMLElement[] = [];
  @tracked private _panelIds: HdsStepperNavPanelIds = [];

  private _setUpStepperNav = modifier(() => {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      if (this.isInteractive) {
        assert(
          'If @isInteractive is true, the number of Steps must be equal to the number of Panels',
          this._stepNodes.length === this._panelNodes.length
        );
      }
    });

    return () => {};
  });

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

  get isInteractive(): boolean {
    return this.args.isInteractive || false;
  }

  get titleTag(): HdsStepperTitleTags {
    return this.args.titleTag ?? HdsStepperTitleTagValues.Div;
  }

  get progressBarWidthStyle(): string {
    let progressBarWidth = 0;
    let progressBarOffset = 0;
    if (this.currentStep >= this._stepIds.length) {
      progressBarWidth = 100;
      progressBarOffset = 0;
    } else {
      const activeStepWidth = 1 / this._stepIds.length / 2;
      const width = this.currentStep / this._stepIds.length;
      progressBarWidth = (width + activeStepWidth) * 100;
      progressBarOffset = 16;
    }
    return `calc(${progressBarWidth}% - ${progressBarOffset}px)`;
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

  // Focus step for keyboard & mouse nav
  private focusStep(stepIndex: number, event: KeyboardEvent): void {
    event.preventDefault();
    const step = this._stepNodes[stepIndex];
    step?.focus();
  }

  get classNames() {
    const classes = ['hds-stepper-nav'];

    if (this.isInteractive) {
      classes.push('hds-stepper-nav--interactive');
    }

    return classes.join(' ');
  }
}
