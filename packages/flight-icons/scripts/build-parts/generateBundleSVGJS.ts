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

// Helper: Transforms raw SVG content into the function string
const getSymbolFunction = (sourceSvg: string): string => {
    const $ = cheerio.load(sourceSvg, { xmlMode: true });
    const $svg = $('svg');

    // CRITICAL: We must capture the viewBox from the source (Carbon varies, Flight is usually 0 0 16 16)
    const viewBox = $svg.attr('viewBox') || '0 0 16 16';

    // Cleanup: Remove existing fills so we can control color via CSS
    $('[fill]').each((_i: number, el: unknown) => {
        const val = $(el).attr('fill');
        if (val && val !== 'none') {
            $(el).attr('fill', 'currentColor');
        }
    });

    // Extract only the inner contents (paths, circles, etc) without the <svg> wrapper
    const innerContent = $svg.html() || '';

    // Return the template literal function
    return `function (id) {
        return \`<symbol id="\${id}" viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">${innerContent}</symbol>\`;
    }`;
};

export async function generateBundleSVGJS({ config, catalog }: { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {

    const tempSVGFolderPath = config.tempFolder;
    // Location of your HDS -> Carbon mapping file
    const mappingFilePath = path.resolve(__dirname, '../../../../hds-carbon-icon-map.json');
    // Location of Carbon icons in node_modules
    const carbonIconsPath = path.resolve(__dirname, '../../node_modules/@carbon/icons/svg');

    let mapping: Record<string, string> = {};

    // Load the mapping file if it exists
    if (fs.existsSync(mappingFilePath)) {
        mapping = await fs.readJSON(mappingFilePath);
    } else {
        console.warn('⚠️  Mapping file not found. Carbon icons will be skipped.');
    }

    // Prepare destination folder
    const outputFolder = `${config.mainFolder}/js-symbols`;
    try {
        await fs.emptyDir(outputFolder);
    } catch (err) {
        console.error(err);
    }

    // Process every icon in the HDS Catalog
    for (const { fileName } of catalog.assets) {
        
        // --- 1. Process Flight Icon (Source: Temp Folder) ---
        let flightFuncString = 'null';
        try {
            const flightSource = await fs.readFile(`${tempSVGFolderPath}/${fileName}.svg`, 'utf8');
            flightFuncString = getSymbolFunction(flightSource);
        } catch (err) {
            console.error(`Error reading Flight icon: ${fileName}`, err);
        }

        // --- 2. Process Carbon Icon (Source: node_modules) ---
        let carbonFuncString = 'null';

        // 1. Extract the base name (remove -16, -20, -24, etc.) to match your JSON keys
        //    "alert-octagon-fill-24" -> "alert-octagon-fill"
        const baseName = fileName.replace(/-(16|20|24|32)$/, '');
        
        // 2. Lookup the mapped name
        const carbonName = mapping[baseName]; 

        if (carbonName) {
            // 3. Smart Size Matching
            //    If we are building "alert-octagon-fill-24", we prefer the 24px Carbon icon.
            //    If that doesn't exist, we fallback to 32, then others.
            
            const sizeMatch = fileName.match(/-(16|20|24|32)$/);
            const targetSize = sizeMatch ? sizeMatch[1] : '32';
            
            // Priority: Target size -> 32 (standard) -> others
            const allSizes = ['32', '24', '20', '16'];
            const sizesToCheck = [targetSize, ...allSizes.filter(s => s !== targetSize)];

            let carbonSource = null;

            for (const size of sizesToCheck) {
                const potentialPath = path.join(carbonIconsPath, size, `${carbonName}.svg`);
                if (fs.existsSync(potentialPath)) {
                    carbonSource = await fs.readFile(potentialPath, 'utf8');
                    break; 
                }
            }

            if (carbonSource) {
                carbonFuncString = getSymbolFunction(carbonSource);
            } else {
                console.warn(`⚠️  Carbon icon mapped but file not found: ${carbonName} (searched for ${fileName})`);
            }
        }

        // --- 3. Generate the File Content ---
        const fileContentRaw = `
            /**
             * Generated Icon: ${fileName}
             */
            export const flight = ${flightFuncString};

            export const carbon = ${carbonFuncString};
        `;

        const fileContent = await prettier.format(fileContentRaw, prettierConfig);
        await fs.writeFile(`${outputFolder}/${fileName}.js`, fileContent);
    }

    // --- 4. Generate Index File ---
    let indexContent = '';
    for (const { fileName } of catalog.assets) {
        // We use "import * as" to namespace them if needed, or just export the file reference
        // But usually, consumers import specific icons: import * as IconAdd from './add';
        // So a simple export list is fine.
        indexContent += `export * as ${camelCaseToPascal(fileName)} from './${fileName}';\n`;
    }
    // Helper for the index (simple implementation)
    function camelCaseToPascal(str: string) {
        return str.replace(/(^\w|-\w)/g, (c) => c.replace('-', '').toUpperCase());
    }

    await fs.writeFile(`${outputFolder}/index.ts`, indexContent);
}