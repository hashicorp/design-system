/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { writeFileSync } from 'node:fs';

export function sortDocPayloads(allDocPayloads) {
  return Object.fromEntries(
    Object.entries(allDocPayloads).sort(([a], [b]) => a.localeCompare(b))
  );
}

export function writeManifest(outputFilePath, payload) {
  writeFileSync(outputFilePath, JSON.stringify(payload, null, 2));
}

export function printSuccess(outputFilePath) {
  console.log(
    `\n🎉 Successfully compiled component documentation to: ${outputFilePath}`
  );
}

function printSampleList(prefixLabel, values) {
  if (values.length === 0) {
    return;
  }

  const sample = values.slice(0, 10);

  console.log(prefixLabel);

  sample.forEach((value) => {
    console.log(`    - ${value}`);
  });
}

export function printSkippedComponentsSummary({
  missingFamilyTypes,
  missingSignatures,
}) {
  const totalSkipped = missingFamilyTypes.length + missingSignatures.length;

  if (totalSkipped === 0) {
    return;
  }

  console.log(`\n⚠️  Skipped ${totalSkipped} component docs entries.`);

  printSampleList(
    '  Missing family types.ts file (sample):',
    missingFamilyTypes.map(
      ({ moduleSpecifier, componentName }) =>
        `${componentName} from ${moduleSpecifier}`
    )
  );

  printSampleList(
    '  Missing signature in family types.ts (sample):',
    missingSignatures.map(
      ({ signatureName, moduleSpecifier }) =>
        `${signatureName} (export: ${moduleSpecifier})`
    )
  );
}
