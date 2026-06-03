/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerPrompts } from '../prompts/register-prompts.js';
import { registerResources } from '../resources/register-resources.js';
import { registerTools } from '../tools/register-tools.js';

import type { ComponentCatalogStore } from '../../catalogs/components/store.js';
import type { DocsCatalogStore } from '../../catalogs/docs/store.js';
import type { IconCatalogStore } from '../../catalogs/icons/store.js';
import type { ShowcaseSnippetsCatalogStore } from '../../catalogs/showcase-snippets/store.js';
import type { TokenCatalogStore } from '../../catalogs/tokens/store.js';

const component = {
  name: 'Button',
  slug: 'button',
  summary: 'Trigger actions with clear emphasis.',
  design: {
    figmaUrl: 'https://www.figma.com/design/file-1/example?node-id=1-1',
    fileKey: 'file-1',
    nodeId: '1:1',
  },
  api: {},
};

const componentStore: ComponentCatalogStore = {
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
      name: component.name,
      slug: component.slug,
      summary: component.summary,
    },
  ],
  getAllComponents: () => [component],
  getComponentBySlug: (slug) => {
    return slug === 'button' ? component : null;
  },
  getComponentContext: (nameOrSlug) => {
    return nameOrSlug.trim().toLowerCase() === 'button' ? component : null;
  },
  getComponentByDesignNode: (fileKey, nodeId) => {
    if (fileKey === 'file-1' && nodeId === '1:1') {
      return component;
    }

    return null;
  },
  listDesignMappings: () => [
    {
      name: component.name,
      slug: component.slug,
      fileKey: 'file-1',
      nodeId: '1:1',
    },
  ],
  getDesignCoverage: () => ({
    totalComponentCount: 1,
    componentsWithDesignCount: 0,
    componentsMissingDesignCount: 1,
  }),
};

const docsStore: DocsCatalogStore = {
  getMeta: () => ({
    totalRecordCount: 1,
    sources: {
      docs: 1,
    },
    builtAt: '2026-01-01T00:00:00.000Z',
    available: true,
  }),
  search: ({ query }) => ({
    resultCount: 1,
    results: [
      {
        docId: 'components/button/index',
        title: 'Button',
        section: 'components',
        kind: 'page',
        url: 'https://helios.hashicorp.design/components/button',
        anchor: undefined,
        score: 10,
        rankBucket: 'exact',
        snippet: `Matched query: ${query}`,
      },
    ],
  }),
  readDoc: ({ docId, url, anchor, detail, cursor, maxSections, maxChars }) => ({
    found: true,
    requested: {
      ...(docId === undefined ? {} : { docId }),
      ...(url === undefined ? {} : { url }),
      ...(anchor === undefined ? {} : { anchor }),
      detail: detail ?? 'full',
      ...(cursor === undefined ? {} : { cursor }),
      maxSections,
      maxChars,
    },
    doc: {
      docId: 'components/button/index',
      url: 'https://helios.hashicorp.design/components/button',
      title: 'Button',
      section: 'components',
    },
    sections: [
      {
        heading: 'Usage',
        anchor: 'usage',
        excerpt: 'Buttons trigger actions.',
        url: 'https://helios.hashicorp.design/components/button#usage',
        level: 2,
      },
    ],
  }),
};

const tokenStore: TokenCatalogStore = {
  getMeta: () => ({
    totalTokenCount: 1,
  }),
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
    totalAssetCount: 1,
    categories: ['Interface'],
  }),
  listIcons: () => [
    {
      iconName: 'loading',
      description: 'loading indicator',
      category: 'Interface',
      sizes: ['16'],
      hasMapping: false,
      variants: [
        {
          id: '1:1',
          fileName: 'loading-16',
          size: '16',
          width: 16,
          height: 16,
        },
      ],
    },
  ],
  getIconByName: () => null,
  searchIcons: () => [],
};

const showcaseSnippetsStore: ShowcaseSnippetsCatalogStore = {
  getMeta: () => ({
    available: true,
    totalSnippetCount: 1,
    builtAt: '2026-01-01T00:00:00.000Z',
  }),
  extractSnippets: ({ components, query, limitPerComponent, includeSource }) => ({
    query: query?.trim().toLowerCase() ?? null,
    limitPerComponent,
    includeSource,
    resultCount: 1,
    results: components.map((requestedComponent) => ({
      component: requestedComponent,
      resolvedSlug: requestedComponent,
      snippetCount: requestedComponent === 'button' ? 1 : 0,
      snippets:
        requestedComponent === 'button'
          ? [
              {
                id: `${requestedComponent}:basic.gts`,
                kind: 'example',
                name: 'basic',
                path: 'showcase/app/components/page-components/button/code-fragments/basic.gts',
                language: 'gts',
                source: '<Hds::Button @text="Save" />',
              },
            ]
          : [],
    })),
  }),
};

