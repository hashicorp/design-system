/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { loadDocsCatalog, rankSearchResults } from './store.js';

test('loadDocsCatalog exposes available meta and source counts', () => {
  const store = loadDocsCatalog();
  const meta = store.getMeta();

  assert.equal(meta.available, true);
  assert.ok(meta.totalRecordCount > 0);
  assert.ok(meta.sources.docs > 0);
  assert.notEqual(meta.builtAt, null);
});

test('search returns docs results for a basic query', () => {
  const store = loadDocsCatalog();

  const output = store.search({
    query: 'button',
    scope: 'all',
    limit: 10,
  });

  assert.ok(output.resultCount > 0);
  assert.equal(output.results.length, output.resultCount);

  for (const result of output.results) {
    assert.notEqual(result.title, null);
    assert.notEqual(result.url, null);
    assert.equal(typeof result.score, 'number');
    assert.ok(
      result.rankBucket === 'exact' ||
        result.rankBucket === 'prefix' ||
        result.rankBucket === 'substring' ||
        result.rankBucket === 'other'
    );

    if (result.snippet !== null) {
      assert.ok(result.snippet.length <= 200);
    }
  }
});

test('search scope filtering works for components, content, and componentApi', () => {
  const store = loadDocsCatalog();

  const components = store.search({
    query: 'button',
    scope: 'components',
    limit: 10,
  });
  const content = store.search({
    query: 'writing style',
    scope: 'content',
    limit: 10,
  });
  const componentApi = store.search({
    query: 'isFullWidth',
    scope: 'componentApi',
    limit: 10,
  });

  assert.ok(components.resultCount > 0);
  assert.ok(content.resultCount > 0);
  assert.ok(componentApi.resultCount > 0);

  assert.ok(
    components.results.every((result) => {
      return result.section === 'components';
    })
  );
  assert.ok(content.results.every((result) => result.kind === 'heading'));
  assert.ok(
    componentApi.results.every((result) => result.kind === 'component-api-property')
  );
});

test('rankSearchResults applies deterministic bucket ordering', () => {
  const ranked = rankSearchResults('button', [
    {
      id: 'z-other-high-score',
      score: 999,
      docId: 'misc/cta',
      url: 'https://helios.hashicorp.design/misc/cta',
      title: 'cta',
      section: 'misc',
      kind: 'page',
      snippet: 'not related',
    },
    {
      id: 'b-exact-low-score',
      score: 1,
      docId: 'components/button',
      url: 'https://helios.hashicorp.design/components/button',
      title: 'button',
      section: 'components',
      kind: 'page',
      snippet: 'exact title match',
    },
    {
      id: 'd-prefix-higher-score',
      score: 20,
      docId: 'components/button',
      url: 'https://helios.hashicorp.design/components/button',
      title: 'button anatomy',
      section: 'components',
      kind: 'heading',
      snippet: 'prefix match',
    },
    {
      id: 'c-prefix-lower-score',
      score: 10,
      docId: 'components/button',
      url: 'https://helios.hashicorp.design/components/button',
      title: 'button usage',
      section: 'components',
      kind: 'heading',
      snippet: 'prefix match',
    },
    {
      id: 'f-prefix-tie-a',
      score: 8,
      docId: 'components/button',
      url: 'https://helios.hashicorp.design/components/button',
      title: 'button states',
      section: 'components',
      kind: 'heading',
      snippet: 'prefix tie',
    },
    {
      id: 'g-prefix-tie-b',
      score: 8,
      docId: 'components/button',
      url: 'https://helios.hashicorp.design/components/button',
      title: 'button variants',
      section: 'components',
      kind: 'heading',
      snippet: 'prefix tie',
    },
    {
      id: 'e-substring-mid-score',
      score: 100,
      docId: 'components/button',
      url: 'https://helios.hashicorp.design/components/button',
      title: 'secondary button behavior',
      section: 'components',
      kind: 'paragraph',
      snippet: 'substring match',
    },
  ]);

  assert.deepEqual(
    ranked.map((entry) => entry.id),
    [
      'b-exact-low-score',
      'd-prefix-higher-score',
      'c-prefix-lower-score',
      'f-prefix-tie-a',
      'g-prefix-tie-b',
      'e-substring-mid-score',
      'z-other-high-score',
    ]
  );
});

test('loadDocsCatalog returns unavailable when docs records are absent', () => {
  const store = loadDocsCatalog({
    loadWebsiteDocsRecords: () => [],
  });

  const meta = store.getMeta();

  assert.equal(meta.available, false);
  assert.ok(meta.sources.docs === 0);
  assert.notEqual(meta.message, undefined);

  const output = store.search({
    query: 'loading',
    scope: 'all',
    limit: 10,
  });

  assert.equal(output.resultCount, 0);
  assert.deepEqual(output.results, []);
});

