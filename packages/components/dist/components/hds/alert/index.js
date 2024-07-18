import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { HdsAlertTypeValues, HdsAlertColorValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class={{this.classNames}}\n  role={{this.role}}\n  aria-live=\"polite\"\n  aria-labelledby={{this.ariaLabelledBy}}\n  {{did-insert this.didInsert}}\n  ...attributes\n>\n  {{#if this.icon}}\n    <div class=\"hds-alert__icon\">\n      <FlightIcon @name={{this.icon}} @size={{this.iconSize}} @stretched={{true}} @isInlineBlock={{false}} />\n    </div>\n  {{/if}}\n\n  <div class=\"hds-alert__content\">\n    <div class=\"hds-alert__text {{if (eq @type \'compact\') \'hds-typography-body-100\' \'hds-typography-body-200\'}}\">\n      {{yield (hash Title=(component \"hds/alert/title\"))}}\n      {{yield (hash Description=(component \"hds/alert/description\"))}}\n    </div>\n\n    <div class=\"hds-alert__actions\">\n      {{yield\n        (hash\n          Button=(component \"hds/button\" size=\"small\") LinkStandalone=(component \"hds/link/standalone\" size=\"small\")\n        )\n      }}\n    </div>\n    {{yield (hash Generic=(component \"hds/yield\"))}}\n  </div>\n\n  {{#if this.onDismiss}}\n    <Hds::DismissButton class=\"hds-alert__dismiss\" {{on \"click\" this.onDismiss}} />\n  {{/if}}\n</div>");

var _class, _descriptor, _descriptor2;
const TYPES = Object.values(HdsAlertTypeValues);
const DEFAULT_COLOR = HdsAlertColorValues.Neutral;
const COLORS = Object.values(HdsAlertColorValues);
const MAPPING_COLORS_TO_ICONS = {
  [HdsAlertColorValues.Neutral]: 'info',
  [HdsAlertColorValues.Highlight]: 'info',
  [HdsAlertColorValues.Success]: 'check-circle',
  [HdsAlertColorValues.Warning]: 'alert-triangle',
  [HdsAlertColorValues.Critical]: 'alert-diamond'
};
const CONTENT_ELEMENT_SELECTOR = '.hds-alert__content';
const TITLE_ELEMENT_SELECTOR = '.hds-alert__title';
const DESCRIPTION_ELEMENT_SELECTOR = '.hds-alert__description';
let HdsAlertComponent = (_class = class HdsAlertComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "role", _descriptor, this);
    _initializerDefineProperty(this, "ariaLabelledBy", _descriptor2, this);
    assert(`@type for "Hds::Alert" must be one of the following: ${TYPES.join(', ')}; received: ${this.args.type}`, TYPES.includes(this.args.type));
  }

  /**
   * @param color
   * @type {enum}
   * @default neutral
   * @description Determines the color scheme for the alert.
   */
  get color() {
    const {
      color = DEFAULT_COLOR
    } = this.args;
    assert(`@color for "Hds::Alert" must be one of the following: ${COLORS.join(', ')}; received: ${color}`, COLORS.includes(color));
    return color;
  }

  /**
   * @param icon
   * @type {string}
   * @default false
   * @description The name of the icon to be used.
   */
  get icon() {
    const {
      icon
    } = this.args;

    // If `icon` isn't passed, use the pre-defined one from `color`
    if (icon === undefined) {
      if (this.args.type === 'compact') {
        // for the "compact" type by default we use filled icons
        return `${MAPPING_COLORS_TO_ICONS[this.color]}-fill`;
      } else {
        // for all the other types by default we use outlined icons
        return MAPPING_COLORS_TO_ICONS[this.color];
      }
      // If `icon` is set explicitly to false, user doesn't want any icon in the alert
    } else if (icon === false) {
      assert(`@icon for "Hds::Alert" with @type "compact" is required`, this.args.type !== 'compact');
      return false;
    } else {
      // If a name for `icon` is passed, set FlightIcon to that name
      return icon;
    }
  }

  /**
   * @param onDismiss
   * @type {function}
   * @default () => {}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onDismiss() {
    const {
      onDismiss
    } = this.args;
    if (typeof onDismiss === 'function') {
      return onDismiss;
    } else {
      return false;
    }
  }

  /**
   * @param iconSize
   * @type {string}
   * @description ensures that the correct icon size is used. Automatically calculated.
   */
  get iconSize() {
    if (this.args.type === 'compact') {
      return '16';
    } else {
      return '24';
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method Alert#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-alert'];

    // Add a class based on the @type argument
    classes.push(`hds-alert--type-${this.args.type}`);

    // Add a class based on the @color argument
    classes.push(`hds-alert--color-${this.color}`);
    return classes.join(' ');
  }
  didInsert(element) {
    const actions = element.querySelectorAll(`${CONTENT_ELEMENT_SELECTOR} button, ${CONTENT_ELEMENT_SELECTOR} a`);
    if (actions.length) {
      this.role = 'alertdialog';
    }

    // `alertdialog` must have an accessible name so we use either the
    // title or the description as label for the alert
    const label = element.querySelector(TITLE_ELEMENT_SELECTOR) || element.querySelector(DESCRIPTION_ELEMENT_SELECTOR);
    if (label) {
      const labelId = label.getAttribute('id') || guidFor(element);
      label.setAttribute('id', labelId);
      this.ariaLabelledBy = labelId;
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "role", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 'alert';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "ariaLabelledBy", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "didInsert", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsert"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsAlertComponent);

export { COLORS, DEFAULT_COLOR, MAPPING_COLORS_TO_ICONS, TYPES, HdsAlertComponent as default };
//# sourceMappingURL=index.js.map
