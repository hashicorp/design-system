/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';
import cheerio from 'cheerio';
import prettier from 'prettier';
import path from 'path';

import { ConfigData } from '../@types/ConfigData';
import { AssetsCatalog } from '../@types/AssetsCatalog';

const prettierConfig = {
    parser: 'typescript',
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'none'
} as const;

const getSymbolFunction = (sourceSvg: string): string => {
    const $ = cheerio.load(sourceSvg, { xmlMode: true });
    const $svg = $('svg');
    const viewBox = $svg.attr('viewBox') || '0 0 16 16';

    $('[fill]').each((_i: number, el: unknown) => {
        const val = $(el).attr('fill');
        if (val && val !== 'none') {
            $(el).attr('fill', 'currentColor');
        }
    });

    const innerContent = $svg.html() ?? '';

    return `function (id) {
        return \`<symbol id="\${id}" viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor">${innerContent}</g></symbol>\`;
    }`;
};

export async function generateBundleSVGJS({ config, catalog }: { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {
    const tempSVGFolderPath = config.tempFolder;
    const mappingFilePath = path.resolve(__dirname, '../../../../hds-carbon-icon-map.json');
    const carbonIconsPath = path.resolve(__dirname, '../../node_modules/@carbon/icons/svg');

    let mapping: Record<string, string> = {};
    try {
        mapping = await fs.readJSON(mappingFilePath);
    } catch {
        console.warn('⚠️ Map file not found.');
    }

    const outputFolder = `${config.mainFolder}/js-symbols`;
    await fs.emptyDir(outputFolder).catch(console.error);

    for (const { fileName } of catalog.assets) {
        let flightFuncString = 'null';
        try {
            const flightSource = await fs.readFile(`${tempSVGFolderPath}/${fileName}.svg`, 'utf8');
            flightFuncString = getSymbolFunction(flightSource);
        } catch (err) {
            console.error(`Error reading Flight icon: ${fileName}`, err);
        }

        let carbonFuncString = 'null';
        const baseName = fileName.replace(/-(16|24)$/, '');
        const carbonName = mapping[baseName];

        if (carbonName) {
            const sizeMatch = fileName.match(/-(16|24)$/);
            if (sizeMatch) {
                const size = sizeMatch[1];
                const carbonPath = path.join(carbonIconsPath, size, `${carbonName}.svg`);

                if (fs.existsSync(carbonPath)) {
                    const carbonSource = await fs.readFile(carbonPath, 'utf8');
                    carbonFuncString = getSymbolFunction(carbonSource);
                } else {
                    console.warn(`⚠️ Carbon icon missing: ${carbonName} (size ${size})`);
                }
            }
        }

        const fileContent = await prettier.format(`
            export const flight = ${flightFuncString};
            export const carbon = ${carbonFuncString};
        `, prettierConfig);

        await fs.writeFile(`${outputFolder}/${fileName}.js`, fileContent);
    }

    // Generate Registry (JS + Types)
    const jsEntries: string[] = [];
    const dtsEntries: string[] = [];

    for (const { fileName } of catalog.assets) {
        jsEntries.push(`    '${fileName}': () => import('./${fileName}.js'),`);
        dtsEntries.push(`    '${fileName}': () => Promise<IconModule>;`);
    }

    const registryJsContent = await prettier.format(`
        export const IconRegistry = {
        ${jsEntries.join('\n')}
        };
    `, { ...prettierConfig, parser: 'babel' });

    await fs.writeFile(`${outputFolder}/registry.js`, registryJsContent);

    const registryDtsContent = await prettier.format(`
        export interface IconModule {
            flight: (id: string) => string;
            carbon: ((id: string) => string) | null;
        }
        export declare const IconRegistry: {
        ${dtsEntries.join('\n')}
        };
        export type IconModuleName = keyof typeof IconRegistry;
    `, prettierConfig);

    await fs.writeFile(`${outputFolder}/registry.d.ts`, registryDtsContent);
}