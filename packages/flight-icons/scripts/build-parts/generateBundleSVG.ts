import fs from 'fs-extra';

import { ConfigData } from '../@types/ConfigData';
import { AssetsCatalog } from '../@types/AssetsCatalog';

export async function generateBundleSVG({ config, catalog } : { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {

    // remove the generated content from the "dist" folder
    try {
        await fs.emptyDir(`${config.mainFolder}/svg`)
    } catch (err) {
        console.error(err);
    }

    // process the SVG files
    for(const { fileName } of catalog.assets) {
        let svgSource = await fs.readFile(`${config.tempFolder}/${fileName}.svg`, 'utf8');
        // replace #000001 ("dynamic" color in Figma) with "currentColor"
        svgSource = svgSource.replace(/"#000001"/gi, '"currentColor"');
        // save the processed SVG file to the "dist" target folder (more correctly, its subfolder)
        await fs.writeFile(`${config.mainFolder}/svg/${fileName}.svg`, svgSource);
    }
}
