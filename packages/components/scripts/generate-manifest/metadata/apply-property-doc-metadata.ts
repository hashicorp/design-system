/**
 * Shared JSDoc-driven metadata extraction and precedence application for
 * manifest properties (both top-level `Args` and contextual named-block
 * properties yielded from `Blocks`).
 *
 * Centralizing this logic keeps a single source of truth for the
 * precedence policy between inferred type/values and the doc overrides:
 *
 *   1. Inferred type label and inferred enum values are seeded first.
 *   2. `@type` overrides the type label and CLEARS any inferred values,
 *      so a stale enum list cannot leak through a manual override.
 *   3. `@values` is the final authority for the values list and is
 *      applied last so it cannot be overwritten by inferred values.
 *
 * Callers pass in a small target object that exposes the writable fields
 * (`type`, `values`, `description`, `default`, `notes`, `links`) so the
 * same helper can drive both `CatalogArg` and `CatalogApiProperty` shapes
 * without coupling to either type.
 */

import type { PropertySignature } from 'ts-morph';

import { normalizeApiText } from '../normalize-api-text.ts';
import { normalizeDefaultValue } from '../shared/string-utils.ts';
import { getDocLinks, getDocNotes, getDocTag, parseValuesTag } from './doc-tags.ts';

import type { CatalogApiLink, CatalogApiNote } from '../types.ts';

export interface PropertyDocMetadataTarget {
  type?: string;
  values?: string[];
  description?: string;
  default?: string;
  notes?: CatalogApiNote[];
  links?: CatalogApiLink[];
}

/**
 * Apply description, `@default`, `@type`, `@values`, `@note`/`@important`/
 * `@warning`, and `@link` JSDoc metadata to a manifest property object.
 *
 * Mutates `target` in place. The caller is responsible for seeding any
 * inferred `type` and `values` on `target` before calling this so the
 * precedence policy can correctly clear inferred values when `@type` is
 * present and let `@values` win as the final authority.
 */
export function applyPropertyDocMetadata(
  property: PropertySignature,
  target: PropertyDocMetadataTarget
): void {
  const description = property.getJsDocs()[0]?.getDescription().trim();
  const defaultValue = getDocTag(property, 'default');
  const typeOverride = getDocTag(property, 'type');
  const valuesOverride = getDocTag(property, 'values');
  const notes = getDocNotes(property);
  const links = getDocLinks(property);

  if (description !== undefined && description.length > 0) {
    target.description = normalizeApiText(description);
  }

  if (defaultValue !== undefined && defaultValue.length > 0) {
    target.default = normalizeDefaultValue(defaultValue);
  }

  // Precedence policy: @type overrides inferred type label and clears any
  // previously inferred `values` so a stale enum list cannot leak through.
  if (typeOverride !== undefined && typeOverride.length > 0) {
    target.type = typeOverride;
    target.values = undefined;
  }

  // Precedence policy: @values is the final authority for the values list,
  // so it must be applied last and not be overwritten by inferred values.
  if (valuesOverride !== undefined && valuesOverride.length > 0) {
    target.values = parseValuesTag(valuesOverride);
  }

  if (notes.length > 0) {
    target.notes = notes;
  }

  if (links.length > 0) {
    target.links = links;
  }
}
