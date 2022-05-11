'use strict';

const stringUtil = require('ember-cli-string-utils');

module.exports = {
  description: 'Generates tests for an HDS component',

  locals(options) {
    // Return custom template variables here.
    return {
      columnizedModuleName: options.entity.name
        .split('/')
        .map((part) => stringUtil.classify(part))
        .join('::'),
      kebabizedModuleName: options.entity.name
        .split('/')
        .map((part) => stringUtil.dasherize(part))
        .join('-'),
      folderizedModuleName: options.entity.name
        .split('/')
        .map((part) => stringUtil.dasherize(part).toUpperCase())
        .join(' > '),
    };
  },

  fileMapTokens(options) {
    // Return custom tokens to be replaced in your files paths
    return {
      // prepend `db-` to the file name
      __dummyCSSFileName__(options) {
        const parts = options.dasherizedModuleName.split('/');
        const fileName = parts.pop();
        return `${parts.join('/')}/db-${fileName}`;
      },
    };
  },
};
