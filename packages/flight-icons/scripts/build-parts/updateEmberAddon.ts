import fs from 'fs-extra';
import chalk from 'chalk';

import { ConfigData } from '../@types/ConfigData';

export async function updateEmberAddon({ config } : { config: ConfigData }): Promise<void> {

    // TODO add better logging
    console.log('updateEmberAddon');

    const emberPublicIconsFolder = `${config.emberPublicFolder}/icons`;
    // const distBundleFolderPath = `${config.distFolder}/ember-flight-icons`;

    // make sure the destination folder exists
    await fs.ensureDir(emberPublicIconsFolder);

    // update the assets catalog file
    await fs.copy(`${config.srcFolder}/catalog.json`, `${emberPublicIconsFolder}/catalog.json`);

    // update the SVG sprite
    await fs.copy(`${config.distFolder}/flight-icons-svg-sprite/flight-icons-svg-sprite.svg`, `${emberPublicIconsFolder}/sprite.svg`);

}
