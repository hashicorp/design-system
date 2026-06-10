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

function deriveValuesFromType(type) {
  if (typeof type !== 'string' || type.length === 0) {
    return undefined;
  }

  const hasBoolean = /\bboolean\b/u.test(type);
  const literalMatches = [...type.matchAll(/'([^']*)'|"([^"]*)"/gu)];
  const literalValues = literalMatches
    .map((match) => match[1] ?? match[2])
    .filter((value) => value !== undefined && value.length > 0);

  if (hasBoolean === false && literalValues.length === 0) {
    return undefined;
  }

  const values = [];

  if (hasBoolean === true) {
    values.push('true', 'false');
  }

  literalValues.forEach((value) => {
    if (values.includes(value) === false) {
      values.push(value);
    }
  });

  return values;
}

function resolveSpecialValues(property) {
  const values = property.values;

  if (Array.isArray(values) === false) {
    return deriveValuesFromType(property.type);
  }

  if (values.length === 1 && values[0] === '__icons__') {
    return ['__HDS_ICON_NAMES__'];
  }

  const derivedValues = deriveValuesFromType(property.type);

  if (Array.isArray(derivedValues) === false || derivedValues.length === 0) {
    return values;
  }

  const mergedValues = [...derivedValues];

  values.forEach((value) => {
    if (mergedValues.includes(value) === false) {
      mergedValues.push(value);
    }
  });

  return mergedValues;

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

  return description;
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

  const values = resolveSpecialValues(property);

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

  const remarks = normalizeDescription(property.remarks);

  if (remarks !== undefined && remarks.length > 0) {
    if (description !== undefined && description.length > 0) {
      lines.push(`${indent}  <br />`);
      lines.push(`${indent}  <br />`);
    }

    lines.push(`${indent}  ${remarks}`);
  }

  if (Array.isArray(property.links) === true && property.links.length > 0) {
    const renderedLinks = renderLinks(property.links);

    if (renderedLinks.length > 0) {
      if (
        (description !== undefined && description.length > 0) ||
        (remarks !== undefined && remarks.length > 0)
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
