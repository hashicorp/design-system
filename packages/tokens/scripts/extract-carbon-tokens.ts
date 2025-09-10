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

// CARBON TOKENS

// import { colors as carbonColors } from '@carbon/colors';
// import { themes as carbonThemes } from '@carbon/themes';
// import { baseFontSize, breakpoint, breakpointDown, breakpointUp, breakpoints, container, container01, container02, container03, container04, container05, em, fluidSpacing, fluidSpacing01, fluidSpacing02, fluidSpacing03, fluidSpacing04, iconSize, iconSize01, iconSize02, layout, layout01, layout02, layout03, layout04, layout05, layout06, layout07, miniUnit, miniUnits, px, rem, size2XLarge, sizeLarge, sizeMedium, sizeSmall, sizeXLarge, sizeXSmall, sizes, spacing, spacing01, spacing02, spacing03, spacing04, spacing05, spacing06, spacing07, spacing08, spacing09, spacing10, spacing11, spacing12, spacing13, unstable_tokens } from '@carbon/layout';
// TODO `@carbon/grid` - there is only a Sass file
// import { type as carbonType } from '@carbon/type';
// TODO `@carbon/motion` - do we need it?
  // console.log('\n\n\n\n *** carbonColors ***\n\n', JSON.stringify(carbonColors, null, 2));
  // console.log('\n\n\n\n *** carbonThemes ***\n\n', JSON.stringify(carbonThemes, null, 2));
  // console.log('\n\n\n\n *** carbonType ***\n\n', JSON.stringify(carbonType, null, 2));
  // console.log('\n\n\n\n *** carbonLayout ***\n\n', JSON.stringify(carbonLayout, null, 2));


// SCRIPT CONFIG

const __filename = fileURLToPath(import.meta.url); // Get the file path of the current module
const __dirname = dirname(__filename); // Get the directory name of the current module
const destinationCarbonFolder = path.resolve(__dirname, '../src/carbon-extracted');


// PROCESS THE CARBON DEPENDENCIES TO EXTRACT THEIR TOKENS

(async () => {
    try {
        console.log('Carbon tokens extraction started...');
        console.log('\n==============================================');

        // empty the `dist/carbon` folder
        console.log(`\nCleaning up dist/carbon folder`);
        fs.emptyDirSync(destinationCarbonFolder);

        console.log(`\nProcessing Carbon "colors"...`);
        await extractColors(destinationCarbonFolder);
        await extractMotion(destinationCarbonFolder);
        await extractLayout(destinationCarbonFolder);

        console.log('\n==============================================');
        console.log('\nCarbon tokens extraction completed!');

    } catch (err) {
        console.error(err);
        process.exit(1);

    }
})();
