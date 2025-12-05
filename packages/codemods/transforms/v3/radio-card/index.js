/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

const CODEMOD_ANALYSIS = process.env.CODEMOD_ANALYSIS;

module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, (env) => {
    let { builders: b } = env.syntax;

    return {
      ElementNode(node) {
        if (node.tag === 'Hds::Form::RadioCard') {
          // filter out the `@layout` attribute
          const outputAttrs = node.attributes.filter((a) => a.name !== '@layout');

          // look up for `@layout`
          const attr = node.attributes.find((a) => a.name === '@layout');

          // update the attributes
          if (attr && attr.value) {
            if (!CODEMOD_ANALYSIS) {
              return [
                b.element(
                  { name: node.tag, selfClosing: !node.children.length },
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
        } else if (node.tag === 'Hds::Form::RadioCard::Group') {
          // filter out the `@layout` attribute
          const outputAttrs = node.attributes.filter((a) => a.name !== '@layout');

          // look up for `@layout`
          const attr = node.attributes.find((a) => a.name === '@layout');

          // if `@layout` is 'fixed' or 'fluid' (one of the deprecated values) we remove the argument
          if (
            attr &&
            attr.value &&
            (attr.value.chars === 'fixed' || attr.value.chars === 'fluid')
          ) {
            if (!CODEMOD_ANALYSIS) {
              return [
                b.element(
                  { name: node.tag, selfClosing: false },
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
