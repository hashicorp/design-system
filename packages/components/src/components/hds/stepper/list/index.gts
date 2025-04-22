/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { hash } from '@ember/helper';

import HdsStepperListStep from './step.gts';
import { HdsStepperTitleTagValues } from '../types.ts';

import type { ComponentLike } from '@glint/template';
import type { HdsStepperListStepSignature } from './step.gts';
import type { HdsStepperTitleTags, HdsStepperListStepIds } from '../types.ts';

export interface HdsStepperListSignature {
  Args: {
    titleTag?: HdsStepperTitleTags;
    ariaLabel: string;
  };
  Blocks: {
    default: [
      {
        Step?: ComponentLike<HdsStepperListStepSignature>;
      },
    ];
  };
  Element: HTMLElement;
}

export default class HdsStepperList extends Component<HdsStepperListSignature> {
  @tracked private _stepIds: HdsStepperListStepIds = [];

  get titleTag(): HdsStepperTitleTags {
    return this.args.titleTag ?? HdsStepperTitleTagValues.Div;
  }

  @action
  didInsertStep(element: HTMLElement): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._stepIds = [...this._stepIds, element.id];
    });
  }

  @action
  willDestroyStep(element: HTMLElement): void {
    this._stepIds = this._stepIds.filter(
      (stepId): boolean => stepId !== element.id
    );
  }

  <template>
    <ol class="hds-stepper-list" aria-label={{@ariaLabel}} ...attributes>
      {{yield
        (hash
          Step=(component
            HdsStepperListStep
            titleTag=this.titleTag
            stepIds=this._stepIds
            didInsertNode=this.didInsertStep
            willDestroyNode=this.willDestroyStep
          )
        )
      }}
    </ol>
  </template>
}
