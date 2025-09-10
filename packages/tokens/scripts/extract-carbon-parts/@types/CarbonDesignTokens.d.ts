/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { DesignToken } from 'style-dictionary/types';

// inspired by: https://github.com/didoo/style-dictionary/blob/main/types/DesignToken.ts
export interface CarbonDesignToken {
  $value?: DesignToken['$value'];
  $type?: DesignToken['$type'];
  group?: string;
  private?: boolean;
}

export interface CarbonDesignTokens {
  [key: string]: CarbonDesignToken | CarbonDesignToken | string | undefined;
}

