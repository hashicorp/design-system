import fs from 'fs-extra';
import chalk from 'chalk';

// Notice: we're using SVGO vs 1.3.2 instead of 2.x.x because the new version has a terrible API, the documentation is still missing
// and I couldn't set it up to work in a node script; since what it does is just optimize an SVG and the SVG format hasn't changed in years
// is safe to use this older version, nothing groundbreaking is lost.
import SVGO from 'svgo';

import { ConfigData } from '../@types/ConfigData';
import { AssetCatalogItem, AssetsCatalog } from '../@types/AssetsCatalog';

const svgo = new SVGO({
    plugins: [
        { prefixIds: { prefix: 'flight' } },
        // TODO! discuss these settings with Melanie
        { removeXMLNS: false }, // we need the assets could be viewed from a file manager
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
            console.log(`Processing asset "${asset.fileName}.svg"`);

            // optimize the SVG and it them to the temp folder
            try {
                let svgSource = await fs.readFile(srcAssetPath, 'utf8');

                // replace #000001 ("dynamic" color in Figma) with "currentColor"
                svgSource = svgSource.replace(/"#000001"/gi, '"currentColor"');

                const svgOptimized = await svgo.optimize(svgSource);

                fs.outputFile(tempAssetPath, svgOptimized.data);

            } catch (err) {
                console.error(`Error with SVG optimization for ${asset.fileName}.svg:`, err.message);
            }

        } else {
            console.error(chalk.red(`ATTENTION:\nCould not find source file "${asset.fileName}.svg" in the folder ${config.syncOutputFolder}/svg/, please check why.\nYou can try to run the "sync" again and see if this fixes the issue.`));
        }
    }
}
