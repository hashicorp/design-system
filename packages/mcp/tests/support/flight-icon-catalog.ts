/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { IconAsset } from "../../src/resources/flight-icons/store/schema.js";

export const buildIconAsset = (
  overrides: Partial<IconAsset> = {},
): IconAsset => ({
  id: "1:1",
  fileName: "alert-triangle-16",
  iconName: "alert-triangle",
  description: "alert, warning, caution",
  category: "Alerts",
  size: "16",
  width: 16,
  height: 16,
  ...overrides,
});
