/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';

import { destinationCarbonFolder } from '../extract-carbon-tokens.ts';

export async function saveCarbonDtcgTokensAsJsonFile({ obj, group, file } : { obj: object, group: string, file: string }): Promise<void> {

  const destFolderPath = `${destinationCarbonFolder}/${group}`;
  const destFilePath = `${destFolderPath}/${file}.json`;

  const content = {
    'carbon': {
      [group]: { ...obj }
    }
  };

  try {
    await fs.ensureDir(destFolderPath);
    await fs.writeJson(destFilePath, content, { spaces: 2 });
    console.log(`Saved "${destFilePath}" file`);
  } catch (err) {
    console.error(err);
  }
}
