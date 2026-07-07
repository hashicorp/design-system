/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export interface IconVariant {
  id: string;
  fileName: string;
  size: string;
  width: number;
  height: number;
  mapping?: string;
}

export interface IconRecord {
  iconName: string;
  description: string;
  category: string;
  sizes: string[];
  hasMapping: boolean;
  variants: IconVariant[];
}
