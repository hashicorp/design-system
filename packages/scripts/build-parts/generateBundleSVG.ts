import fs from 'fs-extra';
import chalk from 'chalk';

import { ConfigData } from '../@types/ConfigData';

export async function generateBundleSVG({ config } : { config: ConfigData }): Promise<void> {

    // TODO add better logging
    console.log('generateBundleSVG');

    const tempSVGFolderPath = `${config.buildDistFolder}/temp`;
    const distBundleFolderPath = `${config.buildDistFolder}/flight-icons-svg`;

    // create the destination folder
    await fs.mkdirs(distBundleFolderPath);

    // copy the assets catalog file
    await fs.copy(`${config.syncOutputFolder}/catalog.json`, `${distBundleFolderPath}/catalog.json`);

    // copy the optimized SVGs to the "dist" target folder (more correctly, its subfolder)
    await fs.copy(tempSVGFolderPath, `${distBundleFolderPath}/svg/`);

    // TODO something else?
}
