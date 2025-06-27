/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsCodeEditorLanguageValues {
  Rego = 'rego',
  Ruby = 'ruby',
  Shell = 'shell',
  Go = 'go',
  Hcl = 'hcl',
  JavaScript = 'javascript',
  Json = 'json',
  Markdown = 'markdown',
  Sentinel = 'sentinel',
  Sql = 'sql',
  Yaml = 'yaml',
}

export type HdsCodeEditorLanguages = `${HdsCodeEditorLanguageValues}`;

export default {
  HdsCodeEditorLanguageValues,
};
