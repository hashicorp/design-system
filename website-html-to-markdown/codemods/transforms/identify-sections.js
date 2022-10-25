// ## identify-sections
//
// This codemod adds a DOM identifier to every `<section>` element in the documentation pages.
//
// ## Usage
// - in the `website-html-to-markdown` folder run the command:
//   `node codemods/bin/cli.js identify-sections ./temp/**/*.hbs`

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
        // IMPORTANT: we need to filter the nodes already processed, or it enters in an infinite loop!
        if (node.tag === 'section' && !getNodeAttributeValue(node, 'data-section')) {
          let sectionID;

          const sectionTitle = node.children.find((c) => c.tag === 'h3');
          if (sectionTitle) {
            if (
              sectionTitle.children.filter(
                (c) =>
                  c.tag === 'a' &&
                  c.attributes &&
                  getNodeAttributeValue(c, 'class') === 'dummy-link-section'
              ).length > 0
            ) {
              sectionID = getNodeAttributeValue(sectionTitle, 'id');
            }
          }

          const outputAttrs = [...node.attributes];
          outputAttrs.push(
            build.attr('data-section', build.text(sectionID || 'generic'))
          );

          return [
            build.element(
              { name: 'section', selfClosing: false },
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
        if (node.tag === 'h3') {
          if (
            node.children.filter(
              (c) =>
                c.tag === 'a' &&
                c.attributes &&
                getNodeAttributeValue(c, 'class') === 'dummy-link-section'
            ).length > 0
          ) {
            return null;
          }
        }
      },
    };
  });
};

module.exports.type = 'hbs';
