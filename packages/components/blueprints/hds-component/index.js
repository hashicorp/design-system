'use strict';

const stringUtil = require('ember-cli-string-utils');

module.exports = {
  description: 'Generates all files for an HDS component',

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

  afterInstall(options) {
    // console.log('AAAAA', options);
  },
};
