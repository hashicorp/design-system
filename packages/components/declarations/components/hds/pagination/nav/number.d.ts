/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsInteractiveSignature } from '../../interactive';
interface HdsPaginationNavNumberArgs {
    page: number;
    onClick: (page: number) => void;
    isSelected: boolean;
}
interface HdsPaginationNavNumberSignature {
    Args: HdsPaginationNavNumberArgs & HdsInteractiveSignature['Args'];
    Element: HdsInteractiveSignature['Element'];
}
export default class HdsPaginationControlNumber extends Component<HdsPaginationNavNumberSignature> {
    get page(): number;
    get classNames(): string;
    onClick(): void;
}
export {};
//# sourceMappingURL=number.d.ts.map