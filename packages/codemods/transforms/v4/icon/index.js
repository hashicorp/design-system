/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const { preserveLayout } = JSON.parse(process.env.CODEMOD_CLI_ARGS);

module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, (env) => {
    let { builders: b } = env.syntax;

    return {
      ElementNode(node) {
        if (node.tag === 'FlightIcon') {
          // filter out the `@isInlineBlock` attribute
          const outputAttrs = node.attributes.filter((a) => a.name !== '@isInlineBlock');

          // look up for `@isInlineBlock`
          const attr = node.attributes.find((a) => a.name === '@isInlineBlock');
          const { value } = attr;

          // @isInlineBlock attr has been set on the element
          if (attr && value) {
            if (value === true) {
              // rename attribute as @isInline, keep value
              const updatedAttr = b.attr('@isInline', value);
              outputAttrs.push(updatedAttr);
            }
          } else if (preserveLayout) {
            // FlightIcon has a default display of inline-block
            // Hds::Icon has a default display of block
            // we can pass this flag in order to keep the display the same during the conversion
            const newAttr = b.attr('@isInline', true);
            outputAttrs.push(newAttr);
          }

          return [
            b.element(
              { name: node.tag, selfClosing: true },
              {
                attrs: outputAttrs,
                children: node.children,
                modifiers: node.modifiers,
                blockParams: node.blockParams,
              }
            ),
          ];
        }
      },
    };
  });
};

module.exports.type = 'hbs';
