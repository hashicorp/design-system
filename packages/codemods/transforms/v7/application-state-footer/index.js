/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

const CODEMOD_ANALYSIS = process.env.CODEMOD_ANALYSIS;

module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  // A stack is used to correctly handle nested <Hds::ApplicationState> components
  const asPrefixStack = [];

  return visit(ast, (env) => {
    let { builders: b } = env.syntax;

    return {
      ElementNode: {
        // "enter" is called before visiting the node's children
        enter(node) {
          // If we encounter an ApplicationState, push its `as` parameter onto the stack
          if (node.tag === 'Hds::ApplicationState') {
            if (node.blockParams && node.blockParams.length > 0) {
              asPrefixStack.push(node.blockParams[0]);
            } else {
              // Push a falsy value to keep the stack balanced if there's no block param
              asPrefixStack.push(null);
            }
          }

          // Get the current prefix from the top of the stack
          const asPrefix = asPrefixStack[asPrefixStack.length - 1];

          // If there's a prefix and this node is the one we want to transform...
          if (!CODEMOD_ANALYSIS && asPrefix && node.tag === `${asPrefix}.Footer`) {
            const hasDividerAttr = node.attributes.find((a) => a.name === '@hasDivider');

            if (hasDividerAttr) {
              // filter out the `@hasDivider` attribute
              const outputAttrs = node.attributes.filter((a) => a.name !== '@hasDivider');

              // Return a new element to replace the current one
              // The visitor will automatically use this returned value
              return b.element(
                { name: node.tag, selfClosing: false },
                {
                  attrs: outputAttrs,
                  children: node.children,
                  modifiers: node.modifiers,
                  blockParams: node.blockParams,
                }
              );
            }
          }
        },
        // "exit" is called after visiting the node's children
        exit(node) {
          // As we leave an ApplicationState, pop its prefix off the stack
          if (node.tag === 'Hds::ApplicationState') {
            asPrefixStack.pop();
          }
        },
      },
    };
  });
};

module.exports.type = 'hbs';
