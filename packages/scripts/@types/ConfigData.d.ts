export type ConfigData = {
    // the data of the Figma file we sync with
    figmaFile: {
        id: string,
        page: string,
        frames: string[],
    },
    // TODO rename to "syncOutputFolder"
    outputFolder: string,
    buildDistFolder: string,
};