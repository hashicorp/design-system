/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
interface HdsFlyoutFooterSignature {
    Args: {
        onDismiss?: (event: MouseEvent) => void;
    };
    Blocks: {
        default: [{
            close?: (event: MouseEvent) => void;
        }];
    };
    Element: HTMLDivElement;
}
export default class HdsFlyoutFooter extends Component<HdsFlyoutFooterSignature> {
    constructor(owner: unknown, args: HdsFlyoutFooterSignature['Args']);
}
export {};
//# sourceMappingURL=footer.d.ts.map