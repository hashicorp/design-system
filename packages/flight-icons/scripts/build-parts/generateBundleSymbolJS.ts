/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';
import prettier from 'prettier';
import path from 'path';
import replaceDynamicColor from './replaceDynamicColor';

import { ConfigData } from '../@types/ConfigData';
import { AssetsCatalog } from '../@types/AssetsCatalog';

const prettierConfig = {
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'none'
} as const;

const getSymbolModule = (sourceSvg: string): string => {
    const viewBoxMatch = sourceSvg.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 16 16';

    let innerContent = sourceSvg
        .replace(/<svg[^>]*>/, '')
        .replace(/<\/svg>/, '');

    innerContent = replaceDynamicColor(innerContent);

    return `export default function (id) {
        return \`<symbol id="\${id}" viewBox="${viewBox}">${innerContent}</symbol>\`;
    }`;
};

export async function generateBundleSymbolJS({ config, catalog }: { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {
    const tempSVGFolderPath = config.tempFolder;
    const mappingFilePath = path.resolve(__dirname, '../../../../hds-carbon-icon-map.json');
    const carbonIconsPath = path.resolve(__dirname, '../../node_modules/@carbon/icons/svg');

    let mapping: Record<string, string> = {};
    try {
        mapping = await fs.readJSON(mappingFilePath);
    } catch {
        console.warn('⚠️ Map file not found.');
    }

    // Define folders
    const outputFolder = `${config.mainFolder}/symbol-js`;
    const flightFolder = `${outputFolder}/flight`;
    const carbonFolder = `${outputFolder}/carbon`;

    // Ensure folders exist (but empty)
    await fs.emptyDir(outputFolder);
    await fs.ensureDir(flightFolder);
    await fs.ensureDir(carbonFolder);

    const registry: Record<string, { flight: Record<string, string>, carbon: string | null }> = {};

    for (const { fileName } of catalog.assets) {
        try {
            const flightSource = await fs.readFile(`${tempSVGFolderPath}/${fileName}.svg`, 'utf8');
            const flightContent = await prettier.format(getSymbolModule(flightSource), { ...prettierConfig, parser: 'typescript' });
            
            await fs.writeFile(`${flightFolder}/${fileName}.js`, flightContent);
        } catch (err) {
            console.error(`Error reading Flight icon: ${fileName}`, err);
        }

        const match = fileName.match(/^(.*)-(16|24)$/);

        if (match) {
            const [, baseName, size] = match;

            if (!registry[baseName]) {
                registry[baseName] = { flight: {}, carbon: null };
            }

            registry[baseName].flight[size] = `() => import('./flight/${fileName}.js')`;

            const carbonName = mapping[baseName];

            if (carbonName && !registry[baseName].carbon) {
                const carbonPath = path.join(carbonIconsPath, '32', `${carbonName}.svg`);

                if (fs.existsSync(carbonPath)) {
                    const carbonSource = await fs.readFile(carbonPath, 'utf8');
                    const carbonContent = await prettier.format(getSymbolModule(carbonSource), { ...prettierConfig, parser: 'typescript' });

                    await fs.writeFile(`${carbonFolder}/${baseName}.js`, carbonContent);
                    
                    registry[baseName].carbon = `() => import('./carbon/${baseName}.js')`;
                } else {
                    console.warn(`⚠️ Carbon icon missing: ${carbonName} (size 32) - Mapped from Flight icon ${fileName}`);
                }
            }
        }
    }

    // Generate Registry (JS + Types)
    const registryLines = Object.entries(registry).map(([baseName, data]) => {
        const flightSizes = Object.entries(data.flight)
            .map(([size, imp]) => `'${size}': ${imp}`)
            .join(', ');

        const carbonImp = data.carbon ? data.carbon : 'null';

        return `'${baseName}': { 
            flight: { ${flightSizes} }, 
            carbon: ${carbonImp} 
        },`;
    });

    const registryJsContent = await prettier.format(`
        export const IconRegistry = {
            ${registryLines.join('\n')}
        };
    `, { ...prettierConfig, parser: 'babel' });

    await fs.writeFile(`${outputFolder}/registry.js`, registryJsContent);

    const registryDtsContent = await prettier.format(`
        import type { IconName } from '../svg';

        export interface HdsIconModule {
            default: (id: string) => string;
        }

        export interface HdsIconRegistryEntry {
            flight: {
                [size: string]: () => Promise<HdsIconModule>;
            };
            carbon: (() => Promise<HdsIconModule>) | null;
        }

        export declare const IconRegistry: Record<IconName, HdsIconRegistryEntry>;
    `, { ...prettierConfig, parser: 'typescript' });

    await fs.writeFile(`${outputFolder}/registry.d.ts`, registryDtsContent);
}