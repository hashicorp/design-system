/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import style from 'ember-style-modifier';

import type { WithBoundArgs } from '@glint/template';

import {
  HdsFormRadioCardControlPositionValues,
  HdsFormRadioCardAlignmentValues,
} from './types.ts';
import HdsFormRadioBase from '../radio/base.gts';
import HdsIcon from '../../icon/index.gts';
import HdsBadge from '../../badge/index.gts';
import HdsFormRadioCardLabel from './label.gts';
import HdsFormRadioCardDescription from './description.gts';
import HdsYield from '../../yield/index.gts';

import type { HdsFormRadioBaseSignature } from '../radio/base.gts';
import type {
  HdsFormRadioCardControlPositions,
  HdsFormRadioCardAlignments,
} from './types.ts';

export const DEFAULT_CONTROL_POSITION =
  HdsFormRadioCardControlPositionValues.Bottom;
export const DEFAULT_ALIGNMENT = HdsFormRadioCardAlignmentValues.Left;
export const CONTROL_POSITIONS: HdsFormRadioCardControlPositions[] =
  Object.values(HdsFormRadioCardControlPositionValues);
export const ALIGNMENTS: HdsFormRadioCardAlignments[] = Object.values(
  HdsFormRadioCardAlignmentValues
);

export interface HdsFormRadioCardSignature {
  Args: {
    name?: string;
    value?: string;
    checked?: boolean;
    disabled?: boolean;
    controlPosition?: HdsFormRadioCardControlPositions;
    alignment?: HdsFormRadioCardAlignments;
    maxWidth?: string;
    extraAriaDescribedBy?: string;
  };
  Blocks: {
    default: [
      {
        Icon?: WithBoundArgs<typeof HdsIcon, 'size'>;
        Label?: typeof HdsFormRadioCardLabel;
        Badge?: typeof HdsBadge;
        Description?: typeof HdsFormRadioCardDescription;
        Generic?: typeof HdsYield;
      },
    ];
  };
  Element: HdsFormRadioBaseSignature['Element'];
}

export default class HdsFormRadioCard extends Component<HdsFormRadioCardSignature> {
  get controlPosition(): HdsFormRadioCardControlPositions {
    const { controlPosition = DEFAULT_CONTROL_POSITION } = this.args;

    assert(
      `@controlPosition for "Hds::Form::RadioCard" must be one of the following: ${CONTROL_POSITIONS.join(
        ', '
      )}; received: ${controlPosition}`,
      CONTROL_POSITIONS.includes(controlPosition)
    );

    return controlPosition;
  }

  get alignment(): HdsFormRadioCardAlignments {
    const { alignment = DEFAULT_ALIGNMENT } = this.args;

    assert(
      `@alignment for "Hds::Form::RadioCard" must be one of the following: ${ALIGNMENTS.join(
        ', '
      )}; received: ${alignment}`,
      ALIGNMENTS.includes(alignment)
    );

    return alignment;
  }

  get classNames(): string {
    const classes = ['hds-form-radio-card'];

    if (this.args.checked) {
      classes.push('hds-form-radio-card--checked');
    }
    if (this.args.disabled) {
      classes.push('hds-form-radio-card--disabled');
    }
    if (this.args.maxWidth) {
      classes.push('hds-form-radio-card--has-fixed-width');
    } else {
      classes.push('hds-form-radio-card--has-fluid-width');
    }

    // add a class based on the @controlPosition argument
    classes.push(`hds-form-radio-card--control-${this.controlPosition}`);

    // add a class based on the @alignment argument
    classes.push(`hds-form-radio-card--align-${this.alignment}`);

    return classes.join(' ');
  }

  <template>
    <label class={{this.classNames}} {{style maxWidth=@maxWidth}}>
      <span class="hds-form-radio-card__content">
        {{yield (hash Icon=(component HdsIcon size="24"))}}
        {{yield (hash Label=HdsFormRadioCardLabel)}}
        {{yield (hash Badge=HdsBadge)}}
        {{yield (hash Description=HdsFormRadioCardDescription)}}
        {{yield (hash Generic=HdsYield)}}
      </span>
      <span class="hds-form-radio-card__control-wrapper">
        <HdsFormRadioBase
          class="hds-form-radio-card__control"
          @value={{@value}}
          name={{@name}}
          checked={{@checked}}
          disabled={{@disabled}}
          aria-describedby={{@extraAriaDescribedBy}}
          ...attributes
        />
      </span>
    </label>
  </template>
}
