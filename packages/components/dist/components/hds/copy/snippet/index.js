import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<button\n  type=\"button\"\n  class={{this.classNames}}\n  {{hds-clipboard text=@textToCopy onSuccess=this.onSuccess onError=this.onError}}\n  aria-label={{concat \"copy \" @textToCopy}}\n  ...attributes\n>\n  <Hds::Text::Code class=\"hds-copy-snippet__text\" @tag=\"span\" @size=\"100\">\n    {{@textToCopy}}\n  </Hds::Text::Code>\n  <FlightIcon @name={{this.icon}} class=\"hds-copy-snippet__icon\" />\n</button>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_COLOR = 'primary';
const COLORS = ['primary', 'secondary'];
const DEFAULT_ICON = 'clipboard-copy';
const SUCCESS_ICON = 'clipboard-checked';
const ERROR_ICON = 'clipboard-x';
const DEFAULT_STATUS = 'idle';
class HdsCopySnippetIndexComponent extends Component {
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
   * @default DEFAULT_ICON
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
    let {
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
    let classes = ['hds-copy-snippet'];

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
setComponentTemplate(TEMPLATE, HdsCopySnippetIndexComponent);

export { COLORS, DEFAULT_COLOR, DEFAULT_ICON, DEFAULT_STATUS, ERROR_ICON, SUCCESS_ICON, HdsCopySnippetIndexComponent as default };
//# sourceMappingURL=index.js.map
