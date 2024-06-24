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
        if (node.tag === 'Shw::Grid' || node.tag === 'Shw::Flex') {
          // look up for `@gap` (it means it's already been processed)
          const gapAttr = node.attributes.find((a) => a.name === '@gap');

          if (!gapAttr) {
            // look up for `{{style}}`
            const styleModifier = node.modifiers.find(
              (m) => m.path.original === 'style'
            );

            if (styleModifier) {
              // look up for `{{style gap}}`
              const styleModifierGapEntry = styleModifier.hash.pairs.find(
                (p) => p.key === 'gap'
              );

              if (styleModifierGapEntry) {
                // add the `@gap` argument
                node.attributes.push(
                  b.attr('@gap', styleModifierGapEntry.value)
                );

                // remove the `gap` value from the `{{style}}` modifier
                const outputStyleModifierPairs =
                  styleModifier.hash.pairs.filter((p) => p.key !== 'gap');

                // re-assign the filtered pairs to the `{{style}}` modifier
                styleModifier.hash.pairs = outputStyleModifierPairs;

                // remove entirely the `{{style}}` modifier if it doesn't have pairs left
                const outputModifiers = node.modifiers.filter(
                  (m) => m?.hash?.pairs?.length > 0
                );

                // re-assign the filtered modifiers to the element
                node.modifiers = outputModifiers;

                return [
                  b.element(
                    { name: node.tag, selfClosing: false },
                    {
                      attrs: node.attributes,
                      children: node.children,
                      modifiers: node.modifiers,
                      blockParams: node.blockParams,
                    }
                  ),
                ];
              }
            }
          }
        }
      },
    };
  });
};

module.exports.type = 'hbs';
