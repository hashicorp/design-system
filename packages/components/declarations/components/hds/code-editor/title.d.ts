/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTextBodySignature } from '../text/body';
type HdsCodeEditorTitleElement = HdsTextBodySignature['Element'];
export interface HdsCodeEditorTitleSignature {
    Args: {
        editorId: string;
        tag?: HdsTextBodySignature['Args']['tag'];
        onInsert: (element: HdsCodeEditorTitleElement) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HdsCodeEditorTitleElement;
}
export default class HdsCodeEditorTitle extends Component<HdsCodeEditorTitleSignature> {
    private _id;
    get tag(): keyof HTMLElementTagNameMap;
}
export {};
//# sourceMappingURL=title.d.ts.map