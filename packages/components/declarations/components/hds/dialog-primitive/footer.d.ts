/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsDialogPrimitiveFooterSignature {
    Args: {
        contextualClass?: string;
        onDismiss?: (event: MouseEvent, ...args: any[]) => void;
    };
    Blocks: {
        default: [
            {
                close: (event: MouseEvent, ...args: any[]) => void;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsDialogPrimitiveFooter extends Component<HdsDialogPrimitiveFooterSignature> {
    get onDismiss(): (event: MouseEvent, ...args: any[]) => void;
}
//# sourceMappingURL=footer.d.ts.map