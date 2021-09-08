import fs from 'fs-extra';

import * as FigmaExport from '@figma-export/types';

import { AssetCoreData, AssetsMetadata } from '../@types/AssetsMetadata';
import { AssetCatalogItem, AssetsCatalog } from '../@types/AssetsCatalog';
import { getAssetFileName } from './getAssetFileName';

import { ConfigData } from '../@types/ConfigData';

export async function generateAssetsCatalog({ config, assetsMetadata, figmaExportPageNode } : { config: ConfigData, assetsMetadata: AssetsMetadata, figmaExportPageNode: FigmaExport.PageNode[] }): Promise<void> {

    // initialize the catalog file
    const assetsCatalog: AssetsCatalog = {
        lastRunTimeISO: new Date().toISOString(),
        lastRunFigma: config.figmaFile,
        assets: []
    };

    // TODO change to "assetsMetadata" loop
    figmaExportPageNode[0].components.forEach(component => {

        const assetCoreData: AssetCoreData = assetsMetadata[component.id];

        // add the asset and its relevant data to the catalog and save it as JSON file
        const assetCatalogItemData: AssetCatalogItem = {
            id: component.id,
            fileName: getAssetFileName(assetCoreData),
            iconName: assetCoreData.iconName,
            description: assetCoreData.description,
            size: assetCoreData.variantProps?.size || '',
            width: component.absoluteBoundingBox.width,
            height: component.absoluteBoundingBox.width,
        };
        assetsCatalog.assets.push(assetCatalogItemData);
        fs.writeJsonSync(`${config.outputFolder}/catalog.json`, assetsCatalog, { spaces: 2 });

    });
}
