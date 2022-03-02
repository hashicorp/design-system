const styles = figma.getLocalEffectStyles();

const exportedStyles = [];

styles.forEach(style => {
    exportedStyles.push({
        name: style.name,
        description: style.description,
        effects: style.effects,
    });
});

console.log(JSON.stringify(exportedStyles, null, 4));
