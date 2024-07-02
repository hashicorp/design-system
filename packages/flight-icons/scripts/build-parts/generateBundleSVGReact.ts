/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';
// @ts-ignore svgr/core doesn't have type definitions available yet - see https://github.com/gregberge/svgr/pull/555
import svgr from '@svgr/core';
import cheerio  from 'cheerio';
import prettier from 'prettier';
import { camelCase, upperFirst } from 'lodash';

import { ConfigData } from '../@types/ConfigData';
import { AssetsCatalog } from '../@types/AssetsCatalog';
import { getCssForIconAnimation } from './getCssForIconAnimation';

const prettierConfig = { parser: 'typescript' as const, tabWidth: 4, singleQuote: true, trailingComma: 'none' as const };

const getComponentName = (fileName: string) => {
    return upperFirst(camelCase(`Icon ${fileName}`));
};

const getComponentSource = ({ componentName, svgReact }: { componentName: string; svgReact: any }) => {
    return `
        import { forwardRef, useMemo } from 'react';
        import { IconProps } from './types';

        export const ${componentName} = forwardRef<SVGSVGElement, IconProps>(({ color = 'currentColor', title, ...props }, svgRef) => {
            const titleId = useMemo(() => title ? 'title-' + Math.random().toString(36).substr(2, 9) : undefined, [title]);
            return (
                ${svgReact}
            );
        })
    `;
};

export async function generateBundleSVGReact({ config, catalog } : { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {

    const tempSVGFolderPath = config.tempFolder;

    // remove the generated content from the destination folder
    try {
        await fs.emptyDir(`${config.mainFolder}/svg-react`)
    } catch (err) {
        console.error(err);
    }

    // process the SVGs and convert them to React
    for(const { fileName, iconName } of catalog.assets) {
        let svgSource = await fs.readFile(`${tempSVGFolderPath}/${fileName}.svg`, 'utf8');

        // add CSS class for animation (for certain icons)
        if (['loading', 'running'].includes(iconName)) {

            const $ = cheerio.load(svgSource, { xmlMode: true });
            $(`svg`).addClass(`hds-flight-icon--animation-${iconName}`);

            // overwrite the SVG source with the version with extra CSS class
            svgSource = $.xml();
        }

        const componentName = getComponentName(fileName);

        // convert SVG to React/JSX
        // see: https://github.com/gregberge/svgr/blob/v5.5.0/packages/core/src/convert.js (notice: this is for v5.5.0)
        let svgReact = await svgr(svgSource,
            // CONFIG
            // for all the options see: https://github.com/gregberge/svgr/blob/v5.5.0/packages/core/src/index.d.ts (notice: this is for v5.5.0)
            // for the "outDir" option see: https://github.com/gregberge/svgr/issues/532 (essentially, it's only for CLI)
            // for the "plugins" option: we don't need to use it, SVGO has already been run on the source "temp" files, and prettier will be run by us before saving the files
            {
                icon: false,
                dimensions: true,
                typescript: true,
                expandProps: 'end',
                svgo: false,
                prettier: false,
                ref: true,
                titleProp: true,
                svgProps: { 'aria-hidden': '{!title}' },
                replaceAttrValues: { '#000001': '{color}' },
                // we're using a custom template here so that we just convert the SVG to JSX
                // @ts-ignore
                template: ({ template }, opts, { jsx }) => template.ast`${jsx}`,
                // for more information about using custom templates in svgr (it's not easy, it uses babel AST):
                // - https://react-svgr.com/docs/custom-templates/
                // - https://github.com/gregberge/svgr/issues/363
                // - https://github.com/gregberge/svgr/issues/530)
                // - have a look at this commit, where we had done a few tests: 59120837b54b2666d8ef2e68c01a24c04e5a0600
            },
            // STATE
            {
                componentName: componentName
            }
        );

        // remove the extra semi-colon added at the end of the output by the SVGR AST transformer
        svgReact = svgReact.replace(/;$/,'');

        const componentSource = getComponentSource({ componentName, svgReact});
        const fileContent = await prettier.format(componentSource, prettierConfig);

        await fs.writeFile(`${config.mainFolder}/svg-react/${fileName}.tsx`, fileContent);
    }

    // generate an "index.tsx" file
    let indexContent = '';
    for(const { fileName } of catalog.assets) {
        const componentName = getComponentName(fileName);
        indexContent += `export { ${componentName} } from './${fileName}';\n` ;
    }
    await fs.writeFile(`${config.mainFolder}/svg-react/index.ts`, indexContent);

    // generate a "types.ts" file
    const typesContent = await prettier.format(`
        import { SVGAttributes } from 'react';
        export interface IconProps extends SVGAttributes<SVGElement> {
            children?: never,
            color?: string,
            title?: string,
        }
    `, prettierConfig);

    await fs.writeFile(`${config.mainFolder}/svg-react/types.ts`, typesContent);

    // add CSS used to animate "loading" and "running" icons
    const animationIconCss:string = await getCssForIconAnimation();
    await fs.writeFile(`${config.mainFolder}/svg-react/animation.css`, animationIconCss);
}
