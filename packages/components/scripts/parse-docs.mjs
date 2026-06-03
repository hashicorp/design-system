import { Project } from 'ts-morph';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ENTRY_FILE_PATH = resolve(SCRIPT_DIR, '../src/components.ts');
const OUTPUT_FILE_PATH = resolve(SCRIPT_DIR, '../dist/manifest/component.json');

if (!existsSync(ENTRY_FILE_PATH)) {
  console.error(`❌ Central entry file not found at: ${ENTRY_FILE_PATH}`);

  process.exit(1);
}

const outputDir = dirname(OUTPUT_FILE_PATH);

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const project = new Project();
const entryFile = project.addSourceFileAtPath(ENTRY_FILE_PATH);
const allDocPayloads = {};
const missingTypesModules = [];
const stats = {
  exportsVisited: 0,
  componentsGenerated: 0,
  skippedWithoutModuleSpecifier: 0,
  skippedMissingTypesFile: 0,
  skippedDuplicateComponent: 0,
  skippedMissingArgDeclaration: 0,
  skippedMissingBlockDeclaration: 0,
  skippedMissingYieldDeclaration: 0,
};

function resolveTypesSourceFile(moduleSpecifier) {
  const candidates = [];

  if (moduleSpecifier.endsWith('.types.ts')) {
    candidates.push(moduleSpecifier);
  } else if (moduleSpecifier.endsWith('.gts')) {
    candidates.push(moduleSpecifier.replace(/\.gts$/, '.types.ts'));
  } else if (moduleSpecifier.endsWith('.ts')) {
    candidates.push(moduleSpecifier.replace(/\.ts$/, '.types.ts'));
  }

  const dedupedCandidates = [...new Set(candidates)];

  for (const candidate of dedupedCandidates) {
    const candidatePath = resolve(entryFile.getDirectoryPath(), candidate);
    const candidateFile = project.addSourceFileAtPathIfExists(candidatePath);

    if (candidateFile) {
      return candidateFile;
    }
  }

  return null;
}

console.log(`🔍 Crawling entry point via AST: ${ENTRY_FILE_PATH}\n`);

// extract tsdoc descriptions and custom blocks from nodes
function normalizeTagText(tag) {
  const tagName = tag.getTagName();
  const tagComment =
    typeof tag.getComment === 'function' ? tag.getComment() : undefined;

  if (typeof tagComment === 'string') {
    return tagComment
      .split('\n')
      .map((line) => line.trimEnd())
      .join('\n')
      .trim();
  }

  const rawText = tag.getText();
  const withoutTagName = rawText.replace(new RegExp(`^@${tagName}\\b`), '');

  return withoutTagName
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, '').trimEnd())
    .join('\n')
    .trim();
}

function toSingleLineText(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .replace(/\r\n?/g, '\n')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function extractDocData(declarationNode) {
  const result = {
    description: '',
    remarks: '',
    defaultValue: null,
    dependsOn: null,
    splattributes: null,
    hasSplattributesTag: false,
  };

  const jsDocs = declarationNode.getJsDocs();

  if (jsDocs.length === 0) {
    return result;
  }

  const doc = jsDocs[0];

  result.description = toSingleLineText(doc.getComment());

  doc.getTags().forEach((tag) => {
    const tagName = tag.getTagName();
    const tagText = normalizeTagText(tag);

    if (tagName === 'remarks') {
      result.remarks = toSingleLineText(tagText);
    }
    if (tagName === 'defaultValue') {
      result.defaultValue = tagText || null;
    }
    if (tagName === 'dependsOn') {
      result.dependsOn = tagText || null;
    }
    if (tagName === 'splattributes') {
      result.hasSplattributesTag = true;
      result.splattributes = tagText || null;
    }
  });

  return result;
}

const exportDeclarations = entryFile.getExportDeclarations();

for (const exportDecl of exportDeclarations) {
  stats.exportsVisited += 1;

  const moduleSpecifier = exportDecl.getModuleSpecifierValue();

  if (!moduleSpecifier) {
    stats.skippedWithoutModuleSpecifier += 1;
    continue;
  }

  const targetFile = resolveTypesSourceFile(moduleSpecifier);

  if (!targetFile) {
    stats.skippedMissingTypesFile += 1;
    missingTypesModules.push(moduleSpecifier);
    continue;
  }

  const signatures = targetFile
    .getInterfaces()
    .filter((i) => i.getName().endsWith('Signature'));

  signatures.forEach((signatureInterface) => {
    const interfaceName = signatureInterface.getName();
    const componentName = interfaceName.replace('Signature', '');

    // skip duplicate exports to prevent reprocessing files
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

    // extract component arguments
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
          type: declaration.getType().getText(declaration),
          required: !declaration.hasQuestionToken(),
          description: docData.description,
          remarks: docData.remarks,
          defaultValue: docData.defaultValue,
          dependsOn: docData.dependsOn,
        });
      });
    }

    // extract template blocks and their yielded parameters
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
                    ? yieldDecl.getType().getText(yieldDecl)
                    : 'unknown',
                  description: yieldDocData.description,
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
        }

        componentDocs.blocks.push({
          name: prop.getName(),
          description: docData.description,
          yields,
        });
      });
    }

    // extract element type and splattributes support
    const elementProperty = signatureInterface.getProperty('Element');

    if (elementProperty) {
      const docData = extractDocData(elementProperty);
      componentDocs.element = elementProperty.getType().getText();

      if (docData.hasSplattributesTag) {
        componentDocs.splattributes = true;
      }
    }

    componentDocs.args.sort((a, b) => a.name.localeCompare(b.name));
    componentDocs.blocks.forEach((block) => {
      block.yields.sort((a, b) => a.name.localeCompare(b.name));
    });
    componentDocs.blocks.sort((a, b) => a.name.localeCompare(b.name));

    allDocPayloads[componentName] = componentDocs;
    stats.componentsGenerated += 1;
  });
}

const sortedDocPayloads = Object.fromEntries(
  Object.entries(allDocPayloads).sort(([a], [b]) => a.localeCompare(b))
);

writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(sortedDocPayloads, null, 2));

console.log(
  `\n🎉 Successfully compiled component documentation to: ${OUTPUT_FILE_PATH}`
);
console.log('\n📊 Docs parse summary:');
console.log(`  Exports visited: ${stats.exportsVisited}`);
console.log(`  Components generated: ${stats.componentsGenerated}`);
console.log(
  `  Skipped (no module specifier): ${stats.skippedWithoutModuleSpecifier}`
);
console.log(`  Skipped (missing types file): ${stats.skippedMissingTypesFile}`);
console.log(
  `  Skipped (duplicate component): ${stats.skippedDuplicateComponent}`
);
console.log(
  `  Skipped (missing arg declaration): ${stats.skippedMissingArgDeclaration}`
);
console.log(
  `  Skipped (missing block declaration): ${stats.skippedMissingBlockDeclaration}`
);
console.log(
  `  Skipped (missing yield declaration): ${stats.skippedMissingYieldDeclaration}`
);

if (missingTypesModules.length > 0) {
  const sample = missingTypesModules.slice(0, 10);
  console.log('  Sample exports without a matching types file:');
  sample.forEach((modulePath) => {
    console.log(`    - ${modulePath}`);
  });
}
