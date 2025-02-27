/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';

import {
  HdsStepperTitleTagValues,
  HdsStepperNavStatusesValues,
  HdsStepperNavStatusToIndicatorStatus,
  HdsStepperNavStatusToSrOnlyText,
} from '../types.ts';
import type {
  HdsStepperTitleTags,
  HdsStepperNavStepIds,
  HdsStepperNavPanelIds,
  HdsStepperStatuses,
  HdsStepperNavStatuses,
} from '../types.ts';

export const MAPPING_STATUS_TO_INDICATOR_STATUS =
  HdsStepperNavStatusToIndicatorStatus;
export const MAPPING_STATUS_TO_SR_ONLY_TEXT = HdsStepperNavStatusToSrOnlyText;

export interface HdsStepperNavStepSignature {
  Args: {
    currentStep: number;
    isNavInteractive?: boolean;
    titleTag?: HdsStepperTitleTags;
    stepIds?: HdsStepperNavStepIds;
    panelIds?: HdsStepperNavPanelIds;
    didInsertNode?: (element: HTMLButtonElement, stepId: string) => void;
    willDestroyNode?: (element: HTMLButtonElement) => void;
    onStepChange?: (event: MouseEvent, nodeIndex: number) => void;
    onKeyUp?: (nodeIndex: number, event: KeyboardEvent) => void;
  };
  Blocks: {
    title: [];
    description?: [];
  };
  Element: HTMLElement;
}

export default class HdsStepperNavStep extends Component<HdsStepperNavStepSignature> {
  /**
   * Generate a unique ID for the Step
   * @return {string}
   * @param _stepId
   */
  private _stepId = 'step-' + guidFor(this);
  private _elementId?: string;

  private _setUpStep = modifier(
    (
      element: HTMLElement,
      [insertCallbackFunction, destoryCallbackFunction]
    ) => {
      if (typeof insertCallbackFunction === 'function') {
        insertCallbackFunction(element);
      }

      return () => {
        if (typeof destoryCallbackFunction === 'function') {
          destoryCallbackFunction(element);
        }
      };
    }
  );

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
   * Get the interactivity of the Nav parent
   * @param isNavInteractive
   * @type {boolean}
   * @default false
   */
  get isNavInteractive(): boolean {
    return this.args.isNavInteractive || false;
  }

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
    return (
      (this.args.stepIds
        ? this.args.stepIds.indexOf(this._stepId) + 1
        : undefined)
    );
  }

  /**
   * Get the ID of the panel coupled/associated with the step (it's used by the `aria-controls` attribute)
   * @returns string}
   */
  get coupledPanelId(): string | undefined {
    return this.nodeIndex !== undefined
      ? this.args.panelIds?.[this.nodeIndex]
      : undefined;
  }

  /**
   * Get the status that should be set on the Step::Indicator
   * @param status
   * @type {HdsStepperNavStatuses}
   * @default 'incomplete'
   */
  get status(): HdsStepperNavStatuses {
    if (this.nodeIndex != undefined) {
      if (this.nodeIndex === this.args.currentStep) {
        return HdsStepperNavStatusesValues.Active;
      } else if (this.nodeIndex < this.args.currentStep) {
        return HdsStepperNavStatusesValues.Complete;
      } else {
        return HdsStepperNavStatusesValues.Incomplete;
      }
    } else {
      return HdsStepperNavStatusesValues.Incomplete;
    }
  }

  /**
   * Get the status that should be set on the Step::Indicator
   * @param stepIndicatorStatus
   * @type {HdsStepperStatuses}
   * @default 'incomplete'
   */
  get stepIndicatorStatus(): HdsStepperStatuses {
    return MAPPING_STATUS_TO_INDICATOR_STATUS[this.status];
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
   * Get if the step should be interactive
   * @param isInteractive
   * @type {boolean}
   */
  get isInteractive(): boolean {
    return (
      this.isNavInteractive &&
      this.status === HdsStepperNavStatusesValues.Complete
    );
  }

  @action
  didInsertNode(element: HTMLButtonElement): void {
    const { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function') {
      this._elementId = element.id;
      didInsertNode(element, this._elementId);
    }
  }

  @action
  willDestroyNode(element: HTMLButtonElement): void {
    const { willDestroyNode } = this.args;

    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  }

  @action
  onStepChange(event: MouseEvent): false | undefined {
    const { onStepChange } = this.args;

    if (
      this.isInteractive &&
      this.nodeIndex !== undefined &&
      typeof onStepChange === 'function'
    ) {
      onStepChange(event, this.nodeIndex);
    } else {
      return false;
    }
  }

  @action
  onKeyUp(event: KeyboardEvent): void {
    const { onKeyUp } = this.args;

    if (
      !(this.status === HdsStepperNavStatusesValues.Incomplete) &&
      this.nodeIndex !== undefined &&
      typeof onKeyUp === 'function'
    ) {
      onKeyUp(this.nodeIndex, event);
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-stepper-nav__step'];

    classes.push(`hds-stepper-nav__step--${this.status}`);

    if (this.isInteractive) {
      classes.push('hds-stepper-nav__step--interactive');
    }

    if (this.isNavInteractive) {
      classes.push('hds-stepper-nav__step--nav-interactive');
    }

    return classes.join(' ');
  }
}
