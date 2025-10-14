/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const CODEMOD_ANALYSIS = process.env.CODEMOD_ANALYSIS;

module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  // A stack is used to correctly handle nested <Hds::Dropdown> components
  const asPrefixStack = [];

  return visit(ast, (env) => {
    const { builders: b } = env.syntax;

    return {
      ElementNode: {
        // "enter" is called before visiting the node's children
        enter(node) {
          // If we encounter a Dropdown, push its `as` parameter onto the stack
          if (node.tag === 'Hds::Dropdown') {
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
          if (!CODEMOD_ANALYSIS && asPrefix && node.tag === `${asPrefix}.Interactive`) {
            const textAttr = node.attributes.find((a) => a.name === '@text');

            if (textAttr) {
              const childOutputAttributes = node.attributes.filter((a) => a.name !== '@text');
              const attrValue = textAttr.value;
              let newChildren = [];

              if (attrValue.type === 'ConcatStatement') {
                newChildren = attrValue.parts;
              } else if (attrValue.type === 'MustacheStatement') {
                if (attrValue.path.type === 'NumberLiteral') {
                  newChildren = [b.mustache(b.number(attrValue.path.value))];
                } else if (attrValue.path.type === 'StringLiteral') {
                  newChildren = [b.mustache(b.string(attrValue.path.value))];
                } else {
                  newChildren = [
                    b.mustache(attrValue.path.original, [...attrValue.params], attrValue.hash),
                  ];
                }
              } else {
                newChildren = [b.text(attrValue.chars)];
              }

              // Return a new element to replace the current one
              // The visitor will automatically use this returned value
              return b.element(
                { name: node.tag, selfClosing: false },
                {
                  children: newChildren,
                  attrs: childOutputAttributes,
                  modifiers: node.modifiers,
                  blockParams: node.blockParams,
                }
              );
            }
          }
        },
        // "exit" is called after visiting the node's children
        exit(node) {
          // As we leave a Dropdown, pop its prefix off the stack
          if (node.tag === 'Hds::Dropdown') {
            asPrefixStack.pop();
          }
        },
      },
    };
  });
};

module.exports.type = 'hbs';
