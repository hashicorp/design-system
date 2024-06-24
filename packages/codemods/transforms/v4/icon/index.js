/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  const updateIsInlineBlockAttribute = (attributes) => {
    const isInlineBlockAttr = attributes.find((a) => a.name === '@isInlineBlock');

    if (isInlineBlockAttr) {
      isInlineBlockAttr.name = '@isInline';
      isInlineBlockAttr.value = { true: 'false', false: 'true' }[isInlineBlockAttr.value];
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
