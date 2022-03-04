import { StyleMetadata, ComponentMetadata } from 'figma-api/lib/api-types';

type FigmaTeam = {
    figmaID: string;
    figmaName: string;
};

type FigmaProject = {
    figmaID: string;
    figmaName: string;
};

export type FigmaFile = {
    figmaKey: string;
    figmaName: string;
    type?: string;
};

export type UIKit = {
    //  the ID can be anything, is for internal usage only (but needs to be in camelcase format)
    id: string;
    //  the NAME can be anything, is for internal usage only
    name: string;
    //  the THEME can be anything, is for internal usage only
    theme?: string;
    // these are the FILES that are used in the UI Kit
    files: {
        foundations: FigmaFile['figmaKey'];
        components: FigmaFile['figmaKey'];
        icons: FigmaFile['figmaKey'];
    };
};

export type UIKitStyleData = Pick<StyleMetadata, 'key' | 'file_key' | 'node_id' | 'style_type' | 'name'>;
export type UIKitStylesData = { [key: string]: UIKitStyleData };
export type UIKitComponentData = Pick<ComponentMetadata, 'key' | 'file_key' | 'node_id' | 'name'> & { group: string; type: string };
export type UIKitComponentsData = { [key: string]: UIKitComponentData };

export type UIKitData = {
    // main meta-information about the UI kit
    id: UIKit['id'];
    name: UIKit['name'];
    theme: UIKit['theme'];
    // optional field that can contain any extra meta-information
    extra?: any;
    //  the actual data
    data: {
        styles: { [key: string]: UIKitStyleData };
        components: { [key: string]: UIKitComponentData };
    };
};
