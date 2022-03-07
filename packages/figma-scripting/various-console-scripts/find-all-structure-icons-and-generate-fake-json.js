var allComponents = figma.currentPage.findAll(node => node.type === "COMPONENT");
if (allComponents.length > 0) {
    console.log(`Found ${allComponents.length} components.`);
    const data = [];
    allComponents.forEach((node) => {
        console.log(`Found icon ${node.name}`);
        data.push({
            id: node.id,
            name: node.name,
            key: node.key,
            parent: {
                id: node.parent.id,
                name: node.parent.name,
            }
        });
    });
    console.log(JSON.stringify(data, null, 2));
} else {
    console.log('No components found!');
}

// var aaa = figma.currentPage.selection[0];