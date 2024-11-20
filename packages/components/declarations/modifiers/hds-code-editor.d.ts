/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Modifier from 'ember-modifier';
import type { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import { EditorView } from '@codemirror/view';
interface HdsCodeEditorSignature {
    Args: {
        Named: {
            /** Called when editor contents change */
            onInput?: (newVal: string) => void;
            /** Called when editor loses focus */
            onBlur?: (editor: EditorView, event: FocusEvent) => void;
            /**
             * See documentation for codemirror configuration types:
             * https://codemirror.net/doc/manual.html#config
             * */
            /** Code contents to display in editor */
            value: string;
        };
    };
}
/**
 *
 * `HdsCodeEditor` implements a modifier that creates a HdsCodeEditor instance on the
 * provided element.
 *
 * The supported modes for the editor are currently: hcl, shell, go, javascript
 * The supported themes are: monokai
 *
 * Sample usage:
 * ```
 * <div
 *   {{hds-code-editor onInput=@onInput options=@options value=@value}}
 * />
 * ```
 *
 * @class HdsCodeEditorModifier
 *
 */
export default class HdsCodeEditorModifier extends Modifier<HdsCodeEditorSignature> {
    #private;
    didSetup: boolean;
    editor: EditorView;
    element: HTMLElement;
    observer: IntersectionObserver;
    onInput: HdsCodeEditorSignature['Args']['Named']['onInput'];
    onBlur: HdsCodeEditorSignature['Args']['Named']['onBlur'];
    constructor(owner: unknown, args: ArgsFor<HdsCodeEditorSignature>);
    modify(element: HTMLElement, positional: PositionalArgs<HdsCodeEditorSignature>, named: NamedArgs<HdsCodeEditorSignature>): void;
}
export {};
//# sourceMappingURL=hds-code-editor.d.ts.map