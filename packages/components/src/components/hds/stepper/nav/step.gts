/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';
import { eq } from 'ember-truth-helpers';
import { on } from '@ember/modifier';

import {
  HdsStepperNavStatusesValues,
  HdsStepperNavStatusToIndicatorStatus,
  HdsStepperNavStatusToSrOnlyText,
  HdsStepperTitleTagValues,
} from '../types.ts';
import HdsStepperStepIndicator from '../step/indicator.gts';
import HdsTextBody from '../../text/body.gts';

import type {
  HdsStepperNavPanelIds,
  HdsStepperNavStatuses,
  HdsStepperNavStepIds,
  HdsStepperStatuses,
  HdsStepperTitleTags,
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
    didInsertNode?: () => void;
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
  private _stepId = 'step-' + guidFor(this);
  private _elementId?: string;

  private _setUpStep = modifier(
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

  get titleTag(): HdsStepperTitleTags {
    return this.args.titleTag ?? HdsStepperTitleTagValues.Div;
  }

  get isNavInteractive(): boolean {
    return this.args.isNavInteractive != undefined
      ? this.args.isNavInteractive
      : true;
  }

  get nodeIndex(): number | undefined {
    return this.args.stepIds?.indexOf(this._stepId);
  }

  get stepNumber(): number | undefined {
    return this.args.stepIds
      ? this.args.stepIds.indexOf(this._stepId) + 1
      : undefined;
  }

  get coupledPanelId(): string | undefined {
    return this.nodeIndex !== undefined
      ? this.args.panelIds?.[this.nodeIndex]
      : undefined;
  }

  get status(): HdsStepperNavStatuses {
    if (this.nodeIndex != undefined && this.nodeIndex >= 0) {
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

  get stepIndicatorStatus(): HdsStepperStatuses {
    return MAPPING_STATUS_TO_INDICATOR_STATUS[this.status];
  }

  get statusSrOnlyText(): string {
    return MAPPING_STATUS_TO_SR_ONLY_TEXT[this.status];
  }

  get isInteractive(): boolean {
    return (
      this.isNavInteractive &&
      this.status === HdsStepperNavStatusesValues.Complete
    );
  }

  didInsertNode = (element: HTMLButtonElement): void => {
    const { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function') {
      this._elementId = element.id;
      didInsertNode();
    }
  };

  willDestroyNode = (element: HTMLButtonElement): void => {
    const { willDestroyNode } = this.args;

    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  };

  onStepChange = (event: MouseEvent): false | undefined => {
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
  };

  onKeyUp = (event: KeyboardEvent): void => {
    const { onKeyUp } = this.args;

    if (
      !(this.status === HdsStepperNavStatusesValues.Incomplete) &&
      this.nodeIndex !== undefined &&
      typeof onKeyUp === 'function'
    ) {
      onKeyUp(this.nodeIndex, event);
    }
  };

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

  <template>
    {{! template-lint-disable require-context-role no-invalid-role }}
    {{! template-lint-disable require-presentational-children }}
    {{#if this.isNavInteractive}}
      <li
        class={{this.classNames}}
        ...attributes
        role={{if this.isNavInteractive "presentation"}}
      >
        <button
          class="hds-stepper-nav__step-content hds-stepper-nav__step-button"
          id={{this._stepId}}
          tabindex={{unless (eq this.status "active") "-1"}}
          type="button"
          role="tab"
          aria-controls={{this.coupledPanelId}}
          aria-selected={{if (eq this.status "active") "true" "false"}}
          aria-disabled={{if (eq this.status "incomplete") "true" "false"}}
          {{on "click" this.onStepChange}}
          {{on "keyup" this.onKeyUp}}
          {{this._setUpStep this.didInsertNode this.willDestroyNode}}
        >
          <div class="hds-stepper-nav__step-progress">
            <HdsStepperStepIndicator
              @text="{{this.stepNumber}}"
              @status={{this.stepIndicatorStatus}}
              @isInteractive={{true}}
              class="hds-stepper-nav__step-indicator"
            />
          </div>
          <div class="hds-stepper-nav__step-text">
            <HdsTextBody
              class="hds-stepper-nav__step-title"
              @tag={{this.titleTag}}
              @size="200"
              @weight="semibold"
            >
              {{yield to="title"}}
              <span class="sr-only">{{this.statusSrOnlyText}}</span>
            </HdsTextBody>
            {{#if (has-block "description")}}
              <HdsTextBody
                class="hds-stepper-nav__step-description"
                @tag="div"
                @size="100"
                @weight="regular"
              >
                {{yield to="description"}}
              </HdsTextBody>
            {{/if}}
          </div>
        </button>
      </li>
    {{else}}
      <li
        class={{this.classNames}}
        ...attributes
        role={{if this.isNavInteractive "presentation"}}
        aria-current={{if (eq this.status "active") "step" "false"}}
      >
        <div
          class="hds-stepper-nav__step-content"
          id={{this._stepId}}
          {{this._setUpStep this.didInsertNode this.willDestroyNode}}
        >
          <div class="hds-stepper-nav__step-progress">
            <HdsStepperStepIndicator
              @text="{{this.stepNumber}}"
              @status={{this.stepIndicatorStatus}}
              @isInteractive={{false}}
              aria-hidden="true"
              class="hds-stepper-nav__step-indicator"
            />
          </div>
          <div class="hds-stepper-nav__step-text">
            <HdsTextBody
              class="hds-stepper-nav__step-title"
              @tag={{this.titleTag}}
              @size="200"
              @weight="semibold"
            >
              {{yield to="title"}}
              <span class="sr-only">{{this.statusSrOnlyText}}</span>
            </HdsTextBody>
            {{#if (has-block "description")}}
              <HdsTextBody
                class="hds-stepper-nav__step-description"
                @tag="div"
                @size="100"
                @weight="regular"
              >
                {{yield to="description"}}
              </HdsTextBody>
            {{/if}}
          </div>
        </div>
      </li>
    {{/if}}
    {{! template-lint-enable require-presentational-children }}
    {{! template-lint-enable require-context-role no-invalid-role }}
  </template>
}
