const VERBOSE = false; // verbose logging for development
global.verbose = VERBOSE;

import fs from 'fs-extra';
import del from 'del';
import chalk from 'chalk';
import dotenv from 'dotenv';

import * as FigmaExport from '@figma-export/types';
import * as figmaExport from '@figma-export/core';
import { requirePackages } from '@figma-export/cli/dist/utils';
import { StringTransformer, ComponentOutputter } from '@figma-export/types';
import outputComponentsAsSvg from '@figma-export/output-components-as-svg';
import isEqual from 'lodash/isEqual';

import { AssetCoreData } from './@types/AssetsMetadata';
import { AssetCatalogItem, AssetsCatalog } from './@types/AssetsCatalog';
import { getAssetsMetadata } from './sync-parts/getAssetsMetadata';

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
    await new Promise(resolve => setTimeout(resolve, 1000));

    // remove existing output folder
    if (VERBOSE) {
        console.log('Removing "sync" output folder');
    }
    del.sync(config.outputFolder, { force: true });

    // we removed the SVGO transformer, we will do it later in the "build" part with other parameters
    const transformer: StringTransformer[] = [];
    const outputter: ComponentOutputter[] = [
        outputComponentsAsSvg({
            output: `${config.outputFolder}/assets`,
            // IMPORTANT: this is used to change icon's name (otherwise variants with the same props/values will override one another)
            getBasename: (options: FigmaExport.ComponentOutputterParamOption): string => {
                // the variants' name looks like this: "Size=16, Style=Color" and we want to sanitize it
                const sanitizedFileName = getTemporaryFileName({ componentId: options.id, variantName: options.basename });
                return `${sanitizedFileName}.svg`
            },
            // by default figma-export adds the "page" name to the path (so creating an extra folder, but we prefer to have all the icons saved directly in the output folder
            getDirname: (): string => '',
        })
    ];

    // TODO move to a standalone function and file
    await figmaExport.components({
        fileId: config.figmaFile.id,
        concurrency: 30,
        token: process.env.FIGMA_TOKEN || 'MISSING-TOKEN-ADD-IT-TO-ENV-FILE',
        onlyFromPages: [config.figmaFile.page],
        transformers: requirePackages<FigmaExport.StringTransformer>(transformer),
        outputters: requirePackages<FigmaExport.ComponentOutputter>(outputter, { output: `${config.outputFolder}/assets` }),
    }).then(async (figmaExportPageNode) => {

        // let's retrieve the assets metadata via REST api
        const assetsMetadata = await getAssetsMetadata();

        // initialize the catalog file
        const assetsCatalog: AssetsCatalog = {
            lastRunTimeISO: new Date().toISOString(),
            lastRunFigma: config.figmaFile,
            assets: []
        };

        const assetsExportedIDs = figmaExportPageNode[0].components.map((component) => component.id);
        const assetsExpectedIDs = Object.keys(assetsMetadata);
        if (isEqual(assetsExportedIDs.sort(), assetsExpectedIDs.sort())) {
            figmaExportPageNode[0].components.forEach(component => {

                const assetMetadata: AssetCoreData = assetsMetadata[component.id];

                // rename the exported file
                const expectedFileName = getTemporaryFileName({ componentId: component.id, variantName: component.name });
                const expectedFilePath = `${config.outputFolder}/assets/${expectedFileName}.svg`;
                if (fs.existsSync(expectedFilePath)) {

                    const renamedFileNameParts = [];
                    renamedFileNameParts.push(assetMetadata.iconName);
                    if (assetMetadata.variantProps) {
                        if (assetMetadata.variantProps.style) {
                            // we don't add the "mono" style to the asset filename, it's considered the default
                            if (assetMetadata.variantProps.style !== 'mono') {
                                renamedFileNameParts.push(assetMetadata.variantProps.style);
                            }
                        }
                        if (assetMetadata.variantProps.size) {
                            renamedFileNameParts.push(assetMetadata.variantProps.size);
                        }
                    }
                    const renamedFileName = `${renamedFileNameParts.join('-')}.svg`;
                    const renamedFilePath = `${config.outputFolder}/assets/${renamedFileName}`;
                    fs.renameSync(expectedFilePath, renamedFilePath);

                } else {
                    console.log(chalk.red(`WARNING:\nExpected to rename the asset file "${expectedFileName}" but the file is missing. Please check why, this is unexpected.`));
                }

                // add the asset and its relevant data to the catalog and save it as JSON file
                const assetCatalogItemData: AssetCatalogItem = {
                    id: component.id,
                    name: assetMetadata.iconName,
                    description: assetMetadata.description,
                    size: assetMetadata.variantProps?.size || '',
                    width: component.absoluteBoundingBox.width,
                    height: component.absoluteBoundingBox.width,
                };
                assetsCatalog.assets.push(assetCatalogItemData);
                // we use JSON.stringify to prettify the output (alternatively, we can use Prettier for more complex needs)
                fs.writeJsonSync(`${config.outputFolder}/catalog.json`, assetsCatalog, { spaces: 2 });

            });
        } else {
            console.log(chalk.red(`WARNING:\nThe number of assets retrieved (${assetsExportedIDs.length}) and the number of assets expected (${assetsExpectedIDs.length}) are different. Please check why, this is unexpected.`));
        }

        // DEBUG
        // console.log('figmaExportPageNode', JSON.stringify(figmaExportPageNode));
        // console.log('assetsMetadata', JSON.stringify(assetsMetadata));
        // console.log('assetsCatalog', JSON.stringify(assetsCatalog));

    }).catch((err: Error) => {
        console.error(err);
    });
}

const getTemporaryFileName = ({ componentId, variantName }: { componentId: string; variantName: string }) => {
    const variantProperties = variantName.split(', ')
    return `ID=${componentId}__${variantProperties.join('__')}`;
}