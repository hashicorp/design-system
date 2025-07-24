/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsFormKeyValueInputsGenericSignature {
    Args: {
        onInsert?: () => void;
        onRemove?: () => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsFormKeyValueInputsGeneric extends Component<HdsFormKeyValueInputsGenericSignature> {
    private _onInsert;
}
