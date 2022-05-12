'use strict';

const stringUtil = require('ember-cli-string-utils');
const EmberRouterGenerator = require('ember-router-generator');
const fs = require('fs');

module.exports = {
  description: 'Generates tests for an HDS component',

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

  fileMapTokens() {
    return {
      // prepend `db-` to the file name
      __dummyCSSFileName__(options) {
        const parts = options.dasherizedModuleName.split('/');
        const fileName = parts.pop();
        return `${parts.join('/')}/db-${fileName}`;
      },
    };
  },

  afterInstall(options) {
    updateDummyAppRouter.call(this, options);
    updateDummyAppCSS.call(this, options);
  },
};

function updateDummyAppRouter(options) {
  const newRouteToAdd = `components/${options.entity.name}`; // we prefix all the component routes with "components"
  const routerFilePath = `${options.project.root}/tests/dummy/app/router.js`;
  const source = fs.readFileSync(routerFilePath, 'utf-8');
  let oldRoutes = new EmberRouterGenerator(source);
  let newRoutes = oldRoutes['add'](newRouteToAdd, options);
  fs.writeFileSync(routerFilePath, newRoutes.code());
}

function updateDummyAppCSS(options) {
  const parts = options.entity.name.split('/');
  const fileName = `db-${parts.pop()}`;
  const cssFilePath = `${options.project.root}/tests/dummy/app/styles/app.scss`;
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
    `@import "./pages/${parts.concat([fileName]).join('/')}";`
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
}
