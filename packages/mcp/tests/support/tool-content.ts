/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export const getToolTextContent = (
  result: CallToolResult,
  index = 0,
): string => {
  const block = result.content[index];

  if (block === undefined || block.type !== "text") {
    throw new Error(`Expected text tool content at index ${index}`);
  }

  return block.text;
};

export const parseToolJson = (text: string): Record<string, unknown> => {
  return JSON.parse(text) as Record<string, unknown>;
};
