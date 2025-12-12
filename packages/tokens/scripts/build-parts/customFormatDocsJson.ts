/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { Dictionary }  from 'style-dictionary/types';

import { cloneDeep } from 'lodash-es';

export function customFormatDocsJsonFunction({ dictionary }: { dictionary: Dictionary}): string {
  // Notice: this object shape is used also in the documentation so any updates
  // to this format should be reflected in the corresponding type definition.
  const output: {}[] = [];
  dictionary.allTokens.forEach((token: any) => {
    // we remove the "filePath" prop from the token because the orginal file path is irrelevant for us
    // (plus its value is an absolute path, so it causes useless diffs in git)
    const outputToken = cloneDeep(token);
    delete outputToken.filePath;
    delete outputToken.isSource;
    output.push(outputToken);
  });

  return JSON.stringify(output, null, 2);
}
