/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import dotenv from 'dotenv';
import fs from 'fs-extra';
import { deleteSync } from 'del';
import chalk from 'chalk';
import isEqual from 'lodash/isEqual';

import { getAssetsMetadata } from './sync-parts/getAssetsMetadata';
import { getAssetsCatalog } from './sync-parts/getAssetsCatalog';
import { exportAssetsToFolder } from './sync-parts/exportAssetsToFolder';

interface InputAsset {
    id: string;
    fileName: string;
    iconName: string;
    category: string;
    size: string;
    width: number;
    height: number;
}

interface InputCatalog {
    assets: InputAsset[];
    lastRunTimeISO: string;
    lastRunFigma: {
        id: string;
        page: string;
        excludeFrames: string[];
    };
}

// read the environment variables from the ".env" file
dotenv.config();

// read our custom config
import { config } from './config';

(async () => {
    try {
        console.log(`\n==========\n${chalk.cyan('Figma sync started...')}\n==========\n`);

        // make sure the user has a ".env" file that contains the required REST API token
        if (!process.env.FIGMA_TOKEN) {
            console.error(chalk.red('ERROR:\nPlease create a ".env" file in the folder with a "FIGMA_TOKEN" variable in it.\nFor more details please look at the documentation.'));
        } else {
            await sync();
        }

        console.log(`\n==========\n${chalk.green('Figma sync completed.')}\n==========\n`);

    } catch (err) {
        console.error(err);
        process.exit(1);

    }
})();

async function sync() {

    // remove existing output folder
    try {
        console.log('Removing "svg-original" output folder');
        deleteSync(`${config.mainFolder}/svg-original/`, { force: true })
    } catch (err) {
        console.error(err);
    }

    // retrieve the assets metadata via REST api
    console.log('Retrieving assets metadata via REST API');
    const assetsMetadata = await getAssetsMetadata();

    // export the assets from Figma to the filesystem
    console.log('Exporting assets via "figma-export" to SVG files\n');
    const figmaExportPageNode = await exportAssetsToFolder({ config, assetsMetadata });

    // check that all the assets have been exported correctly
    const assetsExportedIDs = figmaExportPageNode[0].components.map((component) => component.id);
    const assetsExpectedIDs = Object.keys(assetsMetadata);
    if (isEqual(assetsExportedIDs.sort(), assetsExpectedIDs.sort())) {

        // get the assets "catalog" (will be used by multiple consumers) and save it as JSON file
        const assetsCatalog = getAssetsCatalog({ config, assetsMetadata, figmaExportPageNode });
        try {
            console.log('Saving "catalog.json" file');
            fs.writeJsonSync(`${config.mainFolder}/catalog.json`, assetsCatalog, { spaces: 2 });

            console.log('Generating "catalog.d.ts" type definitions');
            generateTypes(assetsCatalog, `${config.mainFolder}/catalog.d.ts`);
        } catch (err) {
            console.error(err);
        }

    } else {
        console.log(chalk.red(`WARNING:\nThe number of assets retrieved (${assetsExportedIDs.length}) and the number of assets expected (${assetsExpectedIDs.length}) are different. Please check why, this is unexpected.`));
    }
}

function generateTypes(catalog: InputCatalog, outputPath: string) {
    // construct the .d.ts content
    const fileContent = `
import type { IconName } from './svg';

export interface IconAsset {
    iconName: IconName;
    category: string;
    size: string;
    [key: string]: unknown; 
}

export interface IconCatalog {
    assets: IconAsset[];
}

declare const catalog: IconCatalog;
export default catalog;
`;

    fs.writeFileSync(outputPath, fileContent);
}