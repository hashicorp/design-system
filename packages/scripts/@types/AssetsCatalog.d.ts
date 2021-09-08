
import { ConfigData } from "./ConfigData"

export type AssetCatalogItem = {
    id: AssetCoreData[id],
    name: AssetCoreData[iconName],
    description: AssetCoreData[description],
    size: string;
    width: number,
    height: number,
};

export type AssetsCatalog = {
    lastRunTimeISO: string,
    lastRunFigma: ConfigData[figmaFile],
    assets: AssetCatalogItem[]
}