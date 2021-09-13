import type { AssetCoreData, AssetsMetadata } from "../@types/AssetsMetadata";

import { config } from '../config';

import chalk from 'chalk';

import * as Figma from 'figma-api';

type ComponentSetData = {
    [id: string] : {
        name: string;
        description: string;
    }
};

export async function getAssetsMetadata(): Promise<AssetsMetadata> {

    const assetsMetadata: AssetsMetadata = {};

    const api = new Figma.Api({
        personalAccessToken: process.env.FIGMA_TOKEN || 'MISSING-TOKEN-ADD-IT-TO-ENV-FILE',
    });

    // retrieve all the component_sets from the Figma file (later we'll use their names and descriptions for the icons)
    const componentSetsResponse = await api.getFileComponentSets(config.figmaFile.id);
    const componentSetData: ComponentSetData = {};
    if (componentSetsResponse.meta && componentSetsResponse.meta.component_sets) {
        componentSetsResponse.meta.component_sets.forEach(component_set => {
            // check that the component is inside the expected page/frame
            if (
                component_set.containing_frame &&
                component_set.containing_frame.pageName === config.figmaFile.page &&
                config.figmaFile.frames.includes(component_set.containing_frame.name)
            ) {
                componentSetData[component_set.node_id] = {
                    name: component_set.name,
                    description: component_set.description,
                }
            }
        });
    } else {
        console.log(chalk.magenta('ATTENTION:\nNo component sets ("icons") found in the Figma file, please check that your configuration file has the right values for "page" and "frame" names.'));
    }

    const componentsResponse = await api.getFileComponents(config.figmaFile.id);
    if (componentsResponse.meta && componentsResponse.meta.components) {
        componentsResponse.meta.components.forEach(component => {
            // check that the component is inside the expected page/frame
            if (
                component.containing_frame &&
                component.containing_frame.pageName === config.figmaFile.page &&
                config.figmaFile.frames.includes(component.containing_frame.name)
            ) {
                assetsMetadata[component.node_id] = {
                    id: component.node_id,
                    variantName: component.name,
                    iconName: '',
                    description: '',
                }
                if (component.containing_frame.containingStateGroup) {
                    const parentComponentSet = componentSetData[component.containing_frame.containingStateGroup.nodeId]
                    if (parentComponentSet) {
                        assetsMetadata[component.node_id].iconName = parentComponentSet.name;
                        assetsMetadata[component.node_id].description = parentComponentSet.description;
                    }
                }

                // extract the variant props as independent key/value entries (based on the variant name)
                const variantProperties: AssetCoreData['variantProps'] = {};
                component.name.split(', ').forEach(partial => {
                    const match = partial.match(/(.*)=(.*)/)
                    if (match) {
                        // we want to make sure all the props key/values for the props are lowercase
                        const propName = match[1].toLowerCase();
                        const propValue = match[2].toLowerCase();
                        variantProperties[propName] = propValue;
                    }
                });
                assetsMetadata[component.node_id].variantProps = variantProperties;
            }
        });
    } else {
        console.log(chalk.magenta('ATTENTION:\nNo components ("icons variants") found in the Figma file, please check that your configuration file has the right values for "page" and "frame" names.'));
    }

    return assetsMetadata;

}
