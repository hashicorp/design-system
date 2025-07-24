/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsButtonSignature } from '../../button/index.ts';
export interface HdsFormKeyValueInputsDeleteRowButtonSignature {
    Args: {
        onClick?: (rowData: unknown, rowIndex: number) => void;
        onInsert?: () => void;
        onRemove?: () => void;
        returnFocusTo?: HTMLFieldSetElement;
        rowData: unknown;
        rowIndex: number;
        text?: HdsButtonSignature['Args']['text'];
    };
    Element: HdsButtonSignature['Element'];
}
export default class HdsFormKeyValueInputsDeleteRowButton extends Component<HdsFormKeyValueInputsDeleteRowButtonSignature> {
    private _onInsert;
    get text(): string;
    onClick(): void;
}
