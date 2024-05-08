/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';
import prettier from 'prettier';
import { uniq } from 'lodash';

import { ConfigData } from '../@types/ConfigData';
import { AssetsCatalog } from '../@types/AssetsCatalog';

const prettierConfig = { parser: 'typescript' as const, tabWidth: 4, singleQuote: true };

export async function generateTypeScriptTypes({ config, catalog } : { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {

    // remove the generated content from the destination folder
    try {
        await fs.emptyDir(`${config.mainFolder}/types`)
    } catch (err) {
        console.error(err);
    }

    // create a list of icon names
    const iconNames = catalog.assets.map(item => `'${item.iconName}'`);
    const iconNamesUnion = uniq(iconNames).sort().join(' | ');

    // generate a "types.ts" file
    const typesContent = prettier.format(`export type FlightIconName = ${iconNamesUnion};`, prettierConfig);
    await fs.writeFile(`${config.mainFolder}/types/types.ts`, typesContent);
}
