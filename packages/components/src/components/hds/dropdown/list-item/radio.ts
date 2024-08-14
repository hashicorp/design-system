/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { getElementId } from '../../../../utils/hds-get-element-id.ts';
import type { HdsIconSignature } from '../../icon';
import type { HdsFormRadioBaseSignature } from '../../form/radio/base.ts';

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

export default class HdsDropdownListItemRadioComponent extends Component<HdsDropdownListItemRadioSignature> {
  /**
   * Determines the unique ID to assign to the radio control
   */
  get id(): string {
    return getElementId(this);
  }
}
