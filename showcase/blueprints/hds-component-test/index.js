/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/* eslint-disable ember/no-string-prototype-extensions */
/* eslint-disable node/no-extraneous-require */
'use strict';

const stringUtil = require('ember-cli-string-utils');
const EmberRouterGenerator = require('ember-router-generator');
const fs = require('fs');

module.exports = {
  description: 'Generates tests for an HDS component',

  locals(options) {
    return {
      columnizedModuleName: getColumnizedModuleName(options.entity.name),
      kebabizedModuleName: getKebabizedModuleName(options.entity.name),
      folderizedModuleName: getFolderizedModuleName(options.entity.name),
    };
  },

  fileMapTokens() {
    return {
      // prepend `db-` to the file name
      __dummyCSSFileName__(options) {
        return getDummyCSSFileName(options.dasherizedModuleName);
      },
    };
  },

  afterInstall(options) {
    updateDummyAppRouter.call(this, options);
    updateDummyAppCSS.call(this, options);
    updateDummyAppIndexHBS.call(this, options);
    updatePercyTest.call(this, options);
  },
};

const updateDummyAppRouter = (options) => {
  const newRouteToAdd = `components/${options.entity.name}`; // we prefix all the component routes with "components"
  const routerFilePath = `${options.project.root}/app/router.js`;
  const source = fs.readFileSync(routerFilePath, 'utf-8');
  let oldRoutes = new EmberRouterGenerator(source);
  let newRoutes = oldRoutes['add'](newRouteToAdd, options);
  fs.writeFileSync(routerFilePath, newRoutes.code());
};

const updateDummyAppCSS = (options) => {
  const name = options.entity.name;
  const cssFilePath = `${options.project.root}/app/styles/app.scss`;
  const source = fs.readFileSync(cssFilePath, 'utf-8');
  const oldLinesArray = source.split(/\r?\n/);
  const firstComponentImportIndex =
    oldLinesArray.findIndex((line) =>
      line.match(/^\/\/ START COMPONENT PAGES IMPORTS/)
    ) + 1;
  const lastComponentImportIndex =
    oldLinesArray.findIndex((line) =>
      line.match(/^\/\/ END COMPONENT PAGES IMPORTS/)
    ) - 1;
  const importLinesArray = oldLinesArray.slice(
    firstComponentImportIndex,
    lastComponentImportIndex + 1
  );
  importLinesArray.push(
    `@import "./showcase-pages/${getDummyCSSFileName(name)}";`
  );
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

const updateDummyAppIndexHBS = (options) => {
  const name = options.entity.name;
  const hbsFilePath = `${options.project.root}/app/templates/index.hbs`;
  let newListItemHTML = '';
  newListItemHTML += '<!-- MOVE THIS HTML BLOCK IN THE RIGHT POSITION -->\n';
  newListItemHTML += '<!-- (adjust component name & route if necessary) -->\n';
  newListItemHTML += '<li>\n';
  newListItemHTML += `  <LinkTo @route="components.${getRoutedModuleName(
    name
  )}">\n`;
  newListItemHTML += `    ${getColumnizedModuleName(name)}\n`;
  newListItemHTML += '  </LinkTo>\n';
  newListItemHTML += '</li>\n';
  fs.appendFileSync(hbsFilePath, `\n\n${newListItemHTML}\n`);
};

const updatePercyTest = (options) => {
  const name = options.entity.name;
  const percyTestFilePath = `${options.project.root}/tests/acceptance/percy-test.js`;

  let newSnapshot = `    await visit('/components/${getKebabizedModuleName(
    name
  )}');\n`;
  newSnapshot += `    await percySnapshot('${stringUtil.classify(name)}');\n`;

  let source = fs.readFileSync(percyTestFilePath, 'utf-8');
  source = source.replace(
    '    // DO NOT REMOVE – PERCY SNAPSHOTS END',
    `    // MOVE THIS BLOCK IN THE RIGHT POSITION\n${newSnapshot}\n    // DO NOT REMOVE – PERCY SNAPSHOTS END`
  );
  fs.writeFileSync(percyTestFilePath, source);
};

const getColumnizedModuleName = (name) => {
  const columnizedModuleName = name
    .split('/')
    .map((part) => stringUtil.classify(part))
    .join('::');
  return columnizedModuleName;
};

const getKebabizedModuleName = (name) => {
  const kebabizedModuleName = name
    .split('/')
    .map((part) => stringUtil.dasherize(part))
    .join('-');
  return kebabizedModuleName;
};

const getFolderizedModuleName = (name) => {
  const folderizedModuleName = name
    .split('/')
    .map((part) => stringUtil.dasherize(part).toUpperCase())
    .join(' > ');
  return folderizedModuleName;
};

const getRoutedModuleName = (name) => {
  const routedModuleName = name
    .split('/')
    .map((part) => stringUtil.dasherize(part))
    .join('.');
  return routedModuleName;
};

const getDummyCSSFileName = (name) => {
  const parts = name.split('/');
  const fileName = `${parts.pop()}`;
  return `${parts.concat([fileName]).join('/')}`;
};
