import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { iconNames } from '@hashicorp/flight-icons/svg';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<svg\n  class={{this.classNames}}\n  ...attributes\n  aria-hidden=\"{{if @title \'false\' \'true\'}}\"\n  aria-labelledby={{this.ariaLabelledby}}\n  data-test-icon={{@name}}\n  fill=\"{{this.color}}\"\n  id={{this.iconId}}\n  role={{this.role}}\n  width=\"{{this.svgSize.width}}\"\n  height=\"{{this.svgSize.height}}\"\n  viewBox=\"0 0 {{this.size}} {{this.size}}\"\n  xmlns=\"http://www.w3.org/2000/svg\"\n>\n  {{#if @title}}\n    <title id={{this.titleId}}>{{@title}}</title>\n    <g role=\"presentation\">\n      <use href=\"#flight-{{@name}}-{{this.size}}\"></use>\n    </g>\n  {{else}}\n    <use href=\"#flight-{{@name}}-{{this.size}}\"></use>\n  {{/if}}\n</svg>");

class FlightIcon extends Component {
  constructor(owner, args) {
    super(owner, args);
    /**
     * Generates a unique ID for the SVG
     *
     * @param iconId
     */
    _defineProperty(this, "iconId", 'icon-' + guidFor(this));
    /**
     * Generates a unique ID for the title
     *
     * @param titleId
     */
    _defineProperty(this, "titleId", 'title-' + guidFor(this));
    if (!this.args.name) {
      assert('Please provide to <FlightIcon> a value for @name');
    } else if (!iconNames.includes(this.args.name)) {
      assert(`The icon @name "${this.args.name}" provided to <FlightIcon> is not correct. Please verify it exists on https://helios.hashicorp.design/icons/library`);
    }
  }

  /**
   * Sets the color for the SVG
   *
   * @param color {string}
   * @default 'currentColor'
   */
  get color() {
    return this.args.color ?? 'currentColor';
  }
  /**
   * Indicates which icon should be used. An error (in the form of an assertion)
   * will occur if a value has not been provided.
   *
   * @param name {string}
   */
  get name() {
    return this.args.name;
  }

  /**
   * Gets the icon's size (16 or 24)
   *
   * @param size
   * @returns the value of `size` if set
   * @default `16`
   */
  get size() {
    return this.args.size ?? '16';
  }

  /**
   * Get the SVG width/height depending if the icon is stretched or not
   * @method FlightIcon#svgSize
   * @return {object} The width/height to apply to the SVG.
   */
  get svgSize() {
    return {
      width: this.args.stretched ? '100%' : this.size,
      height: this.args.stretched ? '100%' : this.size
    };
  }
  /**
   * Gets the icon's title if one is set
   *
   * @param title
   * @returns the value of `title` if set
   * @default null
   */
  get title() {
    return this.args.title ?? null;
  }

  /**
   *
   * Sets a role if a title exists
   *
   * @param role {string}
   * @returns 'img' or null
   * @default null
   */
  get role() {
    if (this.args.title) {
      return 'img';
    } else {
      return null;
    }
  }
  /**
   *
   * Sets aria-labelledby if a title exists
   *
   * @param ariaLabelledby {string}
   * @returns value of titleId or null
   * @default null
   */
  get ariaLabelledby() {
    if (this.args.title) {
      return this.titleId;
    } else {
      return null;
    }
  }

  /**
   * Get the class names to apply to the icon.
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['flight-icon'];

    // add a class based on the @name argument
    classes.push(`flight-icon-${this.name}`);

    // add a class based on the @isInlineBlock argument
    const isInlineBlock = this.args.isInlineBlock ?? true;
    if (isInlineBlock && !this.args.stretched) {
      classes.push('flight-icon-display-inline');
    }

    // add an extra class to control the animation (depends on the icon)
    if (this.name === 'loading') {
      classes.push('flight-icon--animation-loading');
    } else if (this.name === 'running') {
      classes.push('flight-icon--animation-running');
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, FlightIcon);

export { FlightIcon as default };
//# sourceMappingURL=flight-icon.js.map
