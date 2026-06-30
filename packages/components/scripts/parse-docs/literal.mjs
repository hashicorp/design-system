/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export function splitUnion(typeText) {
  if (typeof typeText !== 'string') {
    return [];
  }

  return typeText
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean);
}

export function isQuotedLiteral(value) {
  return typeof value === 'string' && /^(['"]).*\1$/u.test(value);
}

export function unquoteLiteral(value) {
  if (typeof value !== 'string') {
    return value;
  }

  const match = /^(['"])(.*)\1$/u.exec(value);

  if (match === null) {
    return value;
  }

  return match[2];
}

export function parseStringEnumValues(typeText) {
  const values = splitUnion(typeText);

  if (values.length < 2) {
    return undefined;
  }

  const areAllStringLiterals = values.every((value) => isQuotedLiteral(value));

  if (areAllStringLiterals === false) {
    return undefined;
  }

  return values.map((value) => unquoteLiteral(value));
}
