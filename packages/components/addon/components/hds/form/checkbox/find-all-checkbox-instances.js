// ## Usage
// ATLAS
// - run the command `npx codemod-cli new codemods` in the `atlas/frontend/atlas` folder to install the `codemods-cli`
// - save the codemod in the `codemods/transforms` folder
// - in the `atlas/frontend/atlas` directory run the command:
//   `node codemods/bin/cli.js find-all-checkbox-instances ./app/**/*.hbs`

module.exports = function ({ source, path }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, () => {
    return {
      ElementNode(node) {
        if (node.tag === 'Input') {
          if (node.attributes.length > 0) {
            if (node.attributes.find(a => a.name === '@type' && a.value.chars === 'checkbox')) {
              let output = '';
              output += `\nFILE: "${path}"`;
              output += `\n  • <${node.tag}>`;
              node.attributes.forEach((a) => {
                // console.log(a);
                if (a.name.match(/^data-test/)) {
                  output += `\n     → data-test-*`;
                } else {
                  output += `\n     → ${a.name}`;
                }
              });
              output += '\n';
              console.log(output);
            }
          }
        }
        if (node.tag === 'input' ) {
          if (node.attributes.length > 0) {
            if (node.attributes.find(a => a.name === 'type' && a.value.chars === 'checkbox')) {
              let output = '';
              output += `\nFILE: "${path}"`;
              output += `\n  • <${node.tag}>`;
              node.attributes.forEach((a) => {
                // console.log(a);
                if (a.name.match(/^data-test/)) {
                  output += `\n     → data-test-*`;
                } else {
                  output += `\n     → ${a.name}`;
                }
              });
              output += '\n';
              console.log(output);
            }
          }
        }
      },
    };
  });
};

module.exports.type = 'hbs';
