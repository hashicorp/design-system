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
        const attrValue = textAttr.value;

        let newChildren = [];

        // Handle different types of attribute values
        if (attrValue.type === 'ConcatStatement') {
          // This is the fix: for mixed strings like @text="Edit {{this.name}}",
          // the 'parts' array contains the nodes we need for the children.
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
          // This handles TextNode for plain strings like @text="Edit"
          newChildren = [b.text(attrValue.chars)];
        }

        // Create a new element with the updated children and attributes
        updatedChild = b.element(
          { name: child.tag, selfClosing: false },
          {
            children: newChildren,
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
