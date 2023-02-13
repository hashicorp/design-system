/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export type ConfigData = {
    // the data of the Figma file we sync with
    figmaFile: {
        id: string,
        page: string,
        frames: string[],
    },
    mainFolder: string,
    tempFolder: string,
    emberPublicFolder: string,
    syncConcurrency: number,
};