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

export function printMissingTypesSummary(missingTypesModules) {
  if (missingTypesModules.length === 0) {
    return;
  }

  console.warn(
    `⚠️  ${missingTypesModules.length} exports were skipped because no matching types file was found.`
  );
}
