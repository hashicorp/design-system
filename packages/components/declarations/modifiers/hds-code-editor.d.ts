/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Modifier from 'ember-modifier';
import { Compartment } from '@codemirror/state';
import type { HdsCodeEditorLanguages } from './hds-code-editor/types.ts';
import type { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import type { EditorView as EditorViewType } from '@codemirror/view';
import type { Diagnostic as DiagnosticType } from '@codemirror/lint';
import type Owner from '@ember/owner';
type HTMLElementWithEditor = HTMLElement & {
    editor: EditorViewType;
};
type HdsCodeEditorBlurHandler = (editor: EditorViewType, event: FocusEvent) => void;
interface HdsCodeEditorExtraKeys {
    [key: string]: () => void;
}
export interface HdsCodeEditorSignature {
    Args: {
        Named: {
            ariaDescribedBy?: string;
            ariaLabel?: string;
            ariaLabelledBy?: string;
            cspNonce?: string;
            extraKeys?: HdsCodeEditorExtraKeys;
            hasLineWrapping?: boolean;
            isLintingEnabled?: boolean;
            language?: HdsCodeEditorLanguages;
            value?: string;
            onInput?: (newValue: string, editor: EditorViewType) => void;
            onBlur?: HdsCodeEditorBlurHandler;
            onLint?: (diagnostics: DiagnosticType[], newValue: string, editor: EditorViewType) => void;
            onSetup?: (editor: EditorViewType) => unknown;
        };
    };
}
export declare function getCSPNonceFromMeta(): string | undefined;
export default class HdsCodeEditorModifier extends Modifier<HdsCodeEditorSignature> {
    editor: EditorViewType;
    element: HTMLElementWithEditor;
    onBlur: HdsCodeEditorSignature['Args']['Named']['onBlur'];
    onInput: HdsCodeEditorSignature['Args']['Named']['onInput'];
    blurHandler: (event: FocusEvent) => void;
    intersectionObserver: IntersectionObserver;
    mutationObserver: MutationObserver;
    lineWrappingCompartment: Compartment;
    constructor(owner: Owner, args: ArgsFor<HdsCodeEditorSignature>);
    modify(element: HTMLElementWithEditor, positional: PositionalArgs<HdsCodeEditorSignature>, named: NamedArgs<HdsCodeEditorSignature>): void;
    private _setupEditorBlurHandler;
    private _setupEditorAriaLabel;
    private _setupEditorAriaDescribedBy;
    private _createLintingDescriptionElement;
    private _setupEditorAriaAttributes;
    private _loadLanguageExtensionsTask;
    private _buildExtensionsTask;
    private _createEditorTask;
    private _setupEditorMutationObserver;
    private _setupTask;
}
export {};
