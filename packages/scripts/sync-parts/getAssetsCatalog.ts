import * as FigmaExport from '@figma-export/types';

import { AssetCoreData, AssetsMetadata } from '../@types/AssetsMetadata';
import { AssetCatalogItem, AssetsCatalog } from '../@types/AssetsCatalog';
import { getAssetFileName } from './getAssetFileName';

import { ConfigData } from '../@types/ConfigData';

export function getAssetsCatalog({ config, assetsMetadata, figmaExportPageNode } : { config: ConfigData, assetsMetadata: AssetsMetadata, figmaExportPageNode: FigmaExport.PageNode[] }): AssetsCatalog {

    // initialize the "catalog" object
    const assetsCatalog: AssetsCatalog = {
        lastRunTimeISO: new Date().toISOString(),
        lastRunFigma: config.figmaFile,
        assets: []
    };

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
    });

    return assetsCatalog;
}
