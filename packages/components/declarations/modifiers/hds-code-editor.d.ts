/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Modifier from 'ember-modifier';
import type { PositionalArgs, NamedArgs } from 'ember-modifier';
import type { EditorView } from '@codemirror/view';
import type { HdsCodeEditorLanguages } from 'src/types/hds-code-editor.types';
export interface HdsCodeEditorSignature {
    Args: {
        Named: {
            language?: HdsCodeEditorLanguages;
            value?: string;
            onInput?: (newVal: string) => void;
            onBlur?: (editor: EditorView, event: FocusEvent) => void;
            onSetup?: (editor: EditorView) => unknown;
        };
    };
}
export default class HdsCodeEditorModifier extends Modifier<HdsCodeEditorSignature> {
    editor: EditorView;
    element: HTMLElement;
    onInput: HdsCodeEditorSignature['Args']['Named']['onInput'];
    observer: IntersectionObserver;
    modify(element: HTMLElement, positional: PositionalArgs<HdsCodeEditorSignature>, named: NamedArgs<HdsCodeEditorSignature>): void;
    willRemove(): void;
    loadLanguageTask: import("ember-concurrency").TaskForAsyncTaskFunction<{
        drop: boolean;
    }, (language?: HdsCodeEditorLanguages) => Promise<import("@codemirror/state").Extension | undefined>>;
    setupTask: import("ember-concurrency").TaskForAsyncTaskFunction<{
        drop: boolean;
    }, (element: HTMLElement, _positional: PositionalArgs<HdsCodeEditorSignature>, named: NamedArgs<HdsCodeEditorSignature>) => Promise<void>>;
}
//# sourceMappingURL=hds-code-editor.d.ts.map