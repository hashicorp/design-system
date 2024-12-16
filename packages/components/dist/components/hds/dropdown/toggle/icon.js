import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../../_rollupPluginBabelHelpers-DSLVWx63.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { HdsDropdownToggleIconSizeValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<button\n  class={{this.classNames}}\n  aria-label={{this.text}}\n  ...attributes\n  aria-expanded={{if @isOpen \"true\" \"false\"}}\n  {{@setupPrimitiveToggle}}\n  {{did-update this.onDidUpdateImageSrc @imageSrc}}\n  type=\"button\"\n>\n  <div class=\"hds-dropdown-toggle-icon__wrapper\">\n    {{#if @imageSrc}}\n      {{#if this._hasImage}}\n        <img src={{@imageSrc}} alt=\"\" role=\"presentation\" {{on \"error\" this.onImageLoadError}} />\n      {{else}}\n        <Hds::Icon @name=\"user\" @size={{this.iconSize}} />\n      {{/if}}\n    {{else if @icon}}\n      <Hds::Icon @name={{@icon}} @size={{this.iconSize}} />\n    {{/if}}\n  </div>\n  {{#if this.hasChevron}}\n    <Hds::Dropdown::Toggle::Chevron />\n  {{/if}}\n</button>");

var _class, _descriptor;
const DEFAULT_SIZE = HdsDropdownToggleIconSizeValues.Medium;
const SIZES = Object.values(HdsDropdownToggleIconSizeValues);
let HdsDropdownToggleIcon = (_class = class HdsDropdownToggleIcon extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "_hasImage", _descriptor, this);
    if (!(this.args.icon || this.args.imageSrc)) {
      assert('@icon or @imageSrc must be defined for "Hds::Dropdown::Toggle::Icon"');
    }
  }
  onDidUpdateImageSrc() {
    this._hasImage = true;
  }
  onImageLoadError() {
    this._hasImage = false;
  }

  /**
   * @param text
   * @type {string}
   * @description The text of the `aria-label` applied to the toggle
   */
  get text() {
    const {
      text
    } = this.args;
    assert('@text for "Hds::Dropdown::Toggle::Icon" must have a valid value', text !== undefined);
    return text;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the button; acceptable values are `small` and `medium`
   */
  get size() {
    const {
      size = DEFAULT_SIZE
    } = this.args;
    assert(`@size for "Hds::Dropdown::Toggle::Icon" must be one of the following: ${SIZES.join(', ')}; received: ${size}`, SIZES.includes(size));
    return size;
  }

  /**
   * @param iconSize
   * @type {string}
   * @default 24
   * @description ensures that the correct icon size is used
   */
  get iconSize() {
    if (this.args.size === 'medium' && !this.hasChevron) {
      // in this special case we use a larger SVG
      return '24';
    } else {
      // this is the default size (notice: for the "small" variant with chevron, we set the actual size to `12px` via CSS)
      return '16';
    }
  }

  /**
   * Indicates if a dropdown chevron icon should be displayed; should be displayed unless the "more-horizontal" icon is used.
   *
   * @param hasChevron
   * @type {boolean}
   * @default true
   */
  get hasChevron() {
    return this.args.hasChevron ?? true;
  }

  /**
   * Get the class names to apply to the component.
   * @method ToggleIcon#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-dropdown-toggle-icon'];

    // add a class based on the @size argument
    classes.push(`hds-dropdown-toggle-icon--size-${this.size}`);

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-dropdown-toggle-icon--is-open');
    }

    // add a class based on the @hasChevron argument
    if (this.hasChevron) {
      classes.push('hds-dropdown-toggle-icon--has-chevron');
    }
    return classes.join(' ');
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "_hasImage", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _applyDecoratedDescriptor(_class.prototype, "onDidUpdateImageSrc", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onDidUpdateImageSrc"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onImageLoadError", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onImageLoadError"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsDropdownToggleIcon);

export { DEFAULT_SIZE, SIZES, HdsDropdownToggleIcon as default };
//# sourceMappingURL=icon.js.map
