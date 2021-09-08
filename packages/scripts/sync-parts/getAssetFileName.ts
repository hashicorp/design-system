import { AssetCoreData } from "../@types/AssetsMetadata";

export const getAssetFileName = (assetCoreData: AssetCoreData): string => {
    const fileNameParts = [];
    fileNameParts.push(assetCoreData.iconName);
    if (assetCoreData.variantProps) {
        if (assetCoreData.variantProps.style) {
            // we don't add the "mono" style to the asset filename, it's considered the default
            if (assetCoreData.variantProps.style !== 'mono') {
                fileNameParts.push(assetCoreData.variantProps.style);
            }
        }
        if (assetCoreData.variantProps.size) {
            fileNameParts.push(assetCoreData.variantProps.size);
        }
    }
    return `${fileNameParts.join('-')}`;
}