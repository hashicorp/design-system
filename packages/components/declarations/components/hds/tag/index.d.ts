/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsTagColorValues } from './types.ts';
import type { HdsTagColors } from './types.ts';
import type { HdsInteractiveSignature } from '../interactive/';
export declare const COLORS: string[];
export declare const DEFAULT_COLOR = HdsTagColorValues.Primary;
interface HdsTagSignature {
    Args: HdsInteractiveSignature['Args'] & {
        color?: HdsTagColors;
        text: string;
        ariaLabel?: string;
        onDismiss?: (event: MouseEvent, ...args: any[]) => void;
    };
    Element: HTMLSpanElement;
}
export default class HdsTagComponent extends Component<HdsTagSignature> {
    /**
     * @param onDismiss
     * @type {function}
     * @default () => {}
     */
    get onDismiss(): ((event: MouseEvent, ...args: any[]) => void) | false;
    /**
     * @param text
     * @type {string}
     * @description The text of the tag. If no text value is defined, an error will be thrown.
     */
    get text(): string;
    /**
     * @param ariaLabel
     * @type {string}
     * @default 'Dismiss'
     */
    get ariaLabel(): string;
    /**
     * @param color
     * @type {string}
     * @default primary
     * @description Determines the color of link to be used; acceptable values are `primary` and `secondary`
     */
    get color(): HdsTagColors | false;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
export {};
//# sourceMappingURL=index.d.ts.map