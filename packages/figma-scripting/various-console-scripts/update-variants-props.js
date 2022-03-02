var allComponents = figma.currentPage.findAll(node => node.type === "COMPONENT");
if (allComponents.length > 0) {
    console.log(`Found ${allComponents.length} components.`);
    allComponents.forEach((node) => {
        const currName = node.name;
        if (currName.match(/^size=(?:16|24)$/i) || currName.match(/^size=(?:16|24), style=(?:color|mono)$/i)) {
            // actually is easier that one can think, is just a matter of renaming the layer!
            node.name = currName.replace(/style/i,'tint').toLowerCase();
            console.log(node.name);
        }
    });
} else {
    console.log('No components found!');
}

// figma.currentPage.selection[0].name.match(/^size=(?:16|24), style=(?:color|mono)$/i);