/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */


import path from 'path';

import { ConfigData } from "./@types/ConfigData";

export const config: ConfigData = {
    // the metadata for the Figma file we sync with
    figmaFile: {
        // this is the "production" file
        id: 'TLnoT5AYQfy3tZ0H68BgOr', // if needed use this ID for testing purposes: `2u60imwCVJvSpH0io1O068`
        page: 'Export',
        // you can use this filter to exclude specific frames
        excludeFrames: [],
    },
    // notice: these paths are relative to where the npm script is invoked, not this file!
    mainFolder: '.',
    tempFolder: './temp',
    emberPublicFolder: path.resolve(__dirname, '../../../website/public'),
    // number of files retrieved by figma-export in a batch request
    syncConcurrency: 100,
};