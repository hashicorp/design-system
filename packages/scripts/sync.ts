import dotenv from 'dotenv'

import chalk from 'chalk';
import * as FigmaExport from '@figma-export/types';
import * as figmaExport from '@figma-export/core';
import { requirePackages } from '@figma-export/cli/dist/utils';
import { StringTransformer, ComponentOutputter } from '@figma-export/types';
import transformSvgWithSvgo from '@figma-export/transform-svg-with-svgo';
import outputComponentsAsSvg from '@figma-export/output-components-as-svg';

// read the environment variables from the ".env" file
dotenv.config();

(async () => {
    try {
        console.log('\n==========\nFigma sync started...\n==========\n');

        // make sure the user has a ".env" file that contains the required REST API token
        if (!process.env.FIGMA_TOKEN) {
            console.error(chalk.red('ERROR:\nPlease create a ".env" file in the folder with a "FIGMA_TOKEN" variable in it.\nFor more details please look at the documentation.'));
        } else {
            await sync();
        }

        console.log('\n==========\nFigma sync completed.\n==========\n');

    } catch (err) {
        console.error(err);
        process.exit(1);

    }
})();

async function sync() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('TODO!!');

    // These may come from a .figmaexportrc.ts file, see https://github.com/marcomontalbano/figma-export/blob/master/.figmaexportrc.example.ts
    const transformer: StringTransformer[] = [
        transformSvgWithSvgo({
            plugins: [
                { removeViewBox: false },
                { removeDimensions: true }
            ]
        })
    ];
    const outputFolder = './temp-output';
    const outputter: ComponentOutputter[] = [
        outputComponentsAsSvg({
            output: outputFolder
        })
    ];

    // TODO move to a standalone function and file
    figmaExport.components({
        // TODO this should not be in the .env variable, is just a configuration ID that should be checked in
        // @ts-ignore
        fileId: process.env.FLIGHT_FILE_ID,
        // TODO! this may be a problem with overriding names of component variants
        concurrency: 30,
        // @ts-ignore
        token: process.env.FIGMA_TOKEN,
        // TODO
        onlyFromPages: ['Export'],
        transformers: requirePackages<FigmaExport.StringTransformer>(transformer),
        outputters: requirePackages<FigmaExport.ComponentOutputter>(outputter, { output: outputFolder }),
    }).then(() => {
        console.log('done');
    }).catch((err) => {
        console.error(err);
    });

}