/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';

import {
  HdsStepperStatusesValues,
  HdsStepperStatusToSrOnlyText,
  HdsStepperTitleTagValues,
} from '../types.ts';
import HdsTextBody from '../../text/body.gts';
import HdsStepperStepIndicator from '../step/indicator.gts';

import type {
  HdsStepperListStepIds,
  HdsStepperStatuses,
  HdsStepperTitleTags,
} from '../types.ts';

export const DEFAULT_STATUS = HdsStepperStatusesValues.Incomplete;
export const STATUSES: HdsStepperStatuses[] = Object.values(
  HdsStepperStatusesValues
);
export const MAPPING_STATUS_TO_SR_ONLY_TEXT = HdsStepperStatusToSrOnlyText;

export interface HdsStepperListStepSignature {
  Args: {
    status?: HdsStepperStatuses;
    titleTag?: HdsStepperTitleTags;
    stepIds?: HdsStepperListStepIds;
    didInsertNode?: (element: HTMLElement) => void;
    willDestroyNode?: (element: HTMLElement) => void;
  };
  Blocks: {
    title: [];
    description?: [];
    content?: [];
  };
  Element: HTMLElement;
}

export default class HdsStepperListStep extends Component<HdsStepperListStepSignature> {
  private _stepId = 'step-' + guidFor(this);

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

  get stepNumber(): number | undefined {
    return this.args.stepIds
      ? this.args.stepIds.indexOf(this._stepId) + 1
      : undefined;
  }

  get status(): HdsStepperStatuses {
    const { status = DEFAULT_STATUS } = this.args;

    assert(
      `@status for "Hds::Stepper::List::Step" must be one of the following: ${STATUSES.join(
        ', '
      )}; received: ${status}`,
      STATUSES.includes(status)
    );

    return status;
  }

  get statusSrOnlyText(): string {
    return MAPPING_STATUS_TO_SR_ONLY_TEXT[this.status];
  }

  get titleTag(): HdsStepperTitleTags {
    return this.args.titleTag ?? HdsStepperTitleTagValues.Div;
  }

  get classNames(): string {
    const classes = ['hds-stepper-list__step'];

    classes.push(`hds-stepper-list__step--${this.status}`);

    return classes.join(' ');
  }

  <template>
    <li
      class={{this.classNames}}
      ...attributes
      id={{this._stepId}}
      {{this._setUpStep @didInsertNode @willDestroyNode}}
    >
      <div class="hds-stepper-list__step-progress">
        <HdsStepperStepIndicator
          @text="{{this.stepNumber}}"
          @status={{this.status}}
          @isInteractive={{false}}
          class="hds-stepper-list__step-indicator"
        />
      </div>
      <div class="hds-stepper-list__step-text">
        <HdsTextBody
          class="hds-stepper-list__step-title"
          @tag={{this.titleTag}}
          @size="200"
          @weight="semibold"
          @color="strong"
        >
          {{yield to="title"}}
          <span class="sr-only">{{this.statusSrOnlyText}}</span>
        </HdsTextBody>
        {{#if (has-block "description")}}
          <HdsTextBody
            class="hds-stepper-list__step-description"
            @tag="div"
            @size="100"
            @weight="regular"
            @color="primary"
          >
            {{yield to="description"}}
          </HdsTextBody>
        {{/if}}
        {{#if (has-block "content")}}
          <div class="hds-stepper-list__step-content">
            {{yield to="content"}}
          </div>
        {{/if}}
      </div>
    </li>
  </template>
}
