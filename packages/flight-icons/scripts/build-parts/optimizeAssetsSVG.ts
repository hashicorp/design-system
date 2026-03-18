/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';
import chalk from 'chalk';

import { optimize, type Config } from 'svgo';

import { ConfigData } from '../@types/ConfigData';
import { AssetsCatalog } from '../@types/AssetsCatalog';

// Notice: in case in the future you start to see SVGs containing strange "clipPath" attributes
// is not a problem of SVGO configuration, is Figma adding it to the exported SVGs when the content of a frame/component
// touches the borders of the bounding box. The solution is to uncheck the "Clip content" flag in the Figma UI for that element.
// See: https://forum.figma.com/t/setting-an-explicit-svg-viewbox/2504/7
const svgoConfig = {
    plugins: [
        { name: 'preset-default' },
        // IMPORTANT: this is needed so SVGO will add the icon name (see below) as prefix for the IDs
        { name: 'prefixIds' },
    ]
} satisfies Config;


// if in the future this does more than simply optimize, we can rename it to "preprocessAssetsSVG"
export async function optimizeAssetsSVG({ config, catalog } : { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {

    // IMPORTANT: don't use foreach here, it does async stuff inside!
    for (const asset of catalog.assets) {
        // Note: `svg-original/` directory is the raw .svg output from Figma, before processing
        const srcAssetPath = `${config.mainFolder}/svg-original/${asset.fileName}.svg`;
        const tempAssetPath = `${config.tempFolder}/${asset.fileName}.svg`;

        // check that the asset actually exists in the "src" folder
        if (fs.existsSync(srcAssetPath)) {
            // Note: Noisy so commented out by default. Feel free to change locally.
            // console.log(`Processing asset "${asset.fileName}.svg"`);

            // optimize the SVG and add it to the temp folder
            try {
                const svgSource = await fs.readFile(srcAssetPath, 'utf8');

                // IMPORTANT: the "path" is used by SVGO to extract the icon name and add it as prefix to the IDs
                const svgOptimized = optimize(svgSource, {
                    ...svgoConfig,
                    path: asset.fileName,
                });

                await fs.outputFile(tempAssetPath, svgOptimized.data);

            } catch (err) {
                console.log(`Error with SVG optimization for ${asset.fileName}.svg:`);
                console.error(err);
            }

        } else {
            console.error(chalk.red(`ATTENTION:\nCould not find source file "${asset.fileName}.svg", please check why.\nYou can try to run the "sync" again and see if this fixes the issue.`));
        }
    }
}
