/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import type { HdsModalSizes, HdsModalColors } from './types.ts';
import HdsDialogPrimitiveHeaderComponent from '../dialog-primitive/header.ts';
import HdsDialogPrimitiveBodyComponent from '../dialog-primitive/body.ts';
import HdsDialogPrimitiveFooterComponent from '../dialog-primitive/footer.ts';
import { HdsModalSizeValues, HdsModalColorValues } from './types.ts';
export declare const DEFAULT_SIZE = HdsModalSizeValues.Medium;
export declare const DEFAULT_COLOR = HdsModalColorValues.Neutral;
export declare const SIZES: string[];
export declare const COLORS: string[];
export interface HdsModalSignature {
    Args: {
        isDismissDisabled?: boolean;
        size?: HdsModalSizes;
        color?: HdsModalColors;
        returnFocusTo?: string;
        onOpen?: () => void;
        onClose?: (event: Event) => void;
    };
    Blocks: {
        default: [
            {
                Header?: WithBoundArgs<typeof HdsDialogPrimitiveHeaderComponent, 'id' | 'onDismiss' | 'contextualClassPrefix'>;
                Body?: WithBoundArgs<typeof HdsDialogPrimitiveBodyComponent, 'contextualClass'>;
                Footer?: WithBoundArgs<typeof HdsDialogPrimitiveFooterComponent, 'onDismiss' | 'contextualClass'>;
            }
        ];
    };
    Element: HTMLDialogElement;
}
export default class HdsModal extends Component<HdsModalSignature> {
    isOpen: boolean;
    element: HTMLDialogElement;
    body: HTMLElement;
    bodyInitialOverflowValue: string;
    get isDismissDisabled(): boolean;
    get size(): HdsModalSizes;
    get color(): HdsModalColors;
    get id(): string;
    get classNames(): string;
    registerOnCloseCallback(event: Event): void;
    didInsert(element: HTMLDialogElement): void;
    willDestroyNode(): void;
    open(): void;
    onDismiss(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map