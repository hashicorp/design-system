/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

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
}
