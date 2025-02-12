/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsAdvancedTableTdSignature } from '../../components/hds/advanced-table/td.ts';
import type { HdsAdvancedTableThSignature } from '../../components/hds/advanced-table/th.ts';
export declare const onFocusTrapDeactivate: (cell: HTMLDivElement) => void;
export declare const updateTabbableChildren: (cell: HTMLDivElement, isFocusTrapActive?: boolean) => void;
export declare const didInsertGridCell: (cell: HdsAdvancedTableThSignature["Element"] | HdsAdvancedTableTdSignature["Element"]) => void;
//# sourceMappingURL=dom-management.d.ts.map