/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { eq } from 'ember-truth-helpers';
import { service } from '@ember/service';

import { HdsStepperStatusesValues } from '../types.ts';
import HdsIcon from '../../icon/index.gts';
import HdsTextBody from '../../text/body.gts';

import type { HdsStepperStatuses } from '../types.ts';
import type { HdsIconSignature } from '../../icon/index.gts';
import type HdsThemingService from '../../../../services/hds-theming.ts';

export const DEFAULT_STATUS = HdsStepperStatusesValues.Incomplete;
export const STATUSES: HdsStepperStatuses[] = Object.values(
  HdsStepperStatusesValues
);

export const MAPPING_STATUSES_TO_CARBON_THEME_ICONS = {
  [HdsStepperStatusesValues.Incomplete]: 'circle',
  [HdsStepperStatusesValues.Progress]: 'circle-half',
  [HdsStepperStatusesValues.Processing]: 'loading',
  [HdsStepperStatusesValues.Complete]: 'check-circle',
} as const;

export interface HdsStepperStepIndicatorSignature {
  Args: {
    status?: HdsStepperStatuses;
    isInteractive?: boolean;
    text?: string;
  };
  Element: HTMLDivElement;
}

export default class HdsStepperStepIndicator extends Component<HdsStepperStepIndicatorSignature> {
  @service declare readonly hdsTheming: HdsThemingService;

  get status(): HdsStepperStatuses {
    const { status = DEFAULT_STATUS } = this.args;

    assert(
      `@status for "Hds::Stepper::Step::Indicator" must be one of the following: ${STATUSES.join(
        ', '
      )}; received: ${status}`,
      STATUSES.includes(status)
    );

    return status;
  }

  get isInteractive(): boolean {
    return this.args.isInteractive || false;
  }

  get carbonThemeStatusIcon(): HdsIconSignature['Args']['name'] {
    return MAPPING_STATUSES_TO_CARBON_THEME_ICONS[this.status];
  }

  get classNames(): string {
    const classes = ['hds-stepper-indicator-step'];

    // Based on the @status arg
    classes.push(`hds-stepper-indicator-step--status-${this.status}`);

    if (this.isInteractive) {
      classes.push(`hds-stepper-indicator-step--is-interactive`);
    }

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{#if this.hdsTheming.isCarbonThemeEnabled}}
        <div class="hds-stepper-indicator-step__status">
          <HdsIcon
            class="hds-stepper-indicator-step__icon"
            @name={{this.carbonThemeStatusIcon}}
            @size="16"
          />
        </div>
      {{else}}
        <div class="hds-stepper-indicator-step__svg-hexagon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="m3.664 6.264 6.99-4.42a2.5 2.5 0 0 1 2.67-.002l7.01 4.422A2.5 2.5 0 0 1 21.5 8.38v7.242a2.5 2.5 0 0 1-1.166 2.115l-7.01 4.422a2.5 2.5 0 0 1-2.67-.002l-6.99-4.42A2.5 2.5 0 0 1 2.5 15.623V8.377a2.5 2.5 0 0 1 1.164-2.113Z"
              stroke-width="1"
            ></path>
          </svg>
        </div>
        <div class="hds-stepper-indicator-step__status">
          {{#if (eq @status "processing")}}
            <HdsIcon
              class="hds-stepper-indicator-step__icon"
              @name="loading"
              @size="16"
            />
          {{else if (eq @status "complete")}}
            <HdsIcon
              class="hds-stepper-indicator-step__icon"
              @name="check"
              @size="16"
            />
          {{else}}
            <HdsTextBody
              class="hds-stepper-indicator-step__text"
              @tag="span"
              @size="100"
              @weight="medium"
            >{{@text}}</HdsTextBody>
          {{/if}}
        </div>
      {{/if}}
    </div>
  </template>
}
