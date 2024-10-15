/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { SafeString } from '@ember/template/-private/handlebars';
import type { ComponentLike } from '@glint/template';
import type { HdsCodeBlockTitleSignature } from './title';
import type { HdsCodeBlockDescriptionSignature } from './description';
import type { HdsCodeBlockLanguages } from './types.ts';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-hcl';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-log';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-shell-session';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-handlebars';
export declare const LANGUAGES: string[];
export interface HdsCodeBlockSignature {
    Args: {
        hasCopyButton?: boolean;
        hasLineNumbers?: boolean;
        hasLineWrapping?: boolean;
        highlightLines?: string;
        lineNumberStart?: number;
        isStandalone?: boolean;
        language?: HdsCodeBlockLanguages;
        maxHeight?: string;
        value: string;
    };
    Blocks: {
        default: [
            {
                Title?: ComponentLike<HdsCodeBlockTitleSignature>;
                Description?: ComponentLike<HdsCodeBlockDescriptionSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsCodeBlock extends Component<HdsCodeBlockSignature> {
    prismCode: SafeString;
    /**
     * Generates a unique ID for the code content
     *
     * @param preCodeId
     */
    preCodeId: string;
    /**
     * @param code
     * @type {string}
     * @description code text content for the CodeBlock
     */
    get code(): string;
    /**
     * @param language
     * @type {string}
     * @default undefined
     * @description name of coding language used within CodeBlock for syntax highlighting
     */
    get language(): HdsCodeBlockLanguages | undefined;
    /**
     * @param hasLineNumbers
     * @type {boolean}
     * @default true
     * @description Displays line numbers if true
     */
    get hasLineNumbers(): boolean;
    /**
     * @param isStandalone
     * @type {boolean}
     * @default true
     * @description Make CodeBlock container corners appear rounded
     */
    get isStandalone(): boolean;
    /**
     * @param hasLineWrapping
     * @type {boolean}
     * @default false
     * @description Make text content wrap on multiple lines
     */
    get hasLineWrapping(): boolean;
    setPrismCode(element: HTMLElement): void;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map