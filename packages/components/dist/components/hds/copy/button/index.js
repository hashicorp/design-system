import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Button\n  class={{this.classNames}}\n  @size={{this.size}}\n  @isFullWidth={{@isFullWidth}}\n  @text={{@text}}\n  @icon={{this.icon}}\n  @isIconOnly={{@isIconOnly}}\n  @color=\"secondary\"\n  @iconPosition=\"trailing\"\n  {{hds-clipboard text=@textToCopy target=@targetToCopy onSuccess=this.onSuccess onError=this.onError}}\n  ...attributes\n/>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_SIZE = 'medium';
const SIZES = ['small', 'medium'];
const DEFAULT_ICON = 'clipboard-copy';
const SUCCESS_ICON = 'clipboard-checked';
const ERROR_ICON = 'clipboard-x';
const DEFAULT_STATUS = 'idle';
class HdsCopyButtonComponent extends Component {
  static {
    g(this.prototype, "status", [tracked], function () {
      return DEFAULT_STATUS;
    });
  }
  #status = (i(this, "status"), void 0);
  static {
    g(this.prototype, "timer", [tracked]);
  }
  #timer = (i(this, "timer"), void 0);
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
    let {
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
    let classes = ['hds-copy-button'];

    // add a class based on the @size argument
    classes.push(`hds-button--size-${this.size}`);
    classes.push(`hds-copy-button--status-${this.status}`);
    return classes.join(' ');
  }
  onSuccess(args) {
    this.status = 'success';
    this.resetStatusDelayed();
    let {
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
    this.status = 'error';
    this.resetStatusDelayed();
    let {
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
    clearTimeout(this.timer);
    // make it fade back to the default state
    this.timer = setTimeout(() => {
      this.status = DEFAULT_STATUS;
    }, 1500);
  }
}
setComponentTemplate(TEMPLATE, HdsCopyButtonComponent);

export { DEFAULT_ICON, DEFAULT_SIZE, DEFAULT_STATUS, ERROR_ICON, SIZES, SUCCESS_ICON, HdsCopyButtonComponent as default };
//# sourceMappingURL=index.js.map
