/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsCodeEditorSignature } from '../../hds-code-editor';
import type { Extension, Text } from '@codemirror/state';
export declare enum HdsCodeEditorJsonLintingError {
    InvalidSyntax = "Invalid syntax",
    KeyExpected = "Key expected",
    KeyMustBeDoubleQuoted = "Key must be double quoted",
    MissingComma = "Missing comma",
    TrailingComma = "Trailing comma",
    ValueExpected = "Value expected"
}
export declare function findNextToken(doc: Text, index: number, step?: number): string;
export declare function determineErrorMessage({ previousToken, nextToken, errorToken, }: {
    previousToken: string;
    nextToken: string;
    errorToken: string;
}): HdsCodeEditorJsonLintingError;
export declare function renderErrorMessage(message: string, lineNumber: number): HTMLElement;
export default function jsonLinter(onLint: HdsCodeEditorSignature['Args']['Named']['onLint']): Promise<Extension[]>;
