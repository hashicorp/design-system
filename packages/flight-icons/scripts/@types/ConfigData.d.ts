/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export type ConfigData = {
    // the metadata for the Figma file we sync with
    figmaFile: {
        id: string,
        page: string,
        excludeFrames: string[],
    },
    mainFolder: string,
    tempFolder: string,
    emberPublicFolder: string,
    syncConcurrency: number,
};