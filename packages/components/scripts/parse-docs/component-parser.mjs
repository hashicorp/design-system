export function parseComponentsFromEntry({
  entryFile,
  sourceFileResolver,
  typeResolver,
  extractDocData,
  stats,
  onMissingTypesModule,
}) {
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

          componentDocs.args.push({
            name: prop.getName(),
            type: typeResolver.resolveDeclarationTypeText(declaration),
            required: !declaration.hasQuestionToken(),
            description: docData.description,
            remarks: docData.remarks,
            defaultValue: docData.defaultValue,
            dependsOn: docData.dependsOn,
          });
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
