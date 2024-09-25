/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsCodeEditorSignature {
    Args: {
        value: string;
        language: string;
        theme: string;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsCodeEditor extends Component<HdsCodeEditorSignature> {
    options: {
        value: string;
        language: string;
        theme: string;
    };
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map