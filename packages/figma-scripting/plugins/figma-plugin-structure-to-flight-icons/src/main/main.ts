import { pick, kebabCase } from 'lodash';

import { InstanceData, InstancesFoundInPage } from '../types/types';

import structureIconsRawData from '../data/structure-icons-raw.json';
import structureIconsMapping from 'flight/structure-mappings.json';

// this is a temporary function that we had to create another mapping between the names of the Structure icons in Figma
// and the names of the icons in code that are declared in the `structure-icons-raw.json` file
const getStructureIconNameInCodeFromFigma = (structureIconNameInFigma: string) => {
    // let's init the
    let iconName = structureIconNameInFigma;
    // // all the "logo" icons
    // if (structureIconNameInFigma.match(/^Logo \/ /i)) {
    //     iconName = iconName.replace(/^Logo \/ /i,'');
    //     if(iconName.match(/ - Monochrome$/i)) {
    //         iconName = iconName.replace(/ - Monochrome$/i,'');
    //     } else if (iconName.match(/ - Color$/i)) {
    //         iconName = iconName.replace(/ - Color$/i,'');
    //     }
    // }
    return kebabCase(iconName);
};

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 600, height: 300 });

async function findAllInstances() {

    // get all the components' keys of the icons' components in Structure
    // https://www.figma.com/file/B7yd8loYS7nA2TiQcJ8UtV/Structure-1.9
    // TODO: this is still a raw list of components, not all of them are actual icons, so we need to clean it up later and find a way to have only real icons
    const structureIconKeys = structureIconsRawData.map((icon) => icon.key);

    // find all the instances on the current file pages of these components (icons)
    const instancesFoundInAllPages = [];
    figma.root.children.forEach((page) => {
        const instancesInItemPage = page.findAll((child) => {
            return child.type === 'INSTANCE' && structureIconKeys.includes(child.mainComponent.key);
        });

        if (instancesInItemPage.length > 0) {
            let instancesFoundInPage: InstancesFoundInPage = {
                page: {
                    id: page.id,
                    name: page.name,
                },
                instances: [],
            };
            instancesInItemPage.forEach((instance: InstanceNode) => {
                const instanceData = pick(instance, ['id', 'name', 'mainComponent.id', 'mainComponent.key', 'mainComponent.name']);
                instancesFoundInPage.instances.push(instanceData);
            });
            instancesFoundInAllPages.push(instancesFoundInPage);
        }
    });
    // console.log('instancesFoundInAllPages', instancesFoundInAllPages);

    figma.ui.postMessage({
        type: 'find-all-instances',
        message: {
            results: instancesFoundInAllPages,
        },
    });

    // give a visual feedback to the user
    if (Object.keys(instancesFoundInAllPages).length > 0) {
        const numPages = Object.keys(instancesFoundInAllPages).length;
        const numInstances = Object.values(instancesFoundInAllPages).reduce((acc: number, item: InstancesFoundInPage) => acc + item.instances.length, 0);
        figma.notify(`Found ${numInstances} Structure icons in ${numPages} pages in this file.`);
    } else {
        figma.notify(`No recognized Structure icons found in this file.`);
    }
}

async function findInstanceByID(pageID: string, instanceID: InstanceData['id']) {
    const nodeToSelect: BaseNode = figma.getNodeById(instanceID);
    const pageToSelect: PageNode = figma.root.children.filter((n) => n.id === pageID)[0];
    figma.currentPage = pageToSelect;
    const nodes = [];
    nodes.push(nodeToSelect);
    // To change the selection, you need to make a copy of the existing array and/or assign a new array.
    // see: https://www.figma.com/plugin-docs/api/properties/PageNode-selection/#docsNav
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
}

async function replaceInstanceByID(pageID: string, instanceID: InstanceData['id']) {
    const nodeSelected: BaseNode = figma.getNodeById(instanceID);
    console.log('NODE TO REPLACE', nodeSelected.name, getStructureIconNameInCodeFromFigma(nodeSelected.name));
    console.log('MAPPING', structureIconsMapping);
    structureIconsRawData.forEach(iconRawData => {
        const structureIconNameInFigma = iconRawData.name;
        const structureIconNameInCode = getStructureIconNameInCodeFromFigma(structureIconNameInFigma);
        const flightIconNameInCode = structureIconNameInCode[structureIconNameInCode]
        if (flightIconNameInCode) {
            console.log(`🎉 Found mapping for ${structureIconNameInFigma} ⤇ ${flightIconNameInCode}`);
        } else {
            console.log(`Mapping not found for ${structureIconNameInFigma}`);
        }
    })

    console.log('MAPPING', structureIconsMapping);
    // const pageToSelect: PageNode = figma.root.children.filter((n) => n.id === pageID)[0];
    // figma.currentPage = pageToSelect;
    // const nodes = [];
    // nodes.push(nodeToSelect);
    // // To change the selection, you need to make a copy of the existing array and/or assign a new array.
    // // see: https://www.figma.com/plugin-docs/api/properties/PageNode-selection/#docsNav
    // figma.currentPage.selection = nodes;
    // figma.viewport.scrollAndZoomIntoView(nodes);
}

// listen for messages from the UI
figma.ui.onmessage = async (msg) => {
    if (msg.type === 'find-all-instances') {
        await findAllInstances();
    } else if (msg.type === 'find-instance-by-id') {
        await findInstanceByID(msg.message.page.id, msg.message.instance.id);
    } else if (msg.type === 'replace-instance-by-id') {
        await replaceInstanceByID(msg.message.page.id, msg.message.instance.id);
    }
};
