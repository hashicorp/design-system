/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const cleanupContent = (content) =>
  content.replaceAll(/\n/gm, ' ').replaceAll(/\s\s+/gm, ' ').trim();
