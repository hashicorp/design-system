/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildImplementFigmaFramePromptMessages,
  parseNodeIds,
  registerImplementFigmaFramePrompt,
} from '../implement-figma-frame.js';

import type { ComponentCatalogStore } from '../../../catalogs/components/store.js';
import type { JsonObject } from '../../../types.js';

type RegisteredPrompt = {
  name: string;
  config: {
    title?: string;
    description?: string;
    argsSchema?: unknown;
  };
  handler: (args: {
    fileKey: string;
    nodeIds: string;
    framework?: string;
    notes?: string;
  }) => { messages: Array<JsonObject> };
};

class FakeServer {
  registeredPrompts: RegisteredPrompt[] = [];

  registerPrompt(
    name: string,
    config: RegisteredPrompt['config'],
    handler: RegisteredPrompt['handler']
  ): void {
    this.registeredPrompts.push({ name, config, handler });
  }
}

const createStore = (): ComponentCatalogStore => {
  return {
    catalog: {
      generatedAt: '2026-01-01T00:00:00.000Z',
      components: [],
    },
    getManifestMeta: () => ({
      generatedAt: '2026-01-01T00:00:00.000Z',
      componentCount: 0,
    }),
    listComponents: () => [],
    getAllComponents: () => [],
    getComponentBySlug: () => null,
    getComponentContext: () => null,
    getComponentByDesignNode: () => null,
    listDesignMappings: () => [],
    getDesignCoverage: () => ({
      totalComponentCount: 0,
      componentsWithDesignCount: 0,
      componentsMissingDesignCount: 0,
    }),
  };
};

test('parseNodeIds splits on commas, spaces, and newlines', () => {
  assert.deepEqual(parseNodeIds('1:2, 3:4 5:6\n7:8'), [
    '1:2',
    '3:4',
    '5:6',
    '7:8',
  ]);
});

test('parseNodeIds drops empty entries', () => {
  assert.deepEqual(parseNodeIds(' , , 1:2 ,, '), ['1:2']);
});

test('parseNodeIds dedupes values while preserving first-seen order', () => {
  assert.deepEqual(parseNodeIds('1:2, 3:4 1:2\n5:6 3:4'), [
    '1:2',
    '3:4',
    '5:6',
  ]);
});

test('buildImplementFigmaFramePromptMessages emits framing, manifest meta, one resource link per node, and workflow', () => {
  const messages = buildImplementFigmaFramePromptMessages(createStore(), {
    fileKey: 'FILEKEY',
    nodeIds: ['1:2', '3:4'],
    framework: 'ember',
  });

  // framing + manifest meta + 2 node resources + workflow
  assert.equal(messages.length, 5);

  const [framing, manifestMeta, node1, node2, workflow] = messages;

  assert.equal(framing?.content.type, 'text');
  assert.match(
    (framing?.content as { type: 'text'; text: string }).text,
    /Figma fileKey: FILEKEY/u
  );

  assert.equal(manifestMeta?.content.type, 'resource_link');
  assert.equal(
    (manifestMeta?.content as { type: 'resource_link'; uri: string }).uri,
    'hds://manifest/meta'
  );

  assert.equal(node1?.content.type, 'resource_link');
  assert.equal(
    (node1?.content as { type: 'resource_link'; uri: string }).uri,
    'hds://figma/FILEKEY/nodes/1%3A2'
  );

  assert.equal(node2?.content.type, 'resource_link');
  assert.equal(
    (node2?.content as { type: 'resource_link'; uri: string }).uri,
    'hds://figma/FILEKEY/nodes/3%3A4'
  );

  assert.equal(workflow?.content.type, 'text');
  assert.match(
    (workflow?.content as { type: 'text'; text: string }).text,
    /hds_resolve_figma_frame/u
  );
  assert.match(
    (workflow?.content as { type: 'text'; text: string }).text,
    /hds_extract_showcase_snippets/u
  );
});

test('buildImplementFigmaFramePromptMessages preserves node order', () => {
  const messages = buildImplementFigmaFramePromptMessages(createStore(), {
    fileKey: 'FILEKEY',
    nodeIds: ['c', 'a', 'b'],
    framework: 'ember',
  });

  const resourceLinks = messages
    .filter((m) => m.content.type === 'resource_link')
    .map((m) => (m.content as { uri: string }).uri);

  assert.deepEqual(resourceLinks, [
    'hds://manifest/meta',
    'hds://figma/FILEKEY/nodes/c',
    'hds://figma/FILEKEY/nodes/a',
    'hds://figma/FILEKEY/nodes/b',
  ]);
});

test('registerImplementFigmaFramePrompt dedupes repeated nodeIds from prompt input', () => {
  const server = new FakeServer();

  registerImplementFigmaFramePrompt(
    server as unknown as Parameters<
      typeof registerImplementFigmaFramePrompt
    >[0],
    createStore()
  );

  const prompt = server.registeredPrompts[0];

  const response = prompt?.handler({
    fileKey: 'FILEKEY',
    nodeIds: '1:2, 3:4, 1:2 3:4',
  });

  const resourceLinks =
    response?.messages
      .map((message) => message as { content: { type: string; uri?: string } })
      .filter((message) => message.content.type === 'resource_link')
      .map((message) => message.content.uri)
      .filter((uri): uri is string => typeof uri === 'string') ?? [];

  assert.deepEqual(resourceLinks, [
    'hds://manifest/meta',
    'hds://figma/FILEKEY/nodes/1%3A2',
    'hds://figma/FILEKEY/nodes/3%3A4',
  ]);
});

