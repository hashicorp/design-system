/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTextBodySignature } from '../text/body';
type HdsCodeBlockDescriptionElement = HdsTextBodySignature['Element'];
export interface HdsCodeBlockDescriptionSignature {
    Args: {
        didInsertNode: (element: HdsCodeBlockDescriptionElement) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HdsCodeBlockDescriptionElement;
}
export default class HdsCodeBlockDescription extends Component<HdsCodeBlockDescriptionSignature> {
    private _id;
    private _setUpDescription;
}
export {};
