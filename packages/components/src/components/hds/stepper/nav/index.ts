/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { assert } from '@ember/debug';
import { modifier } from 'ember-modifier';
import type { WithBoundArgs } from '@glint/template';
import { HdsStepperTitleTagValues } from '../types.ts';
import type {
  HdsStepperTitleTags,
  HdsStepperNavStepIds,
  HdsStepperNavStep,
  HdsStepperNavPanelIds,
} from '../types.ts';
import HdsStepperNavStepComponent from './step.ts';
import HdsStepperNavPanelComponent from './panel.ts';

const STEP_ELEMENT_SELECTOR = '.hds-stepper-nav__step-content';
const PANEL_ELEMENT_SELECTOR = '.hds-stepper-nav__panel';

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
        Step?: WithBoundArgs<
          typeof HdsStepperNavStepComponent,
          | 'currentStep'
          | 'isNavInteractive'
          | 'titleTag'
          | 'stepIds'
          | 'panelIds'
          | 'didInsertNode'
          | 'willDestroyNode'
          | 'onStepChange'
          | 'onKeyUp'
        >;
        Panel?: WithBoundArgs<
          typeof HdsStepperNavPanelComponent,
          | 'currentStep'
          | 'isNavInteractive'
          | 'stepIds'
          | 'panelIds'
          | 'didInsertNode'
          | 'willDestroyNode'
        >;
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

  private _element!: HTMLDivElement;

  private _setUpStepperNav = modifier((element: HTMLDivElement) => {
    if (this.isInteractive) {
      assert(
        'If @isInteractive is true, the number of Steps must be equal to the number of Panels',
        this._stepNodes.length === this._panelNodes.length
      );
    }

    this._element = element;

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
    return this.args.isInteractive != undefined
      ? this.args.isInteractive
      : true;
  }

  get titleTag(): HdsStepperTitleTags {
    return this.args.titleTag ?? HdsStepperTitleTagValues.Div;
  }

  get inlineStyles(): Record<string, unknown> {
    const inlineStyles: {
      '--hds-stepper-nav-progress-bar-width'?: string;
    } = {};

    inlineStyles['--hds-stepper-nav-progress-bar-width'] =
      this.progressBarWidthStyle;

    return inlineStyles;
  }

  get progressBarWidthStyle(): string {
    let progressBarWidth = 0;
    let progressBarOffset = 0;
    if (this._stepIds.length != 0) {
      if (this.currentStep >= this._stepIds.length) {
        progressBarWidth = 100;
        progressBarOffset = 0;
      } else {
        const activeStepWidth = 1 / this._stepIds.length / 2;
        const width = this.currentStep / this._stepIds.length;
        progressBarWidth = (width + activeStepWidth) * 100;
        progressBarOffset = 16;
      }
    }
    return `calc(${progressBarWidth}% - ${progressBarOffset}px)`;
  }

  @action
  didInsertStep(): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this.updateSteps();
    });
  }

  @action
  willDestroyStep(element: HTMLElement): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._stepNodes = this._stepNodes.filter(
        (node): boolean => node.id !== element.id
      );
      this._stepIds = this._stepIds.filter(
        (stepId): boolean => stepId !== element.id
      );
    });
  }

  @action
  didInsertPanel(): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this.updatePanels();
    });
  }

  @action
  willDestroyPanel(element: HTMLElement): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._panelNodes = this._panelNodes.filter(
        (node): boolean => node.id !== element.id
      );
      this._panelIds = this._panelIds.filter(
        (panelId): boolean => panelId !== element.id
      );
    });
  }

  @action
  onKeyUp(currentStepIndex: number, event: KeyboardEvent): void {
    const leftArrow = 'ArrowLeft';
    const rightArrow = 'ArrowRight';

    if (event.key === rightArrow) {
      const nextStepIndex = this.findNextInteractiveStepIndex(
        currentStepIndex,
        1
      );
      this.focusStep(nextStepIndex, event);
    } else if (event.key === leftArrow) {
      const prevStepIndex = this.findNextInteractiveStepIndex(
        currentStepIndex,
        this._stepIds.length - 1
      );
      this.focusStep(prevStepIndex, event);
    }
  }

  // Update the step arrays based on how they are ordered in the DOM
  private updateSteps(): void {
    const steps = this._element.querySelectorAll(STEP_ELEMENT_SELECTOR);
    let newStepIds: HdsStepperNavStepIds = [];
    let newStepNodes: HTMLElement[] = [];
    steps.forEach((step) => {
      newStepIds = [...newStepIds, step.id];
      newStepNodes = [...newStepNodes, step as HTMLElement];
    });
    this._stepIds = newStepIds;
    this._stepNodes = newStepNodes;
  }

  // Update the panel arrays based on how they are ordered in the DOM
  private updatePanels(): void {
    const panels = this._element.querySelectorAll(PANEL_ELEMENT_SELECTOR);
    let newPanelIds: HdsStepperNavPanelIds = [];
    let newPanelNodes: HTMLElement[] = [];
    panels.forEach((panel) => {
      newPanelIds = [...newPanelIds, panel.id];
      newPanelNodes = [...newPanelNodes, panel as HTMLElement];
    });
    this._panelIds = newPanelIds;
    this._panelNodes = newPanelNodes;
  }

  // Find the next interactive step to focus based on keyboard input
  private findNextInteractiveStepIndex(
    currentStepIndex: number,
    increment: number
  ): number {
    let newStepIndex = (currentStepIndex + increment) % this._stepIds.length;
    while (newStepIndex > this.currentStep) {
      newStepIndex = (newStepIndex + increment) % this._stepIds.length;
    }
    return newStepIndex;
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
