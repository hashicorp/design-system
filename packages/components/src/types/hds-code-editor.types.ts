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

export interface CodemirrorJsonModule {
  json: () => Extension;
}

export interface CodemirrorGoModule {
  go: () => Extension;
}

export interface CodemirrorSqlModule {
  sql: () => Extension;
}

export interface CodemirrorHclModule {
  hcl: () => Extension;
}

export type CodemirrorLanguageModule =
  | CodemirrorJsonModule
  | CodemirrorGoModule
  | CodemirrorSqlModule
  | CodemirrorHclModule;
