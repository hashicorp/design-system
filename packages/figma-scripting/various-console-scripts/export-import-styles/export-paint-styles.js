const styles = figma.getLocalPaintStyles();

const exportedStyles = [];

styles.forEach(style => {
    exportedStyles.push({
        name: style.name,
        description: style.description,
        paints: style.paints,
    });
});

console.log(JSON.stringify(exportedStyles, null, 4));
