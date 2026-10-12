/**
 * Copyright IBM Corp. 2021, 2026
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

// Some icons don't follow the same mapping convention, so we need to hardcode their paths here
// NOTE: if this list grows we should consider moving it to a separate config file, but for now it's small enough to keep it here
// Note: Maps to { [iconName]: carbonIconPathWithoutExtension }
const CARBON_ICON_OVERRIDES: Record<string, string> = {
    'rotate--180': '32/watson-health/rotate--180',
    'status--resolved': '32/watson-health/status--resolved',
}

// Individual "Products" `***-color"` icons that we want to fall back to their monochrome counterpart in the Carbon theme
const PRODUCTS_MONOCHROME_FALLBACK_ICONS = [
    'hashicorp-color',
    'hashicorp-fill-color',
    'hashicorp-square-color',
    'hcp-color',
    'hcp-fill-color',
    'hcp-square-color',
];

type IconRegistry = Record<
    string,
    {
        flight: Record<string, string>;
        carbon: string | null;
    }
>;

// important: if you update this function, update the identical one in `packages/components/src/services/hds-icon-registry.ts` as well (and vice versa)
function makeDomSafeId(value: string): string {
    return value.replace(/[^a-zA-Z0-9_-]/g, '-');
}

// important: if you update this function, update the identical one in `packages/components/src/services/hds-icon-registry.ts` as well (and vice versa)
function makeSymbolIdFromKey(key: string): string {
    return `hds-icon-${makeDomSafeId(key)}`;
}

const getSymbolModule = (sourceSvg: string, id: string): string => {
    const viewBoxMatch = sourceSvg.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 16 16';

    let innerContent = sourceSvg
        .replace(/<svg[^>]*>/, '')
        .replace(/<\/svg>/, '');

    innerContent = replaceDynamicColor(innerContent);

    return `export default \`<symbol id="${id}" viewBox="${viewBox}">${innerContent}</symbol>\`;`;
};

export async function generateBundleSymbolJS({ config, catalog }: { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {
    const tempSvgFolder = config.tempFolder;
    const carbonIconsPath = path.resolve(__dirname, '../../node_modules/@carbon/icons/svg');

    // Define folders
    const outputFolder = `${config.mainFolder}/symbol-js`;
    const flightFolder = `${outputFolder}/flight`;
    const carbonFolder = `${outputFolder}/carbon`;

    // Ensure folders exist (but empty)
    await fs.emptyDir(outputFolder);
    await fs.ensureDir(flightFolder);
    await fs.ensureDir(carbonFolder);

    const registry: IconRegistry = {};

    for (const asset of catalog.assets) {
        const { fileName, mapping, category } = asset;
        const match = fileName.match(/^(.*)-(16|24)$/);

        if (match) {
            const [, baseName, size] = match;

            if (!registry[baseName]) {
                registry[baseName] = { flight: {}, carbon: null };
            }

            // --- FLIGHT ---

            const symbolSource = await fs.readFile(`${tempSvgFolder}/${fileName}.svg`, 'utf8');

            await writeFlightSymbol(baseName, size, symbolSource, flightFolder, registry);

            // --- CARBON ---

            // Proceed only if the tag exists
            if (mapping) {
                if (registry[baseName].carbon) {
                    continue; // Carbon icon already processed for this baseName (e.g. for another size)
                }
                const carbonName = mapping.toLowerCase();

                let carbonPath;
                if (Object.keys(CARBON_ICON_OVERRIDES).includes(carbonName)) {
                    carbonPath = path.join(carbonIconsPath, `${CARBON_ICON_OVERRIDES[carbonName]}.svg`);
                } else {
                    carbonPath = path.join(carbonIconsPath, `32/${carbonName}.svg`);
                }

                if (fs.existsSync(carbonPath)) {
                    const carbonSource = await fs.readFile(carbonPath, 'utf8');

                    await writeCarbonSymbol(baseName, carbonSource, carbonFolder, registry);
                } else {
                    console.warn(`⚠️ Carbon icon missing: ${carbonName} (size 32) - Found in mapping for ${fileName}`);
                }
            } else if (
                // for the `carbon` variant of some `***-color` icons (all the "Services" icons and some of the "Products" icons)
                //  we want to fall back to the monochrome glyphs because for those icons the colored glyphs don't work against dark backgrounds
                (category === 'Services' || (category === 'Products' && PRODUCTS_MONOCHROME_FALLBACK_ICONS.includes(baseName))) &&
                baseName.endsWith('-color') &&
                !registry[baseName].carbon
            ) {
                // we conventionally use the `24` variant here (the glyph for these "Services"/"Products" icons is the same at both sizes)
                const monochromeFileName = `${baseName.replace(/-color$/, '')}-24`;
                const monochromePath = `${tempSvgFolder}/${monochromeFileName}.svg`;

                if (fs.existsSync(monochromePath)) {
                    const monochromeSource = await fs.readFile(monochromePath, 'utf8');

                    await writeCarbonSymbol(baseName, monochromeSource, carbonFolder, registry);
                } else {
                    console.warn(`⚠️ Monochrome fallback missing: ${monochromeFileName} - Expected by "${fileName}" (category "${category}")`);
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
            default: string;
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

// Writes a Flight symbol module and registers its loader.
async function writeFlightSymbol(
    baseName: string,
    size: string,
    symbolSource: string,
    flightFolder: string,
    registry: IconRegistry
): Promise<void> {
    const symbolKey = `flight-${baseName}-${size}`;
    const symbolId = makeSymbolIdFromKey(symbolKey);

    const symbolContent = await prettier.format(
        getSymbolModule(symbolSource, symbolId),
        { ...prettierConfig, parser: 'typescript' }
    );

    await fs.writeFile(`${flightFolder}/${baseName}-${size}.js`, symbolContent);

    registry[baseName].flight[size] = `() => import('./flight/${baseName}-${size}.js')`;
}

// Writes a Carbon symbol module and registers its loader.
async function writeCarbonSymbol(
    baseName: string,
    symbolSource: string,
    carbonFolder: string,
    registry: IconRegistry
): Promise<void> {
    const symbolId = makeSymbolIdFromKey(`carbon-${baseName}`);
    const symbolContent = await prettier.format(
        getSymbolModule(symbolSource, symbolId),
        { ...prettierConfig, parser: 'typescript' }
    );

    await fs.writeFile(`${carbonFolder}/${baseName}.js`, symbolContent);

    registry[baseName].carbon = `() => import('./carbon/${baseName}.js')`;
}
