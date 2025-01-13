/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Modifier from 'ember-modifier';
import type { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import type { Extension } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
export declare enum HdsCodeEditorLanguageValues {
    Json = "json",
    Sql = "sql",
    Go = "go",
    Hcl = "hcl"
}
export type HdsCodeEditorLanguages = `${HdsCodeEditorLanguageValues}`;
export type HdsCodeEditorLanguageFunction = () => Extension;
export interface CodemirrorJsonModule {
    json: HdsCodeEditorLanguageFunction;
}
export interface CodemirrorGoModule {
    go: HdsCodeEditorLanguageFunction;
}
export interface CodemirrorSqlModule {
    sql: HdsCodeEditorLanguageFunction;
}
export interface CodemirrorHclModule {
    hcl: HdsCodeEditorLanguageFunction;
}
export type CodemirrorLanguageModule = CodemirrorJsonModule | CodemirrorGoModule | CodemirrorSqlModule | CodemirrorHclModule;
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
    constructor(owner: HdsCodeEditorModifier, args: ArgsFor<HdsCodeEditorSignature>);
    modify(element: HTMLElement, positional: PositionalArgs<HdsCodeEditorSignature>, named: NamedArgs<HdsCodeEditorSignature>): void;
    loadLanguageTask: import("ember-concurrency").TaskForAsyncTaskFunction<{
        drop: boolean;
    }, (language?: HdsCodeEditorLanguages) => Promise<Extension | undefined>>;
    buildExtensionsTask: import("ember-concurrency").TaskForAsyncTaskFunction<{
        drop: boolean;
    }, (this: {
        drop: boolean;
    }, { language }: any) => Promise<Extension[]>>;
    setupTask: import("ember-concurrency").TaskForAsyncTaskFunction<{
        drop: boolean;
    }, (element: HTMLElement, _positional: PositionalArgs<HdsCodeEditorSignature>, named: NamedArgs<HdsCodeEditorSignature>) => Promise<void>>;
}
//# sourceMappingURL=hds-code-editor.d.ts.map