/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { registerReadDocTool } from '../read-doc.js';

import type { DocsCatalogStore } from '../../../catalogs/docs/store.js';

type RegisteredTool = {
  name: string;
  handler: (input: {
    docId?: string;
    url?: string;
    anchor?: string;
    detail?: 'full' | 'summary';
    cursor?: string;
    maxSections: number;
    maxChars: number;
  }) => Promise<{ content: Array<{ text: string }> }>;
};

class FakeServer {
  registeredTools: RegisteredTool[] = [];

  registerTool(
    name: string,
    _config: unknown,
    handler: RegisteredTool['handler']
  ): void {
    this.registeredTools.push({
      name,
      handler,
    });
  }
}

const createDocsStore = (): DocsCatalogStore => {
  return {
    getMeta: () => ({
      totalRecordCount: 1,
      sources: {
        docs: 1,
      },
      builtAt: '2026-01-01T00:00:00.000Z',
      available: true,
    }),
    search: () => ({
      resultCount: 0,
      results: [],
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
          excerpt: 'Use for actions and events.',
          url: 'https://helios.hashicorp.design/components/button#usage',
        },
      ],
    }),
  };
};

test('registerReadDocTool requires docId, url, or cursor', async () => {
  const server = new FakeServer();

  registerReadDocTool(
    server as unknown as Parameters<typeof registerReadDocTool>[0],
    createDocsStore()
  );

  const tool = server.registeredTools[0];

  if (tool === undefined) {
    throw new Error('Expected hds_read_doc to be registered');
  }

  const response = await tool.handler({
    maxSections: 3,
    maxChars: 1200,
  });
  const payload = JSON.parse(response.content[0]?.text ?? '{}') as {
    found: boolean;
    requested: {
      detail: 'full' | 'summary';
    };
    message: string;
  };

  assert.equal(tool.name, 'hds_read_doc');
  assert.equal(payload.found, false);
  assert.equal(payload.requested.detail, 'full');
  assert.equal(payload.message, 'One of docId, url, or cursor is required.');
});

test('registerReadDocTool allows cursor-only continuation', async () => {
  const server = new FakeServer();

  registerReadDocTool(
    server as unknown as Parameters<typeof registerReadDocTool>[0],
    createDocsStore()
  );

  const tool = server.registeredTools[0];

  if (tool === undefined) {
    throw new Error('Expected hds_read_doc to be registered');
  }

  const response = await tool.handler({
    cursor: 'cursor-token',
    detail: 'summary',
    maxSections: 1,
    maxChars: 500,
  });
  const payload = JSON.parse(response.content[0]?.text ?? '{}') as {
    found: boolean;
    requested: {
      cursor?: string;
      detail: 'full' | 'summary';
    };
  };

  assert.equal(payload.found, true);
  assert.equal(payload.requested.cursor, 'cursor-token');
  assert.equal(payload.requested.detail, 'summary');
});

test('registerReadDocTool defaults detail to full', async () => {
  const server = new FakeServer();

  registerReadDocTool(
    server as unknown as Parameters<typeof registerReadDocTool>[0],
    createDocsStore()
  );

  const tool = server.registeredTools[0];

  if (tool === undefined) {
    throw new Error('Expected hds_read_doc to be registered');
  }

  const response = await tool.handler({
    docId: 'components/button/index',
    maxSections: 1,
    maxChars: 200,
  });
  const payload = JSON.parse(response.content[0]?.text ?? '{}') as {
    requested: {
      detail: 'full' | 'summary';
    };
  };

  assert.equal(payload.requested.detail, 'full');
});

test('registerReadDocTool returns docs store payload', async () => {
  const server = new FakeServer();

  registerReadDocTool(
    server as unknown as Parameters<typeof registerReadDocTool>[0],
    createDocsStore()
  );

  const tool = server.registeredTools[0];

  if (tool === undefined) {
    throw new Error('Expected hds_read_doc to be registered');
  }

  const response = await tool.handler({
    docId: 'components/button/index',
    anchor: 'usage',
    detail: 'summary',
    cursor: 'cursor-token',
    maxSections: 2,
    maxChars: 500,
  });
  const payload = JSON.parse(response.content[0]?.text ?? '{}') as {
    found: boolean;
    requested: {
      docId?: string;
      anchor?: string;
      detail: 'full' | 'summary';
      cursor?: string;
      maxSections: number;
      maxChars: number;
    };
    doc?: {
      docId: string;
      title: string;
    };
    sections: Array<{ heading: string }>;
  };

  assert.equal(payload.found, true);
  assert.equal(payload.requested.docId, 'components/button/index');
  assert.equal(payload.requested.anchor, 'usage');
  assert.equal(payload.requested.detail, 'summary');
  assert.equal(payload.requested.cursor, 'cursor-token');
  assert.equal(payload.requested.maxSections, 2);
  assert.equal(payload.requested.maxChars, 500);
  assert.equal(payload.doc?.docId, 'components/button/index');
  assert.equal(payload.doc?.title, 'Button');
  assert.equal(payload.sections[0]?.heading, 'Usage');
});
