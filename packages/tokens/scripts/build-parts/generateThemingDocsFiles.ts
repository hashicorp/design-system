/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';

import type { Dictionary, PlatformConfig }  from 'style-dictionary';
import type { DesignToken } from 'style-dictionary/types';

export async function generateThemingDocsFiles(_dictionary: Dictionary, config: PlatformConfig): Promise<void> {

  const defaultThemedTokens = await getJsonThemedObjectFromFile(config, 'default');
  const cds0ThemedTokens = await getJsonThemedObjectFromFile(config, 'cds-g0');
  const cds10ThemedTokens = await getJsonThemedObjectFromFile(config, 'cds-g10');
  const cds90ThemedTokens = await getJsonThemedObjectFromFile(config, 'cds-g90');
  const cds100ThemedTokens = await getJsonThemedObjectFromFile(config, 'cds-g100');

  const allThemedTokens = {
    'default': defaultThemedTokens,
    'cds-g0': cds0ThemedTokens,
    'cds-g10': cds10ThemedTokens,
    'cds-g90': cds90ThemedTokens,
    'cds-g100': cds100ThemedTokens,
  };

  const outputFolder = `${config.buildPath}`;
  await fs.ensureDir(outputFolder);
  await fs.writeFile(`${outputFolder}themed-tokens.json`, JSON.stringify(allThemedTokens, null, 2));
}

async function getJsonThemedObjectFromFile(config: PlatformConfig, theme: string): Promise<Record<string, DesignToken>> {
  const jsonSource = await fs.readFile(`${config.buildPath}themed-tokens/${theme}.json`, 'utf8');
  const jsonTokensArray = JSON.parse(jsonSource);
  const jsonTokensObject = jsonTokensArray.reduce((acc: Record<string, any>, token: any) => {
    acc[token.name] = token;
    return acc;
  }, {});
  return jsonTokensObject;
}