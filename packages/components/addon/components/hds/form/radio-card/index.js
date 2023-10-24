/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { schedule } from '@ember/runloop';
import { setAriaDescribedBy } from '@hashicorp/design-system-components/utils/hds-set-aria-described-by';

export const DEFAULT_CONTROL_POSITION = 'bottom';
export const DEFAULT_ALIGNMENT = 'left';
export const CONTROL_POSITIONS = ['bottom', 'left'];
export const ALIGNMENTS = ['left', 'center'];

export default class HdsFormRadioCardIndexComponent extends Component {
  @tracked ariaDescribedBy = this.args.extraAriaDescribedBy;
  @tracked descriptors = [];

  @action
  setAriaDescribedBy() {
    // we schedule this afterRender to capture all descriptors registered onInsert
    schedule('afterRender', () => {
      setAriaDescribedBy(this);
    });
  }

  /**
   * Sets the position of the control
   * Accepted values: buttom, left
   *
   * @param type
   * @type {string}
   * @default 'bottom'
   */
  get controlPosition() {
    let { controlPosition = DEFAULT_CONTROL_POSITION } = this.args;

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
  get alignment() {
    let { alignment = DEFAULT_ALIGNMENT } = this.args;

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
  get classNames() {
    let classes = ['hds-form-radio-card'];

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
