/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = function ({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, () => {
    const updateTagName = (node, searchValue, replaceValue) => {
      let isUpdated = false;
      if (node.tag) {
        node.tag = node.tag.replace(searchValue, replaceValue);
        isUpdated = true;
      }
      return isUpdated;
    };

    // find recursively a child node with tag `*.Link::Standalone` and update it
    const updateLinkStandaloneSubcomponents = (children) => {
      let hasUpdatedChildren = false;
      children.forEach((node) => {
        if (node.tag && node.tag.includes('.Link::Standalone')) {
          const isUpdated = updateTagName(node, '.Link::Standalone', '.LinkStandalone');
          hasUpdatedChildren = hasUpdatedChildren && isUpdated;
        } else if (node.children) {
          const hasUpdatedSubChildren = updateLinkStandaloneSubcomponents(node.children);
          hasUpdatedChildren = hasUpdatedChildren && hasUpdatedSubChildren;
        }
      });
      return hasUpdatedChildren;
    };

    // find recursively a child node with tag `*.[Checkbox|Radio|Toggle]::Field` and update it
    const updateFormFieldSubcomponents = (children) => {
      let hasUpdatedChildren = false;
      children.forEach((node) => {
        if (node.tag && node.tag.includes('.Checkbox::Field')) {
          const isUpdated = updateTagName(node, '.Checkbox::Field', '.CheckboxField');
          hasUpdatedChildren = hasUpdatedChildren && isUpdated;
        } else if (node.tag && node.tag.includes('.Radio::Field')) {
          const isUpdated = updateTagName(node, '.Radio::Field', '.RadioField');
          hasUpdatedChildren = hasUpdatedChildren && isUpdated;
        } else if (node.tag && node.tag.includes('.Toggle::Field')) {
          const isUpdated = updateTagName(node, '.Toggle::Field', '.ToggleField');
          hasUpdatedChildren = hasUpdatedChildren && isUpdated;
        } else if (node.children) {
          const hasUpdatedSubChildren = updateFormFieldSubcomponents(node.children);
          hasUpdatedChildren = hasUpdatedChildren && hasUpdatedSubChildren;
        }
      });
      return hasUpdatedChildren;
    };

    return {
      ElementNode(node) {
        let isUpdated = false;
        // Link::Standalone
        let componentsWithLinkStandalone = ['Hds::Alert', 'Hds::ApplicationState', 'Hds::Toast'];
        if (componentsWithLinkStandalone.includes(node.tag)) {
          isUpdated = updateLinkStandaloneSubcomponents(node.children);
        }
        // Form::Field
        let componentsWithFormField = [
          'Hds::Form::Checkbox::Group',
          'Hds::Form::Radio::Group',
          'Hds::Form::Toggle::Group',
        ];
        if (componentsWithFormField.includes(node.tag)) {
          isUpdated = updateFormFieldSubcomponents(node.children);
        }
        if (isUpdated) {
          return [node];
        }
      },
    };
  });
};

module.exports.type = 'hbs';
