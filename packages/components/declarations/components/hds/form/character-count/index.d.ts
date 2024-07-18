/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTextBodySignature } from '../../text/body';
interface HdsFormCharacterCountSignature {
    Args: {
        contextualClass?: string;
        controlId?: string;
        maxLength?: number | string;
        minLength?: number | string;
        onInsert?: (element: HTMLElement, ...args: any[]) => void;
        value?: string;
    };
    Blocks: {
        default?: [
            {
                minLength?: number;
                maxLength?: number;
                currentLength?: number;
                remaining?: number;
                shortfall?: number;
            }
        ];
    };
    Element: HdsTextBodySignature['Element'];
}
export default class HdsFormCharacterCountComponent extends Component<HdsFormCharacterCountSignature> {
    get currentLength(): number;
    private _pluralize;
    /**
     * @param maxLength
     * @type {number}
     * @default null
     * @description The maximum number of characters allowed.
     */
    get maxLength(): number | undefined;
    /**
     * @param minLength
     * @type {number}
     * @default null
     * @description The minimum number of characters allowed.
     */
    get minLength(): number | undefined;
    /**
     * @param remaining
     * @type {number}
     * @default null
     * @description The remaining number of characters.
     */
    get remaining(): number | undefined;
    /**
     * @param shortfall
     * @type {number}
     * @default null
     * @description The number of characters the content is falling short of.
     */
    get shortfall(): number | undefined;
    /**
     * @param message
     * @type {string}
     * @default null
     * @description The character count message presented to users
     */
    get message(): string;
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
export {};
//# sourceMappingURL=index.d.ts.map