/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';

export const DEFAULT_POSITION = 'bottom-right';
export const POSITIONS = [
  'bottom-left',
  'bottom-right',
  'top-left',
  'top-right',
];

export default class HdsDropdownIndexComponent extends Component {
  @tracked toggleId;

  /**
   * @param listPosition
   * @type {string}
   * @default bottom-right
   * @description Determines the position of the "list"
   */
  get listPosition() {
    let { listPosition = DEFAULT_POSITION } = this.args;

    assert(
      `@listPosition for "Hds::Dropdown::Index" must be one of the following: ${POSITIONS.join(
        ', '
      )}; received: ${listPosition}`,
      POSITIONS.includes(listPosition)
    );

    return listPosition;
  }

  get popoverOptions() {
    // TODO: do we want to rename (again?) the options for the Dropdown to match the Floating-UI / Tippyjs ones?
    // https://floating-ui.com/docs/tutorial#placements
    // https://atomiks.github.io/tippyjs/#placements
    const remappedContentPlacement = this.listPosition
      .replace(/-left$/, '-start')
      .replace(/-right$/, '-end');

    return {
      popoverPlacement: remappedContentPlacement,
      popoverPositionStrategy: this.args.listPositionStrategy || 'absolute', // TODO! if we use Popover API this is probably not needed anymore
      popoverOffsetOptions: [0, 4],
      popoverZIndex: this.args.listZIndex || 2, // TODO! if we use Popover API this is probably not needed anymore
      popoverEnableCollisionDetection:
        this.args.listEnableCollisionDetection || false,
    };
  }

  /**
   * Get the class names to apply to the element
   * @method classNames
   * @return {string} The "class" attribute to apply to the root element
   */
  get classNames() {
    let classes = ['hds-dropdown'];

    // add a class based on the @isInline argument
    if (this.args.isInline) {
      classes.push('hds-dropdown--is-inline');
    }

    return classes.join(' ');
  }

  /**
   * Get the class names to apply to the content
   * @method classNamesContent
   * @return {string} The "class" attribute to apply to the disclosed content
   */
  get classNamesContent() {
    let classes = ['hds-dropdown__content'];

    // add a class based on the @listPosition argument
    classes.push(`hds-dropdown__content--position-${this.listPosition}`);

    // add a class based on the @width argument
    if (this.args.width) {
      classes.push('hds-dropdown__content--fixed-width');
    }

    return classes.join(' ');
  }

  @action
  didInsertList(listElement, toggleElement) {
    const checkmarkItems = listElement.querySelectorAll(`[role="option"]`);
    if (checkmarkItems.length) {
      listElement.setAttribute('role', 'listbox');
      // TODO! is this still OK or should it be modified?
      listElement.setAttribute('aria-labelledby', toggleElement.id);
    }
  }
}
