import fs from 'fs-extra';
import chalk from 'chalk';
import cheerio  from 'cheerio';

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

// see: https://github.com/hashicorp/flight/issues/282 and https://codepen.io/cveigt/pen/xxXJmML
const animateOptions: {[iconName: string] : { timing: number, animationType: string }} = {
    'loading': {
        timing: 0.7,
        animationType: 'rotate',
    },
    'running': {
        timing: 1.1,
        animationType: 'rotate',
    }
} as const;

export async function preprocessAssetsSVG({ config, catalog } : { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {

    // IMPORTANT: don't use foreach here, it does async stuff inside!
    for (const asset of catalog.assets) {

        // Note: `svg-original/` directory is the raw .svg output from Figma, before processing
        const srcAssetPath = `${config.mainFolder}/svg-original/${asset.fileName}.svg`;
        const tempAssetPath = `${config.tempFolder}/${asset.fileName}.svg`;

        // check that the asset actually exists in the "src" folder
        if (fs.existsSync(srcAssetPath)) {
            // Note: Noisy so commented out by default. Feel free to change locally.
            // console.log(`Processing asset "${asset.fileName}.svg"`);

            // process the SVG and save it in the temp folder
            try {

                // read the SVG source
                let svgSource: string = await fs.readFile(srcAssetPath, 'utf8');

                // add SVG animation (to certain icons)
                if (Object.keys(animateOptions).includes(asset.iconName)) {

                    const $ = cheerio.load(svgSource, { xmlMode: true });

                    const center = { x: asset.width / 2, y: asset.height / 2 };
                    const type = animateOptions[asset.iconName].animationType;
                    const duration = animateOptions[asset.iconName].timing;
                    // see https://github.com/cheeriojs/cheerio/blob/45a908167bd3d52af651a58210afb41554751caa/src/api/manipulation.ts#L219
                    // notice: we need the double escape in the selector: one is for escaping the backslash itself in the string, and the second one is to escape the "=" in the ID of the element
                    $(`svg > g#size\\=${asset.size}`).append(`<animateTransform attributeName="transform" type="${type}" from="0 ${center.x} ${center.y}" to="360 ${center.x} ${center.y}" dur="${duration}s" repeatCount="indefinite"></animateTransform>`)

                    // overwrite the SVG source with the animated version
                    svgSource = $.xml();
                }

                // optimize the SVG - IMPORTANT: the "path" is used by SVGO to extract the icon name and add it as prefix to the IDs!
                const svgOptimized = await svgo.optimize(svgSource, { path: asset.fileName });

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
