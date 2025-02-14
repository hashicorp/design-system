/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type Owner from '@ember/owner';
import type { ComponentLike } from '@glint/template';
import type { HdsCodeEditorSignature as HdsCodeEditorModifierSignature } from '../../../modifiers/hds-code-editor.ts';
import type { HdsCodeEditorDescriptionSignature } from './description';
import type { HdsCodeEditorTitleSignature } from './title';
import type { HdsCodeEditorGenericSignature } from './generic';
import type { EditorView } from '@codemirror/view';
import type { HdsCopyButtonSignature } from '../copy/button/index.ts';
export interface HdsCodeEditorSignature {
    Args: {
        hasCopyButton?: boolean;
        hasFullScreenButton?: boolean;
        isStandalone?: boolean;
        copyButtonText?: HdsCopyButtonSignature['Args']['text'];
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
    constructor(owner: Owner, args: HdsCodeEditorSignature['Args']);
    get ariaLabelledBy(): string | undefined;
    get ariaDescribedBy(): string | undefined;
    get hasActions(): boolean;
    get isStandalone(): boolean;
    get classNames(): string;
    get copyButtonText(): HdsCopyButtonSignature['Args']['text'];
    registerTitleElement(element: HdsCodeEditorTitleSignature['Element']): void;
    registerDescriptionElement(element: HdsCodeEditorDescriptionSignature['Element']): void;
    toggleFullScreen(): void;
    onInput(newValue: string): void;
    onKeyDown(event: KeyboardEvent): void;
    onSetup(editorView: EditorView): void;
}
//# sourceMappingURL=index.d.ts.map