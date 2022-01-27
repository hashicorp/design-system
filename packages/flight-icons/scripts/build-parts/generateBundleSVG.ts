import fs from 'fs-extra';
import cheerio  from 'cheerio';

import { ConfigData } from '../@types/ConfigData';
import { AssetsCatalog } from '../@types/AssetsCatalog';
import { getCssForIconAnimation } from './getCssForIconAnimation';

export async function generateBundleSVG({ config, catalog } : { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {

    // remove the generated content from the destination folder
    try {
        await fs.emptyDir(`${config.mainFolder}/svg`)
    } catch (err) {
        console.error(err);
    }

    // process the SVG files
    for(const { fileName, iconName } of catalog.assets) {
        let svgSource = await fs.readFile(`${config.tempFolder}/${fileName}.svg`, 'utf8');

        // replace #000001 ("dynamic" color in Figma) with "currentColor"
        svgSource = svgSource.replace(/"#000001"/gi, '"currentColor"');

        // add CSS class for animation (for certain icons)
        if (['loading', 'running'].includes(iconName)) {

            const $ = cheerio.load(svgSource, { xmlMode: true });
            $(`svg`).addClass(`hds-flight-icon--animation-${iconName}`);

            // overwrite the SVG source with the version with extra CSS class
            svgSource = $.xml();
        }

        // save the processed SVG files to the `svg/` directory
        await fs.writeFile(`${config.mainFolder}/svg/${fileName}.svg`, svgSource);
    }

    // add CSS used to animate "loading" and "running" icons
    await fs.writeFile(`${config.mainFolder}/svg/animation.css`, getCssForIconAnimation());
}
