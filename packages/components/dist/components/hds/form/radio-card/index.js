import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsFormRadioCardControlPositionValues, HdsFormRadioCardAlignmentValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<label class={{this.classNames}} {{style maxWidth=@maxWidth}}>\n  <span class=\"hds-form-radio-card__content\">\n    {{yield (hash Icon=(component \"flight-icon\" size=\"24\" isInlineBlock=false))}}\n    {{yield (hash Label=(component \"hds/form/radio-card/label\"))}}\n    {{yield (hash Badge=(component \"hds/badge\"))}}\n    {{yield (hash Description=(component \"hds/form/radio-card/description\"))}}\n    {{yield (hash Generic=(component \"hds/yield\"))}}\n  </span>\n  <span class=\"hds-form-radio-card__control-wrapper\">\n    <Hds::Form::Radio::Base\n      class=\"hds-form-radio-card__control\"\n      @value={{@value}}\n      name={{@name}}\n      checked={{@checked}}\n      disabled={{@disabled}}\n      aria-describedby={{@extraAriaDescribedBy}}\n      ...attributes\n    />\n  </span>\n</label>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_CONTROL_POSITION = HdsFormRadioCardControlPositionValues.Bottom;
const DEFAULT_ALIGNMENT = HdsFormRadioCardAlignmentValues.Left;
const CONTROL_POSITIONS = Object.values(HdsFormRadioCardControlPositionValues);
const ALIGNMENTS = Object.values(HdsFormRadioCardAlignmentValues);
class HdsFormRadioCardComponent extends Component {
  /**
   * Sets the position of the control
   * Accepted values: buttom, left
   *
   * @param type
   * @type {string}
   * @default 'bottom'
   */
  get controlPosition() {
    const {
      controlPosition = DEFAULT_CONTROL_POSITION
    } = this.args;
    assert(`@controlPosition for "Hds::Form::RadioCard" must be one of the following: ${CONTROL_POSITIONS.join(', ')}; received: ${controlPosition}`, CONTROL_POSITIONS.includes(controlPosition));
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
    const {
      alignment = DEFAULT_ALIGNMENT
    } = this.args;
    assert(`@alignment for "Hds::Form::RadioCard" must be one of the following: ${ALIGNMENTS.join(', ')}; received: ${alignment}`, ALIGNMENTS.includes(alignment));
    return alignment;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
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
setComponentTemplate(TEMPLATE, HdsFormRadioCardComponent);

export { ALIGNMENTS, CONTROL_POSITIONS, DEFAULT_ALIGNMENT, DEFAULT_CONTROL_POSITION, HdsFormRadioCardComponent as default };
//# sourceMappingURL=index.js.map
