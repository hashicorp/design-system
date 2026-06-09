/* eslint-env node */
'use strict';

const { renderProperties } = require('./component-api-renderer.js');

const directiveRegex =
  /<!--\s*hds-api:+([a-z-]+)(?:\s+name=([A-Za-z0-9_-]+))?\s*-->/g;

const SPLATTRIBUTES_PROPERTY = {
  name: '...attributes',
  description:
    'This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).',
};

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

function getContextualComponentSummaryName(component, propertyName) {
  if (typeof propertyName !== 'string' || propertyName.length === 0) {
    return undefined;
  }

  const contextualNameMatch = /^\[[^\]]+\]\.(.+)$/u.exec(propertyName);
  const contextualName = contextualNameMatch?.[1];

  if (contextualName === undefined || contextualName.length === 0) {
    return undefined;
  }

  const componentName = component.name;

  if (typeof componentName !== 'string' || componentName.length === 0) {
    return undefined;
  }

  const baseComponentName = componentName.replace(/^Hds/u, '');

  if (baseComponentName.length === 0) {
    return undefined;
  }

  return `${baseComponentName}::${contextualName}`;
}

function sourcePathToContextualSegments(sourcePath) {
  if (typeof sourcePath !== 'string' || sourcePath.length === 0) {
    return undefined;
  }

  const withoutPrefix = sourcePath.replace(/^\.\//u, '');
  const withoutExtension = withoutPrefix.replace(/\.[a-z0-9]+$/iu, '');
  const segments = withoutExtension
    .split('/')
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      return segment
        .split('-')
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
    })
    .filter(Boolean);

  if (segments.length === 0) {
    return undefined;
  }

  return segments;
}

function getContextualComponentSummaryNameFromSourcePath(component, sourcePath) {
  const componentName = component.name;

  if (typeof componentName !== 'string' || componentName.length === 0) {
    return undefined;
  }

  const baseComponentName = componentName.replace(/^Hds/u, '');

  if (baseComponentName.length === 0) {
    return undefined;
  }

  const sourceSegments = sourcePathToContextualSegments(sourcePath);

  if (sourceSegments === undefined || sourceSegments.length === 0) {
    return undefined;
  }

  return `${baseComponentName}::${sourceSegments.join('::')}`;
}

function formatTopLevelContextualComponent(component, property) {
  const summaryName =
    getContextualComponentSummaryNameFromSourcePath(
      component,
      property.sourcePath,
    ) ?? getContextualComponentSummaryName(component, property.name);
  const normalizedDescription = normalizeContextualSummaryDescription(
    property.description,
  );
  const fallbackDescription =
    normalizedDescription === undefined || normalizedDescription.length === 0
      ? summaryName === undefined
        ? undefined
        : `\`${summaryName}\` yielded as contextual component (see below).`
      : normalizedDescription;

  return {
    ...property,
    name:
      property.name !== undefined && property.name.startsWith('<') === false
        ? `<${property.name}>`
        : property.name,
    description: fallbackDescription,
  };
}

function formatNamedBlock(property) {
  const name = property.name;
  const hasNamedBlockSyntax =
    name !== undefined && /^<:[^>]+>$/u.test(name) === true;

  return {
    ...property,
    name:
      hasNamedBlockSyntax === true || name === undefined
        ? name
        : `<:${name}>`,
    type: 'named block',
  };
}

function keepNamedBlocksOnly(properties) {
  return properties.filter((property) => property.name !== 'default');
}

function getYieldedComponentProperties(component, inputFile) {
  const contextualProperties = getApiPropertiesIfPresent(
    component,
    'contextualComponents',
  );

  if (contextualProperties === undefined) {
    return [];
  }

  return stripNestedProperties(
    keepYieldedComponentsOnly(contextualProperties),
  ).map((property) => formatTopLevelContextualComponent(component, property));
}

function appendSplattributesPropertyIfNeeded(component, properties) {
  if (component.splattributes !== true) {
    return properties;
  }

  const hasSplattributesProperty = properties.some((property) => {
    return property.name === '...attributes' || property.name === '…attributes';
  });

  if (hasSplattributesProperty === true) {
    return properties;
  }

  return [...properties, SPLATTRIBUTES_PROPERTY];
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

function sortPropertiesByRequiredThenName(properties) {
  return [...properties]
    .map((property) => {
      const normalizedProperty = { ...property };

      if (
        Array.isArray(normalizedProperty.properties) === true &&
        normalizedProperty.properties.length > 0
      ) {
        normalizedProperty.properties = sortPropertiesByRequiredThenName(
          normalizedProperty.properties,
        );
      }

      return normalizedProperty;
    })
    .sort((a, b) => {
      if (a.required === true && b.required !== true) {
        return -1;
      }

      if (a.required !== true && b.required === true) {
        return 1;
      }

      const aName = a.name ?? '';
      const bName = b.name ?? '';

      return aName.localeCompare(bName);
    });
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
  if (directive === 'api') {
    const namedBlocksProperties = keepNamedBlocksOnly(
      getApiProperties(component, 'blocks', inputFile, 'Blocks'),
    ).map((property) => formatNamedBlock(property));
    const yieldedComponentsProperties = getYieldedComponentProperties(
      component,
      inputFile,
    );
    const argumentsProperties = appendSplattributesPropertyIfNeeded(
      component,
      sortPropertiesByRequiredThenName(
        getApiProperties(component, 'arguments', inputFile, 'Arguments'),
      ),
    );

    return renderProperties([
      ...namedBlocksProperties,
      ...yieldedComponentsProperties,
      ...argumentsProperties,
    ]);
  }

  if (directive === 'arguments') {
    const argumentsProperties = appendSplattributesPropertyIfNeeded(
      component,
      sortPropertiesByRequiredThenName(
        getApiProperties(component, 'arguments', inputFile, 'Arguments'),
      ),
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
    ).map((property) => formatTopLevelContextualComponent(component, property));

    return renderProperties([
      ...topLevelContextualComponents,
      ...argumentsProperties,
    ]);
  }

  if (directive === 'blocks') {
    const namedBlocksProperties = keepNamedBlocksOnly(
      getApiProperties(
        component,
        'blocks',
        inputFile,
        'Blocks',
      ),
    ).map((property) => formatNamedBlock(property));
    const yieldedComponentsProperties = getYieldedComponentProperties(
      component,
      inputFile,
    );

    return renderProperties([
      ...namedBlocksProperties,
      ...yieldedComponentsProperties,
    ]);
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

    return renderProperties(
      sortPropertiesByRequiredThenName(
        getContextualProperty(component, name, inputFile).properties,
      ),
    );
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
