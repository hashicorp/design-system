/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTextBodySignature } from '../../text/body';
export declare const ID_PREFIX = "helper-text-";
export interface HdsFormHelperTextSignature {
    Args: {
        contextualClass?: string;
        controlId?: string;
        onInsert?: (element: HTMLElement, ...args: any[]) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HdsTextBodySignature['Element'];
}
export default class HdsFormHelperTextComponent extends Component<HdsFormHelperTextSignature> {
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
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map