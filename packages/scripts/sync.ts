const VERBOSE = false; // verbose logging for development
global.verbose = VERBOSE;

import dotenv from 'dotenv';

import * as FigmaExport from '@figma-export/types';
import * as figmaExport from '@figma-export/core';
import { requirePackages } from '@figma-export/cli/dist/utils';
import { StringTransformer, ComponentOutputter } from '@figma-export/types';
import transformSvgWithSvgo from '@figma-export/transform-svg-with-svgo';
import outputComponentsAsSvg from '@figma-export/output-components-as-svg';

import del from 'del';
import chalk from 'chalk';

// read the environment variables from the ".env" file
dotenv.config();

const outputFolder = './temp-output';

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

    // remove existing output folder
    if (VERBOSE) {
        console.log('Removing "sync" output folder');
    }
    del.sync(outputFolder, { force: true });

    // these variables may come from a .figmaexportrc.ts file, see https://github.com/marcomontalbano/figma-export/blob/master/.figmaexportrc.example.ts
    const transformer: StringTransformer[] = [
        transformSvgWithSvgo({
            plugins: [
                { removeViewBox: false },
                { removeDimensions: true }
            ]
        })
    ];
    const outputter: ComponentOutputter[] = [
        outputComponentsAsSvg({
            output: outputFolder,
            // IMPORTANT: this is used to change icon's name (otherwise variants with the same props/values will override one another)
            getBasename: (options: FigmaExport.ComponentOutputterParamOption): string => {
                // the variants' name looks like this: "Size=16, Style=Color" and we want to sanitize it
                const variantProperties = options.basename.split(', ')
                return `ID=${options.id}__${variantProperties.join('__')}.svg`;
            },
            // by default figma-export adds the "page" name to the path (so creating an extra folder, but we prefer to have all the icons saved directly in the output folder
            getDirname: (): string => '',
        })
    ];

    // TODO move to a standalone function and file
    await figmaExport.components({
        // TODO this should not be in the .env variable, is just a configuration ID that should be checked in
        // @ts-ignore
        // fileId: process.env.FLIGHT_FILE_ID,
        // TODO this is the test file https://www.figma.com/file/2u60imwCVJvSpH0io1O068/Flight-Icons-FOR-TESTING
        fileId: '2u60imwCVJvSpH0io1O068',
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