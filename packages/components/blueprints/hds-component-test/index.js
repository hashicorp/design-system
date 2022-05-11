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
    updateRouter.call(this, options);
  },
};

function updateRouter(options) {
  const newRouteToAdd = `components/${options.entity.name}`; // we prefix all the component routes with "components"
  const routerFilePath = `${options.project.root}/tests/dummy/app/router.js`;
  let source = fs.readFileSync(routerFilePath, 'utf-8');
  let oldRoutes = new EmberRouterGenerator(source);
  let newRoutes = oldRoutes['add'](newRouteToAdd, options);
  fs.writeFileSync(routerFilePath, newRoutes.code());
}
