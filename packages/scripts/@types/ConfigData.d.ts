export type ConfigData = {
    // the data of the Figma file we sync with
    figmaFile: {
        id: string,
        page: string,
        frame: string,
    },
    outputFolder: string,
};