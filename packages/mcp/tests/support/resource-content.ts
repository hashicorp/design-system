/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

type ResourceTextContent = {
  uri: string;
  text?: string;
  blob?: string;
};

export const getTextContent = (content: ResourceTextContent): string => {
  if (typeof content.text !== "string") {
    throw new Error(`Expected text resource content for URI: ${content.uri}`);
  }

  return content.text;
};

export const parseResourceJson = (text: string): Record<string, unknown> => {
  return JSON.parse(text) as Record<string, unknown>;
};
