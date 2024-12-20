/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { Extension } from '@codemirror/state';

export enum HdsCodeEditorLanguageValues {
  Json = 'json',
  Sql = 'sql',
  Go = 'go',
  Hcl = 'hcl',
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

export type CodemirrorLanguageModule =
  | CodemirrorJsonModule
  | CodemirrorGoModule
  | CodemirrorSqlModule
  | CodemirrorHclModule;
