/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const CODEMOD_ANALYSIS = process.env.CODEMOD_ANALYSIS;

module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  const { preserveLayout } = JSON.parse(process.env.CODEMOD_CLI_ARGS);

  return visit(ast, (env) => {
    let { builders: b } = env.syntax;

    return {
      ElementNode(node) {
        if (node.tag === 'FlightIcon') {
          // filter out the `@isInlineBlock` attribute
          const outputAttrs = node.attributes.filter((a) => a.name !== '@isInlineBlock');

          // look up for `@isInlineBlock`
          const attr = node.attributes.find((a) => a.name === '@isInlineBlock');

          // @isInlineBlock attr has been set on the element
          if (attr) {
            const isHandlebarsAttr = attr.value.type === 'MustacheStatement';

            if (isHandlebarsAttr && attr.value.path.original !== false) {
              // rename attribute as @isInline, keep value
              const updatedAttr = b.attr('@isInline', attr.value);
              outputAttrs.push(updatedAttr);
            }

            // if the value is false or not handlebars, we don't need to add the attribute
          } else if (preserveLayout) {
            // FlightIcon has a default display of inline-block
            // Hds::Icon has a default display of block
            // we can pass this flag in order to keep the display the same during the conversion
            const newAttr = b.attr('@isInline', b.mustache(b.boolean(true)));
            outputAttrs.push(newAttr);
          }

          if (!CODEMOD_ANALYSIS) {
            return [
              b.element(
                { name: 'Hds::Icon', selfClosing: true },
                {
                  attrs: outputAttrs,
                  children: node.children,
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
