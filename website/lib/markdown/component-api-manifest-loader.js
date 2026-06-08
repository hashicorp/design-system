/* eslint-env node */
'use strict';

const fs = require('fs-extra');
const path = require('path');

let manifestCache;
let manifestPathCache;

function toPascalCase(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function slugToComponentName(slug) {
  const normalized = slug.replace(/^layout\//, 'layout/');
  const parts = normalized.split('/').filter(Boolean);

  if (parts.length === 0) {
    return undefined;
  }

  return `Hds${parts.map((part) => toPascalCase(part)).join('')}`;
}

function normalizeParsedArgument(arg) {
  return {
    name: arg.name,
    type: arg.type,
    required: arg.required,
    default: arg.defaultValue ?? undefined,
    description: arg.description,
    remarks: arg.remarks || undefined,
  };
}

function normalizeParsedArguments(args) {
  const propertiesByName = new Map();
  const argumentsProperties = (args ?? []).map((arg) => {
    const normalized = normalizeParsedArgument(arg);
    propertiesByName.set(arg.name, normalized);

    return normalized;
  });

  (args ?? []).forEach((arg) => {
    if (arg.dependsOn === null || arg.dependsOn === undefined) {
      return;
    }

    const child = propertiesByName.get(arg.name);
    const parent = propertiesByName.get(arg.dependsOn);

    if (child === undefined || parent === undefined) {
      return;
    }

    if (Array.isArray(parent.properties) === false) {
      parent.properties = [];
    }

    parent.properties.push(child);
  });

  return argumentsProperties.filter((property, index) => {
    const arg = args[index];

    if (arg.dependsOn === null || arg.dependsOn === undefined) {
      return true;
    }

    return propertiesByName.has(arg.dependsOn) === false;
  });
}

function normalizeParsedComponentApiEntry(componentName, parsedEntry) {
  const argumentsProperties = normalizeParsedArguments(parsedEntry.args);

  const blocksProperties = (parsedEntry.blocks ?? []).map((block) => ({
    name: block.name,
    description: block.description,
    properties: (block.yields ?? []).map((yieldedValue) => ({
      name: yieldedValue.name,
      type: yieldedValue.type,
      description: yieldedValue.description,
      remarks: yieldedValue.remarks || undefined,
    })),
  }));

  const contextualComponents = [];
  (parsedEntry.blocks ?? []).forEach((block) => {
    (block.yields ?? []).forEach((yieldedValue) => {
      if (yieldedValue.type !== 'component') {
        return;
      }

      contextualComponents.push({
        name: `[${block.name}].${yieldedValue.name}`,
        type: 'yielded component',
        description: yieldedValue.description,
      });
    });
  });

  return {
    name: parsedEntry.name ?? componentName,
    slug: parsedEntry.slug,
    api: {
      arguments: argumentsProperties,
      blocks: blocksProperties,
      contextualComponents,
    },
  };
}

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

  if (Array.isArray(manifest.components) === true) {
    const component = manifest.components.find((entry) => entry.slug === slug);

    if (component === undefined) {
      throw new Error(
        `Cannot hydrate hds-api directives for ${inputFile}: component slug "${slug}" is not present in manifest.`,
      );
    }

    return component;
  }

  const componentName = slugToComponentName(slug);

  if (componentName === undefined) {
    throw new Error(
      `Cannot hydrate hds-api directives for ${inputFile}: unable to map slug "${slug}" to component name for parser manifest.`,
    );
  }

  const parsedEntry = manifest[componentName];

  if (parsedEntry === undefined) {
    throw new Error(
      `Cannot hydrate hds-api directives for ${inputFile}: component "${componentName}" (slug "${slug}") is not present in parser manifest.`,
    );
  }

  return normalizeParsedComponentApiEntry(componentName, parsedEntry);
}

module.exports = {
  getManifestPath,
  getComponentFromManifest,
};