const setupProtocolPair = async () => {
  const server = new McpServer({
    name: 'hds-mcp-test',
    version: '0.0.0-test',
  });

  registerResources(server, componentStore, tokenStore, iconStore);
  registerTools(
    server,
    componentStore,
    docsStore,
    tokenStore,
    iconStore,
    showcaseSnippetsStore
  );
  registerPrompts(server, componentStore);

  const client = new Client({
    name: 'hds-mcp-client-test',
    version: '0.0.0-test',
  });

  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);

  const close = async () => {
    await Promise.allSettled([client.close(), server.close()]);
  };

  return { client, close };
};

const parseTextContent = <TPayload>(result: unknown) => {
  if (
    typeof result !== 'object' ||
    result === null ||
    !('content' in result) ||
    !Array.isArray(result.content)
  ) {
    throw new Error('Expected tool result to include a content array');
  }

  const textBlock = result.content.find((item) => {
    if (typeof item !== 'object' || item === null) {
      return false;
    }

    return (
      'type' in item &&
      item.type === 'text' &&
      'text' in item &&
      typeof item.text === 'string'
    );
  });

  if (
    textBlock === undefined ||
    typeof textBlock !== 'object' ||
    textBlock === null ||
    !('text' in textBlock) ||
    typeof textBlock.text !== 'string'
  ) {
    throw new Error('Expected tool result to include a text content block');
  }

  return JSON.parse(textBlock.text) as TPayload;
};

const getFirstTextContent = (result: unknown): string => {
  if (
    typeof result !== 'object' ||
    result === null ||
    !('content' in result) ||
    !Array.isArray(result.content)
  ) {
    throw new Error('Expected tool result to include a content array');
  }

  const textBlock = result.content.find((item) => {
    if (typeof item !== 'object' || item === null) {
      return false;
    }

    return (
      'type' in item &&
      item.type === 'text' &&
      'text' in item &&
      typeof item.text === 'string'
    );
  });

  if (
    textBlock === undefined ||
    typeof textBlock !== 'object' ||
    textBlock === null ||
    !('text' in textBlock) ||
    typeof textBlock.text !== 'string'
  ) {
    throw new Error('Expected tool result to include a text content block');
  }

  return textBlock.text;
};

const parseResourcePayload = <TPayload>(result: unknown): TPayload => {
  if (
    typeof result !== 'object' ||
    result === null ||
    !('contents' in result) ||
    !Array.isArray(result.contents)
  ) {
    throw new Error('Expected resource result to include a contents array');
  }

  const firstContent = result.contents[0];

  if (
    firstContent === undefined ||
    typeof firstContent !== 'object' ||
    firstContent === null ||
    !('text' in firstContent) ||
    typeof firstContent.text !== 'string'
  ) {
    throw new Error('Expected text resource content');
  }

  return JSON.parse(firstContent.text) as TPayload;
};

test('protocol list endpoints expose registered tools/resources/prompts', async () => {
  const { client, close } = await setupProtocolPair();

  try {
    const [tools, resources, prompts] = await Promise.all([
      client.listTools(),
      client.listResources(),
      client.listPrompts(),
    ]);

    assert.deepEqual(
      tools.tools.map((tool) => tool.name),
      [
        'hds_search_components',
        'hds_resolve_figma_frame',
        'hds_read_doc',
        'hds_search_docs',
        'hds_search_tokens',
        'hds_search_icons',
        'hds_extract_showcase_snippets',
      ]
    );

    assert.deepEqual(
      resources.resources.map((resource) => resource.uri),
      [
        'hds://manifest/meta',
        'hds://design/mappings',
        'hds://components',
        'hds://tokens',
        'hds://icons',
      ]
    );

    assert.deepEqual(
      prompts.prompts.map((prompt) => prompt.name),
      ['hds_component_usage', 'hds_implement_figma_frame']
    );
  } finally {
    await close();
  }
});

test('protocol tool call returns envelope payload through callTool', async () => {
  const { client, close } = await setupProtocolPair();

  try {
    const toolResult = await client.callTool({
      name: 'hds_search_components',
      arguments: {
        query: 'button',
        limit: 1,
      },
    });

    const payload = parseTextContent<{
      query: string;
      limit: number;
      resultCount: number;
      results: Array<{ slug: string }>;
    }>(toolResult);

    assert.equal(payload.query, 'button');
    assert.equal(payload.limit, 1);
    assert.equal(payload.resultCount, 1);
    assert.equal(payload.results[0]?.slug, 'button');
  } finally {
    await close();
  }
});

test('protocol readResource returns JSON content for static URI resources', async () => {
  const { client, close } = await setupProtocolPair();

  try {
    const resourceResult = await client.readResource({
      uri: 'hds://components',
    });

    const payload = parseResourcePayload<{
      totalComponentCount: number;
      components: Array<{ slug: string }>;
    }>(resourceResult);

    assert.equal(payload.totalComponentCount, 1);
    assert.equal(payload.components[0]?.slug, 'button');
  } finally {
    await close();
  }
});

test('protocol readResource resolves hds://components/{slug} with found payload', async () => {
  const { client, close } = await setupProtocolPair();

  try {
    const resourceResult = await client.readResource({
      uri: 'hds://components/button',
    });

    const payload = parseResourcePayload<{
      found: boolean;
      slug: string;
      component?: { slug: string };
    }>(resourceResult);

    assert.equal(payload.found, true);
    assert.equal(payload.slug, 'button');
    assert.equal(payload.component?.slug, 'button');
  } finally {
    await close();
  }
});

