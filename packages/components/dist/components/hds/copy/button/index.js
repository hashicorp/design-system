import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { HdsCopyButtonSizeValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Button\n  class={{this.classNames}}\n  @size={{this.size}}\n  @isFullWidth={{@isFullWidth}}\n  @text={{@text}}\n  @icon={{this.icon}}\n  @isIconOnly={{@isIconOnly}}\n  @color=\"secondary\"\n  @iconPosition=\"trailing\"\n  {{hds-clipboard text=@textToCopy target=@targetToCopy onSuccess=this.onSuccess onError=this.onError}}\n  ...attributes\n/>");

var _class, _descriptor, _descriptor2;
const DEFAULT_SIZE = HdsCopyButtonSizeValues.Medium;
const SIZES = Object.values(HdsCopyButtonSizeValues);
const DEFAULT_ICON = 'clipboard-copy';
const SUCCESS_ICON = 'clipboard-checked';
const ERROR_ICON = 'clipboard-x';
const DEFAULT_STATUS = 'idle';
let HdsCopyButtonComponent = (_class = class HdsCopyButtonComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "status", _descriptor, this);
    _initializerDefineProperty(this, "timer", _descriptor2, this);
  }
  /**
   * @param icon
   * @type {string}
   * @description The icon to be displayed for each status; automatically calculated based on the tracked property `status`.
   */
  get icon() {
    let icon = DEFAULT_ICON;
    if (this.status === 'success') {
      icon = SUCCESS_ICON;
    } else if (this.status === 'error') {
      icon = ERROR_ICON;
    }
    return icon;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the copy/button; acceptable values are `small` and `medium`
   */
  get size() {
    const {
      size = DEFAULT_SIZE
    } = this.args;
    assert(`@size for "Hds::Copy::Button" must be one of the following: ${SIZES.join(', ')}; received: ${size}`, SIZES.includes(size));
    return size;
  }

  /**
   * Get the class names to apply to the component.
   * @method CopyButton#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-copy-button'];

    // add a class based on the @size argument
    classes.push(`hds-button--size-${this.size}`);
    classes.push(`hds-copy-button--status-${this.status}`);
    return classes.join(' ');
  }
  onSuccess(args) {
    this.status = 'success';
    this.resetStatusDelayed();
    const {
      onSuccess
    } = this.args;
    if (typeof onSuccess === 'function') {
      onSuccess(args);
    }
  }
  onError(args) {
    this.status = 'error';
    this.resetStatusDelayed();
    const {
      onError
    } = this.args;
    if (typeof onError === 'function') {
      onError(args);
    }
  }
  resetStatusDelayed() {
    clearTimeout(this.timer);
    // make it fade back to the default state
    this.timer = setTimeout(() => {
      this.status = DEFAULT_STATUS;
    }, 1500);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "status", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return DEFAULT_STATUS;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "timer", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "onSuccess", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onSuccess"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onError", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onError"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsCopyButtonComponent);

export { DEFAULT_ICON, DEFAULT_SIZE, DEFAULT_STATUS, ERROR_ICON, SIZES, SUCCESS_ICON, HdsCopyButtonComponent as default };
//# sourceMappingURL=index.js.map
