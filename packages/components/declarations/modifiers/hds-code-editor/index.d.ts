/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Modifier from 'ember-modifier';
import type { HdsCodeEditorLanguages } from './hds-code-editor/types.ts';
import type { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import type { EditorView } from '@codemirror/view';
type HdsCodeEditorBlurHandler = (editor: EditorView, event: FocusEvent) => void;
export interface HdsCodeEditorSignature {
    Args: {
        Named: {
            ariaLabel?: string;
            ariaLabelledBy?: string;
            language?: HdsCodeEditorLanguages;
            value?: string;
            onInput?: (newVal: string) => void;
            onBlur?: HdsCodeEditorBlurHandler;
            onSetup?: (editor: EditorView) => unknown;
        };
    };
}
export default class HdsCodeEditorModifier extends Modifier<HdsCodeEditorSignature> {
    editor: EditorView;
    element: HTMLElement;
    onBlur: HdsCodeEditorSignature['Args']['Named']['onBlur'];
    onInput: HdsCodeEditorSignature['Args']['Named']['onInput'];
    blurHandler: (event: FocusEvent) => void;
    observer: IntersectionObserver;
    constructor(owner: HdsCodeEditorModifier, args: ArgsFor<HdsCodeEditorSignature>);
    modify(element: HTMLElement, positional: PositionalArgs<HdsCodeEditorSignature>, named: NamedArgs<HdsCodeEditorSignature>): void;
    private _setupEditorBlurHandler;
    private _setupEditorAriaAttributes;
    private _loadLanguageTask;
    private _buildExtensionsTask;
    private _createEditorTask;
    private _setupTask;
}
export {};
//# sourceMappingURL=index.d.ts.map