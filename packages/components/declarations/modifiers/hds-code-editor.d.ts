/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Modifier from 'ember-modifier';
import type { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import codemirror from 'codemirror';
import type Owner from '@ember/owner';
import '../utils/register-codemirror-hcl.ts';
import 'codemirror/mode/go/go';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/shell/shell';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/selection/active-line';
interface CodeMirrorSignature {
    Args: {
        Named: {
            /** Called when editor contents change */
            onInput?: (newVal: string) => void;
            /** Called when editor loses focus */
            onBlur?: (editor: codemirror.Editor, event: FocusEvent) => void;
            /**
             * See documentation for codemirror configuration types:
             * https://codemirror.net/doc/manual.html#config
             * */
            options?: codemirror.EditorConfiguration;
            /** Code contents to display in editor */
            value: string;
        };
        Positional: never;
    };
}
/**
 *
 * `CodeMirror` implements a modifier that creates a CodeMirror instance on the
 * provided element.
 *
 * The supported modes for the editor are currently: hcl, shell, go, javascript
 * The supported themes are: monokai
 *
 * Sample usage:
 * ```
 * <div
 *   {{code-mirror onInput=@onInput options=@options value=@value}}
 * />
 * ```
 *
 * @class CodeMirrorModifier
 *
 */
export default class CodeMirrorModifier extends Modifier<CodeMirrorSignature> {
    #private;
    didSetup: boolean;
    editor: codemirror.Editor;
    element: HTMLElement;
    observer: IntersectionObserver;
    onInput: CodeMirrorSignature['Args']['Named']['onInput'];
    onBlur: CodeMirrorSignature['Args']['Named']['onBlur'];
    constructor(owner: Owner, args: ArgsFor<CodeMirrorSignature>);
    modify(element: HTMLElement, positional: PositionalArgs<CodeMirrorSignature>, named: NamedArgs<CodeMirrorSignature>): void;
    onChange(editor: codemirror.Editor): void;
}
export {};
//# sourceMappingURL=hds-code-editor.d.ts.map