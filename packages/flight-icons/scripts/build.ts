import dotenv from 'dotenv';
import fs from 'fs-extra';
import del from 'del';
import chalk from 'chalk';

import { optimizeAssetsSVG } from './build-parts/optimizeAssetsSVG';
import { generateBundleSVG } from './build-parts/generateBundleSVG';
import { generateBundleSVGSprite } from './build-parts/generateBundleSVGSprite';
import { generateBundleSVGReact } from './build-parts/generateBundleSVGReact';
import { generatePublicZIPFile } from './build-parts/generatePublicZIPFile';

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

    // prepare the temporary folder
    try {
        console.log('Preparing the "temp" folder');
        if (fs.existsSync(config.tempFolder)) {
            fs.emptyDirSync(config.tempFolder);
        } else {
            fs.mkdirsSync(config.tempFolder);
        }
    } catch (err) {
        console.error(err);
    }

    // read the assets "catalog"
    const catalog = fs.readJSONSync(`${config.mainFolder}/catalog.json`);

    // pre-process the assets (SVG optimization)
    console.log('Optimizing the SVG files');
    await optimizeAssetsSVG({ config, catalog });

    // generate the bundle for the standalone SVGs
    console.log('Generating bundle for standalone SVG files');
    await generateBundleSVG({ config, catalog });

    // generate the bundle for the SVG sprite
    console.log('Generating bundle for SVG sprite');
    await generateBundleSVGSprite({ config, catalog });

    // generate the bundle for the SVGs in React
    console.log('Generating bundle for SVG React');
    await generateBundleSVGReact({ config, catalog });

    // zip the standalone SVG bundle and save it in the dummy app public folder
    console.log('Generating ZIP file with standalone SVG files');
    await generatePublicZIPFile({ config });

    // remove temporary folder
    // notice: comment this if you need to debug the assets initial SVG processing
    try {
        console.log('Removing the "temp" folder');
        del.sync(`${config.tempFolder}`, { force: true });
    } catch (err) {
        console.error(err);
    }
}
