/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { schedule } from '@ember/runloop';
import { hash } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';

import { HdsStepperTitleTagValues } from '../types.ts';
import HdsStepperListStep from './step.gts';

import type { HdsStepperTitleTags, HdsStepperListStepIds } from '../types.ts';

export interface HdsStepperListSignature {
  Args: {
    titleTag?: HdsStepperTitleTags;
    ariaLabel: string;
  };
  Blocks: {
    default: [
      {
        Step?: WithBoundArgs<
          typeof HdsStepperListStep,
          'titleTag' | 'stepIds' | 'didInsertNode' | 'willDestroyNode'
        >;
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

  didInsertStep = (element: HTMLElement): void => {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._stepIds = [...this._stepIds, element.id];
    });
  };

  willDestroyStep = (element: HTMLElement): void => {
    this._stepIds = this._stepIds.filter(
      (stepId): boolean => stepId !== element.id
    );
  };

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
