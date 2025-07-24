/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsButtonSignature } from '../../button/index.ts';
export interface HdsFormKeyValueInputsAddRowButtonSignature {
    Args: {
        onClick?: () => void;
        text?: HdsButtonSignature['Args']['text'];
    };
    Element: HdsButtonSignature['Element'];
}
export default class HdsFormKeyValueInputsAddRowButton extends Component<HdsFormKeyValueInputsAddRowButtonSignature> {
    get text(): string;
    onClick(): void;
}
