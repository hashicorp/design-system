// ## refactor-codeblocks
//
// This codemod converts this code:
// ```
// <CodeBlock
//   @language="markup"
//   @code='
//     <Hds::Component>
//       ...
//     </Hds::Component>
//   '
// />
// ```
// in this
// ```
// <CodeBlock data-language="markup">
//   <Hds::Component>
//     ...
//   </Hds::Component>
// </CodeBlock>
// ```
//
// ## Usage
// - in the `website-html-to-markdown` folder run the command:
//   `node codemods/bin/cli.js reorganize-codeblocks ./path-to-your-files/**/*.hbs`

const getNodeAttributeValue = (node, attributeName) => {
  const foundAttributeWithName = node.attributes.find(
    (a) => a.name === attributeName
  );
  if (foundAttributeWithName) {
    return foundAttributeWithName.value.chars;
  } else {
    return undefined;
  }
};

module.exports = function ({ source /*, path */ }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, (env) => {
    let { builders: build } = env.syntax;

    return {
      MustacheCommentStatement(node) {
        if (
          node.value.match(/prettier-ignore-(start|end)/g) ||
          node.value.match(/template-lint-(en|dis)able no-unbalanced-curlies/g)
        ) {
          return build.text('');
        }
      },
      ElementNode(node) {
        if (node.tag === 'CodeBlock') {
          let language = getNodeAttributeValue(node, '@language');
          language = (language === 'markup') ? 'handlebars' : language;

          let code = getNodeAttributeValue(node, '@code');

          // replace the escaped curlies with the normal ones
          if (code && code.replace) {
            code = code.replace(/\\\{\{/g, '{{');

            // replace pre/post spacing
            code = code.replace(/^\n?(\s+)?([\s\S\n]+)?\n(\s+)$/, (_match2, indent, cleancode) => {
              // de-indent the code
              const regex = new RegExp(`^${indent}`, 'gm');
              cleancode = cleancode.replace(regex,'');
              return cleancode;
            });
          } else {
            code = 'TODO - FIX ME!!'
          }

          let output = '';
          output += `\n\n<CodeBlock>\n`;
          output += `<!-- prettier-ignore-start -->\n`; // we add them back to avoid prettier to mess up the internal formatting of code blocks
          output += `\`\`\`${language || ''}\n`;
          output += `${code}\n`;
          output += `\`\`\`\n`;
          output += `<!-- prettier-ignore-end -->\n`;
          output += `</CodeBlock>\n\n`;
          return build.text(output);
        }
      },
    };
  });
};

module.exports.type = 'hbs';
