/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsFormHeaderTitleTags } from '../types.ts';
import { HdsFormHeaderTitleTagValues } from '../types.ts';
import { HdsTextSizeValues } from '../../text/types.ts';
import type { HdsTextDisplaySignature } from '../../text/display.ts';
export declare const DEFAULT_SIZE = HdsTextSizeValues.FourHundred;
export declare const DEFAULT_TAG = HdsFormHeaderTitleTagValues.Div;
export declare const TAGS: HdsFormHeaderTitleTags[];
export interface HdsFormHeaderTitleSignature {
    Args: {
        tag?: HdsFormHeaderTitleTags;
        size?: HdsTextDisplaySignature['Args']['size'];
    };
    Blocks: {
        default: [];
    };
    Element: HdsTextDisplaySignature['Element'];
}
export default class HdsFormHeaderTitle extends Component<HdsFormHeaderTitleSignature> {
    get tag(): HdsFormHeaderTitleTags;
    get size(): HdsTextDisplaySignature['Args']['size'];
}
