/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import { getElementId } from '../../../../utils/hds-get-element-id.ts';
import HdsFormRadioBase from '../../form/radio/base.gts';
import HdsIcon from '../../icon/index.gts';
import HdsTextBody from '../../text/body.gts';

import type { HdsIconSignature } from '../../icon';
import type { HdsFormRadioBaseSignature } from '../../form/radio/base.gts';

export interface HdsDropdownListItemRadioSignature {
  Args: HdsFormRadioBaseSignature['Args'] & {
    count?: string | number;
    icon?: HdsIconSignature['Args']['name'];
  };
  Blocks: {
    default: [];
  };
  Element: HdsFormRadioBaseSignature['Element'];
}

export default class HdsDropdownListItemRadio extends Component<HdsDropdownListItemRadioSignature> {
  /**
   * Determines the unique ID to assign to the radio control
   */
  get id(): string {
    return getElementId(this);
  }

  <template>
    <li class="hds-dropdown-list-item hds-dropdown-list-item--variant-radio">
      <label
        class="hds-dropdown-list-item__label hds-typography-body-200"
        for={{this.id}}
      >
        <HdsFormRadioBase
          class="hds-dropdown-list-item__control"
          id={{this.id}}
          @value={{@value}}
          ...attributes
        />
        {{#if @icon}}
          <div class="hds-dropdown-list-item__icon">
            <HdsIcon @name={{@icon}} />
          </div>
        {{/if}}
        <span class="hds-dropdown-list-item__text-content">{{yield}}</span>

        {{#if @count}}
          <HdsTextBody
            class="hds-dropdown-list-item__count"
            @tag="span"
            @size="100"
            @weight="medium"
          >
            {{@count}}
          </HdsTextBody>
        {{/if}}
      </label>
    </li>
  </template>
}
