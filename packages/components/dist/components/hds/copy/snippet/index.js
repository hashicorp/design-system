import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { HdsCopySnippetColorValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<button\n  type=\"button\"\n  class={{this.classNames}}\n  {{hds-clipboard text=@textToCopy onSuccess=this.onSuccess onError=this.onError}}\n  aria-label={{concat \"copy \" @textToCopy}}\n  ...attributes\n>\n  <Hds::Text::Code class=\"hds-copy-snippet__text\" @tag=\"span\" @size=\"100\">\n    {{this.textToShow}}\n  </Hds::Text::Code>\n  <Hds::Icon @name={{this.icon}} class=\"hds-copy-snippet__icon\" />\n</button>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_COLOR = HdsCopySnippetColorValues.Primary;
const COLORS = Object.values(HdsCopySnippetColorValues);
const DEFAULT_ICON = 'clipboard-copy';
const SUCCESS_ICON = 'clipboard-checked';
const ERROR_ICON = 'clipboard-x';
const DEFAULT_STATUS = 'idle';
class HdsCopySnippet extends Component {
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
   * @method textToShow
   * @return {string}
   */
  get textToShow() {
    const {
      textToCopy = ''
    } = this.args;
    if (typeof textToCopy === 'string') {
      return textToCopy;
    } else {
      return textToCopy.toString();
    }
  }

  /**
   * @param icon
   * @type {string}
   * @default clipboard-copy
   * @description Determines the icon to be used, based on the success state. Note that this is auto-tracked because it depends on a tracked property (status).
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
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of button to be used; acceptable values are `primary` and `secondary`
   */
  get color() {
    const {
      color = DEFAULT_COLOR
    } = this.args;
    assert(`@color for "Hds::Copy::Snippet" must be one of the following: ${COLORS.join(', ')}; received: ${color}`, COLORS.includes(color));
    return color;
  }

  /**
   * @param isFullWidth
   * @type {boolean}
   * @default false
   * @description Indicates that the component should take up the full width of the parent container.
   */
  get isFullWidth() {
    return this.args.isFullWidth ?? false;
  }

  /**
   * @param isTruncated
   * @type {boolean}
   * @default false
   * @description Indicates that the component should be truncated instead of wrapping text and using multiple lines.
   */
  get isTruncated() {
    return this.args.isTruncated ?? false;
  }

  /**
   * Get the class names to apply to the component.
   * @method CopySnippet#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-copy-snippet'];

    // add a class based on the @color argument
    classes.push(`hds-copy-snippet--color-${this.color}`);

    // add a class based on the tracked status (idle/success/error)
    classes.push(`hds-copy-snippet--status-${this._status}`);

    // add a class based on the @isTruncated argument
    if (this.isTruncated) {
      classes.push('hds-copy-snippet--is-truncated');
    }

    // add a class based on the @isFullWidth argument
    if (this.isFullWidth) {
      classes.push('hds-copy-snippet--width-full');
    }
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
setComponentTemplate(TEMPLATE, HdsCopySnippet);

export { COLORS, DEFAULT_COLOR, DEFAULT_ICON, DEFAULT_STATUS, ERROR_ICON, SUCCESS_ICON, HdsCopySnippet as default };
//# sourceMappingURL=index.js.map
