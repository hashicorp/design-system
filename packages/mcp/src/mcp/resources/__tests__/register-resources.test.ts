/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { registerResources } from '../register-resources.js';

import type { ComponentCatalogStore } from '../../../catalogs/components/store.js';
import type { IconCatalogStore } from '../../../catalogs/icons/store.js';
import type { TokenCatalogStore } from '../../../catalogs/tokens/store.js';

type RegisteredCall = {
  name: string;
  handler?: (
    uri: string,
    variables: Record<string, unknown>
  ) => Promise<{ contents: Array<{ uri: string; text: string }> }>;
};

class FakeServer {
  calls: RegisteredCall[] = [];

  registerResource(
    name: string,
    _templateOrUri?: unknown,
    _meta?: unknown,
    handler?: RegisteredCall['handler']
  ): void {
    this.calls.push({ name, handler });
  }
}

const component = {
  name: 'Button',
  slug: 'button',
  summary: 'Button summary',
  api: {},
};

const store: ComponentCatalogStore = {
  catalog: {
    generatedAt: '2026-01-01T00:00:00.000Z',
    components: [component],
  },
  getManifestMeta: () => ({
    generatedAt: '2026-01-01T00:00:00.000Z',
    componentCount: 1,
  }),
  listComponents: () => [
    {
      name: 'Button',
      slug: 'button',
      summary: 'Button summary',
    },
  ],
  getAllComponents: () => [component],
  getComponentBySlug: () => component,
  getComponentContext: () => component,
  getComponentByDesignNode: () => null,
  listDesignMappings: () => [],
  getDesignCoverage: () => ({
    totalComponentCount: 1,
    componentsWithDesignCount: 0,
    componentsMissingDesignCount: 1,
  }),
};

const tokenStore: TokenCatalogStore = {
  getMeta: () => ({ totalTokenCount: 1 }),
  listTokens: () => [
    {
      key: '{color.foreground.action}',
      name: 'token-color-foreground-action',
      type: 'color',
      value: '#1060ff',
      cssVar: '--token-color-foreground-action',
      category: 'color',
      path: ['color', 'foreground', 'action'],
    },
  ],
  getTokenByKey: () => null,
  searchTokens: () => [],
};

const iconStore: IconCatalogStore = {
  getMeta: () => ({
    totalIconCount: 1,
    totalAssetCount: 2,
    categories: ['Services'],
  }),
  listIcons: () => [
    {
      iconName: 'apple',
      description: 'apple, macos, ios',
      category: 'Services',
      sizes: ['16', '24'],
      hasMapping: true,
      variants: [
        {
          id: '707:41',
          fileName: 'apple-16',
          size: '16',
          width: 16,
          height: 16,
          mapping: 'Apple',
        },
        {
          id: '707:38',
          fileName: 'apple-24',
          size: '24',
          width: 24,
          height: 24,
          mapping: 'Apple',
        },
      ],
    },
  ],
  getIconByName: () => null,
  searchIcons: () => [],
};

test('registerResources registers all catalog resources', () => {
  const server = new FakeServer();

  registerResources(
    server as unknown as Parameters<typeof registerResources>[0],
    store,
    tokenStore,
    iconStore
  );

  assert.deepEqual(
    server.calls.map((call) => call.name),
    [
      'hds_manifest_meta',
      'hds_design_mappings',
      'hds_components',
      'hds_tokens',
      'hds_icons',
      'hds_icon_by_name',
      'hds_token_by_key',
      'hds_component_by_slug',
      'hds_figma_node',
    ]
  );
});

test('registerResources returns internal error payload for invalid resource variables', async () => {
  const server = new FakeServer();

  registerResources(
    server as unknown as Parameters<typeof registerResources>[0],
    store,
    tokenStore,
    iconStore
  );

  const iconByName = server.calls.find((call) => call.name === 'hds_icon_by_name');

  if (iconByName?.handler === undefined) {
    throw new Error('Expected hds_icon_by_name handler to be registered');
  }

  const response = await iconByName.handler('hds://icons/{iconName}', {
    iconName: 123,
  });
  const payload = JSON.parse(response.contents[0]?.text ?? '{}') as {
    ok?: boolean;
    error?: {
      code?: string;
      resource?: string;
      message?: string;
    };
  };

  assert.equal(payload.ok, false);
  assert.equal(payload.error?.code, 'INTERNAL_ERROR');
  assert.equal(payload.error?.resource, 'hds_icon_by_name');
});
