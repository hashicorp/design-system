/** Copyright IBM Corp. 2021, 2026 SPDX-License-Identifier: MPL-2.0 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import chalk from 'chalk';
import ora from 'ora';
import Table from 'cli-table3';
import boxen from 'boxen';
import logSymbols from 'log-symbols';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const COMPONENTS_ROOT = resolve(SCRIPT_DIR, '..');
const REPO_ROOT = resolve(COMPONENTS_ROOT, '..', '..');
const CATALOG_PATH = resolve(
  REPO_ROOT,
  'packages/mcp/src/catalogs/components/catalog.json'
);
const DOCS_COMPONENTS_ROOT = resolve(REPO_ROOT, 'website/docs/components');
const MODEL_PRICING_USD_PER_MILLION_TOKENS = {
  'openai/gpt-4.1': {
    input: 2,
    output: 8,
  },
  'openai/gpt-4.1-mini': {
    input: 0.4,
    output: 1.6,
  },
};
const REVIEW_DOCS_CHAR_LIMIT = 16000;

function toRepoRelativePath(filePath) {
  return filePath.replace(`${REPO_ROOT}/`, '');
}

function formatUsd(value) {
  return `$${value.toFixed(6)}`;
}

function normalizeInlineText(text, maxLength = 120) {
  const normalized = `${text || ''}`.replace(/\s+/gu, ' ').trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1)}...`;
}

function markdownCell(text, maxLength = 120) {
  return normalizeInlineText(text, maxLength).replace(/\|/gu, '\\|');
}

function printPanel(title, lines, color = 'cyan') {
  const panelText = [chalk.bold(title), ...lines].join('\n');

  console.log(
    boxen(panelText, {
      padding: 1,
      margin: { top: 1, bottom: 0 },
      borderStyle: 'round',
      borderColor: color,
    })
  );
}

function printTable(headers, rows) {
  if (!Array.isArray(headers) || headers.length === 0 || !Array.isArray(rows)) {
    return;
  }

  const table = new Table({
    head: headers.map((header) => chalk.bold(header)),
    style: {
      head: [],
      border: [],
    },
    wordWrap: true,
  });

  for (const row of rows) {
    table.push(row);
  }

  console.log(table.toString());
}

function extractYieldNamesFromText(text) {
  if (typeof text !== 'string' || text.length === 0) {
    return [];
  }

  const names = new Set();
  const scopedRegex = /\[[A-Z]\]\.([A-Za-z_][A-Za-z0-9_]*)/gu;
  const codeRegex = /`([A-Za-z_][A-Za-z0-9_]*)`/gu;
  let match;

  while ((match = scopedRegex.exec(text)) !== null) {
    names.add(match[1]);
  }

  while ((match = codeRegex.exec(text)) !== null) {
    names.add(match[1]);
  }

  return [...names];
}

function classifyReviewIssues(componentAfter, review) {
  const groups = {
    mismatches: [],
    docsInconsistencies: [],
    uncertain: [],
  };

  if (!review || !Array.isArray(review.issues)) {
    return groups;
  }

  const blockYieldMap = new Map();

  function isNoIssueText(value) {
    if (typeof value !== 'string') {
      return false;
    }

    return /\b(matches docs|matches the markdown|no issue)\b/iu.test(value);
  }

  function isLikelyDocsInconsistency(issue) {
    const joined = `${issue.reason || ''} ${issue.expected || ''} ${issue.actual || ''}`;

    return (
      /\bdocs?\b/iu.test(joined) &&
      (/not documented/iu.test(joined) ||
        /possible omission in docs/iu.test(joined) ||
        /docs yield/iu.test(joined) ||
        /omits?/iu.test(joined))
    );
  }

  for (const block of componentAfter.blocks || []) {
    blockYieldMap.set(
      block.name,
      new Set((block.yields || []).map((yieldEntry) => yieldEntry.name))
    );
  }

  for (const issue of review.issues) {
    if (
      isNoIssueText(issue.reason) &&
      (!issue.expected || issue.expected === '-') &&
      (!issue.actual || issue.actual === '-')
    ) {
      continue;
    }

    if (issue.kind === 'docs_inconsistency') {
      groups.docsInconsistencies.push(issue);
      continue;
    }

    if (issue.kind === 'uncertain') {
      groups.uncertain.push(issue);
      continue;
    }

    const blockYieldPathMatch = issue.path.match(/^changedBlocks\.([^.]+)\.yields/u);

    if (blockYieldPathMatch) {
      const blockName = blockYieldPathMatch[1];
      const yieldedNames = blockYieldMap.get(blockName) || new Set();
      const mentionedNames = extractYieldNamesFromText(
        `${issue.expected || ''} ${issue.reason || ''}`
      );
      const referencesMissingYields =
        /missing yields?/iu.test(issue.actual || '') || /not present/iu.test(issue.reason || '');

      if (
        referencesMissingYields &&
        mentionedNames.length > 0 &&
        mentionedNames.every((name) => !yieldedNames.has(name))
      ) {
        groups.docsInconsistencies.push({
          ...issue,
          kind: 'docs_inconsistency',
          severity: issue.severity || 'warning',
          reason: `${issue.reason} (classified as docs/code inconsistency because these yields are not in component signature output)`,
        });
        continue;
      }

      if (isLikelyDocsInconsistency(issue)) {
        groups.docsInconsistencies.push({
          ...issue,
          kind: 'docs_inconsistency',
          severity: issue.severity || 'warning',
        });
        continue;
      }
    }

    groups.mismatches.push(issue);
  }

  return groups;
}

function printReviewReport(componentName, review, classifiedIssues, usage, cost) {
  const passed = classifiedIssues.mismatches.length === 0;
  const statusLabel = passed
    ? `${logSymbols.success} ${chalk.bold.green('PASS')}`
    : `${logSymbols.warning} ${chalk.bold.yellow('NEEDS ATTENTION')}`;
  const confidenceText =
    typeof review?.confidence === 'number' ? review.confidence.toFixed(2) : 'n/a';

  printPanel(
    `Review Report: ${componentName}`,
    [
      `Status: ${statusLabel}`,
      `Confidence: ${chalk.bold(confidenceText)}`,
    ],
    passed ? 'green' : 'yellow'
  );

  console.log(chalk.bold.cyan('Usage and Cost'));
  printTable(
    ['Metric', 'Value'],
    [
      ['Prompt tokens', `${usage.promptTokens}`],
      ['Completion tokens', `${usage.completionTokens}`],
      ['Total tokens', `${usage.totalTokens}`],
      ['Estimated input cost', formatUsd(cost.inputCost)],
      ['Estimated output cost', formatUsd(cost.outputCost)],
      ['Estimated total cost', formatUsd(cost.totalCost)],
    ]
  );

  if (classifiedIssues.mismatches.length > 0) {
    console.log(chalk.bold.magenta('Issues'));
    printTable(
      ['Path', 'Reason', 'Expected', 'Actual'],
      classifiedIssues.mismatches.map((issue) => [
        chalk.cyan(markdownCell(issue.path, 60)),
        markdownCell(issue.reason, 120),
        markdownCell(issue.expected || '-', 90),
        markdownCell(issue.actual || '-', 90),
      ])
    );
  } else {
    console.log(`${logSymbols.success} ${chalk.green('Issues: none')}`);
  }

  if (classifiedIssues.docsInconsistencies.length > 0) {
    console.log(chalk.bold.yellow('Docs Inconsistencies (non-blocking)'));
    printTable(
      ['Path', 'Reason', 'Expected', 'Actual'],
      classifiedIssues.docsInconsistencies.map((issue) => [
        chalk.yellow(markdownCell(issue.path, 60)),
        markdownCell(issue.reason, 120),
        markdownCell(issue.expected || '-', 90),
        markdownCell(issue.actual || '-', 90),
      ])
    );
  }

  if (classifiedIssues.uncertain.length > 0) {
    console.log(chalk.bold.blue('Uncertain (needs human check)'));
    printTable(
      ['Path', 'Reason', 'Expected', 'Actual'],
      classifiedIssues.uncertain.map((issue) => [
        chalk.blue(markdownCell(issue.path, 60)),
        markdownCell(issue.reason, 120),
        markdownCell(issue.expected || '-', 90),
        markdownCell(issue.actual || '-', 90),
      ])
    );
  }

  if (Array.isArray(review?.notes) && review.notes.length > 0) {
    console.log(chalk.bold.yellow('Notes'));

    for (const note of review.notes) {
      console.log(`${chalk.yellow('•')} ${normalizeInlineText(note, 220)}`);
    }
  }
}

function startTaskSpinner(text) {
  if (!process.stdout.isTTY) {
    console.log(`${logSymbols.info} ${text}`);

    return {
      stopAndPersist(options = {}) {
        const symbol = options.symbol || logSymbols.info;
        const message = options.text || text;
        console.log(`${symbol} ${message}`);
      },
      set text(nextText) {
        console.log(`${logSymbols.info} ${nextText}`);
      },
    };
  }

  return ora({
    text,
    color: 'cyan',
  }).start();
}

function normalizeGroupSlug(groupName) {
  return `${groupName || ''}`.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function parseCliOptions(argv) {
  let component = null;
  let group = null;
  let yes = false;
  let provider = 'copilot';

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg.startsWith('--component=')) {
      component = arg.slice('--component='.length).trim();
      continue;
    }

    if (arg === '--component') {
      component = `${argv[index + 1] || ''}`.trim();
      index += 1;
      continue;
    }

    if (arg.startsWith('--group=')) {
      group = arg.slice('--group='.length).trim();
      continue;
    }

    if (arg === '--group') {
      group = `${argv[index + 1] || ''}`.trim();
      index += 1;
      continue;
    }

    if (arg === '--yes') {
      yes = true;
      continue;
    }

    if (arg.startsWith('--provider=')) {
      provider = arg.slice('--provider='.length).trim();
      continue;
    }

    if (arg === '--provider') {
      provider = `${argv[index + 1] || ''}`.trim();
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (component === '') {
    throw new Error('The --component option requires a non-empty value.');
  }

  if (group === '') {
    throw new Error('The --group option requires a non-empty value.');
  }

  if (!['copilot'].includes(provider)) {
    throw new Error(`Unsupported provider: ${provider}`);
  }

  return {
    component,
    group,
    yes,
    provider,
  };
}

function readCatalog() {
  if (!existsSync(CATALOG_PATH)) {
    throw new Error(`Catalog file does not exist: ${CATALOG_PATH}`);
  }

  const parsed = JSON.parse(readFileSync(CATALOG_PATH, 'utf8'));

  if (!parsed || !Array.isArray(parsed.components)) {
    throw new Error(`Catalog file is malformed: ${CATALOG_PATH}`);
  }

  return parsed;
}

function getComponentDocSlug(component) {
  const sourcePath = component.sourcePath || '';
  const match = sourcePath.match(/\/components\/hds\/([^/]+)/u);

  if (match && match[1]) {
    return match[1];
  }

  const fallback = component.name
    .replace(/^Hds/u, '')
    .replace(/([a-z0-9])([A-Z])/gu, '$1-$2')
    .toLowerCase();

  return fallback;
}

let cachedComponentApiDocPaths = null;

function collectComponentApiDocPaths(rootDir) {
  if (!existsSync(rootDir)) {
    return [];
  }

  const foundPaths = [];
  const queue = [rootDir];

  while (queue.length > 0) {
    const currentDir = queue.pop();
    const entries = readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = resolve(currentDir, entry.name);

      if (entry.isDirectory()) {
        queue.push(entryPath);
        continue;
      }

      if (
        entry.isFile() &&
        (entry.name === 'component-api.md' || entry.name === 'component-api.mdx')
      ) {
        foundPaths.push(entryPath);
      }
    }
  }

  return foundPaths;
}

function getAllComponentApiDocPaths() {
  if (!cachedComponentApiDocPaths) {
    cachedComponentApiDocPaths = collectComponentApiDocPaths(DOCS_COMPONENTS_ROOT);
  }

  return cachedComponentApiDocPaths;
}

function getDocsFileCandidates(component) {
  const slug = getComponentDocSlug(component);
  const discoveredPaths = getAllComponentApiDocPaths().filter((path) =>
    path.includes(`/${slug}/`)
  );

  const candidates = [
    resolve(
      REPO_ROOT,
      `website/docs/components/${slug}/partials/code/component-api.md`
    ),
    resolve(
      REPO_ROOT,
      `website/docs/components/${slug}/partials/code/component-api.mdx`
    ),
  ];

  for (const discoveredPath of discoveredPaths) {
    candidates.push(discoveredPath);
  }

  return [...new Set(candidates)];
}

function componentDisplayName(component) {
  return component.name.replace(/^Hds/u, '').replace(/([a-z0-9])([A-Z])/gu, '$1 $2');
}

function extractDocPropertyNames(docsText) {
  const names = new Set();
  const nameRegex = /@name="([^"]+)"/gu;
  let match;

  while ((match = nameRegex.exec(docsText)) !== null) {
    const normalized = `${match[1]}`.trim();

    if (normalized.length > 0) {
      names.add(normalized);
    }
  }

  return names;
}

function extractCatalogNamesForMatch(component) {
  const names = new Set();

  for (const arg of component.args || []) {
    names.add(arg.name);
  }

  for (const block of component.blocks || []) {
    names.add(`<:${block.name}>`);
    names.add(block.name);

    for (const yieldEntry of block.yields || []) {
      names.add(yieldEntry.name);
      names.add(`[C].${yieldEntry.name}`);
    }
  }

  return names;
}

function scoreDocCandidate(component, candidatePath) {
  const signals = [];
  const exists = existsSync(candidatePath);

  if (!exists) {
    return {
      path: candidatePath,
      exists: false,
      confidence: 0,
      signals,
      hasComponentApiHeading: false,
      hasExpectedTitle: false,
      overlapRatio: 0,
      docsText: null,
    };
  }

  const docsText = readFileSync(candidatePath, 'utf8');
  let score = 0.45;
  signals.push('path exists (+0.45)');

  const hasComponentApiHeading = docsText.includes('## Component API');

  if (hasComponentApiHeading) {
    score += 0.2;
    signals.push('has Component API heading (+0.20)');
  }

  const displayName = componentDisplayName(component);
  const hasExpectedTitle = docsText.includes(`### ${displayName}`);

  if (hasExpectedTitle) {
    score += 0.2;
    signals.push('matches expected section title (+0.20)');
  }

  const docNames = extractDocPropertyNames(docsText);
  const catalogNames = extractCatalogNamesForMatch(component);

  let matchedCount = 0;

  if (catalogNames.size > 0) {
    for (const name of catalogNames) {
      if (docNames.has(name)) {
        matchedCount += 1;
      }
    }
  }

  const overlapRatio =
    catalogNames.size > 0 ? Math.min(1, matchedCount / catalogNames.size) : 0;

  if (overlapRatio > 0) {
    const overlapContribution = overlapRatio * 0.15;
    score += overlapContribution;
    signals.push(
      `name overlap ${matchedCount}/${catalogNames.size} (+${overlapContribution.toFixed(
        2
      )})`
    );
  }

  return {
    path: candidatePath,
    exists,
    confidence: Math.min(1, score),
    signals,
    hasComponentApiHeading,
    hasExpectedTitle,
    overlapRatio,
    docsText,
  };
}

function selectDocsFile(component) {
  const candidates = getDocsFileCandidates(component);
  const scoredCandidates = candidates.map((candidatePath) =>
    scoreDocCandidate(component, candidatePath)
  );
  const existingCandidates = scoredCandidates.filter((candidate) => candidate.exists);

  if (existingCandidates.length === 0) {
    return {
      selected: null,
      candidates: scoredCandidates,
    };
  }

  existingCandidates.sort((a, b) => b.confidence - a.confidence);

  return {
    selected: existingCandidates[0],
    candidates: scoredCandidates,
  };
}

function componentMatchesFilters(component, options) {
  if (options.component && component.name !== options.component) {
    return false;
  }

  if (!options.group) {
    return true;
  }

  return (
    normalizeGroupSlug(getComponentDocSlug(component)) ===
    normalizeGroupSlug(options.group)
  );
}

async function confirmDocPath(docPath, componentName, yes) {
  if (yes || !process.stdin.isTTY) {
    return true;
  }

  const relativePath = toRepoRelativePath(docPath);
  const rl = createInterface({ input, output });

  try {
    const answer = await rl.question(
      `Use ${relativePath} to enrich ${componentName}? [Y/n] `
    );
    const normalized = answer.trim().toLowerCase();

    return normalized === '' || normalized === 'y' || normalized === 'yes';
  } finally {
    rl.close();
  }
}

function getPricing(model) {
  const envInput = Number.parseFloat(process.env.COPILOT_PRICE_INPUT_PER_MILLION || '');
  const envOutput = Number.parseFloat(
    process.env.COPILOT_PRICE_OUTPUT_PER_MILLION || ''
  );

  if (Number.isFinite(envInput) && Number.isFinite(envOutput)) {
    return {
      input: envInput,
      output: envOutput,
      source: 'env',
    };
  }

  if (MODEL_PRICING_USD_PER_MILLION_TOKENS[model]) {
    return {
      ...MODEL_PRICING_USD_PER_MILLION_TOKENS[model],
      source: 'default',
    };
  }

  return {
    input: 0,
    output: 0,
    source: 'none',
  };
}

function resolveCopilotToken() {
  const envToken = process.env.GITHUB_TOKEN || process.env.COPILOT_API_KEY;

  if (typeof envToken === 'string' && envToken.trim().length > 0) {
    return {
      token: envToken.trim(),
      source: process.env.GITHUB_TOKEN ? 'GITHUB_TOKEN' : 'COPILOT_API_KEY',
    };
  }

  try {
    const ghToken = execFileSync('gh', ['auth', 'token'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    if (ghToken.length > 0) {
      return {
        token: ghToken,
        source: 'gh auth token',
      };
    }
  } catch {
    // no-op: fall through to explicit error
  }

  throw new Error(
    'Missing Copilot token. Set GITHUB_TOKEN/COPILOT_API_KEY or authenticate with `gh auth login`.'
  );
}

function normalizeUsage(rawUsage) {
  if (!rawUsage || typeof rawUsage !== 'object') {
    return {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
    };
  }

  const promptTokens =
    Number(rawUsage.prompt_tokens ?? rawUsage.input_tokens ?? rawUsage.promptTokens ?? 0) ||
    0;
  const completionTokens =
    Number(
      rawUsage.completion_tokens ??
        rawUsage.output_tokens ??
        rawUsage.completionTokens ??
        0
    ) || 0;
  const totalTokens =
    Number(rawUsage.total_tokens ?? rawUsage.totalTokens ?? promptTokens + completionTokens) ||
    promptTokens + completionTokens;

  return {
    promptTokens,
    completionTokens,
    totalTokens,
  };
}

function estimateCostUsd(usage, pricing) {
  const inputCost = (usage.promptTokens / 1_000_000) * pricing.input;
  const outputCost = (usage.completionTokens / 1_000_000) * pricing.output;

  return {
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
  };
}

async function callCopilotJson({ token, model, systemPrompt, userPrompt }) {
  const baseUrl =
    process.env.COPILOT_BASE_URL ||
    'https://models.github.ai/inference/chat/completions';

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Copilot request failed (${response.status}): ${errorText}`);
  }

  const payload = await response.json();
  const content =
    payload?.choices?.[0]?.message?.content || payload?.choices?.[0]?.text || '';

  return {
    parsed: safeParseJsonObject(content),
    usage: normalizeUsage(payload?.usage),
  };
}

function safeParseJsonObject(rawText) {
  if (!rawText) {
    return null;
  }

  const trimmed = rawText.trim();

  try {
    return JSON.parse(trimmed);
  } catch {
    const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/u);

    if (fenceMatch?.[1]) {
      try {
        return JSON.parse(fenceMatch[1].trim());
      } catch {
        return null;
      }
    }

    return null;
  }
}

function sanitizeString(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.replace(/\s+/g, ' ').trim();

  return normalized.length > 0 ? normalized : null;
}

function sanitizeEnrichmentPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const result = {};

  const summary = sanitizeString(payload.summary);

  if (summary) {
    result.summary = summary;
  }

  if (Array.isArray(payload.args)) {
    const args = payload.args
      .map((arg) => {
        if (!arg || typeof arg !== 'object') {
          return null;
        }

        const name = sanitizeString(arg.name);

        if (!name) {
          return null;
        }

        const item = { name };
        const itemSummary = sanitizeString(arg.summary);
        const itemDefault = sanitizeString(arg.default);

        if (itemSummary) {
          item.summary = itemSummary;
        }

        if (itemDefault) {
          item.default = itemDefault;
        }

        return item;
      })
      .filter(Boolean);

    if (args.length > 0) {
      result.args = args;
    }
  }

  if (Array.isArray(payload.blocks)) {
    const blocks = payload.blocks
      .map((block) => {
        if (!block || typeof block !== 'object') {
          return null;
        }

        const name = sanitizeString(block.name);

        if (!name) {
          return null;
        }

        const item = { name };
        const blockSummary = sanitizeString(block.summary);

        if (blockSummary) {
          item.summary = blockSummary;
        }

        if (Array.isArray(block.yields)) {
          const yields = block.yields
            .map((yieldEntry) => {
              if (!yieldEntry || typeof yieldEntry !== 'object') {
                return null;
              }

              const yieldName = sanitizeString(yieldEntry.name);
              const yieldSummary = sanitizeString(yieldEntry.summary);

              if (!yieldName || !yieldSummary) {
                return null;
              }

              return {
                name: yieldName,
                summary: yieldSummary,
              };
            })
            .filter(Boolean);

          if (yields.length > 0) {
            item.yields = yields;
          }
        }

        return item;
      })
      .filter(Boolean);

    if (blocks.length > 0) {
      result.blocks = blocks;
    }
  }

  return Object.keys(result).length > 0 ? result : null;
}

function sanitizeReviewPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const status = payload.status === 'needs_attention' ? 'needs_attention' : 'pass';
  const confidenceNumber = Number(payload.confidence);
  const confidence = Number.isFinite(confidenceNumber)
    ? Math.max(0, Math.min(1, confidenceNumber))
    : undefined;
  const issues = Array.isArray(payload.issues)
    ? payload.issues
        .map((issue) => {
          if (!issue || typeof issue !== 'object') {
            return null;
          }

          const path = sanitizeString(issue.path);
          const expected = sanitizeString(issue.expected);
          const actual = sanitizeString(issue.actual);
          const reason = sanitizeString(issue.reason);

          if (!path || !reason) {
            return null;
          }

          const nextIssue = { path, reason };
          const kind = sanitizeString(issue.kind);
          const severity = sanitizeString(issue.severity);

          if (
            kind &&
            ['mismatch', 'docs_inconsistency', 'uncertain'].includes(kind)
          ) {
            nextIssue.kind = kind;
          }

          if (severity && ['error', 'warning', 'info'].includes(severity)) {
            nextIssue.severity = severity;
          }

          if (expected) {
            nextIssue.expected = expected;
          }

          if (actual) {
            nextIssue.actual = actual;
          }

          return nextIssue;
        })
        .filter(Boolean)
    : [];
  const notes = Array.isArray(payload.notes)
    ? payload.notes.map((note) => sanitizeString(note)).filter(Boolean)
    : [];

  return {
    status,
    confidence,
    issues,
    notes,
  };
}

function createCompactReviewSnapshot(componentBefore, componentAfter) {
  const argBeforeMap = new Map((componentBefore.args || []).map((arg) => [arg.name, arg]));
  const blockBeforeMap = new Map((componentBefore.blocks || []).map((block) => [block.name, block]));
  const changedArgs = [];
  const changedBlocks = [];

  for (const argAfter of componentAfter.args || []) {
    const argBefore = argBeforeMap.get(argAfter.name) || {};
    const hasSummaryChange = (argAfter.summary || null) !== (argBefore.summary || null);
    const hasDefaultChange = (argAfter.default || null) !== (argBefore.default || null);

    if (!hasSummaryChange && !hasDefaultChange) {
      continue;
    }

    const entry = {
      name: argAfter.name,
    };

    if (hasSummaryChange) {
      entry.summary = argAfter.summary || null;
    }

    if (hasDefaultChange) {
      entry.default = argAfter.default || null;
    }

    changedArgs.push(entry);
  }

  for (const blockAfter of componentAfter.blocks || []) {
    const blockBefore = blockBeforeMap.get(blockAfter.name) || {};
    const changedBlock = {
      name: blockAfter.name,
    };
    let hasChanges = false;

    if ((blockAfter.summary || null) !== (blockBefore.summary || null)) {
      changedBlock.summary = blockAfter.summary || null;
      hasChanges = true;
    }

    const yieldBeforeMap = new Map(
      (blockBefore.yields || []).map((yieldEntry) => [yieldEntry.name, yieldEntry])
    );
    const changedYields = [];

    for (const yieldAfter of blockAfter.yields || []) {
      const yieldBefore = yieldBeforeMap.get(yieldAfter.name) || {};

      if ((yieldAfter.summary || null) === (yieldBefore.summary || null)) {
        continue;
      }

      changedYields.push({
        name: yieldAfter.name,
        summary: yieldAfter.summary || null,
      });
    }

    if (changedYields.length > 0) {
      changedBlock.yields = changedYields;
      hasChanges = true;
    }

    if (hasChanges) {
      changedBlocks.push(changedBlock);
    }
  }

  return {
    componentName: componentAfter.name,
    summaryBefore: componentBefore.summary || null,
    summaryAfter: componentAfter.summary || null,
    changedArgs,
    changedBlocks,
  };
}

function extractRelevantDocsSections(docsText, componentAfter) {
  if (typeof docsText !== 'string' || docsText.length === 0) {
    return '';
  }

  const lines = docsText.split(/\r?\n/u);
  const wantedArgNames = new Set((componentAfter.args || []).map((arg) => arg.name));
  const wantedBlockNames = new Set((componentAfter.blocks || []).map((block) => block.name));
  const wantedYieldNames = new Set();

  for (const block of componentAfter.blocks || []) {
    for (const yieldEntry of block.yields || []) {
      wantedYieldNames.add(yieldEntry.name);
    }
  }

  const selected = [];
  let section = null;
  let sectionHasUsefulContent = false;

  function flushSection() {
    if (!section) {
      return;
    }

    if (section.level <= 3 || sectionHasUsefulContent) {
      selected.push(...section.lines);
    }

    section = null;
    sectionHasUsefulContent = false;
  }

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+/u);

    if (headingMatch) {
      const level = headingMatch[1].length;

      if (section && level <= section.level) {
        flushSection();
      }

      if (!section) {
        section = {
          level,
          lines: [line],
        };
        continue;
      }
    }

    if (!section) {
      continue;
    }

    section.lines.push(line);

    if (line.includes('## Component API')) {
      sectionHasUsefulContent = true;
    }

    const nameMatch = line.match(/@name="([^"]+)"/u);

    if (nameMatch?.[1]) {
      const name = nameMatch[1].trim();

      if (wantedArgNames.has(name) || wantedBlockNames.has(name) || wantedYieldNames.has(name)) {
        sectionHasUsefulContent = true;
      }
    }

    const contextualHeadingMatch = line.match(/^####\s+\[A\]\.([A-Za-z0-9_]+)\s*$/u);

    if (contextualHeadingMatch?.[1] && wantedYieldNames.has(contextualHeadingMatch[1])) {
      sectionHasUsefulContent = true;
    }
  }

  flushSection();

  const reduced = selected.join('\n').trim();

  if (reduced.length <= REVIEW_DOCS_CHAR_LIMIT) {
    return reduced;
  }

  return `${reduced.slice(0, REVIEW_DOCS_CHAR_LIMIT)}\n\n[truncated for review token budget]`;
}

function extractContextualYieldSummaries(docsText) {
  const summariesByYieldName = new Map();

  if (typeof docsText !== 'string' || docsText.length === 0) {
    return summariesByYieldName;
  }

  const headingRegex = /^####\s+\[A\]\.([A-Za-z0-9_]+)\s*$/gmu;
  const matches = [];
  let match;

  while ((match = headingRegex.exec(docsText)) !== null) {
    matches.push({
      yieldName: match[1],
      headingIndex: match.index,
      headingEndIndex: headingRegex.lastIndex,
    });
  }

  for (let index = 0; index < matches.length; index += 1) {
    const current = matches[index];
    const next = matches[index + 1];
    const sectionEnd = next ? next.headingIndex : docsText.length;
    const sectionText = docsText.slice(current.headingEndIndex, sectionEnd).trim();

    if (sectionText.length === 0) {
      continue;
    }

    const lines = sectionText
      .split(/\r?\n/u)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length === 0) {
      continue;
    }

    const firstNarrativeLine = lines.find(
      (line) => !line.startsWith('<') && !line.startsWith('```')
    );

    if (!firstNarrativeLine) {
      continue;
    }

    const cleanedSummary = firstNarrativeLine
      .replace(/`/gu, '')
      .replace(/\s+/gu, ' ')
      .trim();

    if (cleanedSummary.length > 0) {
      summariesByYieldName.set(current.yieldName, cleanedSummary);
    }
  }

  return summariesByYieldName;
}

function backfillContextualYieldSummaries(component, enrichment, docsText) {
  const contextualSummaries = extractContextualYieldSummaries(docsText);

  if (contextualSummaries.size === 0 || !Array.isArray(component.blocks)) {
    return {
      enrichment,
      backfilledCount: 0,
    };
  }

  const nextEnrichment = enrichment && typeof enrichment === 'object' ? { ...enrichment } : {};
  const blocks = Array.isArray(nextEnrichment.blocks)
    ? nextEnrichment.blocks.map((block) => ({
        ...block,
        yields: Array.isArray(block.yields) ? [...block.yields] : undefined,
      }))
    : [];
  let backfilledCount = 0;

  for (const [yieldName, summary] of contextualSummaries.entries()) {
    let alreadyPresent = false;

    for (const block of blocks) {
      for (const yieldEntry of block.yields || []) {
        if (yieldEntry.name === yieldName && typeof yieldEntry.summary === 'string') {
          alreadyPresent = true;
          break;
        }
      }

      if (alreadyPresent) {
        break;
      }
    }

    if (alreadyPresent) {
      continue;
    }

    const targetBlock = component.blocks.find((block) =>
      Array.isArray(block.yields)
        ? block.yields.some((yieldEntry) => yieldEntry.name === yieldName)
        : false
    );

    if (!targetBlock) {
      continue;
    }

    let enrichmentBlock = blocks.find((block) => block.name === targetBlock.name);

    if (!enrichmentBlock) {
      enrichmentBlock = { name: targetBlock.name, yields: [] };
      blocks.push(enrichmentBlock);
    }

    if (!Array.isArray(enrichmentBlock.yields)) {
      enrichmentBlock.yields = [];
    }

    enrichmentBlock.yields.push({
      name: yieldName,
      summary,
    });
    backfilledCount += 1;
  }

  if (blocks.length > 0) {
    nextEnrichment.blocks = blocks;
  }

  return {
    enrichment: sanitizeEnrichmentPayload(nextEnrichment),
    backfilledCount,
  };
}

async function enrichWithCopilot({ component, docsText, docPath, token, model }) {

  const systemPrompt = [
    'You extract structured component API docs from markdown.',
    'Return JSON only.',
    'Only reference names that already exist in the provided component object.',
    'Do not invent args, blocks, or yields.',
    'Important: contextual components in docs can appear under headings like "#### [A].Item".',
    'If present, map that narrative description to the root component yield named "Item".',
    'Do not shorten to first sentence only. Capture complete behavior from the property prose.',
    'For each summary, include all materially relevant details present in the docs, including:',
    '- defaults and fallback behavior (for example, what happens when an arg is omitted)',
    '- conditional behavior and cross-argument dependencies',
    '- constraints or unsupported combinations',
    '- callback argument details when documented',
    'Prefer 1-3 sentences copied/normalized from docs over paraphrased shorthand.',
    'If prose references a related arg (example: caption and sortedMessageText), include that relationship.',
    'If a field is not documented, omit it.',
    'Output shape:',
    '{ "summary"?: string, "args"?: [{"name": string, "summary"?: string, "default"?: string}], "blocks"?: [{"name": string, "summary"?: string, "yields"?: [{"name": string, "summary": string}]}] }',
  ].join('\n');

  const userPrompt = [
    `Component name: ${component.name}`,
    `Doc path: ${docPath}`,
    'Extraction quality requirements:',
    '- Keep summaries complete, not sentence-truncated.',
    '- Include important qualifiers (if/when/unless) and interactions with related properties.',
    '- For callback args, include the documented callback parameter details in summary when present.',
    '- Prefer faithful wording from docs; do not collapse to generic descriptions.',
    'Current component object (only these names are valid):',
    JSON.stringify(component, null, 2),
    'Markdown to interpret:',
    docsText,
  ].join('\n\n');

  const result = await callCopilotJson({
    token,
    model,
    systemPrompt,
    userPrompt,
  });

  return {
    enrichment: sanitizeEnrichmentPayload(result.parsed),
    usage: result.usage,
  };
}

async function reviewEnrichmentWithCopilot({
  componentBefore,
  componentAfter,
  docsText,
  docPath,
  token,
  model,
}) {
  const compactSnapshot = createCompactReviewSnapshot(componentBefore, componentAfter);
  const relevantDocs = extractRelevantDocsSections(docsText, componentAfter);
  const systemPrompt = [
    'You review whether enriched component JSON matches prose in component API docs.',
    'Return JSON only.',
    'Focus on summary/default fields and yielded contextual component descriptions.',
    'Flag mismatches, omissions, or clearly incorrect values.',
    'If docs claim yields that are not present in component signature output, mark them as docs inconsistencies rather than enrichment mismatches.',
    'Use issue kind and severity fields to classify outcomes.',
    'Output shape:',
    '{"status":"pass"|"needs_attention","confidence":number,"issues":[{"path":string,"reason":string,"expected"?:string,"actual"?:string,"kind"?:"mismatch"|"docs_inconsistency"|"uncertain","severity"?:"error"|"warning"|"info"}],"notes"?:string[]}',
  ].join('\n');

  const userPrompt = [
    `Doc path: ${docPath}`,
    'Compact changed-fields snapshot to validate:',
    JSON.stringify(compactSnapshot, null, 2),
    'Relevant markdown sections to validate against:',
    relevantDocs || '[no relevant sections extracted]',
  ].join('\n\n');

  const result = await callCopilotJson({
    token,
    model,
    systemPrompt,
    userPrompt,
  });

  return {
    review: sanitizeReviewPayload(result.parsed),
    usage: result.usage,
  };
}

function applyInlineEnrichment(component, enrichment, docPath) {
  let updated = false;

  if (enrichment.summary && enrichment.summary !== component.summary) {
    component.summary = enrichment.summary;
    updated = true;
  }

  if (Array.isArray(enrichment.args) && Array.isArray(component.args)) {
    const argMap = new Map(component.args.map((arg) => [arg.name, arg]));

    for (const enrichedArg of enrichment.args) {
      const existingArg = argMap.get(enrichedArg.name);

      if (!existingArg) {
        continue;
      }

      if (enrichedArg.summary && enrichedArg.summary !== existingArg.summary) {
        existingArg.summary = enrichedArg.summary;
        updated = true;
      }

      if (enrichedArg.default && enrichedArg.default !== existingArg.default) {
        existingArg.default = enrichedArg.default;
        updated = true;
      }
    }
  }

  if (Array.isArray(enrichment.blocks) && Array.isArray(component.blocks)) {
    const blockMap = new Map(component.blocks.map((block) => [block.name, block]));

    for (const enrichedBlock of enrichment.blocks) {
      const existingBlock = blockMap.get(enrichedBlock.name);

      if (!existingBlock) {
        continue;
      }

      if (enrichedBlock.summary && enrichedBlock.summary !== existingBlock.summary) {
        existingBlock.summary = enrichedBlock.summary;
        updated = true;
      }

      if (!Array.isArray(enrichedBlock.yields) || !Array.isArray(existingBlock.yields)) {
        continue;
      }

      const yieldMap = new Map(existingBlock.yields.map((yieldEntry) => [yieldEntry.name, yieldEntry]));

      for (const enrichedYield of enrichedBlock.yields) {
        const existingYield = yieldMap.get(enrichedYield.name);

        if (!existingYield) {
          continue;
        }

        if (enrichedYield.summary && enrichedYield.summary !== existingYield.summary) {
          existingYield.summary = enrichedYield.summary;
          updated = true;
        }
      }
    }
  }

  if (updated) {
  }

  return updated;
}

async function main() {
  const startedAt = Date.now();
  const options = parseCliOptions(process.argv.slice(2));
  const catalog = readCatalog();
  const targets = catalog.components.filter((component) =>
    componentMatchesFilters(component, options)
  );
  const enrichmentModel = process.env.COPILOT_MODEL || 'openai/gpt-4.1-mini';
  const reviewModel =
    process.env.COPILOT_REVIEW_MODEL || 'openai/gpt-4.1';
  const enrichmentPricing = getPricing(enrichmentModel);
  const reviewPricing = getPricing(reviewModel);
  const copilotAuth = resolveCopilotToken();

  let enrichedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  let totalPromptTokens = 0;
  let totalCompletionTokens = 0;
  let totalTokens = 0;
  let totalCostUsd = 0;
  let reviewPassCount = 0;
  let reviewNeedsAttentionCount = 0;

  console.log(`Catalog path: ${toRepoRelativePath(CATALOG_PATH)}`);
  console.log(
    `Targets: ${targets.length} component(s)`
  );
  console.log(
    `Enrichment model=${enrichmentModel} | pricing=${enrichmentPricing.source} input=${enrichmentPricing.input}/1M output=${enrichmentPricing.output}/1M`
  );
  console.log(
    `Review model=${reviewModel} | pricing=${reviewPricing.source} input=${reviewPricing.input}/1M output=${reviewPricing.output}/1M`
  );
  console.log(`Auth token source: ${copilotAuth.source}`);

  for (const component of targets) {
    const componentSpinner = startTaskSpinner(
      `${component.name}: searching for component-api docs`
    );
    const docsSelection = selectDocsFile(component);

    for (const candidate of docsSelection.candidates) {
      if (!candidate.exists) {
        console.log(`- candidate: ${toRepoRelativePath(candidate.path)} (missing)`);
        continue;
      }

      console.log(
        `- candidate: ${toRepoRelativePath(candidate.path)} | confidence=${candidate.confidence.toFixed(
          2
        )} | ${candidate.signals.join(', ') || 'no signals'}`
      );
    }

    const selectedCandidate = docsSelection.selected;

    if (!selectedCandidate) {
      skippedCount += 1;
      componentSpinner.stopAndPersist({
        symbol: logSymbols.warning,
        text: `${component.name}: no component-api docs found`,
      });
      console.warn(`Skipping ${component.name}: no component-api markdown found.`);
      continue;
    }

    const docPath = selectedCandidate.path;
    const docsText = selectedCandidate.docsText;
    console.log(`- selected: ${toRepoRelativePath(docPath)}`);
    console.log(`- confidence: ${selectedCandidate.confidence.toFixed(2)}`);

    if (!selectedCandidate.hasComponentApiHeading) {
      skippedCount += 1;
      componentSpinner.stopAndPersist({
        symbol: logSymbols.warning,
        text: `${component.name}: candidate missing Component API heading`,
      });
      console.warn(
        `Skipping ${component.name}: docs file does not look like component-api markdown.`
      );
      continue;
    }

    const confirmed = await confirmDocPath(docPath, component.name, options.yes);

    if (!confirmed) {
      skippedCount += 1;
      componentSpinner.stopAndPersist({
        symbol: logSymbols.warning,
        text: `${component.name}: docs path not confirmed`,
      });
      console.warn(`Skipping ${component.name}: docs path not confirmed.`);
      continue;
    }

    componentSpinner.text = `${component.name}: enriching from docs`;

    let enrichmentResult = null;
    const componentBefore = JSON.parse(JSON.stringify(component));

    try {
      enrichmentResult = await enrichWithCopilot({
        component,
        docsText,
        docPath,
        token: copilotAuth.token,
        model: enrichmentModel,
      });
    } catch (error) {
      errorCount += 1;
      skippedCount += 1;
      componentSpinner.stopAndPersist({
        symbol: logSymbols.error,
        text: `${component.name}: enrichment failed`,
      });
      console.warn(`Skipping ${component.name}: ${error.message}`);
      continue;
    }

    const usage = enrichmentResult.usage;
    const cost = estimateCostUsd(usage, enrichmentPricing);

    totalPromptTokens += usage.promptTokens;
    totalCompletionTokens += usage.completionTokens;
    totalTokens += usage.totalTokens;
    totalCostUsd += cost.totalCost;

    console.log(
      `- usage: prompt=${usage.promptTokens} completion=${usage.completionTokens} total=${usage.totalTokens}`
    );
    console.log(
      `- estimated cost: ${formatUsd(cost.totalCost)} (input ${formatUsd(
        cost.inputCost
      )} + output ${formatUsd(cost.outputCost)})`
    );

    const backfilled = backfillContextualYieldSummaries(
      component,
      enrichmentResult.enrichment,
      docsText
    );

    if (backfilled.backfilledCount > 0) {
      console.log(
        `- heuristics: backfilled ${backfilled.backfilledCount} contextual yield summary field(s)`
      );
    }

    const enrichment = backfilled.enrichment;

    if (!enrichment) {
      skippedCount += 1;
      componentSpinner.stopAndPersist({
        symbol: logSymbols.warning,
        text: `${component.name}: no usable enrichment returned`,
      });
      console.warn(`Skipping ${component.name}: no usable enrichment returned.`);
      continue;
    }

    if (applyInlineEnrichment(component, enrichment, docPath)) {
      enrichedCount += 1;
      componentSpinner.text = `${component.name}: running review pass`;

      let reviewResult = null;

      try {
        reviewResult = await reviewEnrichmentWithCopilot({
          componentBefore,
          componentAfter: component,
          docsText,
          docPath,
          token: copilotAuth.token,
          model: reviewModel,
        });
      } catch (error) {
        errorCount += 1;
        reviewNeedsAttentionCount += 1;
        componentSpinner.stopAndPersist({
          symbol: logSymbols.error,
          text: `${component.name}: review failed`,
        });
        console.warn(`- review error: ${error.message}`);
        continue;
      }

      const reviewUsage = reviewResult.usage;
      const reviewCost = estimateCostUsd(reviewUsage, reviewPricing);

      totalPromptTokens += reviewUsage.promptTokens;
      totalCompletionTokens += reviewUsage.completionTokens;
      totalTokens += reviewUsage.totalTokens;
      totalCostUsd += reviewCost.totalCost;

      const review = reviewResult.review;

      if (!review) {
        reviewNeedsAttentionCount += 1;
        console.warn(
          `${logSymbols.warning} ${chalk.yellow(
            'review: needs_attention (no structured review payload)'
          )}`
        );
        continue;
      }

      const classifiedIssues = classifyReviewIssues(component, review);

      if (classifiedIssues.mismatches.length === 0) {
        reviewPassCount += 1;
      } else {
        reviewNeedsAttentionCount += 1;
      }

      if (classifiedIssues.mismatches.length === 0) {
        componentSpinner.stopAndPersist({
          symbol: logSymbols.success,
          text: `${component.name}: enrichment + review passed (blocking mismatches: 0)`,
        });
      } else {
        componentSpinner.stopAndPersist({
          symbol: logSymbols.warning,
          text: `${component.name}: enrichment complete, review needs attention (${classifiedIssues.mismatches.length} blocking mismatch(es))`,
        });
      }

      printReviewReport(
        component.name,
        review,
        classifiedIssues,
        reviewUsage,
        reviewCost
      );
    } else {
      skippedCount += 1;
      componentSpinner.stopAndPersist({
        symbol: logSymbols.warning,
        text: `${component.name}: no matching fields to update`,
      });
      console.warn(`Skipping ${component.name}: no matching fields to update.`);
    }
  }

  catalog.updatedAt = new Date().toISOString();
  writeFileSync(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`);

  const elapsedMs = Date.now() - startedAt;

  printPanel(
    'Run Summary',
    [
      `${logSymbols.success} ${chalk.bold('Done.')} Enriched ${enrichedCount} component(s), skipped ${skippedCount} component(s), errors ${errorCount}.`,
      `Review outcomes: ${chalk.green(`pass=${reviewPassCount}`)}  ${chalk.yellow(
        `needs_attention=${reviewNeedsAttentionCount}`
      )}`,
    ],
    'cyan'
  );
  printTable(
    ['Metric', 'Value'],
    [
      ['Review pass', `${reviewPassCount}`],
      ['Review needs attention', `${reviewNeedsAttentionCount}`],
      ['Prompt tokens', `${totalPromptTokens}`],
      ['Completion tokens', `${totalCompletionTokens}`],
      ['Total tokens', `${totalTokens}`],
      ['Estimated cost', `${formatUsd(totalCostUsd)} USD`],
      ['Elapsed', `${(elapsedMs / 1000).toFixed(2)}s`],
    ]
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : `${error}`);
  process.exit(1);
});
