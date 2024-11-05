/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

import {
  // map Dropdown's `listPosition` values to PopoverPrimitive's `placement` values
  HdsDropdownPositionToPlacementValues,
  // Dropdown's `listPosition` values
  HdsDropdownPositionValues,
} from './types.ts';

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

import type { FloatingUIOptions } from '../../../modifiers/hds-anchored-position.ts';

export const DEFAULT_POSITION = HdsDropdownPositionValues.BottomRight;
export const POSITIONS: string[] = Object.values(HdsDropdownPositionValues);

export interface HdsDropdownSignature {
  Args: MenuPrimitiveSignature['Args'] & {
    height?: string;
    isInline?: boolean;
    isOpen?: boolean;
    listPosition?: HdsDropdownPositions;
    width?: string;
    enableCollisionDetection?: FloatingUIOptions['enableCollisionDetection'];
    preserveContentInDom?: boolean;
    matchToggleWidth?: boolean;
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

export default class HdsDropdown extends Component<HdsDropdownSignature> {
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

  get enableCollisionDetection(): FloatingUIOptions['enableCollisionDetection'] {
    return this.args.enableCollisionDetection ?? false;
  }

  get matchToggleWidth(): FloatingUIOptions['matchToggleWidth'] {
    return this.args.matchToggleWidth ?? false;
  }

  get anchoredPositionOptions(): {
    placement: FloatingUIOptions['placement'];
    offsetOptions: FloatingUIOptions['offsetOptions'];
    enableCollisionDetection: FloatingUIOptions['enableCollisionDetection'];
    matchToggleWidth: FloatingUIOptions['matchToggleWidth'];
  } {
    // custom options specific for the `RichTooltip` component
    // for details see the `hds-anchored-position` modifier
    return {
      placement: HdsDropdownPositionToPlacementValues[this.listPosition],
      offsetOptions: 4,
      enableCollisionDetection: this.enableCollisionDetection ? 'flip' : false,
      matchToggleWidth: this.matchToggleWidth,
    };
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
    // TODO: we preserved these classes to avoid introducing breaking changes for consumers who rely on these classes for tests, but we aim to remove them in the next major release
    // context: https://github.com/hashicorp/design-system/pull/2309#discussion_r1706941892
    classes.push(`hds-dropdown__content--position-${this.listPosition}`);

    // add a class based on the @width or @matchToggleWidth arguments
    if (this.args.width || this.args.matchToggleWidth) {
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
