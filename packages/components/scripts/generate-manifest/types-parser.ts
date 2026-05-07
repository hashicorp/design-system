import { Type } from 'ts-morph';

export function parseType(type: Type): { typeName: string; values?: string[] } {
  if (type.isUnion()) {
    const nonNullableTypes = type
      .getUnionTypes()
      .filter(
        (unionType) =>
          unionType.isUndefined() === false && unionType.isNull() === false
      );

    if (nonNullableTypes.length === 1 && nonNullableTypes[0]) {
      return parseType(nonNullableTypes[0]);
    }

    if (nonNullableTypes.every((unionType) => unionType.isBooleanLiteral())) {
      return { typeName: 'boolean' };
    }

    const stringLiterals = nonNullableTypes
      .filter((unionType) => unionType.isStringLiteral())
      .map((unionType) => unionType.getLiteralValue() as string);

    if (
      stringLiterals.length > 0 &&
      stringLiterals.length === nonNullableTypes.length
    ) {
      return {
        typeName: 'enum',
        values: stringLiterals,
      };
    }
  }

  if (
    type.isBoolean() ||
    (type.isUnion() &&
      type.getUnionTypes().every((unionType) => unionType.isBooleanLiteral()))
  ) {
    return { typeName: 'boolean' };
  }

  if (type.isString()) {
    return { typeName: 'string' };
  }

  if (type.isNumber()) {
    return { typeName: 'number' };
  }

  if (type.getCallSignatures().length > 0) {
    return { typeName: 'function' };
  }

  if (type.isArray()) {
    return { typeName: 'array' };
  }

  const typeText = type.getText();

  if (typeText.endsWith('[]')) {
    return { typeName: 'array' };
  }

  if (type.isObject()) {
    return { typeName: 'object' };
  }

  return { typeName: 'unknown' };
}
