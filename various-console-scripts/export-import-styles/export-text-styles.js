const styles = figma.getLocalTextStyles();

console.log(JSON.stringify(styles[0], null, 4));

const exportedStyles = [];

styles.forEach(style => {
    exportedStyles.push({
        name: style.name,
        description: style.description,
        fontName: style.fontName,
        fontSize: style.fontSize,
        letterSpacing: style.letterSpacing,
        lineHeight: style.lineHeight,
        listSpacing: style.listSpacing,
        paragraphIndent: style.paragraphIndent,
        paragraphSpacing: style.paragraphSpacing,
        textCase: style.textCase,
        textDecoration: style.textDecoration,
    });
});

console.log(JSON.stringify(exportedStyles, null, 4));