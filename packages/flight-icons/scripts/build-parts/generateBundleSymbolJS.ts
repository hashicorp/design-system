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

// Categories whose "-color" icons fall back to their monochrome counterpart in the Carbon theme.
// These icons have no IBM Carbon equivalent, but the Carbon theme supports dark mode and the
// colored glyphs don't always work against dark backgrounds, so we render the monochrome glyph
// instead (its dynamic color is emitted as `currentColor`, so it adapts to the theme).
// By convention the fallback for `{name}-color` is always `{name}`.
const CDS_MONOCHROME_FALLBACK_CATEGORIES = ['Services'];

// the monochrome glyph is the same artwork at both sizes (these icons have no strokes, so there is
// no size-specific optical adjustment), and the registry holds a single size-agnostic Carbon entry,
// so we source the larger one and let `<use>` scale it down when needed
const CDS_MONOCHROME_FALLBACK_SIZE = '24';

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
    const tempSVGFolderPath = config.tempFolder;
    const carbonIconsPath = path.resolve(__dirname, '../../node_modules/@carbon/icons/svg');

    // Define folders
    const outputFolder = `${config.mainFolder}/symbol-js`;
    const flightFolder = `${outputFolder}/flight`;
    const carbonFolder = `${outputFolder}/carbon`;

    // Ensure folders exist (but empty)
    await fs.emptyDir(outputFolder);
    await fs.ensureDir(flightFolder);
    await fs.ensureDir(carbonFolder);

    const registry: Record<string, { flight: Record<string, string>, carbon: string | null }> = {};

    // writes a Carbon symbol module for `baseName` and registers its loader
    // (the symbol id must match the one the `hds-icon-registry` service derives at runtime)
    const writeCarbonSymbol = async (baseName: string, source: string): Promise<void> => {
        const symbolId = makeSymbolIdFromKey(`carbon-${baseName}`);
        const content = await prettier.format(
            getSymbolModule(source, symbolId),
            { ...prettierConfig, parser: 'typescript' }
        );

        await fs.writeFile(`${carbonFolder}/${baseName}.js`, content);

        registry[baseName].carbon = `() => import('./carbon/${baseName}.js')`;
    };

    for (const asset of catalog.assets) {
        const { fileName, mapping, category } = asset;
        const match = fileName.match(/^(.*)-(16|24)$/);

        if (match) {
            const [, baseName, size] = match;

            if (!registry[baseName]) {
                registry[baseName] = { flight: {}, carbon: null };
            }

            // --- FLIGHT ---
            try {
                const key = `flight-${baseName}-${size}`;
                const symbolId = makeSymbolIdFromKey(key);

                const flightSource = await fs.readFile(`${tempSVGFolderPath}/${fileName}.svg`, 'utf8');
                const flightContent = await prettier.format(
                    getSymbolModule(flightSource, symbolId),
                    { ...prettierConfig, parser: 'typescript' }
                );

                await fs.writeFile(`${flightFolder}/${fileName}.js`, flightContent);
            } catch (err) {
                console.error(`Error reading Flight icon: ${fileName}`, err);
            }

            registry[baseName].flight[size] = `() => import('./flight/${fileName}.js')`;

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

                    await writeCarbonSymbol(baseName, carbonSource);
                } else {
                    console.warn(`⚠️ Carbon icon missing: ${carbonName} (size 32) - Found in mapping for ${fileName}`);
                }
            } else if (
                CDS_MONOCHROME_FALLBACK_CATEGORIES.includes(category) &&
                baseName.endsWith('-color') &&
                !registry[baseName].carbon
            ) {
                // no IBM Carbon equivalent exists for these icons, so fall back to the monochrome glyph
                const monochromeFileName = `${baseName.replace(/-color$/, '')}-${CDS_MONOCHROME_FALLBACK_SIZE}`;
                const monochromePath = `${tempSVGFolderPath}/${monochromeFileName}.svg`;

                if (fs.existsSync(monochromePath)) {
                    const monochromeSource = await fs.readFile(monochromePath, 'utf8');

                    await writeCarbonSymbol(baseName, monochromeSource);
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