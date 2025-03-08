import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { HdsCopyButtonSizeValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Button\n  class={{this.classNames}}\n  @size={{this.size}}\n  @isFullWidth={{@isFullWidth}}\n  @text={{@text}}\n  @icon={{this.icon}}\n  @isIconOnly={{@isIconOnly}}\n  @color=\"secondary\"\n  @iconPosition=\"trailing\"\n  {{hds-clipboard text=@textToCopy target=@targetToCopy onSuccess=this.onSuccess onError=this.onError}}\n  ...attributes\n/>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_SIZE = HdsCopyButtonSizeValues.Medium;
const SIZES = Object.values(HdsCopyButtonSizeValues);
const DEFAULT_ICON = 'clipboard-copy';
const SUCCESS_ICON = 'clipboard-checked';
const ERROR_ICON = 'clipboard-x';
const DEFAULT_STATUS = 'idle';
class HdsCopyButton extends Component {
  static {
    g(this.prototype, "_status", [tracked], function () {
      return DEFAULT_STATUS;
    });
  }
  #_status = (i(this, "_status"), undefined);
  static {
    g(this.prototype, "_timer", [tracked]);
  }
  #_timer = (i(this, "_timer"), undefined);
  /**
   * @param icon
   * @type {string}
   * @description The icon to be displayed for each status; automatically calculated based on the tracked property `status`.
   */
  get icon() {
    let icon = DEFAULT_ICON;
    if (this._status === 'success') {
      icon = SUCCESS_ICON;
    } else if (this._status === 'error') {
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
    classes.push(`hds-copy-button--status-${this._status}`);
    return classes.join(' ');
  }
  onSuccess(args) {
    this._status = 'success';
    this.resetStatusDelayed();
    const {
      onSuccess
    } = this.args;
    if (typeof onSuccess === 'function') {
      onSuccess(args);
    }
  }
  static {
    n(this.prototype, "onSuccess", [action]);
  }
  onError(args) {
    this._status = 'error';
    this.resetStatusDelayed();
    const {
      onError
    } = this.args;
    if (typeof onError === 'function') {
      onError(args);
    }
  }
  static {
    n(this.prototype, "onError", [action]);
  }
  resetStatusDelayed() {
    clearTimeout(this._timer);
    // make it fade back to the default state
    this._timer = setTimeout(() => {
      this._status = DEFAULT_STATUS;
    }, 1500);
  }
}
setComponentTemplate(TEMPLATE, HdsCopyButton);

export { DEFAULT_ICON, DEFAULT_SIZE, DEFAULT_STATUS, ERROR_ICON, SIZES, SUCCESS_ICON, HdsCopyButton as default };
//# sourceMappingURL=index.js.map
