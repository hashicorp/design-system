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
      const isInlineBlockAttrIsTrue = isInlineBlockAttr.value === 'true';

      // @isInlineBlock is set to "true"
      if (isInlineBlockAttrIsTrue) {
        // the default for isInline is false, so we need to set it to true
        isInlineBlockAttr.name = '@isInline';
        isInlineBlockAttr.value = 'true';
      }
      // @isInlineBlock is set to "false"
      else {
        // this is the default, so we can remove the attribute
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
