/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import { action } from '@ember/object';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import Component from '@glimmer/component';
import style from 'ember-style-modifier';
import { or } from 'ember-truth-helpers';

import HdsPopoverPrimitive from '../popover-primitive/index.gts';
import HdsDropdownFooter from './footer.gts';
import HdsDropdownHeader from './header.gts';
import HdsDropdownListItemCheckbox from './list-item/checkbox.gts';
import HdsDropdownListItemCheckmark from './list-item/checkmark.gts';
import HdsDropdownListItemCopyItem from './list-item/copy-item.gts';
import HdsDropdownListItemDescription from './list-item/description.gts';
import HdsDropdownListItemGeneric from './list-item/generic.gts';
import HdsDropdownListItemInteractive from './list-item/interactive.gts';
import HdsDropdownListItemRadio from './list-item/radio.gts';
import HdsDropdownListItemSeparator from './list-item/separator.gts';
import HdsDropdownListItemTitle from './list-item/title.gts';
import HdsDropdownToggleButton from './toggle/button.gts';
import HdsDropdownToggleIcon from './toggle/icon.gts';
import {
  // map Dropdown's `listPosition` values to PopoverPrimitive's `placement` values
  HdsDropdownPositionToPlacementValues,
  // Dropdown's `listPosition` values
  HdsDropdownPositionValues,
} from './types.ts';

import type { MenuPrimitiveSignature } from '../menu-primitive/index.gts';
import type { HdsDropdownPositions } from './types.ts';

import type { HdsAnchoredPositionOptions } from '../../../modifiers/hds-anchored-position.ts';
import type { WithBoundArgs } from '@glint/template';

export const DEFAULT_POSITION = HdsDropdownPositionValues.BottomRight;
export const POSITIONS: HdsDropdownPositions[] = Object.values(
  HdsDropdownPositionValues
);

export interface HdsDropdownSignature {
  Args: MenuPrimitiveSignature['Args'] & {
    height?: string;
    isInline?: boolean;
    isOpen?: boolean;
    listPosition?: HdsDropdownPositions;
    width?: string;
    enableCollisionDetection?: HdsAnchoredPositionOptions['enableCollisionDetection'];
    preserveContentInDom?: boolean;
    matchToggleWidth?: boolean;
  };
  Blocks: {
    default: [
      {
        Footer?: typeof HdsDropdownFooter;
        Header?: typeof HdsDropdownHeader;
        Checkbox?: typeof HdsDropdownListItemCheckbox;
        Checkmark?: typeof HdsDropdownListItemCheckmark;
        CopyItem?: typeof HdsDropdownListItemCopyItem;
        Description?: typeof HdsDropdownListItemDescription;
        Generic?: typeof HdsDropdownListItemGeneric;
        Interactive?: typeof HdsDropdownListItemInteractive;
        Radio?: typeof HdsDropdownListItemRadio;
        Separator?: typeof HdsDropdownListItemSeparator;
        Title?: typeof HdsDropdownListItemTitle;
        ToggleButton?: WithBoundArgs<
          typeof HdsDropdownToggleButton,
          'isOpen' | 'setupPrimitiveToggle'
        >;
        ToggleIcon?: WithBoundArgs<
          typeof HdsDropdownToggleIcon,
          'isOpen' | 'setupPrimitiveToggle'
        >;
        close?: (event?: Event) => void;
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

  get enableCollisionDetection(): HdsAnchoredPositionOptions['enableCollisionDetection'] {
    return this.args.enableCollisionDetection ?? false;
  }

  get matchToggleWidth(): HdsAnchoredPositionOptions['matchToggleWidth'] {
    return this.args.matchToggleWidth ?? false;
  }

  get anchoredPositionOptions(): {
    placement: HdsAnchoredPositionOptions['placement'];
    offsetOptions: HdsAnchoredPositionOptions['offsetOptions'];
    enableCollisionDetection: HdsAnchoredPositionOptions['enableCollisionDetection'];
    matchToggleWidth: HdsAnchoredPositionOptions['matchToggleWidth'];
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
            close=PP.hidePopover
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
            {{yield (hash Header=HdsDropdownHeader close=PP.hidePopover)}}
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
