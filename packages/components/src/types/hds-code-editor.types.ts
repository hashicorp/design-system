/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsCodeEditorLanguageValues {
  Javascript = 'javascript',
  Json = 'json',
  Sql = 'sql',
  Go = 'go',
}

export type HdsCodeEditorLanguages = `${HdsCodeEditorLanguageValues}`;
