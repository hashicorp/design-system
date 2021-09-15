import fs from 'fs-extra';

// @ts-ignore svgstore doesn't have type definitions available
import svgstore from 'svgstore';

import { ConfigData } from '../@types/ConfigData';
import { AssetsCatalog } from '../@types/AssetsCatalog';

export async function generateBundleSVGSprite({ config, catalog } : { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {

    const tempSVGFolderPath = `${config.distFolder}/temp`;
    const distBundleFolderPath = `${config.distFolder}/flight-icons-svg-sprite`;

    // create the destination folder
    await fs.mkdirs(distBundleFolderPath);

    // copy the assets catalog file
    await fs.copy(`${config.srcFolder}/catalog.json`, `${distBundleFolderPath}/catalog.json`);

    // generate the sprite via "svgstore"
    const sprites = svgstore({
        // see https://github.com/svgstore/svgstore#options for details
        renameDefs: false, // we already create unique IDs (using the icon name) in the SVGO step
    });

    // add the SVGs to the sprite
    for(const { fileName } of catalog.assets) {
        let svgSource = await fs.readFile(`${tempSVGFolderPath}/${fileName}.svg`, 'utf8');
        // replace #000001 ("dynamic" color in Figma) with "currentColor"
        svgSource = svgSource.replace(/"#000001"/gi, '"currentColor"');
        // add the processed SVG content to the sprite
        sprites.add(fileName, svgSource);
    }

    // save the sprite in the destination folder
    await fs.writeFile(`${distBundleFolderPath}/flight-icons-svg-sprite.svg`, sprites);
}