/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/* eslint-disable ember/no-string-prototype-extensions */
/* eslint-disable node/no-extraneous-require */
'use strict';

const stringUtil = require('ember-cli-string-utils');
const fs = require('fs');

module.exports = {
  description: 'Generates all files for an HDS component',

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

  afterInstall(options) {
    updateHDSComponentsCSS.call(this, options);
  },
};

const updateHDSComponentsCSS = (options) => {
  const name = options.entity.name;
  const cssFilePath = `${options.project.root}/src/styles/@hashicorp/design-system-components.scss`;
  const source = fs.readFileSync(cssFilePath, 'utf-8');
  const oldLinesArray = source.split(/\r?\n/);
  const firstComponentImportIndex =
    oldLinesArray.findIndex((line) =>
      line.match(/^\/\/ START COMPONENTS CSS FILES IMPORTS/)
    ) + 1;
  const lastComponentImportIndex =
    oldLinesArray.findIndex((line) =>
      line.match(/^\/\/ END COMPONENT CSS FILES IMPORTS/)
    ) - 1;
  const importLinesArray = oldLinesArray.slice(
    firstComponentImportIndex,
    lastComponentImportIndex + 1
  );
  importLinesArray.push(`@use "../components/${name}";`);
  const newImportLinesArray = importLinesArray
    .filter((line, index, self) => self.indexOf(line) === index)
    .sort();
  const newLinesArray = [].concat(
    oldLinesArray.slice(0, firstComponentImportIndex),
    newImportLinesArray,
    oldLinesArray.slice(lastComponentImportIndex + 1)
  );
  fs.writeFileSync(cssFilePath, newLinesArray.join('\n'));
};
