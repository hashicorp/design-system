import { AssetCoreData } from "../@types/AssetsMetadata";

export const getAssetFileName = (assetCoreData: AssetCoreData): string => {
    const fileNameParts = [];
    fileNameParts.push(assetCoreData.iconName);
    if (assetCoreData.variantProps) {
        if (assetCoreData.variantProps.tint) {
            // we don't add the "mono" tint to the asset filename, it's considered the default
            if (assetCoreData.variantProps.tint !== 'mono') {
                fileNameParts.push(assetCoreData.variantProps.tint);
            }
        }
        if (assetCoreData.variantProps.size) {
            fileNameParts.push(assetCoreData.variantProps.size);
        }
    }
    return `${fileNameParts.join('-')}`;
}