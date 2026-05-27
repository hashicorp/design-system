/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';

import { MANIFEST_META_URI } from '../resources/read-manifest-meta.js';
import { getFigmaNodeUri } from '../resources/read-figma-node.js';
import {
  toPromptResponse,
  toUserResourceLink,
  toUserText,
} from './response-prompt.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ComponentCatalogStore } from '../../component-catalog/store.js';
import type { PromptMessage } from './response-prompt.js';

const MAX_NODE_COUNT = 200;

export const SUPPORTED_FRAMEWORKS = ['ember', 'gts'] as const;
export type SupportedFramework = (typeof SUPPORTED_FRAMEWORKS)[number];

const DEFAULT_FRAMEWORK: SupportedFramework = 'ember';

export const parseNodeIds = (raw: string): string[] => {
  return raw
    .split(/[\s,]+/u)
    .map((value) => value.trim())
    .filter((value) => value !== '');
};

const isSupportedFramework = (value: string): value is SupportedFramework => {
  return (SUPPORTED_FRAMEWORKS as readonly string[]).includes(value);
};

const normalizeFramework = (raw: string | undefined): SupportedFramework => {
  if (raw === undefined) {
    return DEFAULT_FRAMEWORK;
  }

  const trimmed = raw.trim().toLowerCase();

  if (trimmed === '') {
    return DEFAULT_FRAMEWORK;
  }

  if (isSupportedFramework(trimmed)) {
    return trimmed;
  }

  return DEFAULT_FRAMEWORK;
};

export type BuildImplementFigmaFramePromptInput = {
  fileKey: string;
  nodeIds: string[];
  framework: SupportedFramework;
  notes?: string;
};

export const buildImplementFigmaFramePromptMessages = (
  _store: ComponentCatalogStore,
  input: BuildImplementFigmaFramePromptInput
): PromptMessage[] => {
  const trimmedFileKey = input.fileKey.trim();
  const nodeIds = input.nodeIds
    .map((nodeId) => nodeId.trim())
    .filter((nodeId) => nodeId !== '');

  if (trimmedFileKey === '' || nodeIds.length === 0) {
    return [
      toUserText(
        'Cannot build an implementation prompt without a non-empty `fileKey` and at least one `nodeId`.'
      ),
    ];
  }

  if (nodeIds.length > MAX_NODE_COUNT) {
    return [
      toUserText(
        `Too many node IDs (${nodeIds.length}); the maximum supported per invocation is ${MAX_NODE_COUNT}.`
      ),
    ];
  }

  const notesLine =
    input.notes === undefined || input.notes.trim() === ''
      ? ''
      : `\nAdditional notes from the requester: ${input.notes.trim()}`;

  const framingText = [
    `Implement the following Figma frame as ${input.framework === 'gts' ? 'a Glimmer `.gts` template' : 'an Ember Handlebars template'} using only Helios Design System components.`,
    '',
    `Figma fileKey: ${trimmedFileKey}`,
    `Node IDs (${nodeIds.length}): ${nodeIds.join(', ')}${notesLine}`,
    '',
    'The referenced `hds://manifest/meta` resource reports overall manifest freshness and design-mapping coverage. The referenced `hds://figma/{fileKey}/nodes/{nodeId}` resources are the canonical per-node mapping lookups — each will indicate whether that Figma node maps to a known HDS component.',
  ].join('\n');

  const resourceLinks: PromptMessage[] = [
    toUserResourceLink({
      uri: MANIFEST_META_URI,
      name: 'HDS manifest metadata',
      description:
        'Manifest freshness and design-mapping coverage for the HDS component catalog.',
      mimeType: 'application/json',
    }),
    ...nodeIds.map((nodeId) =>
      toUserResourceLink({
        uri: getFigmaNodeUri(trimmedFileKey, nodeId),
        name: `HDS mapping for Figma node ${nodeId}`,
        description: `Canonical mapping lookup for fileKey ${trimmedFileKey} node ${nodeId}.`,
        mimeType: 'application/json',
      })
    ),
  ];

  const workflowText = [
    'Workflow:',
    '',
    '1. Call the `hds_resolve_figma_frame` tool exactly once with the `fileKey` and full list of `nodeIds` above. This is the authoritative batched matcher.',
    '2. For each matched node, read the corresponding `hds://components/{slug}` resource and use ONLY the documented arguments, blocks, and accessibility notes from that resource.',
    '3. For each unmatched node, surface it explicitly in your output as a human-review item; do not invent a component for it.',
    '4. Emit the final template using HDS components, design tokens for any custom styling, and `hds-<component-name>` BEM class names if you add wrappers. Do not hard-code colors, spacing, or typography values that should come from tokens.',
    '',
    'Optional Figma MCP integration:',
    '',
    'If another MCP server is connected that exposes a Figma-aware capability (for example a tool like `get_code`, `get_image`, `get_variable_defs`, `get_code_connect_map`, or `get_figma_data` that accepts a fileKey/nodeId or operates on the current Figma selection), prefer calling it for each input node BEFORE generating output. Use the returned design variables and visual context to disambiguate component variants (size, color, intent, etc.). Always cross-check those findings against `hds_resolve_figma_frame` and the canonical `hds://components/{slug}` resource — the HDS manifest is the source of truth for component APIs, and Figma data must not override it.',
    '',
    'If no such Figma MCP capability is available, skip that step and proceed with manifest-only context; do not fabricate Figma data.',
    '',
    'Deliverable:',
    '',
    `1. A single fenced ${input.framework === 'gts' ? '```gts' : '```hbs'} code block containing the implementation.`,
    '2. A short "Unmatched nodes" section listing every unmatched node ID with a one-line note.',
    '3. A short "Assumptions" section if you had to make any judgment calls; otherwise omit it.',
  ].join('\n');

  return [toUserText(framingText), ...resourceLinks, toUserText(workflowText)];
};

export const registerImplementFigmaFramePrompt = (
  server: McpServer,
  store: ComponentCatalogStore
): void => {
  server.registerPrompt(
    'hds_implement_figma_frame',
    {
      title: 'Implement an HDS-conformant template for a Figma frame',
      description:
        'Generate an HDS-conformant Ember or Glimmer template for one or more Figma nodes, grounded in canonical manifest resources and the hds_resolve_figma_frame tool.',
      argsSchema: {
        fileKey: z
          .string()
          .min(1)
          .describe('Figma file key the target nodes belong to.'),
        nodeIds: z
          .string()
          .min(1)
          .describe(
            'One or more Figma node IDs. Separate multiple IDs with commas, spaces, or newlines.'
          ),
        framework: z
          .string()
          .optional()
          .describe('Target framework. One of "ember" (default) or "gts".'),
        notes: z
          .string()
          .optional()
          .describe(
            'Optional free-form notes (e.g. "this is a form", "destructive flow").'
          ),
      },
    },
    ({ fileKey, nodeIds, framework, notes }) => {
      return toPromptResponse(
        buildImplementFigmaFramePromptMessages(store, {
          fileKey,
          nodeIds: parseNodeIds(nodeIds),
          framework: normalizeFramework(framework),
          ...(notes === undefined ? {} : { notes }),
        })
      );
    }
  );
};
