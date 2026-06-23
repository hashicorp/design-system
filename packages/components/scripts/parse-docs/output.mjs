/** Copyright IBM Corp. 2021, 2026 SPDX-License-Identifier: MPL-2.0 */

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

export function printMissingTypesSample(missingTypesModules) {
  if (missingTypesModules.length === 0) {
    return;
  }

  // cap console output so large missing lists do not bury parse stats
  const sample = missingTypesModules.slice(0, 10);

  console.log('  Sample exports without a matching types file:');

  sample.forEach((modulePath) => {
    console.log(`    - ${modulePath}`);
  });
}
