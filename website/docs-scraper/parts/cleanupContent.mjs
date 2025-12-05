/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export const cleanupContent = (content) =>
  content.replaceAll(/\n/gm, ' ').replaceAll(/\s\s+/gm, ' ').trim();
