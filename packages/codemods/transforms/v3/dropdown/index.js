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
        if (node.tag === 'Hds::Dropdown') {
          // filter out the `@listPosition` attribute
          const outputAttrs = node.attributes.filter((a) => a.name !== '@listPosition');

          // look up for `@listPosition`
          const attr = node.attributes.find((a) => a.name === '@listPosition');

          // if `@listPosition` is `left` or `right` update the argument value
          if (attr && attr.value && (attr.value.chars === 'left' || attr.value.chars === 'right')) {
            const updatedListPositionAttr = b.attr(
              '@listPosition',
              b.text(`bottom-${attr.value.chars}`)
            );
            outputAttrs.push(updatedListPositionAttr);
            if (!CODEMOD_ANALYSIS) {
              return [
                b.element(
                  { name: 'Hds::Dropdown', selfClosing: false },
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
        }
      },
    };
  });
};

module.exports.type = 'hbs';
