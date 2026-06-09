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

function componentNameToYieldPrefix(componentName) {
  if (typeof componentName !== 'string' || componentName.length === 0) {
    return undefined;
  }

  const withoutPrefix = componentName.replace(/^Hds/u, '');
  const initials = withoutPrefix.match(/[A-Z]/gu)?.join('');

  if (initials === undefined || initials.length === 0) {
    return undefined;
  }

  return initials;
}

function normalizeParsedArgument(arg) {
  const enumValues =
    Array.isArray(arg.values) && arg.values.length > 0
      ? arg.values
      : parseEnumValues(arg.type);

  return {
    name: arg.name,
    type: enumValues === undefined ? arg.type : 'enum',
    values: enumValues,
    required: arg.required,
    default: normalizeDefaultValue(arg.defaultValue),
    description: arg.description,
    remarks: arg.remarks || undefined,
  };
}

function unquoteLiteralValue(value) {
  const match = /^(['"])(.*)\1$/u.exec(value);

  if (match === null) {
    return value;
  }

  return match[2];
}

function normalizeDefaultValue(defaultValue) {
  if (defaultValue === null || defaultValue === undefined) {
    return undefined;
  }

  if (typeof defaultValue !== 'string') {
    return defaultValue;
  }

  return unquoteLiteralValue(defaultValue);
}

function parseEnumValues(typeText) {
  if (typeof typeText !== 'string') {
    return undefined;
  }

  const values = typeText
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean);

  if (values.length < 2) {
    return undefined;
  }

  const areAllStringLiterals = values.every((value) => {
    return /^(['"]).*\1$/u.test(value);
  });

  if (areAllStringLiterals === false) {
    return undefined;
  }

  return values.map((value) => unquoteLiteralValue(value));
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
  const yieldPrefix = componentNameToYieldPrefix(parsedEntry.name ?? componentName);

  const blocksProperties = (parsedEntry.blocks ?? []).map((block) => ({
    name: block.name,
    description: block.description,
    properties: (block.yields ?? []).map((yieldedValue) => ({
      name: yieldedValue.name,
      type: yieldedValue.type,
      description: yieldedValue.description,
      remarks: yieldedValue.remarks || undefined,
      sourcePath: yieldedValue.sourcePath || undefined,
    })),
  }));

  const contextualComponents = [];
  (parsedEntry.blocks ?? []).forEach((block) => {
    (block.yields ?? []).forEach((yieldedValue) => {
      if (yieldedValue.type !== 'component') {
        return;
      }

      const contextualNamePrefix =
        yieldPrefix === undefined ? block.name : `[${yieldPrefix}]`;

      contextualComponents.push({
        name: `${contextualNamePrefix}.${yieldedValue.name}`,
        type: 'yielded component',
        description: yieldedValue.description,
        remarks: yieldedValue.remarks || undefined,
        sourcePath: yieldedValue.sourcePath || undefined,
      });
    });
  });

  return {
    name: parsedEntry.name ?? componentName,
    slug: parsedEntry.slug ?? parsedEntry.name ?? componentName,
    splattributes: parsedEntry.splattributes === true,
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
