import type { InterfaceDeclaration, PropertySignature } from 'ts-morph';

import { normalizeApiText } from './api-text.ts';

import type { CatalogApiLink, CatalogApiNote } from './types.ts';

export function getDocTag(
  prop: PropertySignature,
  tagName: string
): string | undefined {
  const docs = prop.getJsDocs()[0];
  if (docs === undefined) {
    return undefined;
  }

  const tag = docs.getTags().find((entry) => entry.getTagName() === tagName);
  const comment = tag?.getCommentText()?.trim();

  if (comment !== undefined && comment.length > 0) {
    return comment;
  }

  return undefined;
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
  const comment = tag?.getCommentText()?.trim();

  if (comment !== undefined && comment.length > 0) {
    return comment;
  }

  return undefined;
}
