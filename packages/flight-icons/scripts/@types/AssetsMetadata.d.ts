/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export type AssetCoreData = {
    // the Figma NodeID of the component
    id: string,
    // the name of the component variant (e.g. "Size=16, Style=Mono")
    variantName: string,
    // the variant props extracted from the variant name as independent key/value entries
    variantProps?: {
        [key: string]: string
    },
    // the name of the component set parent of the variant (e.g. "alert-circle")
    iconName: string,
    // the (optional) description contained in the "description" field of the parent component_set
    description
    // the icon's category (by convention it's the containing frame's name)
    category: string,
}

export type AssetsMetadata = {
    [AssetNodeId: string]: AssetCoreData,
}