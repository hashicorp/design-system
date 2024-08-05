/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsCodeBlockLanguageValues {
  Bash = 'bash',
  Go = 'go',
  Hcl = 'hcl',
  Json = 'json',
  Log = 'log',
  Ruby = 'ruby',
  ShellSession = 'shell-session',
  Yaml = 'yaml',
}

export type HdsCodeBlockLanguages = `${HdsCodeBlockLanguageValues}`;
