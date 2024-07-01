/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsDisclosurePrimitiveSignature {
    Args: {
        isOpen?: boolean;
        onClose?: (...args: any[]) => void;
    };
    Blocks: {
        toggle: [
            {
                isOpen: boolean;
                onClickToggle: (...args: any[]) => void;
            }
        ];
        content: [
            {
                close: (...args: any[]) => void;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsDisclosurePrimitiveComponent extends Component<HdsDisclosurePrimitiveSignature> {
    isOpen: boolean;
    onClickToggle(): void;
    close(): void;
}
//# sourceMappingURL=index.d.ts.map