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
        if (
          node.tag === 'Hds::Form::MaskedInput::Base' ||
          node.tag === 'Hds::Form::MaskedInput::Field'
        ) {
          // filter out the `@isMasked` attribute
          const outputAttrs = node.attributes.filter((a) => a.name !== '@isMasked');

          // look up for `@isMasked`
          const attr = node.attributes.find((a) => a.name === '@isMasked');

          // update the argument name
          if (attr && attr.value) {
            const updatedAttr = b.attr('@isContentMasked', attr.value);
            outputAttrs.push(updatedAttr);
            if (!CODEMOD_ANALYSIS) {
              return [
                b.element(
                  { name: node.tag, selfClosing: node.tag === 'Hds::Form::MaskedInput::Base' },
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
