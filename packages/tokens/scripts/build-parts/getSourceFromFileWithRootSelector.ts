/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';

import type { PlatformConfig }  from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';

export async function getSourceFromFileWithRootSelector(config: PlatformConfig, theme: string, path: string): Promise<string> {
  const rawSource = await fs.readFile(`${config.buildPath}themed-tokens/with-root-selector/${theme}/${path}`, 'utf8');
  const header = await fileHeader({});
  return rawSource.replace(header, '');
}