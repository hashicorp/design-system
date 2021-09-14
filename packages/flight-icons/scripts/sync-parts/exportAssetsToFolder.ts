import * as FigmaExport from '@figma-export/types';
import * as figmaExport from '@figma-export/core';
import { requirePackages } from '@figma-export/cli/dist/utils';
import outputComponentsAsSvg from '@figma-export/output-components-as-svg';

import { ConfigData } from '../@types/ConfigData';
import { AssetCoreData, AssetsMetadata } from '../@types/AssetsMetadata';
import { getAssetFileName } from './getAssetFileName';

export async function exportAssetsToFolder({ config, assetsMetadata } : { config: ConfigData, assetsMetadata: AssetsMetadata }): Promise<FigmaExport.PageNode[]> {

    // override the "figma-export" functions (see: https://github.com/marcomontalbano/figma-export/tree/master/packages/output-components-as-svg)

    // we removed the SVGO transformer, we will do it later in the "build" part with other parameters
    const transformer: FigmaExport.StringTransformer[] = [];
    const outputter: FigmaExport.ComponentOutputter[] = [
        outputComponentsAsSvg({
            output: config.srcFolder,
            // IMPORTANT: when exported by Figma by default the variants' name looks like this: "Size=16, Style=Color"
            // and we want to sanitize it (otherwise variants with the same props/values will override one another)
            // so this is used to change icon's name to a "standard" format that will be used across the entire script
            getBasename: (options: FigmaExport.ComponentOutputterParamOption): string => {
                const assetCoreData: AssetCoreData = assetsMetadata[options.id];
                return `${getAssetFileName(assetCoreData)}.svg`
            },
            // by default figma-export adds the "page" name to the path (so creating an extra folder)
            // but we prefer to have all the icons saved under the "SVG" format (so we're open in the future to have other formats too)
            getDirname: (): string => 'svg',
        })
    ];

    let result: FigmaExport.PageNode[] = [];

    await figmaExport.components({
        fileId: config.figmaFile.id,
        concurrency: config.syncConcurrency,
        token: process.env.FIGMA_TOKEN || 'MISSING-TOKEN-ADD-IT-TO-ENV-FILE',
        onlyFromPages: [config.figmaFile.page],
        transformers: requirePackages<FigmaExport.StringTransformer>(transformer),
        outputters: requirePackages<FigmaExport.ComponentOutputter>(outputter, { output: config.srcFolder }),
    }).then(async (figmaExportPageNode) => {
        result = figmaExportPageNode;
    }).catch((err: Error) => {
        console.error(err);
    });

    return result;
}
