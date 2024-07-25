/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

import { HdsDropdownPositionValues } from './types.ts';

import type { ComponentLike } from '@glint/template';
import type { MenuPrimitiveSignature } from '../menu-primitive';
import type { HdsDropdownFooterSignature } from './footer';
import type { HdsDropdownHeaderSignature } from './header';
import type { HdsDropdownListItemCheckboxSignature } from './list-item/checkbox';
import type { HdsDropdownListItemCheckmarkSignature } from './list-item/checkmark';
import type { HdsDropdownListItemCopyItemSignature } from './list-item/copy-item';
import type { HdsDropdownListItemDescriptionSignature } from './list-item/description';
import type { HdsDropdownListItemGenericSignature } from './list-item/generic';
import type { HdsDropdownListItemInteractiveSignature } from './list-item/interactive';
import type { HdsDropdownListItemRadioSignature } from './list-item/radio';
import type { HdsDropdownListItemSeparatorSignature } from './list-item/separator';
import type { HdsDropdownListItemTitleSignature } from './list-item/title';
import type { HdsDropdownToggleButtonSignature } from './toggle/button';
import type { HdsDropdownToggleIconSignature } from './toggle/icon';
import type { HdsDropdownPositions } from './types';

export const DEFAULT_POSITION = HdsDropdownPositionValues.BottomRight;
export const POSITIONS: string[] = Object.values(HdsDropdownPositionValues);

interface HdsDropdownSignature {
  Args: MenuPrimitiveSignature['Args'] & {
    height: string;
    isInline: boolean;
    listPosition: HdsDropdownPositions;
    width: string;
  };
  Blocks: {
    default: [
      {
        Footer?: ComponentLike<HdsDropdownFooterSignature>;
        Header?: ComponentLike<HdsDropdownHeaderSignature>;
        Checkbox?: ComponentLike<HdsDropdownListItemCheckboxSignature>;
        Checkmark?: ComponentLike<HdsDropdownListItemCheckmarkSignature>;
        CopyItem?: ComponentLike<HdsDropdownListItemCopyItemSignature>;
        Description?: ComponentLike<HdsDropdownListItemDescriptionSignature>;
        Generic?: ComponentLike<HdsDropdownListItemGenericSignature>;
        Interactive?: ComponentLike<HdsDropdownListItemInteractiveSignature>;
        Radio?: ComponentLike<HdsDropdownListItemRadioSignature>;
        Separator?: ComponentLike<HdsDropdownListItemSeparatorSignature>;
        Title?: ComponentLike<HdsDropdownListItemTitleSignature>;
        ToggleButton?: ComponentLike<HdsDropdownToggleButtonSignature>;
        ToggleIcon?: ComponentLike<HdsDropdownToggleIconSignature>;
        close?: () => void;
      },
    ];
  };
  Element: MenuPrimitiveSignature['Element'];
}

export default class HdsDropdownComponent extends Component<HdsDropdownSignature> {
  /**
   * @param listPosition
   * @type {string}
   * @default bottom-right
   * @description Determines the position of the "list"
   */
  get listPosition(): HdsDropdownPositions {
    const { listPosition = DEFAULT_POSITION } = this.args;

    assert(
      `@listPosition for "Hds::Dropdown::Index" must be one of the following: ${POSITIONS.join(
        ', '
      )}; received: ${listPosition}`,
      POSITIONS.includes(listPosition)
    );

    return listPosition;
  }

  /**
   * Get the class names to apply to the element
   * @method classNames
   * @return {string} The "class" attribute to apply to the root element
   */
  get classNames(): string {
    const classes = ['hds-dropdown'];

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
  get classNamesContent(): string {
    const classes = ['hds-dropdown__content'];

    // add a class based on the @listPosition argument
    classes.push(`hds-dropdown__content--position-${this.listPosition}`);

    // add a class based on the @width argument
    if (this.args.width) {
      classes.push('hds-dropdown__content--fixed-width');
    }

    return classes.join(' ');
  }

  @action
  didInsertList(element: HTMLUListElement): void {
    const checkmarkItems = element.querySelectorAll(`[role="option"]`);
    if (checkmarkItems.length) {
      const toggleButtonId = element
        .closest('.hds-dropdown')
        ?.querySelector('.hds-dropdown-toggle-button')
        ?.getAttribute('id');

      element.setAttribute('role', 'listbox');

      if (toggleButtonId) {
        element.setAttribute('aria-labelledby', toggleButtonId);
      }
    }
  }
}
