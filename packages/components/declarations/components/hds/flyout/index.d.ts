/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import type { HdsFlyoutSizes } from './types.ts';
import { HdsFlyoutSizesValues } from './types.ts';
import HdsDialogPrimitiveBodyComponent from '../dialog-primitive/body.ts';
import HdsDialogPrimitiveDescriptionComponent from '../dialog-primitive/description.ts';
import HdsDialogPrimitiveFooterComponent from '../dialog-primitive/footer.ts';
import HdsDialogPrimitiveHeaderComponent from '../dialog-primitive/header.ts';
export declare const DEFAULT_SIZE = HdsFlyoutSizesValues.Medium;
export declare const DEFAULT_HAS_OVERLAY = true;
export declare const SIZES: string[];
export interface HdsFlyoutSignature {
    Args: {
        size?: HdsFlyoutSizes;
        returnFocusTo?: string;
        onOpen?: () => void;
        onClose?: (event: Event) => void;
    };
    Blocks: {
        default: [
            {
                Header?: WithBoundArgs<typeof HdsDialogPrimitiveHeaderComponent, 'id' | 'onDismiss' | 'contextualClassPrefix'>;
                Description?: WithBoundArgs<typeof HdsDialogPrimitiveDescriptionComponent, 'contextualClass'>;
                Body?: WithBoundArgs<typeof HdsDialogPrimitiveBodyComponent, 'contextualClass'>;
                Footer?: WithBoundArgs<typeof HdsDialogPrimitiveFooterComponent, 'onDismiss' | 'contextualClass'>;
            }
        ];
    };
    Element: HTMLDialogElement;
}
export default class HdsFlyout extends Component<HdsFlyoutSignature> {
    isOpen: boolean;
    element: HTMLDialogElement;
    body: HTMLElement;
    bodyInitialOverflowValue: string;
    /**
     * Sets the size of the flyout
     * Accepted values: medium, large
     *
     * @param size
     * @type {string}
     * @default 'medium'
     */
    get size(): HdsFlyoutSizes;
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