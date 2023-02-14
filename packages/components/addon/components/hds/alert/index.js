/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';

export const TYPES = ['page', 'inline', 'compact'];
export const DEFAULT_COLOR = 'neutral';
export const COLORS = [
  'neutral',
  'highlight',
  'success',
  'warning',
  'critical',
];
export const MAPPING_COLORS_TO_ICONS = {
  neutral: 'info',
  highlight: 'info',
  success: 'check-circle',
  warning: 'alert-triangle',
  critical: 'alert-diamond',
};

const CONTENT_ELEMENT_SELECTOR = '.hds-alert__content';
const TITLE_ELEMENT_SELECTOR = '.hds-alert__title';
const DESCRIPTION_ELEMENT_SELECTOR = '.hds-alert__description';

export default class HdsAlertIndexComponent extends Component {
  @tracked role = 'alert';
  @tracked ariaLabelledBy;

  constructor() {
    super(...arguments);

    assert(
      `@type for "Hds::Alert" must be one of the following: ${TYPES.join(
        ', '
      )}; received: ${this.args.type}`,
      TYPES.includes(this.args.type)
    );
  }

  /**
   * @param color
   * @type {enum}
   * @default neutral
   * @description Determines the color scheme for the alert.
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Alert" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * @param icon
   * @type {string}
   * @default null
   * @description The name of the icon to be used.
   */
  get icon() {
    let { icon } = this.args;

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
      assert(
        `@icon for "Hds::Alert" with @type "compact" is required`,
        this.args.type !== 'compact'
      );

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
  get onDismiss() {
    let { onDismiss } = this.args;

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
    let classes = ['hds-alert'];

    // Add a class based on the @type argument
    classes.push(`hds-alert--type-${this.args.type}`);

    // Add a class based on the @color argument
    classes.push(`hds-alert--color-${this.color}`);

    return classes.join(' ');
  }

  @action
  didInsert(element) {
    let actions = element.querySelectorAll(
      `${CONTENT_ELEMENT_SELECTOR} button, ${CONTENT_ELEMENT_SELECTOR} a`
    );
    if (actions.length) {
      this.role = 'alertdialog';
    }

    // `alertdialog` must have an accessible name so we use either the
    // title or the description as label for the alert
    let label =
      element.querySelector(TITLE_ELEMENT_SELECTOR) ||
      element.querySelector(DESCRIPTION_ELEMENT_SELECTOR);
    if (label) {
      let labelId = label.getAttribute('id') || guidFor(element);
      label.setAttribute('id', labelId);
      this.ariaLabelledBy = labelId;
    }
  }
}
