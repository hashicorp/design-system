/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { getContextualComponentTypeQuery } from './ast-helpers.mjs';
import { TYPE_FUNCTION, TYPE_YIELDED_COMPONENT } from './constants.mjs';
import { parseStringEnumValues } from './literal.mjs';

function normalizeTypeText(typeText) {
  if (typeof typeText !== 'string') {
    return '';
  }

  return typeText.includes('=>') ? TYPE_FUNCTION : typeText;
}

export function createTypeResolver() {
  function resolveDeclarationType(declaration) {
    const typeText = declaration.getType().getText(declaration);
    const normalizedText = normalizeTypeText(typeText);

    return {
      text: normalizedText,
      enumValues: parseStringEnumValues(normalizedText),
    };
  }

  function resolveDeclarationTypeText(declaration) {
    return resolveDeclarationType(declaration).text;
  }

  function resolveYieldTypeText(declaration) {
    const typeNode = declaration.getTypeNode?.();

    if (typeNode && getContextualComponentTypeQuery(typeNode)) {
      return TYPE_YIELDED_COMPONENT;
    }

    return resolveDeclarationTypeText(declaration);
  }

  return {
    resolveDeclarationType,
    resolveDeclarationTypeText,
    resolveYieldTypeText,
  };
}
