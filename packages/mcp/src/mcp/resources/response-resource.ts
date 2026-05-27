/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

type JsonObject = Record<string, unknown>;

export const toJsonResourceResponse = (uri: string, payload: JsonObject) => {
  return {
    contents: [
      {
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(payload, null, 2),
      },
    ],
  };
};
