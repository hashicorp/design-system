/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsCodeEditorSignature as HdsCodeEditorModifierSignature } from 'src/modifiers/hds-code-editor';
import type { HdsButtonSignature } from 'src/components/hds/button';
import type { HdsCodeEditorDescriptionSignature } from './description';
import type { HdsCodeEditorTitleSignature } from './title';
import type { EditorView } from '@codemirror/view';
export interface HdsCodeEditorSignature {
    Args: {
        hasCopyButton?: boolean;
        hasFullScreenButton?: boolean;
        language?: HdsCodeEditorModifierSignature['Args']['Named']['language'];
        value?: HdsCodeEditorModifierSignature['Args']['Named']['value'];
        onInput?: HdsCodeEditorModifierSignature['Args']['Named']['onInput'];
        onSetup?: HdsCodeEditorModifierSignature['Args']['Named']['onSetup'];
    };
    Blocks: {
        default: [
            {
                Title?: ComponentLike<HdsCodeEditorTitleSignature>;
                Description?: ComponentLike<HdsCodeEditorDescriptionSignature>;
                Button?: ComponentLike<HdsButtonSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsCodeEditor extends Component<HdsCodeEditorSignature> {
    private _isFullScreen;
    private _isSetupComplete;
    private _value;
    private _handleEscape;
    constructor(owner: unknown, args: HdsCodeEditorSignature['Args']);
    get classNames(): string;
    get hasActions(): boolean;
    toggleFullScreen(): void;
    onInput(newVal: string): void;
    onKeyDown(event: KeyboardEvent): void;
    onSetup(editorView: EditorView): void;
}
//# sourceMappingURL=index.d.ts.map