/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsIconSignature } from '../../icon/index.ts';
import type { HdsInteractiveSignature } from '../../interactive';
import type { HdsPaginationDirections, HdsPaginationDirectionAriaLabels, HdsPaginationDirectionLabels } from '../types';
interface HdsPaginationControlArrowContent {
    label: HdsPaginationDirectionLabels;
    icon: HdsIconSignature['Args']['name'];
    ariaLabel: HdsPaginationDirectionAriaLabels;
}
interface HdsPaginationControlArrowArgs {
    direction: HdsPaginationDirections;
    disabled?: boolean;
    showLabel?: boolean;
    onClick?: (direction: HdsPaginationDirections) => void;
}
export interface HdsPaginationControlArrowSignature {
    Args: HdsPaginationControlArrowArgs & HdsInteractiveSignature['Args'];
    Element: HdsInteractiveSignature['Element'];
}
export declare const DIRECTIONS: HdsPaginationDirections[];
export default class HdsPaginationControlArrow extends Component<HdsPaginationControlArrowSignature> {
    get content(): HdsPaginationControlArrowContent;
    get showLabel(): boolean;
    get classNames(): string;
    onClick(): void;
}
export {};
//# sourceMappingURL=arrow.d.ts.map