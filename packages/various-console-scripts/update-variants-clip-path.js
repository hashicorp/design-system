var allComponents = figma.currentPage.findAll(node => node.type === "COMPONENT");
if (allComponents.length > 0) {
    console.log(`Found ${allComponents.length} components.`);
    let counter = 0;
    allComponents.forEach((node) => {
        const currName = node.name;
        if ((currName.match(/^size=(?:16|24)$/i) || currName.match(/^size=(?:16|24), tint=(?:color|mono)$/i)) && node.clipsContent) {
            console.log(`Removed "clip content" on component ${currName}`);
            node.clipsContent = false;
            counter++;
        }
    });
    console.log(`Updated ${counter} components.`);
} else {
    console.log('No components found!');
}

// figma.currentPage.selection[0].clipsContent;