test('protocol readResource resolves hds://components/{slug} not-found payload', async () => {
  const { client, close } = await setupProtocolPair();

  try {
    const resourceResult = await client.readResource({
      uri: 'hds://components/does-not-exist',
    });

    const payload = parseResourcePayload<{
      found: boolean;
      slug: string;
      message: string;
    }>(resourceResult);

    assert.equal(payload.found, false);
    assert.equal(payload.slug, 'does-not-exist');
    assert.equal(payload.message, 'Component not found for provided slug.');
  } finally {
    await close();
  }
});

test('protocol readResource treats encoded slug whitespace as literal slug text', async () => {
  const { client, close } = await setupProtocolPair();

  try {
    const resourceResult = await client.readResource({
      uri: 'hds://components/%20',
    });

    const payload = parseResourcePayload<{
      found: boolean;
      slug: string;
      message: string;
    }>(resourceResult);

    assert.equal(payload.found, false);
    assert.equal(payload.slug, '%20');
    assert.equal(payload.message, 'Component not found for provided slug.');
  } finally {
    await close();
  }
});

test('protocol readResource resolves hds://figma/{fileKey}/nodes/{nodeId} and normalizes node id', async () => {
  const { client, close } = await setupProtocolPair();

  try {
    const resourceResult = await client.readResource({
      uri: 'hds://figma/file-1/nodes/1-1',
    });

    const payload = parseResourcePayload<{
      found: boolean;
      fileKey: string;
      nodeId: string;
      component?: { slug: string };
    }>(resourceResult);

    assert.equal(payload.found, true);
    assert.equal(payload.fileKey, 'file-1');
    assert.equal(payload.nodeId, '1-1');
    assert.equal(payload.component?.slug, 'button');
  } finally {
    await close();
  }
});

test('protocol readResource treats encoded figma whitespace as literal variable text', async () => {
  const { client, close } = await setupProtocolPair();

  try {
    const fileKeyBlankResult = await client.readResource({
      uri: 'hds://figma/%20/nodes/1:1',
    });
    const fileKeyBlankPayload = parseResourcePayload<{
      found: boolean;
      fileKey: string;
      nodeId: string;
      message: string;
    }>(fileKeyBlankResult);

    assert.equal(fileKeyBlankPayload.found, false);
    assert.equal(fileKeyBlankPayload.fileKey, '%20');
    assert.equal(fileKeyBlankPayload.nodeId, '1:1');
    assert.equal(
      fileKeyBlankPayload.message,
      'No design mapping found for this fileKey/nodeId.'
    );

    const nodeIdBlankResult = await client.readResource({
      uri: 'hds://figma/file-1/nodes/%20',
    });
    const nodeIdBlankPayload = parseResourcePayload<{
      found: boolean;
      fileKey: string;
      nodeId: string;
      message: string;
    }>(nodeIdBlankResult);

    assert.equal(nodeIdBlankPayload.found, false);
    assert.equal(nodeIdBlankPayload.fileKey, 'file-1');
    assert.equal(nodeIdBlankPayload.nodeId, '%20');
    assert.equal(
      nodeIdBlankPayload.message,
      'No design mapping found for this fileKey/nodeId.'
    );
  } finally {
    await close();
  }
});

test('protocol getPrompt includes canonical component resource link', async () => {
  const { client, close } = await setupProtocolPair();

  try {
    const promptResult = await client.getPrompt({
      name: 'hds_component_usage',
      arguments: {
        nameOrSlug: 'button',
      },
    });

    const resourceLinkMessage = promptResult.messages.find((message) => {
      return message.content.type === 'resource_link';
    });

    if (
      resourceLinkMessage === undefined ||
      resourceLinkMessage.content.type !== 'resource_link'
    ) {
      throw new Error('Expected prompt response to include a resource_link message');
    }

    assert.equal(resourceLinkMessage.content.uri, 'hds://components/button');
  } finally {
    await close();
  }
});

test('protocol returns invalid params envelope for invalid tool arguments', async () => {
  const { client, close } = await setupProtocolPair();

  try {
    const toolResult = await client.callTool({
      name: 'hds_search_components',
      arguments: {
        query: 'button',
        limit: 0,
      },
    });

    assert.equal(toolResult.isError, true);
    assert.match(getFirstTextContent(toolResult), /MCP error -32602|Invalid arguments/iu);
  } finally {
    await close();
  }
});

test('protocol returns hds_read_doc missing-locator response shape', async () => {
  const { client, close } = await setupProtocolPair();

  try {
    const toolResult = await client.callTool({
      name: 'hds_read_doc',
      arguments: {},
    });

    const payload = parseTextContent<{
      found: boolean;
      sections: unknown[];
      message: string;
    }>(toolResult);

    assert.equal(payload.found, false);
    assert.deepEqual(payload.sections, []);
    assert.equal(payload.message, 'One of docId, url, or cursor is required.');
  } finally {
    await close();
  }
});
