/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';

import { normalizeComponentName } from '../../catalogs/components/lookup.js';
import { getComponentBySlugUri } from '../resources/read-component-by-slug.js';
import {
  toPromptResponse,
  toUserResourceLink,
  toUserText,
} from './response-prompt.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ComponentCatalogStore } from '../../catalogs/components/store.js';
import type { PromptMessage } from './response-prompt.js';

const MAX_NEAREST_MATCHES = 5;

const findNearestMatches = (
  store: ComponentCatalogStore,
  nameOrSlug: string
): Array<{ name: string; slug: string }> => {
  const normalized = normalizeComponentName(nameOrSlug);

  if (normalized === '') {
    return [];
  }

  return store
    .listComponents()
    .filter((component) => {
      return (
        component.name.toLowerCase().includes(normalized) ||
        component.slug.toLowerCase().includes(normalized)
      );
    })
    .slice(0, MAX_NEAREST_MATCHES)
    .map(({ name, slug }) => ({ name, slug }));
};

export const buildComponentUsagePromptMessages = (
  store: ComponentCatalogStore,
  input: {
    nameOrSlug: string;
    scenario?: string;
  }
): PromptMessage[] => {
  const component = store.getComponentContext(input.nameOrSlug);

  if (component === null) {
    const nearestMatches = findNearestMatches(store, input.nameOrSlug);
    const fallbackLines = [
      `No HDS component matches "${input.nameOrSlug}".`,
      '',
      'Use the `hds_search_components` tool or the `hds://components` resource to discover available components.',
    ];

    if (nearestMatches.length > 0) {
      fallbackLines.push('', 'Nearest matches by name or slug:');

      for (const match of nearestMatches) {
        fallbackLines.push(`- ${match.name} (slug: ${match.slug})`);
      }
    }

    return [toUserText(fallbackLines.join('\n'))];
  }

  const scenarioLine =
    input.scenario === undefined || input.scenario.trim() === ''
      ? ''
      : `\nScenario / additional context: ${input.scenario.trim()}`;

  const framingText = [
    `Show idiomatic HDS usage for the ${component.name} component (slug: ${component.slug}).${scenarioLine}`,
    '',
    'Treat the referenced `hds://components/' +
      component.slug +
      '` resource as the canonical source of truth for the component API, blocks, accessibility notes, and examples. Do not invent arguments, blocks, or class names that are not present there.',
  ].join('\n');

  const deliverableText = [
    'Deliverable:',
    '',
    `1. A minimal, idiomatic example using \`${component.name}\` (Glimmer/Handlebars). Use only documented arguments and blocks from the referenced resource. Use HDS design tokens for any custom styling and BEM class names following the \`hds-${component.slug}\` convention if you add wrappers.`,
    "2. A short notes section calling out the most important accessibility expectations from the resource's `a11yNotes`, if any.",
    '3. If the scenario above is non-empty, tailor the example to that scenario.',
  ].join('\n');

  return [
    toUserText(framingText),
    toUserResourceLink({
      uri: getComponentBySlugUri(component.slug),
      name: `HDS component: ${component.name}`,
      description: `Canonical context for the ${component.name} component.`,
      mimeType: 'application/json',
    }),
    toUserText(deliverableText),
  ];
};

export const registerComponentUsagePrompt = (
  server: McpServer,
  store: ComponentCatalogStore
): void => {
  server.registerPrompt(
    'hds_component_usage',
    {
      title: 'HDS component usage',
      description:
        'Generate an idiomatic, manifest-grounded usage example for a specific HDS component.',
      argsSchema: {
        nameOrSlug: z
          .string()
          .min(1)
          .describe(
            'Component name or slug (e.g. "Button", "button", or "Hds::Button").'
          ),
        scenario: z
          .string()
          .optional()
          .describe(
            'Optional extra context such as "with icon" or "destructive variant".'
          ),
      },
    },
    ({ nameOrSlug, scenario }) => {
      return toPromptResponse(
        buildComponentUsagePromptMessages(store, {
          nameOrSlug,
          ...(scenario === undefined ? {} : { scenario }),
        })
      );
    }
  );
};
