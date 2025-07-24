/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsFormSeparatorSignature {
    Args: {
        isFullWidth?: boolean;
    };
    Element: HTMLElement;
}
export default class HdsFormSeparator extends Component<HdsFormSeparatorSignature> {
    get classNames(): string;
}
