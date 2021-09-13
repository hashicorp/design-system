export type ConfigData = {
    // the data of the Figma file we sync with
    figmaFile: {
        id: string,
        page: string,
        frames: string[],
    },
    srcFolder: string,
    distFolder: string,
    emberPublicFolder: string,
    syncConcurrency: number,
};