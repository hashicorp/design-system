/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsLayoutFlexItemSignature } from './item.ts';
import { HdsLayoutFlexDirectionValues, HdsLayoutFlexGapValues } from './types.ts';
import type { HdsLayoutFlexDirections, HdsLayoutFlexJustifys, HdsLayoutFlexAligns, HdsLayoutFlexGaps, AvailableTagNames, AvailableElements } from './types.ts';
export declare const DEFAULT_DIRECTION = HdsLayoutFlexDirectionValues.Row;
export declare const DIRECTIONS: HdsLayoutFlexDirections[];
export declare const JUSTIFYS: HdsLayoutFlexJustifys[];
export declare const ALIGNS: HdsLayoutFlexAligns[];
export declare const DEFAULT_GAP = HdsLayoutFlexGapValues['Zero'];
export declare const GAPS: HdsLayoutFlexGaps[];
export interface HdsLayoutFlexSignature {
    Args: {
        tag?: AvailableTagNames;
        direction?: HdsLayoutFlexDirections;
        justify?: HdsLayoutFlexJustifys;
        align?: HdsLayoutFlexAligns;
        wrap?: boolean;
        gap?: HdsLayoutFlexGaps | [HdsLayoutFlexGaps, HdsLayoutFlexGaps];
        isInline?: boolean;
    };
    Blocks: {
        default: [
            {
                Item?: ComponentLike<HdsLayoutFlexItemSignature>;
            }
        ];
    };
    Element: AvailableElements;
}
export default class HdsLayoutFlex extends Component<HdsLayoutFlexSignature> {
    get componentTag(): AvailableTagNames;
    get direction(): HdsLayoutFlexDirections;
    get justify(): HdsLayoutFlexJustifys | undefined;
    get align(): HdsLayoutFlexAligns | undefined;
    get gap(): [HdsLayoutFlexGaps] | [HdsLayoutFlexGaps, HdsLayoutFlexGaps] | undefined;
    get classNames(): string;
}
