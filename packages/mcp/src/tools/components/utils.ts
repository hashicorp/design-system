/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// the one thing all three catalog search payloads carry that the docs one does not

import { z } from "zod";
import { CATALOG_ANCHORS } from "../../shared/catalog.js";

export const catalogSourceOutputSchema = z.object({
  version: z.string().nullable(),
  resolvedVia: z.enum(CATALOG_ANCHORS),
});
