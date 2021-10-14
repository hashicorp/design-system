import { Config } from 'style-dictionary';

export type ConfigTarget = {
    source: Config['source'],
    // TODO- CR: why this can't be Config['transformGroup'] ??
    transformGroup: string,
};

export type ConfigTargets = {
    [key: string]: ConfigTarget
};

