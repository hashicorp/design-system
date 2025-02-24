/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';

import type {
  HdsStepperNavigationStepIds,
  HdsStepperNavigationPanelIds,
} from '../types.ts';

export interface HdsStepperNavigationPanelSignature {
  Args: {
    currentStep: number;
    stepIds?: HdsStepperNavigationStepIds;
    panelIds?: HdsStepperNavigationPanelIds;
    didInsertNode?: (element: HTMLElement, panelId: string) => void;
    willDestroyNode?: (element: HTMLElement) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class HdsStepperNavigationPanel extends Component<HdsStepperNavigationPanelSignature> {
  /**
   * Generate a unique ID for the Step
   * @return {string}
   * @param _panelId
   */
  private _panelId = 'panel-' + guidFor(this);
  private _elementId?: string;

  private _setUpPanel = modifier(
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
   * Get the index of the step from the _panelIds list
   * @param nodeIndex
   * @type {number}
   */
  get nodeIndex(): number | undefined {
    return this.args.panelIds?.indexOf(this._panelId);
  }

  /**
   * Get the ID of the panel coupled/associated with the step (it's used by the `aria-controls` attribute)
   * @returns string}
   */
  get coupledStepId(): string | undefined {
    return this.nodeIndex !== undefined
      ? this.args.stepIds?.[this.nodeIndex]
      : undefined;
  }

  /**
   * Check the condition if the panel is visible (because the coupled/associated step is active) or not
   * @returns {boolean}
   */
  get isVisible(): boolean {
    return this.nodeIndex === this.args.currentStep;
  }

  @action
  didInsertNode(element: HTMLElement): void {
    const { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function') {
      this._elementId = element.id;
      didInsertNode(element, this._elementId);
    }
  }

  @action
  willDestroyNode(element: HTMLElement): void {
    const { willDestroyNode } = this.args;

    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-stepper-navigation__panel'];

    return classes.join(' ');
  }
}
