/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const CODEMOD_ANALYSIS = process.env.CODEMOD_ANALYSIS;

function processChildren(children, asPrefix, b) {
  let hasUpdatedChildren = false;
  let processedChildren = [];

  children.forEach((child) => {
    let updatedChild;
    let isProcessed = false;

    // Check if the child is an ElementNode with the specified tag
    if (child.type === 'ElementNode' && child.tag === `${asPrefix}.Interactive`) {
      const textAttr = child.attributes.find((a) => a.name === '@text');

      if (textAttr) {
        const childOutputAttributes = child.attributes.filter((a) => a.name !== '@text');

        const isHandlebarsAttr = textAttr.value.type === 'MustacheStatement';

        let children = [];

        // Handle different types of MustacheStatement values
        if (isHandlebarsAttr) {
          if (textAttr.value.path.type === 'NumberLiteral') {
            children = [b.mustache(b.number(textAttr.value.path.value))];
          } else if (textAttr.value.path.type === 'StringLiteral') {
            children = [b.mustache(b.string(textAttr.value.path.value))];
          } else {
            children = [
              b.mustache(
                textAttr.value.path.original,
                [...textAttr.value.params],
                textAttr.value.hash
              ),
            ];
          }
        } else {
          children = [b.text(textAttr.value.chars)];
        }

        // Create a new element with the updated children and attributes
        updatedChild = b.element(
          { name: child.tag, selfClosing: false },
          {
            children,
            attrs: childOutputAttributes,
            modifiers: child.modifiers,
            blockParams: child.blockParams,
          }
        );

        isProcessed = true;
      } else {
        updatedChild = child;
      }
    } else if (child.type === 'BlockStatement') {
      // Recursively process children of BlockStatement nodes
      const { hasUpdatedChildren: nestedHasUpdated, processedChildren: nestedProcessed } =
        processChildren(child.program.body, asPrefix, b);

      if (nestedHasUpdated) {
        updatedChild = b.block(
          child.path,
          child.params,
          child.hash,
          b.program(nestedProcessed, child.program.blockParams),
          child.inverse
        );
        isProcessed = true;
      } else {
        updatedChild = child;
      }
    }

    processedChildren.push(updatedChild || child);
    hasUpdatedChildren = hasUpdatedChildren || isProcessed;
  });

  return { hasUpdatedChildren, processedChildren };
}

module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, (env) => {
    let { builders: b } = env.syntax;

    return {
      ElementNode(node) {
        // Check if the node is an Hds::Dropdown element
        if (node.type === 'ElementNode' && node.tag === 'Hds::Dropdown') {
          if (node.blockParams && node.blockParams.length > 0) {
            const asPrefix = node.blockParams[0];

            // Process the children of the Hds::Dropdown element
            const { hasUpdatedChildren, processedChildren } = processChildren(
              node.children,
              asPrefix,
              b
            );

            // Return the updated element if any children were updated
            if (hasUpdatedChildren && !CODEMOD_ANALYSIS) {
              return [
                b.element(
                  { name: node.tag, selfClosing: false },
                  {
                    attrs: node.attributes,
                    children: processedChildren,
                    modifiers: node.modifiers,
                    blockParams: node.blockParams,
                  }
                ),
              ];
            }
          }
        }
      },
    };
  });
};

module.exports.type = 'hbs';
