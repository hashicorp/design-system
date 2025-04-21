/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

import HdsTextBody from '../../text/body.gts';

export interface HdsFormSuperSelectOptionGroupSignature {
  Args: {
    group: {
      groupName?: string;
    };
  };
  Blocks: {
    default: [];
  };
}

export default class HdsFormSuperSelectOptionGroup extends Component<HdsFormSuperSelectOptionGroupSignature> {
  /**
   * Generates a unique ID for the group title
   * @return {string}
   * @param _groupTitleId
   */
  private _groupTitleId = 'group-title-' + guidFor(this);

  <template>
    <li
      class="hds-form-super-select__option-group"
      role="group"
      aria-labelledby={{this._groupTitleId}}
    >
      <HdsTextBody
        @tag="div"
        @size="100"
        @weight="semibold"
        class="hds-form-super-select__option-group-title"
        id={{this._groupTitleId}}
      >
        {{@group.groupName}}
      </HdsTextBody>
      {{yield}}
    </li>
  </template>
}
