/* eslint-env node */

'use strict';

const fs = require('fs-extra');
const path = require('path');

let manifestCache;
let manifestPathCache;

const directiveRegex =
  /<!--\s*hds-api:([a-z-]+)(?:\s+name=([A-Za-z0-9_-]+))?\s*-->/g;

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

function quoteValue(value) {
  return String(value).replace(/"/g, '&quot;');
}

function renderValues(values) {
  const renderedValues = values.map((value) => {
    return `"${quoteValue(value)}"`;
  });

  return `{{array ${renderedValues.join(' ')}}}`;
}

function resolveSpecialValues(values) {
  if (Array.isArray(values) === false) {
    return values;
  }

  if (values.length === 1 && values[0] === '__icons__') {
    return ['__HDS_ICON_NAMES__'];
  }

  return values;
}

function renderProperty(property, depth = 1) {
  const indent = '  '.repeat(depth);
  const lines = [];

  const attrs = [];
  if (property.name !== undefined) {
    attrs.push(`@name="${quoteValue(property.name)}"`);
  }
  if (property.type !== undefined) {
    attrs.push(`@type="${quoteValue(property.type)}"`);
  }
  if (property.required === true) {
    attrs.push('@required={{true}}');
  }
  if (property.default !== undefined) {
    attrs.push(`@default="${quoteValue(property.default)}"`);
  }

  const values = resolveSpecialValues(property.values);
  if (Array.isArray(values) === true && values.length > 0) {
    attrs.push(`@values=${renderValues(values)}`);
  }

  if (property.valueNote !== undefined) {
    attrs.push(`@valueNote="${quoteValue(property.valueNote)}"`);
  }

  lines.push(`${indent}<C.Property ${attrs.join(' ')}>`);

  if (property.description !== undefined && property.description.length > 0) {
    lines.push(`${indent}  ${property.description}`);
  }

  if (Array.isArray(property.notes) === true && property.notes.length > 0) {
    if (property.description !== undefined && property.description.length > 0) {
      lines.push(`${indent}  <br />`);
      lines.push(`${indent}  <br />`);
    }

    property.notes.forEach((note) => {
      const kind = note.kind ?? 'note';
      const text = note.text ?? '';

      if (text.length === 0) {
        return;
      }

      const prefix =
        kind === 'important'
          ? 'Important:'
          : kind === 'warning'
            ? 'Warning:'
            : 'Notice:';

      lines.push(`${indent}  _${prefix} ${text}_`);
    });
  }

  if (
    Array.isArray(property.properties) === true &&
    property.properties.length > 0
  ) {
    lines.push(`${indent}  <Doc::ComponentApi as |C|>`);

    property.properties.forEach((childProperty) => {
      lines.push(renderProperty(childProperty, depth + 2));
    });

    lines.push(`${indent}  </Doc::ComponentApi>`);
  }

  lines.push(`${indent}</C.Property>`);

  return lines.join('\n');
}

function renderProperties(properties) {
  const lines = [];

  lines.push('<Doc::ComponentApi as |C|>');
  properties.forEach((property) => {
    lines.push(renderProperty(property));
  });
  lines.push('</Doc::ComponentApi>');

  return lines.join('\n');
}

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

  const normalized = description
    .replace(/^The\s+/u, '')
    .replace(/\s+component,\s+yielded as contextual component\.?$/u, '')
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

function getSection(component, title, inputFile) {
  const section = component.api.sections.find((entry) => entry.title === title);

  if (section === undefined) {
    throw new Error(
      `Cannot hydrate hds-api directives for ${inputFile}: section "${title}" is missing in manifest for "${component.slug}".`,
    );
  }

  if (
    Array.isArray(section.properties) === false ||
    section.properties.length === 0
  ) {
    throw new Error(
      `Cannot hydrate hds-api directives for ${inputFile}: section "${title}" has no properties in manifest for "${component.slug}".`,
    );
  }

  return section;
}

function getSectionIfPresent(component, title) {
  const section = component.api.sections.find((entry) => entry.title === title);

  if (section === undefined) {
    return undefined;
  }

  if (
    Array.isArray(section.properties) === false ||
    section.properties.length === 0
  ) {
    return undefined;
  }

  return section;
}

function getContextualProperty(component, contextualName, inputFile) {
  const contextualSection = getSection(
    component,
    'Contextual components',
    inputFile,
  );
  const contextualPattern = new RegExp(
    `^\\[[^\\]]+\\]\\.${contextualName}$`,
    'u',
  );

  const contextualProperty = contextualSection.properties.find((property) => {
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
    const argumentsSection = getSection(component, 'Arguments', inputFile);
    const contextualSection = getSectionIfPresent(
      component,
      'Contextual components',
    );

    if (contextualSection === undefined) {
      return renderProperties(argumentsSection.properties);
    }

    const topLevelContextualComponents = stripNestedProperties(
      keepYieldedComponentsOnly(contextualSection.properties),
    ).map((property) => formatTopLevelContextualComponent(property));

    return renderProperties([
      ...topLevelContextualComponents,
      ...argumentsSection.properties,
    ]);
  }

  if (directive === 'blocks') {
    return renderProperties(
      getSection(component, 'Blocks', inputFile).properties,
    );
  }

  if (directive === 'contextual') {
    const contextualProperties = getSection(
      component,
      'Contextual components',
      inputFile,
    ).properties;

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
      getContextualProperty(component, name, inputFile).properties,
    );
  }

  throw new Error(
    `Cannot hydrate hds-api directives for ${inputFile}: unknown directive "${directive}".`,
  );
}

function hydrateManifestApiDirectives(markdown, inputFile) {
  if (markdown.includes('<!-- hds-api:') === false) {
    return markdown;
  }

  const component = getComponentFromManifest(inputFile);

  return markdown.replace(directiveRegex, (_match, directive, name) => {
    return renderDirective(component, directive, name, inputFile);
  });
}

module.exports = {
  getManifestPath,
  hydrateManifestApiDirectives,
};
