/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsCopySnippetColorValues } from './types.ts';
import type { HdsCopySnippetColors } from './types.ts';
import type { HdsClipboardModifierSignature } from '../../../../modifiers/hds-clipboard.ts';
import type { HdsIconSignature } from '../../icon';
export declare const DEFAULT_COLOR = HdsCopySnippetColorValues.Primary;
export declare const COLORS: string[];
export declare const DEFAULT_ICON = "clipboard-copy";
export declare const SUCCESS_ICON = "clipboard-checked";
export declare const ERROR_ICON = "clipboard-x";
export declare const DEFAULT_STATUS = "idle";
export interface HdsCopySnippetSignature {
    Args: {
        color?: HdsCopySnippetColors;
        isFullWidth?: boolean;
        textToCopy: HdsClipboardModifierSignature['Args']['Named']['text'];
        isTruncated?: boolean;
        onSuccess?: HdsClipboardModifierSignature['Args']['Named']['onSuccess'];
        onError?: HdsClipboardModifierSignature['Args']['Named']['onError'];
    };
    Element: HTMLButtonElement;
}
export default class HdsCopySnippet extends Component<HdsCopySnippetSignature> {
    private _status;
    private _timer;
    /**
     * @method textToShow
     * @return {string}
     */
    get textToShow(): string;
    /**
     * @param icon
     * @type {string}
     * @default clipboard-copy
     * @description Determines the icon to be used, based on the success state. Note that this is auto-tracked because it depends on a tracked property (status).
     */
    get icon(): HdsIconSignature['Args']['name'];
    /**
     * @param color
     * @type {string}
     * @default primary
     * @description Determines the color of button to be used; acceptable values are `primary` and `secondary`
     */
    get color(): HdsCopySnippetColors;
    /**
     * @param isFullWidth
     * @type {boolean}
     * @default false
     * @description Indicates that the component should take up the full width of the parent container.
     */
    get isFullWidth(): boolean;
    /**
     * @param isTruncated
     * @type {boolean}
     * @default false
     * @description Indicates that the component should be truncated instead of wrapping text and using multiple lines.
     */
    get isTruncated(): boolean;
    /**
     * Get the class names to apply to the component.
     * @method CopySnippet#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
    onSuccess(args: HdsClipboardModifierSignature['Args']['Named']['onSuccess']): void;
    onError(args: HdsClipboardModifierSignature['Args']['Named']['onError']): void;
    resetStatusDelayed(): void;
}
//# sourceMappingURL=index.d.ts.map