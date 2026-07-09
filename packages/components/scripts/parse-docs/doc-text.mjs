/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export function normalizeTagText(tag) {
  const tagComment = tag.getCommentText();

  if (typeof tagComment === 'string') {
    // ts-morph can return structured tag comment text so normalize line endings here
    return tagComment
      .split('\n')
      .map((line) => line.trimEnd())
      .join('\n');
  }

  return '';
}

export function toSingleLineText(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .replace(/\r\n?/g, '\n')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function normalizeMarkdownText(value) {
  if (typeof value !== 'string') {
    return '';
  }

  const lines = value
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd());

  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }

  while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }

  const indents = lines
    .filter((line) => line.trim() !== '')
    .map((line) => {
      const match = line.match(/^\s*/);
      return match ? match[0].length : 0;
    });

  const commonIndent = indents.length > 0 ? Math.min(...indents) : 0;

  const deindentedLines = lines.map((line) => line.slice(commonIndent));
  const outputLines = [];
  let currentLine = '';
  let currentMode = null;

  function flushCurrentLine() {
    if (currentLine) {
      outputLines.push(currentLine.trim());
      currentLine = '';
      currentMode = null;
    }
  }

  function pushBlankLine() {
    if (outputLines.length === 0) {
      return;
    }

    if (outputLines[outputLines.length - 1] !== '') {
      outputLines.push('');
    }
  }

  for (const rawLine of deindentedLines) {
    const line = rawLine.trim();

    if (line === '') {
      flushCurrentLine();
      pushBlankLine();
      continue;
    }

    const listMatch = line.match(/^([-*+]|\d+[.)])\s+(.*)$/);

    if (listMatch) {
      flushCurrentLine();
      // keep list item boundaries while still collapsing wrapped lines
      currentMode = 'list';
      currentLine = `${listMatch[1]} ${listMatch[2]}`;
      continue;
    }

    if (currentMode === 'list' || currentMode === 'paragraph') {
      currentLine = `${currentLine} ${line}`;
      continue;
    }

    currentMode = 'paragraph';
    currentLine = line;
  }

  flushCurrentLine();

  while (outputLines.length > 0 && outputLines[0] === '') {
    outputLines.shift();
  }

  while (outputLines.length > 0 && outputLines[outputLines.length - 1] === '') {
    outputLines.pop();
  }

  return outputLines.join('\n');
}

export function extractDocData(declarationNode) {
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
  // intentionally prefer the first jsdoc block to match current authoring conventions

  result.description = toSingleLineText(doc.getComment());

  doc.getTags().forEach((tag) => {
    const tagName = tag.getTagName();
    const tagText = normalizeTagText(tag);

    if (tagName === 'remarks') {
      result.remarks = normalizeMarkdownText(tagText);
    }

    if (tagName === 'defaultValue') {
      result.defaultValue = toSingleLineText(tagText) || null;
    }

    if (tagName === 'dependsOn') {
      result.dependsOn = toSingleLineText(tagText) || null;
    }

    if (tagName === 'splattributes') {
      result.hasSplattributesTag = true;
      result.splattributes = toSingleLineText(tagText) || null;
    }
  });

  return result;
}
