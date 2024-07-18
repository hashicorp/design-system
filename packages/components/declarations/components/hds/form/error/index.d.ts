/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsFormErrorMessageSignature } from './message';
export declare const ID_PREFIX = "error-";
export interface HdsFormErrorSignature {
    Args: {
        contextualClass?: string;
        controlId?: string;
        onInsert?: (element: HTMLElement, ...args: any[]) => void;
        onRemove?: (element: HTMLElement, ...args: any[]) => void;
    };
    Blocks: {
        default: [
            {
                Message?: ComponentLike<HdsFormErrorMessageSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsFormErrorComponent extends Component<HdsFormErrorSignature> {
    /**
     * Determines the unique ID to assign to the element
     * @method id
     * @return {(string|null)} The "id" attribute to apply to the element or null, if no controlId is provided
     */
    get id(): string | null;
    /**
     * @param onInsert
     * @type {function}
     * @default () => {}
     */
    get onInsert(): (element: HTMLElement, ...args: any[]) => void;
    /**
     * @param onRemove
     * @type {function}
     * @default () => {}
     */
    get onRemove(): (element: HTMLElement, ...args: any[]) => void;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map