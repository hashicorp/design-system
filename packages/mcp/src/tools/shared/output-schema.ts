/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";
import { CATALOG_ANCHORS } from "../../shared/catalog.js";

const catalogSourceOutputSchema = z.object({
  version: z.string().nullable(),
  resolvedVia: z.enum(CATALOG_ANCHORS),
});

export default catalogSourceOutputSchema;
