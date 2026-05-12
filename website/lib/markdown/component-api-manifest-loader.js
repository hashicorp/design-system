/* eslint-env node */

'use strict';

const fs = require('fs-extra');
const path = require('path');

let manifestCache;
let manifestPathCache;

function getManifestPath() {
  if (manifestPathCache !== undefined) {
    return manifestPathCache;
  }

  const workspaceManifestPath = path.resolve(
    __dirname,
    '../../../packages/components/dist/manifest/components.json',
  );

  if (fs.existsSync(workspaceManifestPath) === true) {
    manifestPathCache = workspaceManifestPath;
    return manifestPathCache;
  }

  manifestPathCache = require.resolve(
    '@hashicorp/design-system-components/manifest/components.json',
  );

  return manifestPathCache;
}

function loadManifest() {
  if (manifestCache !== undefined) {
    return manifestCache;
  }

  const manifestPath = getManifestPath();
  manifestCache = fs.readJSONSync(manifestPath);

  return manifestCache;
}

function docsPathToComponentSlug(inputFile) {
  if (inputFile.startsWith('components/')) {
    return inputFile.replace(/^components\//, '').replace(/\/index\.md$/, '');
  }

  if (inputFile.startsWith('utilities/')) {
    return inputFile.replace(/^utilities\//, '').replace(/\/index\.md$/, '');
  }

  if (inputFile.startsWith('layouts/')) {
    const layoutPath = inputFile
      .replace(/^layouts\//, '')
      .replace(/\/index\.md$/, '');
    return `layout/${layoutPath}`;
  }

  return undefined;
}

function getComponentFromManifest(inputFile) {
  const slug = docsPathToComponentSlug(inputFile);

  if (slug === undefined) {
    throw new Error(
      `Cannot hydrate hds-api directives for ${inputFile}: unable to resolve component slug.`,
    );
  }

  const manifest = loadManifest();
  const component = manifest.components.find((entry) => entry.slug === slug);

  if (component === undefined) {
    throw new Error(
      `Cannot hydrate hds-api directives for ${inputFile}: component slug "${slug}" is not present in manifest.`,
    );
  }

  return component;
}

module.exports = {
  getManifestPath,
  getComponentFromManifest,
};
