/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { Node } from 'ts-morph';

export function findImportForLocalName(sourceFile, localName) {
  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();

    const defaultImport = importDecl.getDefaultImport();

    if (defaultImport && defaultImport.getText() === localName) {
      return {
        importDecl,
        moduleSpecifier,
        importedName: 'default',
        isDefault: true,
      };
    }

    for (const namedImport of importDecl.getNamedImports()) {
      const candidateLocalName =
        namedImport.getAliasNode()?.getText() || namedImport.getName();

      if (candidateLocalName !== localName) {
        continue;
      }

      return {
        importDecl,
        moduleSpecifier,
        importedName: namedImport.getName(),
        isDefault: false,
      };
    }
  }

  return null;
}

export function getContextualComponentTypeQuery(typeNode) {
  if (!typeNode) {
    return null;
  }

  if (Node.isTypeQuery(typeNode)) {
    return typeNode;
  }

  if (
    Node.isTypeReference(typeNode) &&
    typeNode.getTypeName().getText() === 'WithBoundArgs'
  ) {
    const firstTypeArg = typeNode.getTypeArguments()[0];

    if (firstTypeArg && Node.isTypeQuery(firstTypeArg)) {
      return firstTypeArg;
    }
  }

  return null;
}
