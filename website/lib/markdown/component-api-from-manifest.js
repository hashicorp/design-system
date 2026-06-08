/* eslint-env node */
'use strict';

const {
  getComponentFromManifest,
} = require('./component-api-manifest-loader.js');
const {
  hydrateManifestApiDirectives: hydrateManifestApiDirectivesWithComponent,
} = require('./component-api-directives.js');

function hydrateManifestApiDirectives(markdown, inputFile) {
  if (markdown.includes('<!-- hds-api:') === false) {
    return markdown;
  }

  const component = getComponentFromManifest(inputFile);

  return hydrateManifestApiDirectivesWithComponent(
    markdown,
    component,
    inputFile,
  );
}

module.exports = {
  hydrateManifestApiDirectives,
};
