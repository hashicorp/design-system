import * as Figma from 'figma-api';
import { figmaToken } from '../../../_figmaToken';

import { UIKit, UIKitComponentsData, UIKitData } from '../../../@types/types';
import { getFigmaFileComponentsData } from './getFigmaFileComponentsData';
import { getFigmaFileStylesData } from './getFigmaFileStylesData';

const api = new Figma.Api({
    personalAccessToken: figmaToken,
});

export async function getUIKitData(uikitEntry: UIKit) {
    const foundationsFigmaFile = uikitEntry.files.foundations;
    const componentsFigmaFile = uikitEntry.files.components;
    const iconsFigmaFile = uikitEntry.files.icons;

    const uikitData: UIKitData = {
        id: uikitEntry.id,
        name: uikitEntry.name,
        theme: uikitEntry.theme,
        extra: {
            // they're used in the generated JSON to know where the data comes from
            links: {
                foundations: `https://www.figma.com/file/${foundationsFigmaFile}/`,
                components: `https://www.figma.com/file/${componentsFigmaFile}/`,
                icons: `https://www.figma.com/file/${iconsFigmaFile}/`,
            },
        },
        data: {
            styles: {},
            components: {},
        },
    };

    // STYLES
    // -----------------------

    // get all the "foundations" styles
    uikitData.data.styles = await getFigmaFileStylesData(foundationsFigmaFile);

    // COMPONENTS
    // -----------------------

    // get all the "components" components/component_sets
    const mainComponents: UIKitComponentsData = await getFigmaFileComponentsData(componentsFigmaFile, 'components');

    // get all the "icons" components/component_sets
    const iconComponents = await getFigmaFileComponentsData(iconsFigmaFile, 'icons');

    // merge all the components in a single flat list
    uikitData.data.components = { ...mainComponents, ...iconComponents };

    // console.log('uikitData', JSON.stringify(uikitData));
    return uikitData;
}
