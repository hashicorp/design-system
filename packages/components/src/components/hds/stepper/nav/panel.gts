/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';
import { not } from 'ember-truth-helpers';

import type { HdsStepperNavStepIds, HdsStepperNavPanelIds } from '../types.ts';

export interface HdsStepperNavPanelSignature {
  Args: {
    currentStep: number;
    isNavInteractive?: boolean;
    stepIds?: HdsStepperNavStepIds;
    panelIds?: HdsStepperNavPanelIds;
    didInsertNode?: () => void;
    willDestroyNode?: (element: HTMLElement) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class HdsStepperNavPanel extends Component<HdsStepperNavPanelSignature> {
  private _panelId = 'panel-' + guidFor(this);
  private _elementId?: string;

  private _setUpPanel = modifier(
    (
      element: HTMLElement,
      [insertCallbackFunction, destroyCallbackFunction]
    ) => {
      if (typeof insertCallbackFunction === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        insertCallbackFunction(element);
      }

      return () => {
        if (typeof destroyCallbackFunction === 'function') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          destroyCallbackFunction(element);
        }
      };
    }
  );

  get isNavInteractive(): boolean {
    return this.args.isNavInteractive != undefined
      ? this.args.isNavInteractive
      : true;
  }

  get nodeIndex(): number | undefined {
    return this.args.panelIds?.indexOf(this._panelId);
  }

  get coupledStepId(): string | undefined {
    return this.nodeIndex !== undefined
      ? this.args.stepIds?.[this.nodeIndex]
      : undefined;
  }

  get isVisible(): boolean {
    return this.nodeIndex === this.args.currentStep;
  }

  didInsertNode = (element: HTMLElement): void => {
    const { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function') {
      this._elementId = element.id;
      didInsertNode();
    }
  };

  willDestroyNode = (element: HTMLElement): void => {
    const { willDestroyNode } = this.args;

    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  };

  <template>
    <section
      class="hds-stepper-nav__panel"
      ...attributes
      role={{if this.isNavInteractive "tabpanel"}}
      id={{this._panelId}}
      hidden={{not this.isVisible}}
      aria-labelledby={{this.coupledStepId}}
      {{this._setUpPanel this.didInsertNode this.willDestroyNode}}
    >
      {{#if this.isVisible}}
        {{yield}}
      {{/if}}
    </section>
  </template>
}
