import { Node } from 'ts-morph';

export function parseComponentsFromEntry({
  entryFile,
  sourceFileResolver,
  typeResolver,
  extractDocData,
  stats,
  onMissingTypesModule,
}) {
  function unquoteLiteralValue(value) {
    const match = /^(['"])(.*)\1$/u.exec(value);

    if (match === null) {
      return value;
    }

    return match[2];
  }

  function parseEnumValues(typeText) {
    if (typeof typeText !== 'string') {
      return undefined;
    }

    const values = typeText
      .split('|')
      .map((part) => part.trim())
      .filter(Boolean);

    if (values.length < 2) {
      return undefined;
    }

    const areAllStringLiterals = values.every((value) => {
      return /^(['"]).*\1$/u.test(value);
    });

    if (areAllStringLiterals === false) {
      return undefined;
    }

    return values.map((value) => unquoteLiteralValue(value));
  }

  function getYieldedComponentSourcePath(yieldDeclaration) {
    const typeNode = yieldDeclaration.getTypeNode?.();

    if (!typeNode) {
      return undefined;
    }

    let typeQueryNode;

    if (Node.isTypeQuery(typeNode)) {
      typeQueryNode = typeNode;
    } else if (
      Node.isTypeReference(typeNode) &&
      typeNode.getTypeName().getText() === 'WithBoundArgs'
    ) {
      const firstTypeArg = typeNode.getTypeArguments()[0];

      if (firstTypeArg && Node.isTypeQuery(firstTypeArg)) {
        typeQueryNode = firstTypeArg;
      }
    }

    if (!typeQueryNode) {
      return undefined;
    }

    const symbolName = typeQueryNode.getExprName().getText();
    const sourceFile = yieldDeclaration.getSourceFile();

    for (const importDecl of sourceFile.getImportDeclarations()) {
      const defaultImportName = importDecl.getDefaultImport()?.getText();

      if (defaultImportName === symbolName) {
        return importDecl.getModuleSpecifierValue();
      }

      for (const namedImport of importDecl.getNamedImports()) {
        const localName =
          namedImport.getAliasNode()?.getText() || namedImport.getName();

        if (localName === symbolName) {
          return importDecl.getModuleSpecifierValue();
        }
      }
    }

    return undefined;
  }

  const allDocPayloads = {};
  const exportDeclarations = entryFile.getExportDeclarations();

  for (const exportDecl of exportDeclarations) {
    stats.exportsVisited += 1;

    const moduleSpecifier = exportDecl.getModuleSpecifierValue();

    if (!moduleSpecifier) {
      stats.skippedWithoutModuleSpecifier += 1;

      continue;
    }

    const targetFile =
      sourceFileResolver.resolveTypesSourceFile(moduleSpecifier);

    if (!targetFile) {
      stats.skippedMissingTypesFile += 1;

      onMissingTypesModule(moduleSpecifier);

      continue;
    }

    const signatures = targetFile
      .getInterfaces()
      .filter((i) => i.getName().endsWith('Signature'));

    signatures.forEach((signatureInterface) => {
      const interfaceName = signatureInterface.getName();
      const componentName = interfaceName.replace('Signature', '');

      if (allDocPayloads[componentName]) {
        stats.skippedDuplicateComponent += 1;
        return;
      }

      console.log(`📦 Generating docs for: ${componentName}`);

      const componentDocs = {
        name: componentName,
        args: [],
        blocks: [],
        element: null,
        splattributes: false,
      };

      const argsProperty = signatureInterface.getProperty('Args');

      if (argsProperty) {
        const argsType = argsProperty.getType().getApparentType();

        argsType.getProperties().forEach((prop) => {
          const declaration = prop.getValueDeclaration();

          if (!declaration) {
            stats.skippedMissingArgDeclaration += 1;

            return;
          }

          const docData = extractDocData(declaration);
          const resolvedTypeText = typeResolver.resolveDeclarationTypeText(
            declaration,
          );
          const enumValues = parseEnumValues(resolvedTypeText);

          const parsedArg = {
            name: prop.getName(),
            type: enumValues === undefined ? resolvedTypeText : 'enum',
            required: !declaration.hasQuestionToken(),
            description: docData.description,
            remarks: docData.remarks,
            defaultValue: docData.defaultValue,
            dependsOn: docData.dependsOn,
          };

          if (enumValues !== undefined) {
            parsedArg.values = enumValues;
          }

          componentDocs.args.push(parsedArg);
        });
      }

      const blocksProperty = signatureInterface.getProperty('Blocks');

      if (blocksProperty) {
        const blocksType = blocksProperty.getType().getApparentType();

        blocksType.getProperties().forEach((prop) => {
          const declaration = prop.getValueDeclaration();

          if (!declaration) {
            stats.skippedMissingBlockDeclaration += 1;

            return;
          }

          const docData = extractDocData(declaration);
          const yields = [];

          const tupleElements = declaration.getType().getTupleElements();

          if (tupleElements.length > 0) {
            tupleElements.forEach((tupleElement, index) => {
              const yieldedProps = tupleElement.getProperties();

              if (yieldedProps.length > 0) {
                // object-like tuple members represent named yield values
                yieldedProps.forEach((yieldedProp) => {
                  const yieldDecl = yieldedProp.getValueDeclaration();
                  const yieldDocData = yieldDecl
                    ? extractDocData(yieldDecl)
                    : { description: '' };

                  if (!yieldDecl) {
                    stats.skippedMissingYieldDeclaration += 1;
                  }

                  yields.push({
                    name: yieldedProp.getName(),
                    type: yieldDecl
                      ? typeResolver.resolveYieldTypeText(yieldDecl)
                      : 'unknown',
                    description: yieldDocData.description,
                    sourcePath: yieldDecl
                      ? getYieldedComponentSourcePath(yieldDecl)
                      : undefined,
                  });
                });

                return;
              }

              // primitive tuple members get synthetic positional names
              yields.push({
                name: `item${index + 1}`,
                type: tupleElement.getText(declaration),
                description: '',
              });
            });
          }

          componentDocs.blocks.push({
            name: prop.getName(),
            description: docData.description,
            yields,
          });
        });
      }

      const elementProperty = signatureInterface.getProperty('Element');

      if (elementProperty) {
        const docData = extractDocData(elementProperty);

        componentDocs.element = elementProperty.getType().getText();

        if (docData.hasSplattributesTag) {
          componentDocs.splattributes = true;
        }
      }

      componentDocs.args.sort((a, b) => a.name.localeCompare(b.name));
      // keep stable ordering in manifest diffs
      componentDocs.blocks.forEach((block) => {
        block.yields.sort((a, b) => a.name.localeCompare(b.name));
      });
      componentDocs.blocks.sort((a, b) => a.name.localeCompare(b.name));

      allDocPayloads[componentName] = componentDocs;

      stats.componentsGenerated += 1;
    });
  }

  return allDocPayloads;
}
