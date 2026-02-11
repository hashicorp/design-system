/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import HdsTextBody from '../../text/body.gts';
import HdsCopySnippet from '../../copy/snippet/index.gts';

import type { HdsCopySnippetSignature } from '../../copy/snippet/index.gts';

export interface HdsDropdownListItemCopyItemSignature {
  Args: {
    copyItemTitle?: string;
    isTruncated?: HdsCopySnippetSignature['Args']['isTruncated'];
    text: HdsCopySnippetSignature['Args']['textToCopy'];
  };
  Element: HTMLLIElement;
}

export default class HdsDropdownListItemCopyItem extends Component<HdsDropdownListItemCopyItemSignature> {
  get text(): HdsCopySnippetSignature['Args']['textToCopy'] {
    const { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::ListItem::CopyItem" must have a valid value',
      text !== undefined
    );

    return text;
  }

  get isTruncated(): HdsCopySnippetSignature['Args']['isTruncated'] {
    const { isTruncated = true } = this.args;

    return isTruncated;
  }

  get classNames(): string {
    const classes = [
      'hds-dropdown-list-item',
      'hds-dropdown-list-item--variant-copy-item',
    ];

    return classes.join(' ');
  }

  <template>
    <li class={{this.classNames}} ...attributes>
      {{#if @copyItemTitle}}
        <HdsTextBody
          class="hds-dropdown-list-item__copy-item-title"
          @tag="div"
          @size="100"
          @weight="semibold"
          @color="faint"
        >{{@copyItemTitle}}</HdsTextBody>
      {{/if}}
      <HdsCopySnippet
        @color="secondary"
        @textToCopy={{this.text}}
        @isTruncated={{this.isTruncated}}
      />
    </li>
  </template>
}
