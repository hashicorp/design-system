import fs from 'fs-extra';
import chalk from 'chalk';

import { ConfigData } from '../@types/ConfigData';

export async function generateBundleEmberAddon({ config } : { config: ConfigData }): Promise<void> {

    // TODO add better logging
    console.log('generateBundleEmberAddon');

    const addonTemplateFolder = `${config.srcFolder}/ember-addon-template`;
    const distBundleFolderPath = `${config.distFolder}/ember-flight-icons`;
    const addonPublicFolder = `${distBundleFolderPath}/public/icons`;

    // create the destination folder
    await fs.mkdirs(distBundleFolderPath);

    // copy the assets catalog file
    // TODO is this really needed for Ember?
    await fs.copy(`${config.srcFolder}/catalog.json`, `${distBundleFolderPath}/catalog.json`);

    // copy the source/template addon folder to the dist folder
    await fs.copy(addonTemplateFolder, distBundleFolderPath);

    // create the "public" destination folder for the sprite file
    await fs.ensureDir(addonPublicFolder);

    // copy the previously generated SVG sprite in the dist folder
    await fs.copy(`${config.distFolder}/flight-icons-svg-sprite/flight-icons-svg-sprite.svg`, `${addonPublicFolder}/sprite.svg`);

    // TODO something else?
}
