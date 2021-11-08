var allComponents = figma.currentPage.findAll(node => node.type === "COMPONENT");
var allStrangeIcons = [];
if (allComponents.length > 0) {
    console.log(`Found ${allComponents.length} components.`);
    allComponents.forEach((node) => {
        const currName = node.name;
        if (currName.match(/^size=(?:16|24)$/i) || currName.match(/^size=(?:16|24), style=(?:color|mono)$/i)) {
            // actually is easier that one can think, is just a matter of renaming the layer!
            // if (node.children.length === 1 && node.children.length['Union', 'Subtract', 'Vector (Stroke)', 'Shape (Stroke)'].includes(node.children[0].name)) {
            if (node.children.length === 1 && node.children[0].type === 'VECTOR') {
                if (node.children[0].name !== 'Icon') {
                    console.log(`[R] Renaming ${node.children[0].name} to "Icon"`);
                    node.children[0].name = "Icon";
                }
            } else {
                console.log(`[X] Strange icon name for icon "${node.parent.name}/${node.name}": it has ${node.children.length} nodes (firts child: ${node.children[0].name} of type ${node.children[0].type})`);
                allStrangeIcons.push(node);
            }
        }
    });
} else {
    console.log('No components found!');
}
