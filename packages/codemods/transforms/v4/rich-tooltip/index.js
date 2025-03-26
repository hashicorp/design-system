/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, (env) => {
    let { builders: b } = env.syntax;

    return {
      ElementNode(node) {
        // process only <Hds::RichTooltip> elements with a block param (alias)
        if (node.tag === 'Hds::RichTooltip' && node.blockParams && node.blockParams.length > 0) {
          let alias = node.blockParams[0];

          // find the bubble child using the alias (if alias is RT, look for RT.Bubble)
          const bubbleIndex = node.children.findIndex((child) => {
            return child.type === 'ElementNode' && child.tag === `${alias}.Bubble`;
          });
          const bubbleChild = node.children[bubbleIndex];

          if (bubbleChild !== undefined) {
            // Target attribute names to extract from <RT.Bubble>
            let targetAttrs = ['@placement', '@enableCollisionDetection', '@offset'];
            let extractedAttrs = [];
            let remainingAttrs = [];

            // Separate target attributes from others
            bubbleChild.attributes.forEach((attr) => {
              if (targetAttrs.includes(attr.name)) {
                extractedAttrs.push(attr);
              } else {
                remainingAttrs.push(attr);
              }
            });

            // If any target attributes were found, process them
            if (extractedAttrs.length > 0) {
              // For each extracted attribute, rename if necessary and build a new attribute
              let newParentAttrs = extractedAttrs.map((attr) => {
                if (attr.name === '@placement') {
                  return b.attr('@bubblePlacement', attr.value);
                } else {
                  return b.attr(attr.name, attr.value);
                }
              });

              // Add new attributes to the parent's attributes list.
              // (If any duplicates exist, this codemod will simply append.)
              node.attributes = node.attributes.concat(newParentAttrs);

              // Update the bubble child by removing the extracted attributes.
              bubbleChild.attributes = remainingAttrs;

              // Replace the bubble child in the parent's children array.
              node.children[bubbleIndex] = bubbleChild;

              // Return the updated parent element.
              return [
                b.element(
                  { name: node.tag, selfClosing: false },
                  {
                    attrs: node.attributes,
                    children: node.children,
                    blockParams: node.blockParams,
                    modifiers: node.modifiers,
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
