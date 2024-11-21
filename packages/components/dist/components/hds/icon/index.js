import { a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { iconNames } from '@hashicorp/flight-icons/svg';
import { HdsIconColorValues, HdsIconSizeValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<svg\n  class={{this.classNames}}\n  ...attributes\n  aria-hidden=\"{{if @title \'false\' \'true\'}}\"\n  aria-labelledby={{this.ariaLabelledby}}\n  data-test-icon={{@name}}\n  fill=\"{{this.fillColor}}\"\n  id={{this.iconId}}\n  role={{this.role}}\n  width=\"{{this.svgSize.width}}\"\n  height=\"{{this.svgSize.height}}\"\n  viewBox=\"0 0 {{this.size}} {{this.size}}\"\n  xmlns=\"http://www.w3.org/2000/svg\"\n>\n  {{#if @title}}\n    <title id={{this.titleId}}>{{@title}}</title>\n    <g role=\"presentation\">\n      <use href=\"#flight-{{@name}}-{{this.size}}\"></use>\n    </g>\n  {{else}}\n    <use href=\"#flight-{{@name}}-{{this.size}}\"></use>\n  {{/if}}\n</svg>");

const AVAILABLE_COLORS = Object.values(HdsIconColorValues);
class HdsIcon extends Component {
  constructor(owner, args) {
    super(owner, args);
    _defineProperty(this, "iconId", 'icon-' + guidFor(this));
    _defineProperty(this, "titleId", 'title-' + guidFor(this));
    if (!this.args.name) {
      assert('Please provide to <Hds::Icon> a value for @name');
    } else if (!iconNames.includes(this.args.name)) {
      assert(`The icon @name "${this.args.name}" provided to <Hds::Icon> is not correct. Please verify it exists on https://helios.hashicorp.design/icons/library`);
    }
  }
  get isInline() {
    return this.args.isInline ?? false;
  }
  get predefinedColor() {
    const {
      color
    } = this.args;
    if (color && AVAILABLE_COLORS.includes(color)) {
      return color;
    } else {
      return undefined;
    }
  }
  get fillColor() {
    if (this.predefinedColor !== undefined) {
      return 'currentColor';
    } else {
      return this.args.color ?? 'currentColor';
    }
  }
  get size() {
    return this.args.size ?? HdsIconSizeValues.Sixteen;
  }
  get svgSize() {
    return {
      width: this.args.stretched ? '100%' : this.size,
      height: this.args.stretched ? '100%' : this.size
    };
  }
  get title() {
    return this.args.title ?? null;
  }
  get role() {
    return this.args.title ? 'img' : null;
  }
  get ariaLabelledby() {
    return this.args.title ? this.titleId : null;
  }
  get classNames() {
    const {
      name
    } = this.args;
    const classes = ['hds-icon'];

    // add a class based on the @name argument
    classes.push(`hds-icon-${name}`);
    if (this.isInline) {
      classes.push('hds-icon--is-inline');
    }

    // add a (helper) class based on the @color argument (if pre-defined)
    if (this.predefinedColor) {
      classes.push(`hds-foreground-${this.predefinedColor}`);
    }

    // add an extra class to control the animation (depends on the icon)
    if (['loading', 'running'].includes(name)) {
      classes.push(`hds-icon--animation-${name}`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsIcon);

export { AVAILABLE_COLORS, HdsIcon as default };
//# sourceMappingURL=index.js.map
