/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export const buildDetailUri = (baseUri: string, key: string): string => {
  return `${baseUri}/${encodeURIComponent(key)}`;
};

export const decodeUriSegment = (value: string): string => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};
