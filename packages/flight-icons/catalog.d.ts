
import type { IconName } from './svg';

export interface IconAsset {
    iconName: IconName;
    category: string;
    size: string;
    [key: string]: unknown; 
}

export interface IconCatalog {
    assets: IconAsset[];
}

declare const catalog: IconCatalog;
export default catalog;
