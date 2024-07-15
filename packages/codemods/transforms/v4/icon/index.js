/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  const updateIsInlineBlockAttribute = (attributes) => {
    const indexOfIsInlineBlockAttr = attributes.findIndex((a) => a.name === '@isInlineBlock');

    // @isInlineBlock attr has been set on the element
    if (indexOfIsInlineBlockAttr !== -1) {
      const isInlineBlockAttr = attributes[indexOfIsInlineBlockAttr];

      // value is a mustache statement, such as {{this.isInlineBlock}}
      if (isInlineBlockAttr.value.type === 'MustacheStatement') {
        const isInlineBlockAttrValue = isInlineBlockAttr.value.path.original;

        // @isInlineBlock is set to {{false}}
        if (isInlineBlockAttrValue === false) {
          // {{false}} is the default value for @isInline, so we can remove the attribute
          attributes.splice(indexOfIsInlineBlockAttr, 1);
        }
        // @isInlineBlock is {{true}}, or any other mustache statement
        else {
          // rename attribute as @isInline, keep value
          isInlineBlockAttr.name = '@isInline';
        }
      }
      // @isInlineBlock is a non-mustache value
      else {
        attributes.splice(indexOfIsInlineBlockAttr, 1);
      }
    }

    return attributes;
  };

  return visit(ast, (env) => {
    let { builders: build } = env.syntax;

    return {
      ElementNode(node) {
        if (node.tag === 'FlightIcon') {
          return [
            build.element(
              { name: 'Hds::Icon', selfClosing: true },
              {
                attrs: updateIsInlineBlockAttribute(node.attributes),
                children: [],
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