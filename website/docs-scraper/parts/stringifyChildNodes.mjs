/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export const stringifyChildNodes = (node) => {
  const text = node.children.reduce((acc, child) => {
    if ('children' in child) {
      acc += stringifyChildNodes(child);
    } else if ('value' in child) {
      acc += ` ${child.value}`;
    }
    return acc;
  }, '');

  return text.trim();
};
