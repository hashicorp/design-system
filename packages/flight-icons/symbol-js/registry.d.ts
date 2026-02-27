import type { IconName } from '../svg';

export interface HdsIconModule {
    default: string;
}

export interface HdsIconRegistryEntry {
    flight: {
        [size: string]: () => Promise<HdsIconModule>;
    };
    carbon: (() => Promise<HdsIconModule>) | null;
}

export declare const IconRegistry: Record<IconName, HdsIconRegistryEntry>;
