/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TransformedTokens }  from 'style-dictionary';

import { PREFIX } from './generateCssHelpers.ts';

type Helpers = string[];

export function generateFocusRingHelpers(tokensFocusRing: TransformedTokens, outputCssVars: boolean): Helpers {

  const helpersFocusRing: Helpers = [];

  if (tokensFocusRing && tokensFocusRing['box-shadow']) {
    Object.keys(tokensFocusRing['box-shadow']).forEach((variant: string) => {
      const selector = `.${PREFIX}-focus-ring-box-shadow-${variant}`;
      const value = outputCssVars ? `var(--hds-focus-ring-box-shadow-${variant})` : tokensFocusRing['box-shadow'][variant].$value;
      helpersFocusRing.push(`${selector} { box-shadow: ${value}; }`);
    });
  }

  return [...helpersFocusRing];
}
