/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export interface DesignToken {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $value?: any;
  type?: string;
  $type?: string;
  $description?: string;
  name?: string;
  comment?: string;
  themeable?: boolean;
  attributes?: Record<string, unknown>;
  /**
   * When flattening tokens, DesignToken is given a key that matches the original ancestor tree e.g. `{colors.red.500}`
   */
  key?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
