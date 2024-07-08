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
        if (node.tag === 'Hds::SideNav::List' || node.tag === 'Hds::SideNav::Portal') {
          // we need this check to avoid infinite looping
          let hasUpdatedChildren = false;

          // we use this to store the processed children
          let processedChildren;

          // <Hds::SideNav::List as |XXX|> => blockParams: [ 'XXX' ]
          // since `extraBefore/After` can only be yielded, this is a necessary condition to proceed
          if (node.blockParams && node.blockParams.length > 0) {
            const asPrefix = node.blockParams[0];

            // we reset the array
            processedChildren = [];

            if (node.children) {
              node.children.forEach((child) => {
                let isProcessed = false;
                if (
                  child.type === 'ElementNode' &&
                  (child.tag === `${asPrefix}.extraBefore` ||
                    child.tag === `${asPrefix}.extraAfter`)
                ) {
                  child.tag = child.tag.replace('.extraBefore', '.ExtraBefore');
                  child.tag = child.tag.replace('.extraAfter', '.ExtraAfter');
                  isProcessed = true;
                }
                processedChildren.push(child);
                hasUpdatedChildren = hasUpdatedChildren || isProcessed;
              });
            }
          }

          const outputChildren = processedChildren ? processedChildren : node.children;

          if (hasUpdatedChildren) {
            if (!CODEMOD_ANALYSIS) {
              return [
                b.element(
                  { name: node.tag, selfClosing: false },
                  {
                    attrs: node.attributes,
                    children: outputChildren,
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
