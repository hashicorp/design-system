/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ComponentCatalogComponent } from './schema.js';

export const normalizeComponentName = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .replace(/^hds[-:\s]*/u, '');
};

export const getLookupKeys = (
  component: ComponentCatalogComponent
): string[] => {
  return [
    normalizeComponentName(component.name),
    normalizeComponentName(component.slug),
  ];
};
