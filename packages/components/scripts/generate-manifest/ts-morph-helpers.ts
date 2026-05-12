import {
  Node,
  type PropertySignature,
  type Symbol as MorphSymbol,
  type Type,
} from 'ts-morph';

export function getPropertySignatureFromSymbol(
  symbol: MorphSymbol
): PropertySignature | undefined {
  const declarations = symbol.getDeclarations();

  for (const declaration of declarations) {
    if (Node.isPropertySignature(declaration)) {
      return declaration;
    }
  }

  const declaration = symbol.getValueDeclaration();
  if (
    declaration !== undefined &&
    Node.isPropertySignature(declaration)
  ) {
    return declaration;
  }

  return undefined;
}

export function getFirstTupleElementType(type: Type): Type | undefined {
  const tupleElements = type.getTupleElements();
  if (tupleElements[0] !== undefined) {
    return tupleElements[0];
  }

  for (const unionType of type.getUnionTypes()) {
    const unionTupleElements = unionType.getTupleElements();
    if (unionTupleElements[0] !== undefined) {
      return unionTupleElements[0];
    }
  }

  return undefined;
}
