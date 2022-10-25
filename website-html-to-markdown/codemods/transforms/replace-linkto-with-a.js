// ## replace-linkto-with-a
//
// This codemod converts this code:
// ```
// <LinkTo @route="utilities.interactive">hello</LinkTo>
// ```
// in this
// ```
// <a @href="/utilities/interactive/">hello</a>
// ```
//
// ## Usage
// - in the `website-html-to-markdown` folder run the command:
//   `node codemods/bin/cli.js replace-linkto-with-a ./path-to-your-files/**/*.hbs`

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
      ElementNode(node) {
        if (node.tag === 'LinkTo') {
          let route = getNodeAttributeValue(node, '@route');

          if (route === 'index') {
            route = '/';
          } else {
            // IMPORTANT: here we assume that the "index" page of a component is "01_overview", but this may not be true!
            route = `/${route.replace(/\./g, '/')}/01_overview/`;
          }

          // const outputAttrs = [...node.attributes];
          const outputAttrs = [];
          outputAttrs.push(
            build.attr('href', build.text(route))
          );

          return [
            build.element(
              { name: 'a', selfClosing: false },
              {
                attrs: outputAttrs,
                children: node.children,
                modifiers: node.modifiers,
                blockParams: node.blockParams,
                comments: node.comments,
              }
            ),
          ];
        }
      },
    };
  });
};

module.exports.type = 'hbs';
