/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */


import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { extractColors } from './extract-carbon-parts/extractColors.ts';
import { extractMotion } from './extract-carbon-parts/extractMotion.ts';
import { extractLayout } from './extract-carbon-parts/extractLayout.ts';
// SCRIPT CONFIG

const __filename = fileURLToPath(import.meta.url); // Get the file path of the current module
const __dirname = dirname(__filename); // Get the directory name of the current module
export const destinationCarbonFolder = path.resolve(__dirname, '../src/carbon-extracted');


// PROCESS THE CARBON DEPENDENCIES TO EXTRACT THEIR TOKENS

(async () => {
  try {
    console.log('Carbon tokens extraction started...');
    console.log('\n==============================================');

    // empty the `dist/carbon` folder
    console.log(`\nCleaning up dist/carbon folder`);
    fs.emptyDirSync(destinationCarbonFolder);

    console.log(`\nProcessing Carbon "colors"...`);
    await extractColors();
    await extractMotion();
    await extractLayout();

    console.log('\n==============================================');
    console.log('\nCarbon tokens extraction completed!');

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
