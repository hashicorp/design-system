/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsCodeEditorLanguageValues {
  Ruby = 'ruby',
  Shell = 'shell',
  Go = 'go',
  Hcl = 'hcl',
  Json = 'json',
  Sql = 'sql',
  Yaml = 'yaml',
}

export type HdsCodeEditorLanguages = `${HdsCodeEditorLanguageValues}`;
