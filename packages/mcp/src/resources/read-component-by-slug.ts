/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from './response-resource.js';

import type { ComponentCatalogStore } from '../component-catalog/store.js';

export const COMPONENT_BY_SLUG_URI_TEMPLATE = 'hds://components/{slug}';

export const getComponentBySlugUri = (slug: string): string => {
  return `hds://components/${encodeURIComponent(slug)}`;
};

export const buildComponentBySlugResourcePayload = (
  store: ComponentCatalogStore,
  slug: string
): Record<string, unknown> => {
  const component = store.getComponentBySlug(slug);

  if (component === null) {
    return {
      generatedAt: store.getManifestMeta().generatedAt,
      found: false,
      slug,
      message: 'Component not found for provided slug.',
    };
  }

  return {
    generatedAt: store.getManifestMeta().generatedAt,
    found: true,
    slug: component.slug,
    component,
  };
};

export const readComponentBySlugResource = (
  store: ComponentCatalogStore,
  slug: string
) => {
  const payload = buildComponentBySlugResourcePayload(store, slug);

  return toJsonResourceResponse(getComponentBySlugUri(slug), payload);
};
