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

  manifestPathCache = require.resolve(
    '@hashicorp/design-system-components/manifest/components.json'
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
  if (Array.isArray(property.values) && property.values.length > 0) {
    attrs.push(`@values=${renderValues(property.values)}`);
  }
  if (property.valueNote !== undefined) {
    attrs.push(`@valueNote="${quoteValue(property.valueNote)}"`);
  }

  lines.push(`${indent}<C.Property ${attrs.join(' ')}>`);

  if (property.description !== undefined && property.description.length > 0) {
    lines.push(`${indent}  ${property.description}`);
  }

  if (Array.isArray(property.properties) && property.properties.length > 0) {
    lines.push(`${indent}  <Doc::ComponentApi as |C|>`);

    property.properties.forEach((childProperty) => {
      lines.push(renderProperty(childProperty, depth + 2));
    });

    lines.push(`${indent}  </Doc::ComponentApi>`);
  }

  lines.push(`${indent}</C.Property>`);

  return lines.join('\n');
}

function renderSection(section) {
  const lines = [];

  lines.push(`### ${section.title}`);
  lines.push('');

  if (section.description !== undefined && section.description.length > 0) {
    lines.push(section.description);
    lines.push('');
  }

  lines.push('<Doc::ComponentApi as |C|>');
  section.properties.forEach((property) => {
    lines.push(renderProperty(property));
  });
  lines.push('</Doc::ComponentApi>');

  return lines.join('\n');
}

function docsPathToComponentSlug(inputFile) {
  const explicitPilotMap = {
    'components/accordion/index.md': 'accordion',
    'components/button/index.md': 'button',
  };

  const explicitSlug = explicitPilotMap[inputFile];
  if (explicitSlug !== undefined) {
    return explicitSlug;
  }

  if (inputFile.startsWith('components/')) {
    return inputFile
      .replace(/^components\//, '')
      .replace(/\/index\.md$/, '');
  }

  if (inputFile.startsWith('utilities/')) {
    return inputFile
      .replace(/^utilities\//, '')
      .replace(/\/index\.md$/, '');
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
    return undefined;
  }

  const manifest = loadManifest();

  return manifest.components.find((component) => component.slug === slug);
}

function renderComponentApiMarkdown(component) {
  const lines = [];

  lines.push('## Component API');
  lines.push('');

  component.api.sections.forEach((section) => {
    lines.push(renderSection(section));
    lines.push('');
  });

  return lines.join('\n').trimEnd();
}

function getManifestComponentApiContent(inputFile, includeFilePath) {
  if (includeFilePath !== 'partials/code/component-api.md') {
    return undefined;
  }

  const component = getComponentFromManifest(inputFile);

  if (component === undefined) {
    return undefined;
  }

  return `${renderComponentApiMarkdown(component)}\n`;
}

module.exports = {
  getManifestPath,
  getManifestComponentApiContent,
};
