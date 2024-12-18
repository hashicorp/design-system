import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../_rollupPluginBabelHelpers-81503waH.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { HdsAlertTypeValues, HdsAlertColorValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class={{this.classNames}}\n  role={{this._role}}\n  aria-live={{if this._role \"polite\"}}\n  aria-labelledby={{this._ariaLabelledBy}}\n  {{did-insert this.didInsert}}\n  ...attributes\n>\n  {{#if this.icon}}\n    <div class=\"hds-alert__icon\">\n      <Hds::Icon @name={{this.icon}} @size={{this.iconSize}} @stretched={{true}} />\n    </div>\n  {{/if}}\n\n  <div class=\"hds-alert__content\">\n    <div class=\"hds-alert__text {{if (eq @type \'compact\') \'hds-typography-body-100\' \'hds-typography-body-200\'}}\">\n      {{yield (hash Title=(component \"hds/alert/title\"))}}\n      {{yield (hash Description=(component \"hds/alert/description\"))}}\n    </div>\n\n    <div class=\"hds-alert__actions\">\n      {{yield\n        (hash\n          Button=(component \"hds/button\" size=\"small\") LinkStandalone=(component \"hds/link/standalone\" size=\"small\")\n        )\n      }}\n    </div>\n    {{yield (hash Generic=(component \"hds/yield\"))}}\n  </div>\n\n  {{#if this.onDismiss}}\n    <Hds::DismissButton class=\"hds-alert__dismiss\" {{on \"click\" this.onDismiss}} />\n  {{/if}}\n</div>");

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
let HdsAlert = (_class = class HdsAlert extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "_role", _descriptor, this);
    _initializerDefineProperty(this, "_ariaLabelledBy", _descriptor2, this);
    assert(`@type for "Hds::Alert" must be one of the following: ${TYPES.join(', ')}; received: ${this.args.type}`, TYPES.includes(this.args.type));
  }

  // Determines the color scheme for the alert.
  get color() {
    const {
      color = DEFAULT_COLOR
    } = this.args;
    assert(`@color for "Hds::Alert" must be one of the following: ${COLORS.join(', ')}; received: ${color}`, COLORS.includes(color));
    return color;
  }

  // The name of the icon to be used.
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
      // If a name for `icon` is passed, set HdsIcon to that name
      return icon;
    }
  }

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

  // Ensures that the correct icon size is used. Automatically calculated.
  get iconSize() {
    if (this.args.type === 'compact') {
      return '16';
    } else {
      return '24';
    }
  }
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

    // an Alert which actually alerts users (has role="alert" & aria-live="polite") as opposed to an informational or promo "alert"
    const isSemanticAlert = this.color === 'warning' || this.color === 'critical' || this.color === 'success';
    if (isSemanticAlert && actions.length) {
      this._role = 'alertdialog';
    } else if (isSemanticAlert) {
      this._role = 'alert';
    }

    // `alertdialog` must have an accessible name so we use either the
    // title or the description as label for the alert
    const label = element.querySelector(TITLE_ELEMENT_SELECTOR) || element.querySelector(DESCRIPTION_ELEMENT_SELECTOR);
    if (label) {
      const labelId = label.getAttribute('id') || guidFor(element);
      label.setAttribute('id', labelId);
      this._ariaLabelledBy = labelId;
    }
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "_role", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "_ariaLabelledBy", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "didInsert", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsert"), _class.prototype), _class);
setComponentTemplate(TEMPLATE, HdsAlert);

export { COLORS, DEFAULT_COLOR, MAPPING_COLORS_TO_ICONS, TYPES, HdsAlert as default };
//# sourceMappingURL=index.js.map
