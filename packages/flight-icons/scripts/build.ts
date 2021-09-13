import dotenv from 'dotenv';
import fs from 'fs-extra';
import del from 'del';
import chalk from 'chalk';

import { optimizeAssetsSVG } from './build-parts/optimizeAssetsSVG';
import { generateBundleSVG } from './build-parts/generateBundleSVG';
import { generateBundleSVGSprite } from './build-parts/generateBundleSVGSprite';
import { generateBundleCSS } from './build-parts/generateBundleCSS';
import { updateEmberAddon } from './build-parts/updateEmberAddon';

// read the environment variables from the ".env" file
dotenv.config();

// read our custom config
import { config } from './config';

(async () => {
    try {
        console.log(`\n==========\n${chalk.cyan('Build started...')}\n==========\n`);

        await build();

        console.log(`\n==========\n${chalk.green('Build completed.')}\n==========\n`);

    } catch (err) {
        console.error(err);
        process.exit(1);

    }
})();

async function build() {

    // empty the existing dist folder
    try {
        console.log('Emptying "build" dist folder');
        fs.emptyDirSync(config.distFolder);
    } catch (err) {
        console.error(err);
    }

    // create temporary folder
    try {
        console.log('Creating "build" temp folder');
        fs.mkdirsSync(`${config.distFolder}/temp`);
    } catch (err) {
        console.error(err);
    }

    // read the assets "catalog"
    const catalog = fs.readJSONSync(`${config.srcFolder}/catalog.json`);

    // pre-process the assets (SVG optimization)
    await optimizeAssetsSVG({ config, catalog });

    // generate the bundle for the standalone SVGs
    await generateBundleSVG({ config });

    // generate the bundle for the SVG sprite
    await generateBundleSVGSprite({ config, catalog });

    // generate the bundle for the CSS/SASS files
    await generateBundleCSS({ config, catalog });

    // update SVGs and catalog.json in the Ember addon
    await updateEmberAddon({ config });

    // remove temporary folder
    // notice: comment this if you need to debug the assets initial SVG processing
    try {
        console.log('Removing "build" temp folder');
        del.sync(`${config.distFolder}/temp`, { force: true });
    } catch (err) {
        console.error(err);
    }
}
