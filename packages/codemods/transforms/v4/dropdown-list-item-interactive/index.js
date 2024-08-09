/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const CODEMOD_ANALYSIS = process.env.CODEMOD_ANALYSIS;

module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, (env) => {
    let { builders: b } = env.syntax;

    return {
      ElementNode(node) {
        if (node.type === 'ElementNode' && node.tag === 'Hds::Dropdown') {
          let hasUpdatedChildren = false;
          let processedChildren;

          if (node.blockParams && node.blockParams.length > 0) {
            const asPrefix = node.blockParams[0];

            processedChildren = [];

            if (node.children) {
              node.children.forEach((child) => {
                let updatedChild;
                let isProcessed = false;

                if (child.type === 'ElementNode' && child.tag === `${asPrefix}.Interactive`) {
                  const textAttr = child.attributes.find((a) => a.name === '@text');

                  if (textAttr) {
                    const childOutputAttributes = child.attributes.filter(
                      (a) => a.name !== '@text'
                    );

                    updatedChild = b.element(
                      { name: child.tag, selfClosing: false },
                      {
                        attrs: childOutputAttributes,
                        children: [b.text(textAttr.value.chars)],
                        modifiers: child.modifiers,
                        blockParams: child.blockParams,
                      }
                    );

                    isProcessed = true;
                  } else {
                    updatedChild = child;
                  }
                }

                processedChildren.push(updatedChild || child);
                hasUpdatedChildren = hasUpdatedChildren || isProcessed;
              });
            }
          }

          if (hasUpdatedChildren && !CODEMOD_ANALYSIS) {
            return [
              b.element(
                { name: node.tag, selfClosing: false },
                {
                  attrs: node.attributes,
                  children: processedChildren || node.children,
                  modifiers: node.modifiers,
                  blockParams: node.blockParams,
                }
              ),
            ];
          }
        }
      },
    };
  });
};

module.exports.type = 'hbs';
