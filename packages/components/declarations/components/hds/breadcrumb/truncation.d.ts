/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsBreadcrumbTruncationSignature {
    Args: {
        ariaLabel?: string;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLLIElement;
}
export default class HdsBreadcrumbTruncation extends Component<HdsBreadcrumbTruncationSignature> {
    /**
     * @param ariaLabel
     * @type {string}
     * @default 'show more'
     */
    get ariaLabel(): string;
}
//# sourceMappingURL=truncation.d.ts.map