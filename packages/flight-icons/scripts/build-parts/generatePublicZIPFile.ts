import fs from 'fs-extra';

import { ConfigData } from '../@types/ConfigData';

import { zipSVGFolder } from './zipSVGFolder';

export async function generatePublicZIPFile({ config } : { config: ConfigData }): Promise<void> {

    const srcFolderPath = `${config.mainFolder}/svg`;
    const zipFilePath = `${config.emberPublicFolder}/flight-icons-svg.zip`;

    // remove the previous version of the ZIP file
    try {
        await fs.remove(zipFilePath)
    } catch (err) {
        console.error(err);
    }

    // zip the standalone SVG folder
    zipSVGFolder({ srcFolderPath, zipFilePath })
}
