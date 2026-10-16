/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export const REVIEW_GUIDE_URL =
  'https://github.com/hashicorp/design-system/blob/main/.bob/rules/directories/components/translations.instructions.md';

export const JIRA_URL = 'https://hashicorp.atlassian.net/browse/FE-719';

export const CHANGESET_FILE = 'hds-translations-sync.md';

export function diffTranslations({ before, after }) {
  const keys = [...new Set([...Object.keys(before), ...Object.keys(after)])];
  const sorted = keys.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  return {
    added: sorted.filter(
      (key) => !Object.hasOwn(before, key) && Object.hasOwn(after, key)
    ),
    changed: sorted.filter(
      (key) =>
        Object.hasOwn(before, key) &&
        Object.hasOwn(after, key) &&
        before[key] !== after[key]
    ),
    removed: sorted.filter(
      (key) => Object.hasOwn(before, key) && !Object.hasOwn(after, key)
    ),
  };
}

export function hasChanges({ added, changed, removed }) {
  return added.length + changed.length + removed.length > 0;
}

export function measureCoverage({ source, after }) {
  const total = Object.keys(source).length;
  const missing = Object.keys(source).filter(
    (key) => !Object.hasOwn(after, key)
  );
  const translated = total - missing.length;

  return {
    total,
    translated,
    missing,
    percent: total === 0 ? 100 : Math.floor((translated / total) * 100),
  };
}

// table cells must not break the row or render markup from translated text
function cell(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, '<br>');
}

function table(keys, columns) {
  if (keys.length === 0) {
    return '_None_';
  }

  return [
    `| Key | ${columns.map(([label]) => label).join(' | ')} |`,
    `| --- | ${columns.map(() => '---').join(' | ')} |`,
    ...keys.map(
      (key) =>
        `| \`${key}\` | ${columns.map(([, read]) => cell(read(key) ?? '')).join(' | ')} |`
    ),
  ].join('\n');
}

export function buildPullRequestBody({ locale, source, before, after }) {
  const diff = diffTranslations({ before, after });
  const coverage = measureCoverage({ source, after });
  const english = (key) => source[key];
  const proposed = (key) => after[key];

  const sections = [
    '### :pushpin: Summary',
    '',
    `Automated ${locale} translation sync from the Globalization Pipeline. Machine translations must be reviewed before merging; edit translations in this PR rather than deleting them, because deleted keys are proposed again on the next sync.`,
    '',
    `Review guide: ${REVIEW_GUIDE_URL}`,
    '',
    '### :bar_chart: Coverage',
    '',
    `${coverage.translated} of ${coverage.total} English strings translated (${coverage.percent}%). Untranslated strings fall back to English.`,
    '',
    `### :new: Added (${diff.added.length})`,
    '',
    table(diff.added, [
      ['English', english],
      [locale, proposed],
    ]),
    '',
    `### :pencil2: Changed (${diff.changed.length})`,
    '',
    table(diff.changed, [
      ['English', english],
      ['Previous', (key) => before[key]],
      [locale, proposed],
    ]),
    '',
    `### :wastebasket: Removed (${diff.removed.length})`,
    '',
    table(diff.removed, [['Previous', (key) => before[key]]]),
  ];

  if (coverage.missing.length > 0) {
    sections.push(
      '',
      '<details>',
      `<summary>Untranslated keys (${coverage.missing.length})</summary>`,
      '',
      ...coverage.missing.map((key) => `- \`${key}\``),
      '',
      '</details>'
    );
  }

  sections.push(
    '',
    '### :link: External links',
    '',
    `Jira ticket: [FE-719](${JIRA_URL})`,
    ''
  );

  return sections.join('\n');
}

export function buildChangeset(locale) {
  return [
    '---',
    '"@hashicorp/design-system-components": patch',
    '---',
    '',
    `Updated \`${locale}\` translations`,
    '',
  ].join('\n');
}
