import fs from 'fs-extra';
import chalk from 'chalk';

// Notice: we're using SVGO vs 1.3.2 instead of 2.x.x because the new version has a terrible API, the documentation is still missing
// and I couldn't set it up to work in a node script; since what it does is just optimize an SVG and the SVG format hasn't changed in years
// is safe to use this older version, nothing groundbreaking is lost.
import SVGO from 'svgo';

import { ConfigData } from '../@types/ConfigData';
import { AssetsCatalog } from '../@types/AssetsCatalog';

// Notice: in case in the future you start to see SVGs containing strange "clipPath" attributes
// is not a problem of SVGO configuration, is Figma adding it to the exported SVGs when the content of a frame/component
// touches the borders of the bounding box. The solution is to uncheck the "Clip content" flag in the Figma UI for that element.
// See: https://forum.figma.com/t/setting-an-explicit-svg-viewbox/2504/7
const svgo = new SVGO({
    plugins: [
        // IMPORTANT: this is needed so SVGO will add the icon name (see below) as prefix for the IDs
        { prefixIds: true },
        { removeViewBox: false },
        { sortAttrs: true },
    ]
});


// if in the future this does more than simply optimize, we can rename it to "preprocessAssetsSVG"
export async function optimizeAssetsSVG({ config, catalog } : { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {

    // IMPORTANT: don't use foreach here, it does async stuff inside!
    for (const asset of catalog.assets) {

        const srcAssetPath = `${config.syncOutputFolder}/svg/${asset.fileName}.svg`;
        const tempAssetPath = `${config.buildDistFolder}/temp/${asset.fileName}.svg`;

        // check that the asset actually exists in the "src" folder
        if (fs.existsSync(srcAssetPath)) {
            // console.log(`Processing asset "${asset.fileName}.svg"`);

            // optimize the SVG and add it to the temp folder
            try {
                let svgSource = await fs.readFile(srcAssetPath, 'utf8');

                // replace #000001 ("dynamic" color in Figma) with "currentColor"
                svgSource = svgSource.replace(/"#000001"/gi, '"currentColor"');

                // IMPORTANT: the "path" is used by SVGO to extract the icon name and add it as prefix to the IDs
                const svgOptimized = await svgo.optimize(svgSource, { path: asset.fileName });

                await fs.outputFile(tempAssetPath, svgOptimized.data);

            } catch (err) {
                console.log(`Error with SVG optimization for ${asset.fileName}.svg:`);
                console.error(err);
            }

        } else {
            console.error(chalk.red(`ATTENTION:\nCould not find source file "${asset.fileName}.svg" in the folder ${config.syncOutputFolder}/svg/, please check why.\nYou can try to run the "sync" again and see if this fixes the issue.`));
        }
    }
}