test('readDoc returns doc metadata and bounded sections by docId', () => {
  const store = loadDocsCatalog();

  const output = store.readDoc({
    docId: 'components/button/index',
    maxSections: 2,
    maxChars: 400,
  });

  assert.equal(output.found, true);
  assert.equal(output.doc?.docId, 'components/button/index');
  assert.equal(output.doc?.section, 'components');
  assert.ok((output.sections.length ?? 0) <= 2);
  assert.ok((output.sections[0]?.excerpt.length ?? 0) <= 400);
});

test('readDoc supports url lookup and anchor targeting', () => {
  const store = loadDocsCatalog();

  const output = store.readDoc({
    url: 'https://helios.hashicorp.design/components/button',
    anchor: 'usage',
    maxSections: 1,
    maxChars: 300,
  });

  assert.equal(output.found, true);
  assert.equal(output.doc?.title, 'Button');
  assert.equal(output.sections.length, 1);
  assert.equal(output.sections[0]?.anchor, 'usage');
});

test('readDoc returns distinct heading-bounded sections in deterministic order', () => {
  const store = loadDocsCatalog({
    loadWebsiteDocsRecords: () => [
      {
        id: 'docs:components/example:page',
        source: 'docs',
        docId: 'components/example/index',
        title: 'Example',
        url: 'https://helios.hashicorp.design/components/example',
        kind: 'page',
        section: 'components',
        snippet: 'Example docs',
        scopes: new Set(['components']),
        searchableText: 'example docs',
        contentText: 'fallback text',
        sections: [
          {
            heading: 'Intro',
            anchor: 'intro',
            level: 2,
            text: 'Intro section body.',
            url: 'https://helios.hashicorp.design/components/example#intro',
          },
          {
            heading: 'Installation',
            anchor: 'installation',
            level: 2,
            text: 'Installation section body.',
            url: 'https://helios.hashicorp.design/components/example#installation',
          },
          {
            heading: 'Usage',
            anchor: 'usage',
            level: 2,
            text: 'Usage section body.',
            url: 'https://helios.hashicorp.design/components/example#usage',
          },
        ],
      },
    ],
  });

  const output = store.readDoc({
    docId: 'components/example/index',
    maxSections: 2,
    maxChars: 300,
  });

  assert.equal(output.found, true);
  assert.equal(output.sections.length, 2);
  assert.equal(output.sections[0]?.anchor, 'intro');
  assert.equal(output.sections[1]?.anchor, 'installation');
  assert.notEqual(output.sections[0]?.excerpt, output.sections[1]?.excerpt);
  assert.equal(output.sections[0]?.level, 2);
});

test('readDoc supports anchor start section and warns when anchor is missing', () => {
  const store = loadDocsCatalog({
    loadWebsiteDocsRecords: () => [
      {
        id: 'docs:components/example:page',
        source: 'docs',
        docId: 'components/example/index',
        title: 'Example',
        url: 'https://helios.hashicorp.design/components/example',
        kind: 'page',
        section: 'components',
        snippet: 'Example docs',
        scopes: new Set(['components']),
        searchableText: 'example docs',
        contentText: 'fallback text',
        sections: [
          {
            heading: 'Intro',
            anchor: 'intro',
            level: 2,
            text: 'Intro section body.',
            url: 'https://helios.hashicorp.design/components/example#intro',
          },
          {
            heading: 'Usage',
            anchor: 'usage',
            level: 2,
            text: 'Usage section body.',
            url: 'https://helios.hashicorp.design/components/example#usage',
          },
          {
            heading: 'API',
            anchor: 'api',
            level: 2,
            text: 'API section body.',
            url: 'https://helios.hashicorp.design/components/example#api',
          },
        ],
      },
    ],
  });

  const anchoredOutput = store.readDoc({
    docId: 'components/example/index',
    anchor: 'usage',
    maxSections: 2,
    maxChars: 300,
  });

  assert.equal(anchoredOutput.sections[0]?.anchor, 'usage');
  assert.equal(anchoredOutput.sections[1]?.anchor, 'api');

  const missingAnchorOutput = store.readDoc({
    docId: 'components/example/index',
    anchor: 'does-not-exist',
    maxSections: 2,
    maxChars: 300,
  });

  assert.equal(missingAnchorOutput.sections[0]?.anchor, 'intro');
  assert.match(
    missingAnchorOutput.message ?? '',
    /was not found; returned top sections/iu
  );
});

