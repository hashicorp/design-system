import { ASTHelpers, NodeMatcher, Rule } from 'ember-template-lint';

export default class RequireButtonText extends Rule {
  visitor() {
    return {
      ElementNode(node) {
        // if the element node is a button
        if (NodeMatcher.match(node, { tag: 'button' })) {
          // and if that button has an aria-label attribute
          if (ASTHelpers.hasAttribute(node, 'aria-label')) {
            // then we don't need to do anything
            return;
          }
          // otherwise, we need to check if the button has a child TextNode
          // and it's not empty (https://github.com/ember-template-lint/ember-template-lint/blob/ce311dd67d922a5508557295aa86b8a42c86bdab/lib/helpers/ast-node-info.js#L81)
          if (
            ASTHelpers.hasChildTextNode(node) &&
            ASTHelpers.attributeTextValue > 0
          ) {
            return;
          }
          // if a child text node doesn't exist, we need to return an error
          this.log({
            message: '@text for Hds::Button must have a valid value',
            line: node.loc && node.loc.start.line,
            column: node.loc && node.loc.start.column,
            source: this.sourceForNode(node),
          });
        }
      },
    };
  }
}
