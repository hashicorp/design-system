/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */


import { ConfigData } from "./ConfigData"

export type AssetCatalogItem = {
    // eg. "702:143"
    id: AssetCoreData[id],
    // eg. "bitbucket-color-16"
    fileName: string,
    // eg. "bitbucket"
    iconName: AssetCoreData[iconName],
    // eg. "bitbucket, atlassian"
    description: AssetCoreData[description],
    // eg. "products"
    category: AssetCoreData[category],
    // eg. "16" (but in the future it may become "sm")
    size: string;
    // eg 16
    width: number,
    height: number,
};

export type AssetsCatalog = {
    lastRunFigma: ConfigData[figmaFile],
    assets: AssetCatalogItem[]
}