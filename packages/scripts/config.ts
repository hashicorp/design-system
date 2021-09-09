import { ConfigData } from "./@types/ConfigData";

export const config: ConfigData = {
    // the data of the Figma file we sync with
    figmaFile: {
        // this is the "production" file
        id: 'TLnoT5AYQfy3tZ0H68BgOr',
        // this is for testing purpose
        // id: '2u60imwCVJvSpH0io1O068',
        // Notice: this simple configuration is under the assumption thet all the assets will be in the same page and in a single frame (like it now)
        // if later we will discover we need to be more specific (eg. file/page/frame) we will adopt a more structured/explicit configuration format
        page: 'Export',
        frames: ['Flight Icons'],
        // TODO use this once Hector renames the frame in Figma
        // frames: ['Core', 'Services'],
    },
    syncOutputFolder: '../src/flight-icons-exported',
    buildDistFolder: '../dist',
};