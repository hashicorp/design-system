/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsCopyButtonSizeValues } from './types.ts';
import type { HdsCopyButtonSizes } from './types.ts';
import type { HdsButtonSignature } from '../../button/';
import type { HdsClipboardModifierSignature } from '../../../../modifiers/hds-clipboard.ts';
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
export declare const DEFAULT_SIZE = HdsCopyButtonSizeValues.Medium;
export declare const SIZES: string[];
export declare const DEFAULT_ICON = "clipboard-copy";
export declare const SUCCESS_ICON = "clipboard-checked";
export declare const ERROR_ICON = "clipboard-x";
export declare const DEFAULT_STATUS = "idle";
export interface HdsCopyButtonSignature {
    Args: HdsButtonSignature['Args'] & {
        size?: HdsCopyButtonSizes;
        textToCopy?: HdsClipboardModifierSignature['Args']['Named']['text'];
        targetToCopy?: HdsClipboardModifierSignature['Args']['Named']['target'];
        onSuccess?: HdsClipboardModifierSignature['Args']['Named']['onSuccess'];
        onError?: HdsClipboardModifierSignature['Args']['Named']['onError'];
    };
    Element: HdsButtonSignature['Element'];
}
export default class HdsCopyButtonComponent extends Component<HdsCopyButtonSignature> {
    status: string;
    timer: ReturnType<typeof setTimeout> | undefined;
    /**
     * @param icon
     * @type {string}
     * @description The icon to be displayed for each status; automatically calculated based on the tracked property `status`.
     */
    get icon(): FlightIconSignature['Args']['name'];
    /**
     * @param size
     * @type {string}
     * @default medium
     * @description The size of the copy/button; acceptable values are `small` and `medium`
     */
    get size(): HdsCopyButtonSizes;
    /**
     * Get the class names to apply to the component.
     * @method CopyButton#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
    onSuccess(args: HdsClipboardModifierSignature['Args']['Named']['onSuccess']): void;
    onError(args: HdsClipboardModifierSignature['Args']['Named']['onError']): void;
    resetStatusDelayed(): void;
}
//# sourceMappingURL=index.d.ts.map