test('readDoc supports cursor continuation with truncation metadata', () => {
  const store = loadDocsCatalog({
    loadWebsiteDocsRecords: () => [
      {
        id: 'docs:components/example:page',
        source: 'docs',
        docId: 'components/example/index',
        title: 'Example',
        url: 'https://helios.hashicorp.design/components/example',
        kind: 'page',
        section: 'components',
        snippet: 'Example docs',
        scopes: new Set(['components']),
        searchableText: 'example docs',
        contentText: 'fallback text',
        sections: [
          {
            heading: 'Usage',
            anchor: 'usage',
            level: 2,
            text: '1234567890abcdefghij',
            url: 'https://helios.hashicorp.design/components/example#usage',
          },
        ],
      },
    ],
  });

  const first = store.readDoc({
    docId: 'components/example/index',
    anchor: 'usage',
    maxSections: 1,
    maxChars: 10,
  });

  assert.equal(first.sections[0]?.excerpt, '1234567890');
  assert.equal(first.sections[0]?.remainingChars, 10);
  assert.equal(first.nextCursor, first.sections[0]?.nextCursor);

  const cursor = first.nextCursor;

  if (cursor === undefined) {
    throw new Error('Expected continuation cursor for truncated section');
  }

  const second = store.readDoc({
    docId: 'components/example/index',
    cursor,
    maxSections: 1,
    maxChars: 10,
  });

  assert.equal(second.sections[0]?.anchor, 'usage');
  assert.equal(second.sections[0]?.excerpt, 'abcdefghij');
  assert.equal(second.sections[0]?.remainingChars, 0);
  assert.equal(second.nextCursor, undefined);
});

test('readDoc returns not found payload for unknown doc', () => {
  const store = loadDocsCatalog();

  const output = store.readDoc({
    docId: 'components/does-not-exist/index',
    maxSections: 3,
    maxChars: 1200,
  });

  assert.equal(output.found, false);
  assert.equal(output.sections.length, 0);
  assert.equal(output.message, 'Requested doc was not found in the docs catalog.');
});

test('search dedupes by canonical page url and preserves deterministic ranking', () => {
  const store = loadDocsCatalog({
    loadWebsiteDocsRecords: () => [
      {
        id: 'docs:components/button:heading:0',
        source: 'docs',
        docId: 'components/button',
        anchor: 'overview',
        title: 'Button overview',
        url: 'https://helios.hashicorp.design/components/button',
        kind: 'heading',
        section: 'components',
        snippet: 'Overview text',
        scopes: new Set(['components', 'content']),
        searchableText: 'button overview',
        contentText: 'The button overview discusses usage and accessibility.',
      },
      {
        id: 'docs:components/button:component-api:0',
        source: 'docs',
        docId: 'components/button',
        anchor: 'isdisabled',
        title: 'Button API isDisabled',
        url: 'https://helios.hashicorp.design/components/button',
        kind: 'component-api-property',
        section: 'components',
        snippet: 'API property.',
        scopes: new Set(['components', 'componentApi']),
        searchableText: 'button isDisabled component api',
        contentText: 'The isDisabled property disables user interaction.',
      },
      {
        id: 'docs:components/input:page',
        source: 'docs',
        docId: 'components/input',
        title: 'Input',
        url: 'https://helios.hashicorp.design/components/input',
        kind: 'page',
        section: 'components',
        snippet: 'Input docs',
        scopes: new Set(['components']),
        searchableText: 'input component',
        contentText: 'Input component details and examples.',
      },
    ],
  });

  const output = store.search({
    query: 'button',
    scope: 'all',
    limit: 10,
  });

  assert.equal(output.resultCount, 1);
  assert.equal(output.results[0]?.url, 'https://helios.hashicorp.design/components/button');
});

test('search applies relevance floor, emits metadata, and generates match-local snippet', () => {
  const store = loadDocsCatalog({
    loadWebsiteDocsRecords: () => [
      {
        id: 'docs:components/button:page',
        source: 'docs',
        docId: 'components/button',
        title: 'Button',
        url: 'https://helios.hashicorp.design/components/button',
        kind: 'page',
        section: 'components',
        snippet: 'Generic button docs',
        scopes: new Set(['components']),
        searchableText: 'button component',
        contentText:
          'Buttons allow users to trigger actions. Use button variants for primary and secondary actions.',
      },
      {
        id: 'docs:components/card:page',
        source: 'docs',
        docId: 'components/card',
        title: 'Card',
        url: 'https://helios.hashicorp.design/components/card',
        kind: 'page',
        section: 'components',
        snippet: 'Card layout docs',
        scopes: new Set(['components']),
        searchableText: 'card layout container',
        contentText: 'Cards group related information into a surface.',
      },
      {
        id: 'docs:components/button:component-api:0',
        source: 'docs',
        docId: 'components/button',
        anchor: 'isfullwidth',
        title: 'Button API isFullWidth',
        url: 'https://helios.hashicorp.design/components/button',
        kind: 'component-api-property',
        section: 'components',
        snippet: 'Component API property isFullWidth.',
        scopes: new Set(['components', 'componentApi']),
        searchableText: 'button isFullWidth component api',
        contentText: 'isFullWidth makes the button fill the available width.',
      },
    ],
  });

  const output = store.search({
    query: 'isfullwidth',
    scope: 'all',
    limit: 10,
  });

  assert.equal(output.resultCount, 1);

  const result = output.results[0];
  assert.equal(result?.docId, 'components/button');
  assert.equal(result?.anchor, 'isfullwidth');
  assert.equal(result?.rankBucket, 'prefix');
  assert.equal(typeof result?.score, 'number');
  assert.notEqual(result?.snippet, null);
  assert.match(result?.snippet ?? '', /isFullWidth|isfullwidth/u);
});
