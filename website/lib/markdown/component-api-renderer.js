/* eslint-env node */

'use strict';

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

function renderLinks(links) {
  return links
    .map((link) => {
      const href = link.href?.trim();
      if (href === undefined || href.length === 0) {
        return undefined;
      }

      const label = link.label?.trim();
      if (label !== undefined && label.length > 0) {
        return `[${label}](${href})`;
      }

      return `<${href}>`;
    })
    .filter((link) => link !== undefined);
}

function normalizeDescription(description) {
  if (description === undefined || description.length === 0) {
    return description;
  }

  return description.replace(/\n\s*\n/gu, '\n<br />\n<br />\n');
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

  const description = normalizeDescription(property.description);

  if (description !== undefined && description.length > 0) {
    lines.push(`${indent}  ${description}`);
  }

  if (Array.isArray(property.notes) === true && property.notes.length > 0) {
    if (description !== undefined && description.length > 0) {
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

  if (Array.isArray(property.links) === true && property.links.length > 0) {
    const renderedLinks = renderLinks(property.links);

    if (renderedLinks.length > 0) {
      if (
        (description !== undefined && description.length > 0) ||
        (Array.isArray(property.notes) === true && property.notes.length > 0)
      ) {
        lines.push(`${indent}  <br />`);
        lines.push(`${indent}  <br />`);
      }

      lines.push(`${indent}  See also: ${renderedLinks.join(', ')}.`);
    }
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

module.exports = {
  renderProperties,
};
