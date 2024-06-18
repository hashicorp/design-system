import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { schedule } from '@ember/runloop';
import { setAriaDescribedBy } from '../../../../utils/hds-set-aria-described-by.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<label class={{this.classNames}} {{did-insert this.setAriaDescribedBy}} {{style maxWidth=@maxWidth}}>\n  <span class=\"hds-form-radio-card__content\">\n    {{yield (hash Icon=(component \"flight-icon\" size=\"24\" isInlineBlock=false))}}\n    {{yield (hash Label=(component \"hds/form/radio-card/label\"))}}\n    {{yield (hash Badge=(component \"hds/badge\"))}}\n    {{yield (hash Description=(component \"hds/form/radio-card/description\"))}}\n    {{yield (hash Generic=(component \"hds/yield\"))}}\n  </span>\n  <span class=\"hds-form-radio-card__control-wrapper\">\n    <Hds::Form::Radio::Base\n      class=\"hds-form-radio-card__control\"\n      @value={{@value}}\n      name={{@name}}\n      checked={{@checked}}\n      disabled={{@disabled}}\n      aria-describedby={{this.ariaDescribedBy}}\n      ...attributes\n    />\n  </span>\n</label>");

var _class, _descriptor, _descriptor2;
const DEFAULT_CONTROL_POSITION = 'bottom';
const DEFAULT_ALIGNMENT = 'left';
const CONTROL_POSITIONS = ['bottom', 'left'];
const ALIGNMENTS = ['left', 'center'];
let HdsFormRadioCardIndexComponent = (_class = class HdsFormRadioCardIndexComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "ariaDescribedBy", _descriptor, this);
    _initializerDefineProperty(this, "descriptors", _descriptor2, this);
  }
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
    let {
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
    let {
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
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "ariaDescribedBy", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.args.extraAriaDescribedBy;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "descriptors", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, "setAriaDescribedBy", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setAriaDescribedBy"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsFormRadioCardIndexComponent);

export { ALIGNMENTS, CONTROL_POSITIONS, DEFAULT_ALIGNMENT, DEFAULT_CONTROL_POSITION, HdsFormRadioCardIndexComponent as default };
//# sourceMappingURL=index.js.map
