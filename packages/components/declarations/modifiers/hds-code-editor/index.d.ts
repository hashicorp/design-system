/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Modifier from 'ember-modifier';
import { EditorView } from '@codemirror/view';
import type { PositionalArgs, NamedArgs } from 'ember-modifier';
import type { HdsCodeEditorLanguages } from 'src/types/hds-code-editor.types';
export interface HdsCodeEditorSignature {
    Args: {
        Named: {
            language?: HdsCodeEditorLanguages;
            value: string;
            onInput?: (newVal: string) => void;
            onBlur?: (editor: EditorView, event: FocusEvent) => void;
        };
    };
}
export default class HdsCodeEditorModifier extends Modifier<HdsCodeEditorSignature> {
    #private;
    didSetup: boolean;
    editor: EditorView;
    element: HTMLElement;
    observer: IntersectionObserver;
    onInput: HdsCodeEditorSignature['Args']['Named']['onInput'];
    onBlur: HdsCodeEditorSignature['Args']['Named']['onBlur'];
    modify(element: HTMLElement, positional: PositionalArgs<HdsCodeEditorSignature>, named: NamedArgs<HdsCodeEditorSignature>): void;
}
//# sourceMappingURL=index.d.ts.map