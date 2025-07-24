/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsFormSectionMultiFieldGroupItemSignature {
    Args: {
        width?: string;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsFormSectionMultiFieldGroupItem extends Component<HdsFormSectionMultiFieldGroupItemSignature> {
    get widthStyle(): Record<string, string>;
}