test('buildImplementFigmaFramePromptMessages workflow text includes capability-described Figma MCP hint', () => {
  const messages = buildImplementFigmaFramePromptMessages(createStore(), {
    fileKey: 'FILEKEY',
    nodeIds: ['1:2'],
    framework: 'ember',
  });

  const workflowText = (
    messages[messages.length - 1]?.content as { type: 'text'; text: string }
  ).text;

  // Capability-described, not a hard requirement on a specific tool name.
  assert.match(workflowText, /Optional Figma MCP integration/u);
  assert.match(workflowText, /a tool like .*get_code.*get_figma_data/u);
  assert.match(
    workflowText,
    /HDS manifest is the source of truth for component APIs/u
  );
  assert.match(workflowText, /If no such Figma MCP capability is available/u);
  assert.match(workflowText, /hds_search_docs/u);
  assert.match(workflowText, /hds_read_doc/u);
  assert.match(workflowText, /snippet `path` values/u);
  assert.match(workflowText, /nextCursor/u);
  assert.match(
    workflowText,
    /Treat `hds_search_docs` as discovery only; do not cite guidance from search snippets alone/u
  );
});

test('buildImplementFigmaFramePromptMessages selects gts deliverable fence when framework is gts', () => {
  const messages = buildImplementFigmaFramePromptMessages(createStore(), {
    fileKey: 'FILEKEY',
    nodeIds: ['1:2'],
    framework: 'gts',
  });

  const workflowText = (
    messages[messages.length - 1]?.content as { type: 'text'; text: string }
  ).text;

  assert.match(workflowText, /```gts/u);
  assert.doesNotMatch(workflowText, /```hbs/u);
});

test('buildImplementFigmaFramePromptMessages includes notes when provided', () => {
  const messages = buildImplementFigmaFramePromptMessages(createStore(), {
    fileKey: 'FILEKEY',
    nodeIds: ['1:2'],
    framework: 'ember',
    notes: 'this is a destructive flow',
  });

  const framingText = (messages[0]?.content as { type: 'text'; text: string })
    .text;

  assert.match(framingText, /this is a destructive flow/u);
});

test('buildImplementFigmaFramePromptMessages returns a single error message when nodeIds is empty', () => {
  const messages = buildImplementFigmaFramePromptMessages(createStore(), {
    fileKey: 'FILEKEY',
    nodeIds: [],
    framework: 'ember',
  });

  assert.equal(messages.length, 1);
  assert.equal(messages[0]?.content.type, 'text');
});

test('buildImplementFigmaFramePromptMessages returns a single error message when fileKey is empty', () => {
  const messages = buildImplementFigmaFramePromptMessages(createStore(), {
    fileKey: '   ',
    nodeIds: ['1:2'],
    framework: 'ember',
  });

  assert.equal(messages.length, 1);
});

test('buildImplementFigmaFramePromptMessages rejects more than 200 nodeIds', () => {
  const nodeIds = Array.from({ length: 201 }, (_, i) => `n:${i}`);

  const messages = buildImplementFigmaFramePromptMessages(createStore(), {
    fileKey: 'FILEKEY',
    nodeIds,
    framework: 'ember',
  });

  assert.equal(messages.length, 1);
  assert.match(
    (messages[0]?.content as { type: 'text'; text: string }).text,
    /Too many node IDs/u
  );
});

test('buildImplementFigmaFramePromptMessages does not inline manifest JSON anywhere', () => {
  const messages = buildImplementFigmaFramePromptMessages(createStore(), {
    fileKey: 'FILEKEY',
    nodeIds: ['1:2'],
    framework: 'ember',
  });

  for (const message of messages) {
    if (message.content.type === 'text') {
      assert.ok(
        !message.content.text.includes('2026-01-01T00:00:00.000Z'),
        'prompt text should not inline manifest fields'
      );
    }
  }
});

test('registerImplementFigmaFramePrompt registers with expected name and parses nodeIds string', () => {
  const server = new FakeServer();

  registerImplementFigmaFramePrompt(
    server as unknown as Parameters<
      typeof registerImplementFigmaFramePrompt
    >[0],
    createStore()
  );

  assert.equal(server.registeredPrompts.length, 1);
  const prompt = server.registeredPrompts[0];

  assert.equal(prompt?.name, 'hds_implement_figma_frame');

  const response = prompt?.handler({
    fileKey: 'FILEKEY',
    nodeIds: '1:2, 3:4',
  });

  // framing + manifest meta + 2 node resources + workflow
  assert.equal(response?.messages.length, 5);
});

test('registerImplementFigmaFramePrompt defaults framework to ember when omitted or unknown', () => {
  const server = new FakeServer();

  registerImplementFigmaFramePrompt(
    server as unknown as Parameters<
      typeof registerImplementFigmaFramePrompt
    >[0],
    createStore()
  );

  const prompt = server.registeredPrompts[0];

  // Omitted
  const omitted = prompt?.handler({ fileKey: 'FILEKEY', nodeIds: '1:2' });
  const omittedText = (
    omitted?.messages[omitted.messages.length - 1] as {
      content: { text: string };
    }
  ).content.text;
  assert.match(omittedText, /```hbs/u);

  // Unknown value
  const unknown = prompt?.handler({
    fileKey: 'FILEKEY',
    nodeIds: '1:2',
    framework: 'react',
  });
  const unknownText = (
    unknown?.messages[unknown.messages.length - 1] as {
      content: { text: string };
    }
  ).content.text;
  assert.match(unknownText, /```hbs/u);
});
