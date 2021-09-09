import fs from 'fs-extra';
import chalk from 'chalk';

import { ConfigData } from '../@types/ConfigData';
import { AssetCatalogItem, AssetsCatalog } from '../@types/AssetsCatalog';

export async function processAssetsSVG({ config, catalog } : { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {
    catalog.assets.forEach((asset: AssetCatalogItem) => {
        // check that the asset actually exists in the "src" folder
        const srcAssetPath = `${config.outputFolder}/svg/${asset.fileName}.svg`;
        const distAssetPath = `${config.buildDistFolder}/temp/${asset.fileName}.svg`;
        if (fs.existsSync(srcAssetPath)) {
            console.log(`Processing asset "${asset.fileName}.svg"`);
            fs.copyFileSync(srcAssetPath, distAssetPath)
        } else {
            console.error(chalk.red(`ATTENTION:\nCould not find source file "${asset.fileName}.svg" in the folder ${config.outputFolder}/svg/, please check why.\nYou can try to run the "sync" again and see if this fixes the issue.`));
        }
    })
}
