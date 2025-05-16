import { Rule } from 'ember-template-lint';

export default class NoBareStringsInAttributes extends Rule {
  visitor() {
    const targetAttributes = new Set([
      'aria-label',
      'aria-description',
      'title',
      'placeholder',
      'alt',
      '@text',
    ]);

    return {
      ElementNode(node) {
        for (let attr of node.attributes) {
          if (!targetAttributes.has(attr.name)) continue;

          // Native HTML attribute with string value
          if (attr.value?.type === 'TextNode') {
            const str = attr.value.chars.trim();
            if (str !== '') {
              this.log({
                message: `Attribute "${attr.name}" contains a bare string: "${str}"`,
                node: attr,
              });
            }
          }

          // Component argument: @text="..." -> MustacheStatement with StringLiteral path
          else if (
            attr.value?.type === 'MustacheStatement' &&
            attr.value.path.type === 'StringLiteral'
          ) {
            const str = attr.value.path.value?.trim();
            if (str !== '') {
              this.log({
                message: `Attribute "${attr.name}" contains a bare string: "${str}"`,
                node: attr,
              });
            }
          }
        }
      },
    };
  }
}
