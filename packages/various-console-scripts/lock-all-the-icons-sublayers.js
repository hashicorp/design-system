var allIcons = figma.currentPage.findAll(node => node.type === "COMPONENT" && (node.name === 'size=16' || node.name === 'size=24'));
if (allIcons.length > 0) {
    console.log(`Found ${allIcons.length} icons.`);
    allIcons.forEach((node) => {
        if (node.children) {
            if (node.children.length > 1) {
                console.log(`Found icon ${node.name} in ${node.parent.name} with ${node.children.length} children, they should be grouped together`);
            }
            node.children.forEach(element => {
                if (!element.locked) {
                    console.log(`Found layer ${element.name} within ${node.parent.parent.name} that is unlocked, locking it now.`);
                    element.locked = true;
                }
            });
        } else {
            console.log(`Found icon ${node.name} in ${node.parent.name} with no children`);
        }
    });
} else {
    console.log('No icons found!');
}
