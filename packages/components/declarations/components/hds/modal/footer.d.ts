/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsModalFooterSignature {
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
export default class HdsModalFooter extends Component<HdsModalFooterSignature> {
    constructor(owner: unknown, args: HdsModalFooterSignature['Args']);
}
//# sourceMappingURL=footer.d.ts.map