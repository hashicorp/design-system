import fs from 'fs-extra';

import { ConfigData } from '../@types/ConfigData';

export async function generateBundleSVG({ config } : { config: ConfigData }): Promise<void> {

    const tempSVGFolderPath = `${config.distFolder}/temp`;
    const distBundleFolderPath = `${config.distFolder}/flight-icons-svg`;

    // create the destination folder
    await fs.mkdirs(distBundleFolderPath);

    // copy the assets catalog file
    await fs.copy(`${config.srcFolder}/catalog.json`, `${distBundleFolderPath}/catalog.json`);

    // copy the optimized SVGs to the "dist" target folder (more correctly, its subfolder)
    await fs.copy(tempSVGFolderPath, `${distBundleFolderPath}/svg/`);
}
