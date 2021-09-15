import fs from 'fs-extra';

import { ConfigData } from '../@types/ConfigData';
import { AssetsCatalog } from '../@types/AssetsCatalog';

export async function generateBundleSVG({ config, catalog } : { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {

    const tempSVGFolderPath = `${config.distFolder}/temp`;
    const distBundleFolderPath = `${config.distFolder}/flight-icons-svg`;

    // make sure the destination folder exists
    await fs.ensureDir(`${distBundleFolderPath}/svg`);

    // copy the assets catalog file
    await fs.copy(`${config.srcFolder}/catalog.json`, `${distBundleFolderPath}/catalog.json`);

    // process the SVG files
    for(const { fileName } of catalog.assets) {
        let svgSource = await fs.readFile(`${tempSVGFolderPath}/${fileName}.svg`, 'utf8');
        // replace #000001 ("dynamic" color in Figma) with "currentColor"
        svgSource = svgSource.replace(/"#000001"/gi, '"currentColor"');
        // save the processed SVG file to the "dist" target folder (more correctly, its subfolder)
        await fs.writeFile(`${distBundleFolderPath}/svg/${fileName}.svg`, svgSource);
    }
}
