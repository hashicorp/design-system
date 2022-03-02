var topFrame = figma.currentPage.findAll(node => node.type === "FRAME" && node.name === 'Services')[0];
var rowsList = topFrame.findAll(node => node.type === "FRAME" && node.name === 'Row');
var textLabel = topFrame.findAll(node => node.type === "TEXT" && node.name === 'bitbucket')[0];

await figma.loadFontAsync(textLabel.fontName);

function empty(node) {
    node.children.forEach((child) => child.remove());
}

if (rowsList.length > 0) {
    console.log(`Found ${rowsList.length} rows.`);
    let rowCount = 0;
    rowsList.forEach((row) => {
        // check how many children the row has
        const rowChildrenCount = row.children.length;
        console.log(`Row has ${rowChildrenCount} items.`);

        let rowClone = false;
        if (rowChildrenCount === 6) {
            console.log('cloning row');
            // clone the current row
            rowClone = row.clone();
            // empty the cloned row
            empty(rowClone);
            // add it to the list
            row.parent.insertChild(rowCount + 1, rowClone);
            // row.parent.appendChild(rowClone);
        } else if (rowChildrenCount === 0) {
            console.log('Found empty row!');
            exit;
        }

        // loop over original row
        let iconFrameCount = 0;
        row.children.forEach((iconFrameContainer) => {

            // clone the "frame" container of the icon
            const iconClonedFrameContainer = iconFrameContainer.clone();
            // add it to the list
            iconFrameContainer.parent.insertChild(iconFrameCount + 1, iconClonedFrameContainer);
            // rename the "colored" icon container
            console.log('renaming cloned frame', iconClonedFrameContainer.name);
            iconClonedFrameContainer.name += '-color';
            console.log('renamed cloned frame', iconClonedFrameContainer.name);
            // rename the "colored" icon component set
            const iconClonedComponentSet = iconClonedFrameContainer.children[0];
            // console.log('AAA', iconClonedComponentSet, iconClonedComponentSet.children, iconClonedComponentSet.name, iconClonedComponentSet.type);
            console.log('renaming cloned  component_set', iconClonedComponentSet.name);
            // iconClonedComponentSet.name = `${iconClonedComponentSet.name}-color`;
            console.log('renamed cloned component_set', iconClonedComponentSet.name);
            // update its label
            const iconClonedLabel = iconClonedFrameContainer.children[1];
            console.log('relabeling cloned label', iconClonedLabel.name, iconClonedLabel.characters);
            iconClonedLabel.name += '-color';
            iconClonedLabel.characters = `${iconClonedLabel.characters}-color`;
            console.log('relabeled cloned label', iconClonedLabel.name, iconClonedLabel.characters);

            // move the original colored icons into the new icon set
            // notice: after the first move, the index gets reset so it's again zero!
            const iconComponentSet = iconFrameContainer.children[0];
            iconClonedComponentSet.appendChild(iconComponentSet.children[0]);
            iconClonedComponentSet.appendChild(iconComponentSet.children[0]);

            // now remove the cloned icon variants
            iconClonedComponentSet.children[0].remove();
            iconClonedComponentSet.children[0].remove();
            iconClonedComponentSet.children[0].remove();
            iconClonedComponentSet.children[0].remove();

            iconFrameCount += 2;

        });

        while (row.children.length > 6) {
            rowClone.appendChild(row.children[6]);
        }

        rowCount += 2;
    });

    // now remove the "tint" variant (it's just a matter of renaming the )
    var allTintedIcons = topFrame.findAll(node => node.type === "COMPONENT" && node.name.match(/^size=(?:16|24), tint=(?:color|mono)$/i));
    if (allTintedIcons.length > 0) {
        console.log(`Found ${allTintedIcons.length} tinted icons.`);
        allTintedIcons.forEach((node) => {
            // console.log('AAA', node.name)
            node.name = node.name.replace(/, tint=(?:color|mono)$/i,'');
        });
    } else {
        console.log('No tinted icons found!');
    }

    var allTintedComponentSets = topFrame.findAll(node => node.type === "COMPONENT_SET" && node.parent.name === `${node.name}-color`);
    if (allTintedComponentSets.length > 0) {
        console.log(`Found ${allTintedComponentSets.length} tinted component_sets.`);
        allTintedComponentSets.forEach((node) => {
            // console.log('AAA1', node.name)
            node.name = `${node.name}-color`;
            // console.log('AAA2', node.name)
        });
    } else {
        console.log('No tinted component_sets found!');
    }

} else {
    console.log('No rows found!');
}
