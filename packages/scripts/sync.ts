const VERBOSE = false; // verbose logging for development
global.verbose = VERBOSE;

import dotenv from 'dotenv';
import del from 'del';
import chalk from 'chalk';

import * as FigmaExport from '@figma-export/types';
import * as figmaExport from '@figma-export/core';
import { requirePackages } from '@figma-export/cli/dist/utils';
import { StringTransformer, ComponentOutputter } from '@figma-export/types';
import outputComponentsAsSvg from '@figma-export/output-components-as-svg';
import isEqual from 'lodash/isEqual';

import { AssetCoreData } from './@types/AssetsMetadata';
import { getAssetsMetadata } from './sync-parts/getAssetsMetadata';
import { getAssetFileName } from './sync-parts/getAssetFileName';
import { generateAssetsCatalog } from './generateAssetsCatalog';

// read the environment variables from the ".env" file
dotenv.config();

// read our custom config
import { config } from './config';

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

    // remove existing output folder
    if (VERBOSE) {
        console.log('Removing "sync" output folder');
    }
    del.sync(config.outputFolder, { force: true });

    // let's retrieve the assets metadata via REST api
    const assetsMetadata = await getAssetsMetadata();
    if (VERBOSE) {
        console.log('\nRetrieved assetsMetadata:\n', JSON.stringify(assetsMetadata));
    }

    // we removed the SVGO transformer, we will do it later in the "build" part with other parameters
    const transformer: StringTransformer[] = [];
    const outputter: ComponentOutputter[] = [
        outputComponentsAsSvg({
            output: config.outputFolder,
            // IMPORTANT: when exported by Figma by default the variants' name looks like this: "Size=16, Style=Color"
            // and we want to sanitize it (otherwise variants with the same props/values will override one another)
            // so this is used to change icon's name to a "standard" format that will be used across the entire script
            getBasename: (options: FigmaExport.ComponentOutputterParamOption): string => {
                const assetCoreData: AssetCoreData = assetsMetadata[options.id];
                return `${getAssetFileName(assetCoreData)}.svg`
            },
            // by default figma-export adds the "page" name to the path (so creating an extra folder)
            // but we prefer to have all the icons saved under the "SVG" format (so we're open in the future to have other formats too)
            getDirname: (): string => 'svg',
        })
    ];

    // TODO move to a standalone function and file
    await figmaExport.components({
        fileId: config.figmaFile.id,
        concurrency: 30,
        token: process.env.FIGMA_TOKEN || 'MISSING-TOKEN-ADD-IT-TO-ENV-FILE',
        onlyFromPages: [config.figmaFile.page],
        transformers: requirePackages<FigmaExport.StringTransformer>(transformer),
        outputters: requirePackages<FigmaExport.ComponentOutputter>(outputter, { output: config.outputFolder }),
    }).then(async (figmaExportPageNode) => {

        const assetsExportedIDs = figmaExportPageNode[0].components.map((component) => component.id);
        const assetsExpectedIDs = Object.keys(assetsMetadata);
        if (isEqual(assetsExportedIDs.sort(), assetsExpectedIDs.sort())) {
            generateAssetsCatalog({ config, assetsMetadata, figmaExportPageNode });
        } else {
            console.log(chalk.red(`WARNING:\nThe number of assets retrieved (${assetsExportedIDs.length}) and the number of assets expected (${assetsExpectedIDs.length}) are different. Please check why, this is unexpected.`));
        }

    }).catch((err: Error) => {
        console.error(err);
    });
}
