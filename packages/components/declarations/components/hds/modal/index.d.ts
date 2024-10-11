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
    isDismissDisabled: boolean;
    element: HTMLDialogElement;
    body: HTMLElement;
    bodyInitialOverflowValue: string;
    /**
     * Sets the size of the modal dialog
     * Accepted values: small, medium, large
     *
     * @param size
     * @type {string}
     * @default 'medium'
     */
    get size(): HdsModalSizes;
    /**
     * Sets the color of the modal dialog
     * Accepted values: neutral, warning, critical
     *
     * @param color
     * @type {string}
     * @default 'neutral'
     */
    get color(): HdsModalColors;
    /**
     * Calculates the unique ID to assign to the title
     */
    get id(): string;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
    registerOnCloseCallback(event: Event): void;
    didInsert(element: HTMLDialogElement): void;
    willDestroyNode(): void;
    open(): void;
    onDismiss(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map