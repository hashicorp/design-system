/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// the shape every catalog search answers with
export interface CatalogSearchOutcome<TSummary> {
  totalMatches: number;
  hits: TSummary[];
}
