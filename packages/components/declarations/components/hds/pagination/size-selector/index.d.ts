/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
interface HdsPaginationSizeSelectorSignature {
    Args: {
        pageSizes: number[];
        label?: string;
        selectedSize?: number;
        onChange?: (size: number) => void;
    };
    Element: HTMLDivElement;
}
export default class HdsPaginationSizeSelector extends Component<HdsPaginationSizeSelectorSignature> {
    SizeSelectorId: string;
    get pageSizes(): number[];
    get selectedSize(): number | undefined;
    get label(): string;
    onChange(e: Event): void;
}
export {};
//# sourceMappingURL=index.d.ts.map