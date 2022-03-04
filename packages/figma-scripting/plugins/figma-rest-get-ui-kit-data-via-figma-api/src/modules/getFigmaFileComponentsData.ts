import * as Figma from 'figma-api';
import { figmaToken } from '../../../_figmaToken';

import { pick, has } from 'lodash';

import { FigmaFile, UIKitComponentsData } from '../../../@types/types';

const api = new Figma.Api({
    personalAccessToken: figmaToken,
});

export async function getFigmaFileComponentsData(file: FigmaFile['figmaKey'], group: string) {
    const componentsData: UIKitComponentsData = {};

    // COMPONENTS
    const fileComponents = await api.getFileComponents(file);

    fileComponents.meta?.components.forEach((entry) => {
        const data: any = pick(entry, ['key', 'file_key', 'node_id', 'name']);
        data.group = group;
        data.type = 'component';
        data.containing_frame = pick(entry.containing_frame, ['name', 'nodeId', 'pageId', 'pageName', 'containingStateGroup']);
        if (has(entry, 'containing_frame.containingStateGroup')) {
            data.isComponentSetVariant = true;
        } else {
            data.isSetVariant = false;
        }
        // append the component data to the main object
        componentsData[entry.key] = data;
    });

    // COMPONENT_SETS
    const fileComponentSets = await api.getFileComponentSets(file);

    fileComponentSets.meta?.component_sets.forEach((entry) => {
        const data: any = pick(entry, ['key', 'file_key', 'node_id', 'name']);
        data.group = group;
        data.type = 'component_set';
        data.containing_frame = pick(entry.containing_frame, ['name', 'nodeId', 'pageId', 'pageName', 'containingStateGroup']);
        // append the component data to the main object
        componentsData[entry.key] = data;
    });

    return componentsData;
}
