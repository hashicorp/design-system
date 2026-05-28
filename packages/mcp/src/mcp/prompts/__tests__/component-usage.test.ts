/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildComponentUsagePromptMessages,
  registerComponentUsagePrompt,
} from '../component-usage.js';

import type { JsonObject } from '../../../types.js';
import type { ComponentCatalogStore } from '../../../catalogs/components/store.js';

type RegisteredPrompt = {
  name: string;
  config: {
    title?: string;
    description?: string;
    argsSchema?: unknown;
  };
  handler: (args: { nameOrSlug: string; scenario?: string }) => {
    messages: Array<JsonObject>;
  };
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

const buttonComponent = {
  name: 'Button',
  slug: 'button',
  summary: 'Button summary',
  api: {},
};

const accordionComponent = {
  name: 'Accordion',
  slug: 'accordion',
  summary: 'Accordion summary',
  api: {},
};

const createStore = (): ComponentCatalogStore => {
  const components = [buttonComponent, accordionComponent];

  return {
    catalog: {
      generatedAt: '2026-01-01T00:00:00.000Z',
      components,
    },
    getManifestMeta: () => ({
      generatedAt: '2026-01-01T00:00:00.000Z',
      componentCount: components.length,
    }),
    listComponents: () =>
      components.map(({ name, slug, summary }) => ({ name, slug, summary })),
    getAllComponents: () => components,
    getComponentBySlug: (slug) => {
      return components.find((c) => c.slug === slug) ?? null;
    },
    getComponentContext: (nameOrSlug) => {
      const normalized = nameOrSlug
        .trim()
        .toLowerCase()
        .replace(/^hds[-:\s]*/u, '');

      return (
        components.find(
          (c) =>
            c.name.toLowerCase() === normalized ||
            c.slug.toLowerCase() === normalized
        ) ?? null
      );
    },
    getComponentByDesignNode: () => null,
    listDesignMappings: () => [],
    getDesignCoverage: () => ({
      totalComponentCount: components.length,
      componentsWithDesignCount: 0,
      componentsMissingDesignCount: components.length,
    }),
  };
};

test('buildComponentUsagePromptMessages returns framing, resource link, and deliverable on match', () => {
  const messages = buildComponentUsagePromptMessages(createStore(), {
    nameOrSlug: 'Button',
  });

  assert.equal(messages.length, 3);

  const [framing, resource, deliverable] = messages;

  assert.equal(framing?.role, 'user');
  assert.equal(framing?.content.type, 'text');
  assert.match(
    (framing?.content as { type: 'text'; text: string }).text,
    /Button component \(slug: button\)/u
  );

  assert.equal(resource?.role, 'user');
  assert.equal(resource?.content.type, 'resource_link');
  assert.equal(
    (resource?.content as { type: 'resource_link'; uri: string }).uri,
    'hds://components/button'
  );

  assert.equal(deliverable?.content.type, 'text');
  assert.match(
    (deliverable?.content as { type: 'text'; text: string }).text,
    /Deliverable:/u
  );
  assert.match(
    (deliverable?.content as { type: 'text'; text: string }).text,
    /hds_search_docs/u
  );
  assert.match(
    (deliverable?.content as { type: 'text'; text: string }).text,
    /hds_extract_showcase_snippets/u
  );
  assert.match(
    (deliverable?.content as { type: 'text'; text: string }).text,
    /hds_read_doc/u
  );
  assert.match(
    (deliverable?.content as { type: 'text'; text: string }).text,
    /nextCursor/u
  );
  assert.match(
    (deliverable?.content as { type: 'text'; text: string }).text,
    /hds:\/\/components\/\{slug\}.*canonical API source/u
  );
  assert.match(
    (deliverable?.content as { type: 'text'; text: string }).text,
    /snippet `path` values/u
  );
});

test('buildComponentUsagePromptMessages normalizes name variants', () => {
  const variants = ['Button', 'button', 'Hds::Button', '  BUTTON  '];

  for (const variant of variants) {
    const messages = buildComponentUsagePromptMessages(createStore(), {
      nameOrSlug: variant,
    });

    assert.equal(messages.length, 3, `expected match for "${variant}"`);
    assert.equal(
      (messages[1]?.content as { type: 'resource_link'; uri: string }).uri,
      'hds://components/button'
    );
  }
});

test('buildComponentUsagePromptMessages does not embed manifest JSON inline', () => {
  const messages = buildComponentUsagePromptMessages(createStore(), {
    nameOrSlug: 'Button',
  });

  for (const message of messages) {
    if (message.content.type === 'text') {
      // The component summary is manifest-derived; ensure prompt text never
      // inlines it (only user-supplied args and structural guidance allowed).
      assert.ok(
        !message.content.text.includes('Button summary'),
        'prompt text should not inline manifest fields'
      );
    }
  }
});

test('buildComponentUsagePromptMessages includes scenario when provided', () => {
  const messages = buildComponentUsagePromptMessages(createStore(), {
    nameOrSlug: 'button',
    scenario: 'with leading icon',
  });

  const framing = messages[0]?.content;

  assert.equal(framing?.type, 'text');
  assert.match(
    (framing as { type: 'text'; text: string }).text,
    /with leading icon/u
  );
});

test('buildComponentUsagePromptMessages deliverable instructs snippet path citation', () => {
  const messages = buildComponentUsagePromptMessages(createStore(), {
    nameOrSlug: 'button',
  });
  const deliverable = messages[2]?.content;

  assert.equal(deliverable?.type, 'text');
  assert.match((deliverable as { text: string }).text, /snippet `path` values/u);
});

test('buildComponentUsagePromptMessages returns fallback with nearest matches on miss', () => {
  const messages = buildComponentUsagePromptMessages(createStore(), {
    nameOrSlug: 'butt',
  });

  // Single fallback message, no embedded resource.
  assert.equal(messages.length, 1);
  assert.equal(messages[0]?.content.type, 'text');

  const text = (messages[0]?.content as { type: 'text'; text: string }).text;

  assert.match(text, /No HDS component matches "butt"/u);
  assert.match(text, /Button \(slug: button\)/u);
});

test('buildComponentUsagePromptMessages fallback on unknown slug has no resource link', () => {
  const messages = buildComponentUsagePromptMessages(createStore(), {
    nameOrSlug: 'does-not-exist-xyz',
  });

  assert.equal(messages.length, 1);
  assert.equal(messages[0]?.content.type, 'text');
});

test('registerComponentUsagePrompt registers with expected name and metadata', () => {
  const server = new FakeServer();

  registerComponentUsagePrompt(
    server as unknown as Parameters<typeof registerComponentUsagePrompt>[0],
    createStore()
  );

  assert.equal(server.registeredPrompts.length, 1);
  const prompt = server.registeredPrompts[0];

  assert.equal(prompt?.name, 'hds_component_usage');
  assert.equal(prompt?.config.title, 'HDS component usage');

  const response = prompt?.handler({ nameOrSlug: 'Button' });
  assert.equal(response?.messages.length, 3);
});
