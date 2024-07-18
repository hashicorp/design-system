import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { HdsCopySnippetColorValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<button\n  type=\"button\"\n  class={{this.classNames}}\n  {{hds-clipboard text=@textToCopy onSuccess=this.onSuccess onError=this.onError}}\n  aria-label={{concat \"copy \" @textToCopy}}\n  ...attributes\n>\n  <Hds::Text::Code class=\"hds-copy-snippet__text\" @tag=\"span\" @size=\"100\">\n    {{this.textToShow}}\n  </Hds::Text::Code>\n  <FlightIcon @name={{this.icon}} class=\"hds-copy-snippet__icon\" />\n</button>");

var _class, _descriptor, _descriptor2;
const DEFAULT_COLOR = HdsCopySnippetColorValues.Primary;
const COLORS = Object.values(HdsCopySnippetColorValues);
const DEFAULT_ICON = 'clipboard-copy';
const SUCCESS_ICON = 'clipboard-checked';
const ERROR_ICON = 'clipboard-x';
const DEFAULT_STATUS = 'idle';
let HdsCopySnippetComponent = (_class = class HdsCopySnippetComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "status", _descriptor, this);
    _initializerDefineProperty(this, "timer", _descriptor2, this);
  }
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
    if (this.status === 'success') {
      icon = SUCCESS_ICON;
    } else if (this.status === 'error') {
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
    classes.push(`hds-copy-snippet--status-${this.status}`);

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
setComponentTemplate(TEMPLATE, HdsCopySnippetComponent);

export { COLORS, DEFAULT_COLOR, DEFAULT_ICON, DEFAULT_STATUS, ERROR_ICON, SUCCESS_ICON, HdsCopySnippetComponent as default };
//# sourceMappingURL=index.js.map
