/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type HdsAdvancedTableColumn from './models/column';
import type Owner from '@ember/owner';
export interface HdsAdvancedTableThResizeFormSignature {
    Args: {
        column: HdsAdvancedTableColumn;
        labelId: string;
        onClose: () => void;
    };
    Blocks: {
        default?: [];
    };
    Element: HTMLFormElement;
}
export default class HdsAdvancedTableThResizeForm extends Component<HdsAdvancedTableThResizeFormSignature> {
    originalColumnPxWidth: number;
    constructor(owner: Owner, args: HdsAdvancedTableThResizeFormSignature['Args']);
    resizeColumn(width: number): void;
    handleKeyup(event: KeyboardEvent): void;
    handleCancel(): void;
    handleSubmit(event: Event): void;
}
