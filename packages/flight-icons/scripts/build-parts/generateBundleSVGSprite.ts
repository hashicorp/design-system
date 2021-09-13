import fs from 'fs-extra';
import chalk from 'chalk';

// @ts-ignore svgstore doesn't have type definitions available
import svgstore from 'svgstore';

import { ConfigData } from '../@types/ConfigData';
import { AssetsCatalog } from '../@types/AssetsCatalog';

export async function generateBundleSVGSprite({ config, catalog } : { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {

    // TODO add better logging
    console.log('generateBundleSVGStore');

    const tempSVGFolderPath = `${config.distFolder}/temp`;
    const distBundleFolderPath = `${config.distFolder}/flight-icons-svg-sprite`;

    // create the destination folder
    await fs.mkdirs(distBundleFolderPath);

    // copy the assets catalog file
    await fs.copy(`${config.srcFolder}/catalog.json`, `${distBundleFolderPath}/catalog.json`);

    // generate the sprite via "svgstore"
    const sprites = svgstore({
        // see https://github.com/svgstore/svgstore#options for details
        renameDefs: true, // Rename defs content ids to make them inherit files' names so that it would help to avoid defs with same ids in the output file.
    });

    for(const { fileName } of catalog.assets) {
        sprites.add(fileName, await fs.readFile(`${tempSVGFolderPath}/${fileName}.svg`, 'utf8'));
    }

    // save the sprite in the destination folder
    await fs.writeFile(`${distBundleFolderPath}/flight-icons-svg-sprite.svg`, sprites);

    // TODO something else?
}