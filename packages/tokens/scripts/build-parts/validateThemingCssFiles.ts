/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import chalk from 'chalk';

import type { Dictionary, PlatformConfig }  from 'style-dictionary';

import { getSourceFromFileWithRootSelector } from './getSourceFromFileWithRootSelector.ts';
import type { Mode } from './getStyleDictionaryConfig.ts';
import { modes } from './getStyleDictionaryConfig.ts';

export async function validateThemingCssFiles(_dictionary: Dictionary, config: PlatformConfig): Promise<void> {

  // store all the sources in memory
  const allSources = {} as Record<Mode, Record<string, string>>;
  for (const mode of modes) {
    const commonSource = await getSourceFromFileWithRootSelector(config, mode, 'common-tokens.css');
    const themedSource = await getSourceFromFileWithRootSelector(config, mode, 'themed-tokens.css');
    allSources[mode] = { commonSource, themedSource }
  }

  // first validation: make sure that all the common files have actually the same content
  const comparisonModes = modes.filter(mode => mode !== 'default');
  comparisonModes.forEach((comparisonMode: Mode) => {
    if (allSources[comparisonMode].commonSource !== allSources.default.commonSource) {
      // we want to interrupt the execution of the script if one of the generated "common" files is different from the others
      // note: comment this out if you need to debug why they differ, so the files are saved with the different content
      throw new Error(`❌ ${chalk.red.bold('ERROR')} - Generated "common" tokens for mode '${comparisonMode}' differ from the ones generated for the 'default' mode (expected to be identical)`);
    }
  });

  // second validation: make sure there are no orphan CSS variables when "common" and "themed" files are used together
  for (const mode of modes) {
    const { partialDefinitions: commonDefinitions, partialUsages: commonUsages } = extractAllCssVariables(allSources[mode].commonSource);
    const { partialDefinitions: themedDefinitions, partialUsages: themedUsages } = extractAllCssVariables(allSources[mode].themedSource);
    const allDefinitions = new Set([...commonDefinitions, ...themedDefinitions]);
    const allUsages = new Set([...commonUsages, ...themedUsages]);
    const undefinedVariables = [...allUsages].filter(usage => !allDefinitions.has(usage));
    if (undefinedVariables.length > 0) {
      throw new Error(`❌ ${chalk.red.bold('ERROR')} - Generated "common/themed" token files for mode '${mode} contain CSS variables that not defined in any of the generated files: ${undefinedVariables.map((variable: string) => `\`--token-${variable}\``).join(', ')}`);
    }
  }
}

// regex for variable definition (`--token-***: ***`) and usage: (`var(--token-***)`)
const varDefRegex = /--token-([a-zA-Z0-9-_]+)\s*:/g;
const varUsageRegex = /var\(\s*--token-([a-zA-Z0-9-_]+)\s*\)/g;

function extractAllCssVariables(source: string) {
  const cleanSource = stripCssComments(source);
  const partialDefinitions = [];
  const partialUsages = [];

  // find all definitions and usages in this file
  let match;
  while ((match = varDefRegex.exec(cleanSource))) {
    partialDefinitions.push(match[1]);
  }
  while ((match = varUsageRegex.exec(cleanSource))) {
    partialUsages.push(match[1]);
  }

  return { partialDefinitions, partialUsages };
}

function stripCssComments(source: string) {
  return source.replace(/\/\*[\s\S]*?\*\//g, '');
}
