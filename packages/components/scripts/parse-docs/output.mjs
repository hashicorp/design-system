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

export function printSkippedComponentsSummary({
  missingFamilyTypes,
  missingSignatures,
}) {
  const totalSkipped = missingFamilyTypes.length + missingSignatures.length;

  if (totalSkipped === 0) {
    return;
  }

  console.log(`\n⚠️  Skipped ${totalSkipped} component docs entries.`);
}
