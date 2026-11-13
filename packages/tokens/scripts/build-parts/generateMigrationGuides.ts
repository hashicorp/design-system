/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';
import path from 'path';

// `migrations/<version>.json` is the source of truth for a major version's token changes: the
// `MIGRATION-<version>.md` guide is generated from it, and tools such as the MCP server read it

interface Rename {
  before: string;
  after: string;
}

export interface Migration {
  version: string;
  description: string;
  renamedTokens: Rename[];
  addedTokens: string[];
  removedTokens: string[];
  renamedCssHelperClassesDescription?: string;
  renamedCssHelperClasses: Rename[];
}

const code = (value: string): string => `\`${value}\``;

// a markdown table with every column padded to its widest cell, as prettier formats it
const toTable = (headers: string[], rows: string[][]): string[] => {
  const widths = headers.map((header, column) =>
    Math.max(header.length, ...rows.map((row) => row[column].length))
  );
  const toRow = (cells: string[]): string =>
    `| ${cells.map((cell, column) => cell.padEnd(widths[column])).join(' | ')} |`;

  return [
    toRow(headers),
    toRow(widths.map((width) => '-'.repeat(width))),
    ...rows.map(toRow),
  ];
};

const toSection = (
  title: string,
  table: string[],
  description?: string
): string[] => {
  if (table.length === 2) {
    return [];
  }

  return [
    `## ${title}`,
    '',
    ...(description === undefined ? [] : [description, '']),
    ...table,
    '',
  ];
};

export function renderMigrationGuide(migration: Migration): string {
  const changelogAnchor = migration.version.replace(/\./g, '');
  const renames = (renames: Rename[]): string[][] =>
    renames.map(({ before, after }) => [code(before), code(after)]);
  const names = (names: string[]): string[][] =>
    names.map((name) => [code(name)]);

  const lines = [
    `# @hashicorp/design-system-tokens ${migration.version} – Migration guide`,
    '',
    migration.description,
    '',
    `For a summary of the changes, see the [${migration.version} entry in the CHANGELOG](./CHANGELOG.md#${changelogAnchor}).`,
    '',
    ...toSection(
      'Renamed tokens',
      toTable(['Token / Before', 'Token / After'], renames(migration.renamedTokens))
    ),
    ...toSection('Added tokens', toTable(['Token'], names(migration.addedTokens))),
    ...toSection('Removed tokens', toTable(['Token'], names(migration.removedTokens))),
    ...toSection(
      'Renamed CSS helper classes',
      toTable(
        ['CSS Class / Before', 'CSS Class / After'],
        renames(migration.renamedCssHelperClasses)
      ),
      migration.renamedCssHelperClassesDescription
    ),
  ];

  // the file ends on the last table row, with no trailing blank line
  return `${lines.join('\n').trimEnd()}\n`;
}

export async function generateMigrationGuides(packageFolder: string): Promise<void> {
  const migrationsFolder = path.join(packageFolder, 'migrations');
  const files = (await fs.readdir(migrationsFolder)).filter((file) => file.endsWith('.json'));

  for (const file of files) {
    const migration: Migration = await fs.readJson(path.join(migrationsFolder, file));

    await fs.writeFile(
      path.join(packageFolder, `MIGRATION-${migration.version}.md`),
      renderMigrationGuide(migration)
    );
  }
}
