/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsCopySnippetSignature } from '../../copy/snippet';
export interface HdsDropdownListItemCopyItemSignature {
    Args: {
        copyItemTitle?: string;
        isTruncated?: HdsCopySnippetSignature['Args']['isTruncated'];
        text: HdsCopySnippetSignature['Args']['textToCopy'];
    };
    Element: HTMLLIElement;
}
export default class HdsDropdownListItemCopyItem extends Component<HdsDropdownListItemCopyItemSignature> {
    /**
     * @param text
     * @type {string}
     * @description The text of the item. If no text value is defined an error will be thrown
     */
    get text(): HdsCopySnippetSignature['Args']['textToCopy'];
    /**
     * @param isTruncated
     * @type {boolean}
     * @default true
     * @description Indicates that the text should be truncated instead of wrapping and using multiple lines.
     */
    get isTruncated(): HdsCopySnippetSignature['Args']['isTruncated'];
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=copy-item.d.ts.map