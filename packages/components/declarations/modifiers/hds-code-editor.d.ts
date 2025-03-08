/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Modifier from 'ember-modifier';
import { Compartment } from '@codemirror/state';
import type { HdsCodeEditorLanguages } from './hds-code-editor/types.ts';
import type { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import type { EditorView as EditorViewType } from '@codemirror/view';
import type Owner from '@ember/owner';
type HdsCodeEditorBlurHandler = (editor: EditorViewType, event: FocusEvent) => void;
export interface HdsCodeEditorSignature {
    Args: {
        Named: {
            ariaDescribedBy?: string;
            ariaLabel?: string;
            ariaLabelledBy?: string;
            cspNonce?: string;
            hasLineWrapping?: boolean;
            language?: HdsCodeEditorLanguages;
            value?: string;
            onInput?: (newVal: string) => void;
            onBlur?: HdsCodeEditorBlurHandler;
            onSetup?: (editor: EditorViewType) => unknown;
        };
    };
}
export declare function getCSPNonceFromMeta(): string | undefined;
export default class HdsCodeEditorModifier extends Modifier<HdsCodeEditorSignature> {
    editor: EditorViewType;
    element: HTMLElement;
    onBlur: HdsCodeEditorSignature['Args']['Named']['onBlur'];
    onInput: HdsCodeEditorSignature['Args']['Named']['onInput'];
    blurHandler: (event: FocusEvent) => void;
    observer: IntersectionObserver;
    lineWrappingCompartment: Compartment;
    constructor(owner: Owner, args: ArgsFor<HdsCodeEditorSignature>);
    modify(element: HTMLElement, positional: PositionalArgs<HdsCodeEditorSignature>, named: NamedArgs<HdsCodeEditorSignature>): void;
    private _setupEditorBlurHandler;
    private _setupEditorAriaLabel;
    private _setupEditorAriaDescribedBy;
    private _setupEditorAriaAttributes;
    private _loadLanguageTask;
    private _buildExtensionsTask;
    private _createEditorTask;
    private _setupTask;
}
export {};
//# sourceMappingURL=hds-code-editor.d.ts.map