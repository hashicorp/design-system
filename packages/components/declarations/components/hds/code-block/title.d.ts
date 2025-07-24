/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsCodeBlockTitleTags } from './types';
import type { HdsTextBodySignature } from '../text/body';
type HdsCodeBlockTitleElement = HdsTextBodySignature['Element'];
export interface HdsCodeBlockTitleSignature {
    Args: {
        tag?: HdsCodeBlockTitleTags;
        didInsertNode: (element: HdsCodeBlockTitleElement) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HdsTextBodySignature['Element'];
}
export default class HdsCodeBlockTitle extends Component<HdsCodeBlockTitleSignature> {
    private _id;
    private _setUpTitle;
    get componentTag(): HdsCodeBlockTitleTags;
}
export {};
