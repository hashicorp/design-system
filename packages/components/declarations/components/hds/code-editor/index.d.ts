/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsCodeEditorSignature as HdsCodeEditorModifierSignature } from 'src/modifiers/hds-code-editor';
import type { HdsCodeEditorDescriptionSignature } from './description';
import type { HdsCodeEditorTitleSignature } from './title';
import type { HdsCodeEditorGenericSignature } from './generic';
import type { EditorView } from '@codemirror/view';
export interface HdsCodeEditorSignature {
    Args: {
        hasCopyButton?: boolean;
        hasFullScreenButton?: boolean;
        isStandalone?: boolean;
    } & HdsCodeEditorModifierSignature['Args']['Named'];
    Blocks: {
        default: [
            {
                Title?: ComponentLike<HdsCodeEditorTitleSignature>;
                Description?: ComponentLike<HdsCodeEditorDescriptionSignature>;
                Generic?: ComponentLike<HdsCodeEditorGenericSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsCodeEditor extends Component<HdsCodeEditorSignature> {
    private _isFullScreen;
    private _isSetupComplete;
    private _value;
    private _titleId;
    private _descriptionId;
    private _id;
    private _handleEscape;
    constructor(owner: unknown, args: HdsCodeEditorSignature['Args']);
    get ariaLabelledBy(): string | undefined;
    get ariaDescribedBy(): string | undefined;
    get hasActions(): boolean;
    get isStandalone(): boolean;
    get classNames(): string;
    registerTitleElement(element: HdsCodeEditorTitleSignature['Element']): void;
    registerDescriptionElement(element: HdsCodeEditorDescriptionSignature['Element']): void;
    toggleFullScreen(): void;
    onInput(newValue: string): void;
    onKeyDown(event: KeyboardEvent): void;
    onSetup(editorView: EditorView): void;
}
//# sourceMappingURL=index.d.ts.map