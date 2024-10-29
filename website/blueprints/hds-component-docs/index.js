/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/* eslint-disable ember/no-string-prototype-extensions */
/* eslint-disable node/no-extraneous-require, node/no-missing-require */
'use strict';

const stringUtil = require('ember-cli-string-utils');

module.exports = {
  description: 'Generates all website documentation files for an HDS component',

  locals(options) {
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
};
