/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import {
  HdsFormRadioCardControlPositionValues,
  HdsFormRadioCardAlignmentValues,
} from './radio-card/types.ts';

import type { ComponentLike } from '@glint/template';
import type { HdsIconSignature } from '../icon.ts';
import type { HdsBadgeSignature } from '../badge.ts';
import type { HdsFormRadioBaseSignature } from './radio/base.ts';
import type { HdsFormRadioCardDescriptionSignature } from './radio-card/description.ts';
import type { HdsFormRadioCardLabelSignature } from './radio-card/label.ts';
import type { HdsYieldSignature } from '../yield.ts';
import type {
  HdsFormRadioCardControlPositions,
  HdsFormRadioCardAlignments,
} from './radio-card/types.ts';

export const DEFAULT_CONTROL_POSITION =
  HdsFormRadioCardControlPositionValues.Bottom;
export const DEFAULT_ALIGNMENT = HdsFormRadioCardAlignmentValues.Left;
export const CONTROL_POSITIONS: string[] = Object.values(
  HdsFormRadioCardControlPositionValues
);
export const ALIGNMENTS: string[] = Object.values(
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
        Icon?: ComponentLike<HdsIconSignature>;
        Label?: ComponentLike<HdsFormRadioCardLabelSignature>;
        Badge?: ComponentLike<HdsBadgeSignature>;
        Description?: ComponentLike<HdsFormRadioCardDescriptionSignature>;
        Generic?: ComponentLike<HdsYieldSignature>;
      },
    ];
  };
  Element: HdsFormRadioBaseSignature['Element'];
}

export default class HdsFormRadioCard extends Component<HdsFormRadioCardSignature> {
  /**
   * Sets the position of the control
   * Accepted values: buttom, left
   *
   * @param type
   * @type {string}
   * @default 'bottom'
   */
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

  /**
   * Sets the alignment of the content
   * Accepted values: left, center
   *
   * @param alignnment
   * @type {string}
   * @default 'left'
   */
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

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
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
}
