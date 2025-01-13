/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsAdvancedTableTdSignature } from './td';
import type { HdsAdvancedTableThSignature } from './th';
export declare const onFocusTrapDeactivate: (cell: HTMLDivElement) => void;
export declare const updateTabbableChildren: (cell: HTMLDivElement, isFocusTrapActive?: boolean) => void;
export declare const didInsertGridCell: (cell: HdsAdvancedTableThSignature["Element"] | HdsAdvancedTableTdSignature["Element"]) => void;
export declare const handleGridCellKeyPress: (event: KeyboardEvent, enableFocusTrap: () => void) => void;
//# sourceMappingURL=helpers.d.ts.map