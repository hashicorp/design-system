/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import { or } from 'ember-truth-helpers';
import style from 'ember-style-modifier';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

import HdsPopoverPrimitive from '../popover-primitive/index.gts';
import HdsDropdownToggleButton from './toggle/button.gts';
import HdsDropdownToggleIcon from './toggle/icon.gts';
import HdsDropdownHeader from './header.gts';
import HdsDropdownFooter from './footer.gts';
import HdsDropdownListItemCheckbox from './list-item/checkbox.gts';
import HdsDropdownListItemCheckmark from './list-item/checkmark.gts';
import HdsDropdownListItemCopyItem from './list-item/copy-item.gts';
import HdsDropdownListItemDescription from './list-item/description.gts';
import HdsDropdownListItemGeneric from './list-item/generic.gts';
import HdsDropdownListItemInteractive from './list-item/interactive.gts';
import HdsDropdownListItemRadio from './list-item/radio.gts';
import HdsDropdownListItemSeparator from './list-item/separator.gts';
import HdsDropdownListItemTitle from './list-item/title.gts';
import {
  // map Dropdown's `listPosition` values to PopoverPrimitive's `placement` values
  HdsDropdownPositionToPlacementValues,
  // Dropdown's `listPosition` values
  HdsDropdownPositionValues,
} from './types.ts';

import type { ComponentLike } from '@glint/template';
import type { MenuPrimitiveSignature } from '../menu-primitive/index.gts';
import type { HdsDropdownFooterSignature } from './footer.gts';
import type { HdsDropdownHeaderSignature } from './header.gts';
import type { HdsDropdownListItemCheckboxSignature } from './list-item/checkbox.gts';
import type { HdsDropdownListItemCheckmarkSignature } from './list-item/checkmark.gts';
import type { HdsDropdownListItemCopyItemSignature } from './list-item/copy-item.gts';
import type { HdsDropdownListItemDescriptionSignature } from './list-item/description.gts';
import type { HdsDropdownListItemGenericSignature } from './list-item/generic.gts';
import type { HdsDropdownListItemInteractiveSignature } from './list-item/interactive.gts';
import type { HdsDropdownListItemRadioSignature } from './list-item/radio.gts';
import type { HdsDropdownListItemSeparatorSignature } from './list-item/separator.gts';
import type { HdsDropdownListItemTitleSignature } from './list-item/title.gts';
import type { HdsDropdownToggleButtonSignature } from './toggle/button.gts';
import type { HdsDropdownToggleIconSignature } from './toggle/icon.gts';
import type { HdsDropdownPositions } from './types.ts';

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

  <template>
    <HdsPopoverPrimitive
      @isOpen={{@isOpen}}
      @onClose={{@onClose}}
      @enableClickEvents={{true}}
      as |PP|
    >
      <div
        class={{this.classNames}}
        ...attributes
        {{PP.setupPrimitiveContainer}}
      >
        {{yield
          (hash
            ToggleButton=(component
              HdsDropdownToggleButton
              isOpen=PP.isOpen
              setupPrimitiveToggle=PP.setupPrimitiveToggle
            )
            ToggleIcon=(component
              HdsDropdownToggleIcon
              isOpen=PP.isOpen
              setupPrimitiveToggle=PP.setupPrimitiveToggle
            )
          )
        }}
        <div
          tabindex="-1"
          class={{this.classNamesContent}}
          {{style width=@width max-height=@height}}
          {{PP.setupPrimitivePopover
            anchoredPositionOptions=this.anchoredPositionOptions
          }}
        >
          {{#if (or PP.isOpen @preserveContentInDom)}}
            {{yield (hash Header=HdsDropdownHeader)}}
            <ul class="hds-dropdown__list" {{didInsert this.didInsertList}}>
              {{yield
                (hash
                  close=PP.hidePopover
                  Checkbox=HdsDropdownListItemCheckbox
                  Checkmark=HdsDropdownListItemCheckmark
                  CopyItem=HdsDropdownListItemCopyItem
                  Description=HdsDropdownListItemDescription
                  Generic=HdsDropdownListItemGeneric
                  Interactive=HdsDropdownListItemInteractive
                  Radio=HdsDropdownListItemRadio
                  Separator=HdsDropdownListItemSeparator
                  Title=HdsDropdownListItemTitle
                )
              }}
            </ul>
            {{yield (hash close=PP.hidePopover Footer=HdsDropdownFooter)}}
          {{/if}}
        </div>
      </div>
    </HdsPopoverPrimitive>
  </template>
}
