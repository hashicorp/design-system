import fse from 'fs-extra';
import path from 'path';
import prettier from 'prettier';

import { isEmpty } from 'lodash';

import { UIKitData } from '../../../@types/types';

export async function saveUIKitData(uikitData: UIKitData) {

    // write the data as JSON file
    const jsonContent = JSON.stringify(uikitData);
    const jsonPrettyContent = prettier.format(jsonContent, { parser: 'json' as const, printWidth: 120, tabWidth: 4, singleQuote: true });

    const jsonFileName = `${uikitData.id}.json`;
    const jsonFilePath = path.resolve(__dirname, '../../dist/', jsonFileName);
    await fse.outputFile(jsonFilePath, jsonPrettyContent);
}
