// ## Usage
// - save the codemod in the `codemods/transforms` folder of the Cloud UI repo
// - in the repo's root directory run the command:
//   `node codemods/bin/cli.js find-all-pds-input-instances ./**/*.hbs`

module.exports = function ({ source, path }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, () => {
    return {
      ElementNode(node) {
        if (node.tag === 'Pds::Input') {
          let output = '';
          output += `\nFILE: "${path}"`;
          output += `\n  • <${node.tag}>`;
          if (node.attributes.length > 0) {
            node.attributes.forEach((a) => {
              // console.log(a);
              if (a.name === '@type') {
                output += `\n     → ${a.name} (${a.value.chars})`;
              } else if (a.name.match(/^data-test/)) {
                output += `\n     → data-test-*`;
              } else {
                output += `\n     → ${a.name}`;
              }
            });
          }
          output += '\n';
          console.log(output);
        }
      },
    };
  });
};

module.exports.type = 'hbs';
