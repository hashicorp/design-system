/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import HdsTextBody from '../../text/body.gts';

import type { HdsTextBodySignature } from '../../text/body';

export interface HdsDropdownListItemDescriptionSignature {
  Args: {
    text: string;
  };
  Element: HdsTextBodySignature['Element'];
}

export default class HdsDropdownListItemDescription extends Component<HdsDropdownListItemDescriptionSignature> {
  get text(): string {
    const { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::ListItem::Description" must have a valid value',
      text !== undefined
    );

    return text;
  }

  <template>
    <HdsTextBody
      class="hds-dropdown-list-item hds-dropdown-list-item--variant-description"
      @tag="li"
      @size="100"
      @weight="regular"
      @color="faint"
      ...attributes
    >
      {{this.text}}
    </HdsTextBody>
  </template>
}
