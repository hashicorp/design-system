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
}
