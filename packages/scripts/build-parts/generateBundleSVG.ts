import fs from 'fs-extra';
import chalk from 'chalk';

import { ConfigData } from '../@types/ConfigData';

export async function generateBundleSVG({ config } : { config: ConfigData }): Promise<void> {

    // TODO add better logging
    console.log('generateBundleSVG');

    const tempSVGFolderPath = `${config.buildDistFolder}/temp/`;
    const distSVGFolderPath = `${config.buildDistFolder}/flight-icons-svg`;

    await fs.copy(tempSVGFolderPath, distSVGFolderPath);

    // TODO something else?
}
