/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */


import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { extractColors } from './extract-carbon-parts/extractColors.ts';
import { extractMotion } from './extract-carbon-parts/extractMotion.ts';
import { extractLayout } from './extract-carbon-parts/extractLayout.ts';
import { extractTypography } from './extract-carbon-parts/extractTypography.ts';
import { extractThemes } from './extract-carbon-parts/extractThemes.ts';

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

    console.log(`\nProcessing "@carbon/colors"...`);
    await extractColors();
    console.log(`\nProcessing "@carbon/motion"...`);
    await extractMotion();
    console.log(`\nProcessing "@carbon/layout"...`);
    await extractLayout();
    console.log(`\nProcessing "@carbon/type"...`);
    await extractTypography();
    console.log(`\nProcessing "@carbon/themes"...`);
    await extractThemes();

    console.log('\n==============================================');
    console.log('\nCarbon tokens extraction completed!');

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
