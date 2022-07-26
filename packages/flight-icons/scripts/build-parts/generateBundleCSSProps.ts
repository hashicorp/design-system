import fs from 'fs-extra';

import { ConfigData } from '../@types/ConfigData';
import { AssetsCatalog } from '../@types/AssetsCatalog';
import { getCssForIconAnimation } from './getCssForIconAnimation';

const getCssProperty = ({ fileName, svgSource }: { fileName: string; svgSource: any }) => {

    // remove width/height attributes
    svgSource = svgSource.replace(/ width="\d+" height="\d+"/gi, '');

    // replace #000001 ("dynamic" color in Figma) with #000 (the icon needs to be tinted with other ways)
    svgSource = svgSource.replace(/#000001/g, '#000');

    // replace # with equivalent url-escaped value (no need for full "encodeURIComponent" transformation)
    svgSource = svgSource.replace(/#/g, "%23");

    return `--icon-${fileName}: url('data:image/svg+xml;charset=UTF-8,${svgSource}');`;
};

export async function generateBundleCSSProps({ config, catalog } : { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {

    const tempSVGFolderPath = config.tempFolder;

    // remove the generated content from the destination folder
    try {
        await fs.emptyDir(`${config.mainFolder}/css-props`)
    } catch (err) {
        console.error(err);
    }

    const cssPropsList = [];

    // process the SVGs and convert them to a CSS prop
    for(const { fileName } of catalog.assets) {
        const svgSource = await fs.readFile(`${tempSVGFolderPath}/${fileName}.svg`, 'utf8');
        const cssProp = getCssProperty({ fileName, svgSource });
        await fs.writeFile(`${config.mainFolder}/css-props/${fileName}.css`, `:root { ${cssProp} }`);
        cssPropsList.push(`  ${cssProp}`);
    }

    // generate a single file with all the props
    await fs.writeFile(`${config.mainFolder}/css-props/index.css`, `:root {\n${cssPropsList.join('\n')}\n}`);

    // add CSS used to animate "loading" and "running" icons
    await fs.writeFile(`${config.mainFolder}/css-props/animation.css`, getCssForIconAnimation());
}
