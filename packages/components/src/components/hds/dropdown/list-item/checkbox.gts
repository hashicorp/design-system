/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import { getElementId } from '../../../../utils/hds-get-element-id.ts';
import HdsFormCheckboxBase from '../../form/checkbox/base.gts';
import HdsIcon from '../../icon/index.gts';

import type { HdsFormCheckboxBaseSignature } from '../../form/checkbox/base.gts';
import type { HdsIconSignature } from '../../icon';
import HdsTextBody from '../../text/body.gts';

export interface HdsDropdownListItemCheckboxSignature {
  Args: HdsFormCheckboxBaseSignature['Args'] & {
    count?: string | number;
    icon?: HdsIconSignature['Args']['name'];
  };
  Blocks: {
    default: [];
  };
  Element: HdsFormCheckboxBaseSignature['Element'];
}

export default class HdsDropdownListItemCheckbox extends Component<HdsDropdownListItemCheckboxSignature> {
  /**
   * Determines the unique ID to assign to the checkbox control
   */
  get id(): string {
    return getElementId(this);
  }

  <template>
    <li class="hds-dropdown-list-item hds-dropdown-list-item--variant-checkbox">
      <label
        class="hds-dropdown-list-item__label hds-typography-body-200"
        for={{this.id}}
      >
        <HdsFormCheckboxBase
          class="hds-dropdown-list-item__control"
          id={{this.id}}
          @value={{@value}}
          ...attributes
        />
        {{#if @icon}}
          <span class="hds-dropdown-list-item__icon">
            <HdsIcon @name={{@icon}} />
          </span>
        {{/if}}
        <HdsTextBody
          @tag="span"
          @size="200"
          @weight="medium"
          class="hds-dropdown-list-item__text-content"
        >{{yield}}</HdsTextBody>
        {{#if @count}}
          <HdsTextBody
            @tag="span"
            @size="100"
            @weight="medium"
            class="hds-dropdown-list-item__count"
          >{{@count}}</HdsTextBody>
        {{/if}}
      </label>
    </li>
  </template>
}
