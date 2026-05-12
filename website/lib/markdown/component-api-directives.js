/* eslint-env node */

'use strict';

const { renderProperties } = require('./component-api-renderer.js');

const directiveRegex =
  /<!--\s*hds-api:([a-z-]+)(?:\s+name=([A-Za-z0-9_-]+))?\s*-->/g;

function stripNestedProperties(properties) {
  return properties.map((property) => {
    const { properties: _nestedProperties, ...topLevelProperty } = property;

    return topLevelProperty;
  });
}

function keepYieldedComponentsOnly(properties) {
  return properties.filter((property) => property.type === 'yielded component');
}

function normalizeContextualSummaryDescription(description) {
  if (description === undefined || description.length === 0) {
    return description;
  }

  if (/yielded as contextual component \(see below\)\.?$/u.test(description)) {
    return description;
  }

  const normalized = description
    .replace(/^The\s+/u, '')
    .replace(
      /\s+component,\s+yielded as (?:a\s+)?contextual component\.?$/u,
      '',
    )
    .replace(/\s+component\s+yielded as (?:a\s+)?contextual component\.?$/u, '')
    .replace(/\s+yielded as (?:a\s+)?contextual component\.?$/u, '')
    .trim();

  if (normalized.length === 0) {
    return description;
  }

  return `${normalized} yielded as contextual component (see below).`;
}

function formatTopLevelContextualComponent(property) {
  return {
    ...property,
    name:
      property.name !== undefined && property.name.startsWith('<') === false
        ? `<${property.name}>`
        : property.name,
    description: normalizeContextualSummaryDescription(property.description),
  };
}

function getApiProperties(component, key, inputFile, label) {
  const properties = component.api?.[key];

  if (Array.isArray(properties) === false) {
    throw new Error(
      `Cannot hydrate hds-api directives for ${inputFile}: api.${key} (${label}) is missing in manifest for "${component.slug}".`,
    );
  }

  if (properties.length === 0) {
    throw new Error(
      `Cannot hydrate hds-api directives for ${inputFile}: api.${key} (${label}) has no properties in manifest for "${component.slug}".`,
    );
  }

  return properties;
}

function getApiPropertiesIfPresent(component, key) {
  const properties = component.api?.[key];

  if (Array.isArray(properties) === false || properties.length === 0) {
    return undefined;
  }

  return properties;
}

function getContextualProperty(component, contextualName, inputFile) {
  const contextualProperties = getApiProperties(
    component,
    'contextualComponents',
    inputFile,
    'Contextual components',
  );
  const contextualPattern = new RegExp(
    `^\\[[^\\]]+\\]\\.${contextualName}$`,
    'u',
  );

  const contextualProperty = contextualProperties.find((property) => {
    return contextualPattern.test(property.name);
  });

  if (contextualProperty === undefined) {
    throw new Error(
      `Cannot hydrate hds-api directives for ${inputFile}: contextual property "${contextualName}" is missing in manifest for "${component.slug}".`,
    );
  }

  if (
    Array.isArray(contextualProperty.properties) === false ||
    contextualProperty.properties.length === 0
  ) {
    throw new Error(
      `Cannot hydrate hds-api directives for ${inputFile}: contextual property "${contextualProperty.name}" has no nested properties in manifest.`,
    );
  }

  return contextualProperty;
}

function renderDirective(component, directive, name, inputFile) {
  if (directive === 'arguments') {
    const argumentsProperties = getApiProperties(
      component,
      'arguments',
      inputFile,
      'Arguments',
    );
    const contextualProperties = getApiPropertiesIfPresent(
      component,
      'contextualComponents',
    );

    if (contextualProperties === undefined) {
      return renderProperties(argumentsProperties);
    }

    const topLevelContextualComponents = stripNestedProperties(
      keepYieldedComponentsOnly(contextualProperties),
    ).map((property) => formatTopLevelContextualComponent(property));

    return renderProperties([
      ...topLevelContextualComponents,
      ...argumentsProperties,
    ]);
  }

  if (directive === 'blocks') {
    return renderProperties(getApiProperties(component, 'blocks', inputFile, 'Blocks'));
  }

  if (directive === 'contextual') {
    const contextualProperties = getApiProperties(
      component,
      'contextualComponents',
      inputFile,
      'Contextual components',
    );

    return renderProperties(
      stripNestedProperties(keepYieldedComponentsOnly(contextualProperties)),
    );
  }

  if (directive === 'contextual-args') {
    if (name === undefined || name.length === 0) {
      throw new Error(
        `Cannot hydrate hds-api directives for ${inputFile}: contextual-args requires name=<ContextualName>.`,
      );
    }

    return renderProperties(getContextualProperty(component, name, inputFile).properties);
  }

  throw new Error(
    `Cannot hydrate hds-api directives for ${inputFile}: unknown directive "${directive}".`,
  );
}

function hydrateManifestApiDirectives(markdown, component, inputFile) {
  if (markdown.includes('<!-- hds-api:') === false) {
    return markdown;
  }

  return markdown.replace(directiveRegex, (_match, directive, name) => {
    return renderDirective(component, directive, name, inputFile);
  });
}

module.exports = {
  hydrateManifestApiDirectives,
};
