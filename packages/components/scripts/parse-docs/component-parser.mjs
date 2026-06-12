/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  PROP_ARGS,
  PROP_BLOCKS,
  PROP_ELEMENT,
  SIGNATURE_SUFFIX,
  TYPE_ENUM,
  TYPE_UNKNOWN,
} from './constants.mjs';
import {
  findImportForLocalName,
  getContextualComponentTypeQuery,
} from './ast-helpers.mjs';

export function parseComponentsFromEntry({
  entryFile,
  sourceFileResolver,
  typeResolver,
  extractDocData,
  onMissingFamilyTypes,
  onMissingSignature,
}) {
  function getExportedComponentNames(exportDeclaration) {
    return exportDeclaration
      .getNamedExports()
      .map((specifier) => specifier.getAliasNode()?.getText() || specifier.getName())
      .filter((name) => name !== 'default');
  }

  function getYieldedComponentSourcePath(yieldDeclaration) {
    const typeNode = yieldDeclaration.getTypeNode?.();
    const typeQueryNode = getContextualComponentTypeQuery(typeNode);

    if (!typeQueryNode) {
      return undefined;
    }

    const symbolName = typeQueryNode.getExprName().getText();
    const sourceFile = yieldDeclaration.getSourceFile();
    const importMatch = findImportForLocalName(sourceFile, symbolName);

    if (!importMatch) {
      return undefined;
    }

    return importMatch.moduleSpecifier;
  }

  function parseArgs(signatureInterface) {
    const args = [];
    const argsProperty = signatureInterface.getProperty(PROP_ARGS);

    if (!argsProperty) {
      return args;
    }

    const argsType = argsProperty.getType().getApparentType();

    argsType.getProperties().forEach((prop) => {
      const declaration = prop.getValueDeclaration();

      if (!declaration) {
        return;
      }

      const docData = extractDocData(declaration);
      const resolvedType = typeResolver.resolveDeclarationType(declaration);

      const parsedArg = {
        name: prop.getName(),
        type:
          resolvedType.enumValues === undefined ? resolvedType.text : TYPE_ENUM,
        required: !declaration.hasQuestionToken(),
        description: docData.description,
        remarks: docData.remarks,
        defaultValue: docData.defaultValue,
        dependsOn: docData.dependsOn,
      };

      if (resolvedType.enumValues !== undefined) {
        parsedArg.values = resolvedType.enumValues;
      }

      args.push(parsedArg);
    });

    return args;
  }

  function parseBlockYields(declaration) {
    const yields = [];
    const tupleElements = declaration.getType().getTupleElements();

    if (tupleElements.length === 0) {
      return yields;
    }

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
            // continue with unknown type when no declaration is available
          }

          yields.push({
            name: yieldedProp.getName(),
            type: yieldDecl
              ? typeResolver.resolveYieldTypeText(yieldDecl)
              : TYPE_UNKNOWN,
            description: yieldDocData.description,
            remarks: yieldDocData.remarks,
            sourcePath: yieldDecl
              ? getYieldedComponentSourcePath(yieldDecl)
              : undefined,
          });
        });

        return;
      }

      yields.push({
        name: `item${index + 1}`,
        type: tupleElement.getText(declaration),
        description: '',
      });
    });

    return yields;
  }

  function parseBlocks(signatureInterface) {
    const blocks = [];
    const blocksProperty = signatureInterface.getProperty(PROP_BLOCKS);

    if (!blocksProperty) {
      return blocks;
    }

    const blocksType = blocksProperty.getType().getApparentType();

    blocksType.getProperties().forEach((prop) => {
      const declaration = prop.getValueDeclaration();

      if (!declaration) {
        return;
      }

      const docData = extractDocData(declaration);
      const yields = parseBlockYields(declaration);

      blocks.push({
        name: prop.getName(),
        description: docData.description,
        yields,
      });
    });

    return blocks;
  }

  function parseElement(signatureInterface) {
    const elementProperty = signatureInterface.getProperty(PROP_ELEMENT);

    if (!elementProperty) {
      return {
        element: null,
        splattributes: false,
      };
    }

    const docData = extractDocData(elementProperty);

    return {
      element: elementProperty.getType().getText(),
      splattributes: docData.hasSplattributesTag,
    };
  }

  const allDocPayloads = {};
  const exportDeclarations = entryFile.getExportDeclarations();

  for (const exportDecl of exportDeclarations) {
    const moduleSpecifier = exportDecl.getModuleSpecifierValue();

    if (!moduleSpecifier) {
      continue;
    }

    const componentNames = getExportedComponentNames(exportDecl);

    if (componentNames.length === 0) {
      continue;
    }

    const familyTypesFiles =
      sourceFileResolver.resolveFamilyTypesSourceFiles(moduleSpecifier);

    if (familyTypesFiles.length === 0) {
      componentNames.forEach((componentName) => {
        onMissingFamilyTypes(moduleSpecifier, componentName);
      });

      continue;
    }

    componentNames.forEach((componentName) => {
      if (allDocPayloads[componentName]) {
        return;
      }

      const signatureName = `${componentName}${SIGNATURE_SUFFIX}`;
      const signatureInterface = familyTypesFiles
        .map((sourceFile) => sourceFile.getInterface(signatureName))
        .find(Boolean);

      if (!signatureInterface) {
        onMissingSignature(moduleSpecifier, componentName, signatureName);

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

      componentDocs.args = parseArgs(signatureInterface);
      componentDocs.blocks = parseBlocks(signatureInterface);

      const parsedElement = parseElement(signatureInterface);
      componentDocs.element = parsedElement.element;
      componentDocs.splattributes = parsedElement.splattributes;

      componentDocs.args.sort((a, b) => a.name.localeCompare(b.name));
      // keep stable ordering in manifest diffs
      componentDocs.blocks.forEach((block) => {
        block.yields.sort((a, b) => a.name.localeCompare(b.name));
      });
      componentDocs.blocks.sort((a, b) => a.name.localeCompare(b.name));

      allDocPayloads[componentName] = componentDocs;
    });
  }

  return allDocPayloads;
}
