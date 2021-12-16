import { ConfigData } from "./@types/ConfigData";

export const config: ConfigData = {
    // the data of the Figma file we sync with
    figmaFile: {
        // this is the "production" file
        id: 'TLnoT5AYQfy3tZ0H68BgOr',
        // this is for testing purpose
        // id: '2u60imwCVJvSpH0io1O068',
        // Notice: this simple configuration is under the assumption thet all the assets will be in the same page
        // if later we will discover we need to be more specific (eg. multiple files, multiple pages, etc.)
        // we will adopt a more explicit, structured configuration format
        page: 'Export',
        frames: ['Core', 'Services', 'Products'],
    },
    // notice: these paths are relative to where the npm script is invoked, not this file!
    mainFolder: '.',
    tempFolder: './temp',
    emberPublicFolder: '../ember-flight-icons/tests/dummy/public',
    // number of files retrieved by figma-export in a batch request
    syncConcurrency: 100,
};