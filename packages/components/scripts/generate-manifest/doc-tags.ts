import type {
  InterfaceDeclaration,
  JSDocTag,
  PropertySignature,
} from 'ts-morph';
import { Node } from 'ts-morph';

import { normalizeApiText } from './api-text.ts';

import type { CatalogApiLink, CatalogApiNote } from './types.ts';

/**
 * Extract the human-authored value of a JSDoc tag.
 *
 * Most tags expose their value via `getCommentText()`. TypeScript treats a
 * handful of tags as "typed" JSDoc tags (e.g. `@type`, `@param`, `@returns`),
 * and for those `getCommentText()` returns undefined because the value is
 * modeled as a type expression rather than a comment. For our use case
 * (`@type icon`, `@type {icon}`) we want to recover that text, so we fall
 * back to reading the type expression or the raw tag text when the tag is a
 * typed JSDoc tag node.
 */
function getJsDocTagValue(tag: JSDocTag): string | undefined {
  const comment = tag.getCommentText()?.trim();

  if (comment !== undefined && comment.length > 0) {
    return comment;
  }

  if (Node.isJSDocTypeTag(tag)) {
    const typeExpressionText = tag
      .getTypeExpression()
      ?.getTypeNode()
      ?.getText()
      .trim();

    if (typeExpressionText !== undefined && typeExpressionText.length > 0) {
      return typeExpressionText;
    }

    // Fallback: parse the raw tag text (e.g. `@type icon`) for the form
    // that does not use curly braces.
    const rawText = tag.getText().trim();
    const rawAfterTagName = rawText
      .replace(/^@[A-Za-z]+/u, '')
      .replace(/^\s*\*\s*/u, '')
      .trim();

    if (rawAfterTagName.length > 0) {
      return rawAfterTagName;
    }
  }

  return undefined;
}

export function getDocTag(
  prop: PropertySignature,
  tagName: string
): string | undefined {
  const docs = prop.getJsDocs()[0];
  if (docs === undefined) {
    return undefined;
  }

  const tag = docs.getTags().find((entry) => entry.getTagName() === tagName);
  if (tag === undefined) {
    return undefined;
  }

  return getJsDocTagValue(tag);
}

export function parseValuesTag(valuesTag: string): string[] {
  return valuesTag
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
}

export function getDocNotes(prop: PropertySignature): CatalogApiNote[] {
  const docs = prop.getJsDocs()[0];

  if (docs === undefined) {
    return [];
  }

  const tagToKindMap: Record<string, CatalogApiNote['kind']> = {
    note: 'note',
    important: 'important',
    warning: 'warning',
  };

  const notes: CatalogApiNote[] = [];

  docs.getTags().forEach((tag) => {
    const kind = tagToKindMap[tag.getTagName()];

    if (kind === undefined) {
      return;
    }

    const text = tag.getCommentText()?.trim();
    if (text === undefined || text.length === 0) {
      return;
    }

    notes.push({ kind, text: normalizeApiText(text) });
  });

  return notes;
}

function parseDocLinkTagText(tagText: string): CatalogApiLink | undefined {
  const text = tagText.trim();
  if (text.length === 0) {
    return undefined;
  }

  const parts = text.split(/\s+/u);
  const href = parts[0];

  if (href === undefined || href.length === 0) {
    return undefined;
  }

  const label = text.slice(href.length).trim();

  return {
    href,
    ...(label.length > 0 ? { label } : {}),
  };
}

export function getDocLinks(prop: PropertySignature): CatalogApiLink[] {
  const docs = prop.getJsDocs()[0];

  if (docs === undefined) {
    return [];
  }

  const links: CatalogApiLink[] = [];

  docs.getTags().forEach((tag) => {
    if (tag.getTagName() !== 'link') {
      return;
    }

    const link = parseDocLinkTagText(tag.getCommentText() ?? '');
    if (link !== undefined) {
      links.push(link);
    }
  });

  return links;
}

export function getInterfaceDocTag(
  taggableNode: InterfaceDeclaration,
  tagName: string
): string | undefined {
  const docs = taggableNode.getJsDocs()[0];

  if (docs === undefined) {
    return undefined;
  }

  const tag = docs.getTags().find((entry) => entry.getTagName() === tagName);
  if (tag === undefined) {
    return undefined;
  }

  return getJsDocTagValue(tag);
}
