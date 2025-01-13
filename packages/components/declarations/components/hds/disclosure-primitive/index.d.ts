/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsDisclosurePrimitiveSignature {
    Args: {
        isOpen?: boolean;
        onClose?: (...args: any[]) => void;
        onClickToggle?: (...args: any[]) => void;
    };
    Blocks: {
        toggle: [
            {
                contentId: string;
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
export default class HdsDisclosurePrimitive extends Component<HdsDisclosurePrimitiveSignature> {
    private _isOpen;
    private _isControlled;
    private _contentId;
    get isOpen(): boolean;
    set isOpen(value: boolean);
    onClickToggle(): void;
    onStateChange(): void;
    close(): void;
}
//# sourceMappingURL=index.d.ts.map