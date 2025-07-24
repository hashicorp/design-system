/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import type { HdsCodeBlockTitleSignature } from './title';
import type { HdsCodeBlockDescriptionSignature } from './description';
import type { HdsCodeBlockLanguages } from './types.ts';
import type { HdsCopyButtonSignature } from '../copy/button/index.ts';
import HdsCodeBlockTitleComponent from './title.ts';
import HdsCodeBlockDescriptionComponent from './description.ts';
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
        ariaLabel?: string;
        ariaLabelledBy?: string;
        ariaDescribedBy?: string;
        hasCopyButton?: boolean;
        hasLineNumbers?: boolean;
        hasLineWrapping?: boolean;
        highlightLines?: string;
        lineNumberStart?: number;
        isStandalone?: boolean;
        language?: HdsCodeBlockLanguages;
        maxHeight?: string;
        value: string;
        copyButtonText?: HdsCopyButtonSignature['Args']['text'];
        onCopy?: HdsCopyButtonSignature['Args']['onSuccess'];
    };
    Blocks: {
        default: [
            {
                Title?: WithBoundArgs<typeof HdsCodeBlockTitleComponent, 'didInsertNode'>;
                Description?: WithBoundArgs<typeof HdsCodeBlockDescriptionComponent, 'didInsertNode'>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsCodeBlock extends Component<HdsCodeBlockSignature> {
    private _prismCode;
    private _isExpanded;
    private _codeContentHeight;
    private _codeContainerHeight;
    private _titleId;
    private _descriptionId;
    private _preCodeId;
    private _preCodeElement;
    private _observer;
    private _setUpCodeObserver;
    private _setUpCodeBlockCode;
    get ariaLabelledBy(): string | undefined;
    get ariaDescribedBy(): string | undefined;
    get code(): string;
    get maxHeight(): string | undefined;
    get showFooter(): boolean;
    get language(): HdsCodeBlockLanguages | undefined;
    get hasLineNumbers(): boolean;
    get isStandalone(): boolean;
    get hasLineWrapping(): boolean;
    get copyButtonText(): HdsCopyButtonSignature['Args']['text'];
    registerTitleElement(element: HdsCodeBlockTitleSignature['Element']): void;
    registerDescriptionElement(element: HdsCodeBlockDescriptionSignature['Element']): void;
    setPrismCode(element: HTMLElement): void;
    private _updateCodeHeights;
    private _updatePrismPlugins;
    toggleExpanded(): void;
    private _addHighlightSrOnlyText;
    get classNames(): string;
}
