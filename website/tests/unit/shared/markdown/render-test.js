/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupTest } from 'website/tests/helpers';

import { renderMarkdown } from 'website/shared/markdown/render';

module('Unit | Shared | markdown render', function (hooks) {
  setupTest(hooks);

  test('it renders headings, tabs, banners, demos, and removes wrapper paragraphs from doc components', function (assert) {
    const markdown = `
## Title Here

<section data-tab="Guidelines">
### Child Heading

Plain paragraph.

!!! Warning

Warning copy.

!!!

<Doc::Thing />

<?php start="demo-block" filename="example" hbs="template" js="script" gts="" compactGts="" custom="" customLang="" hidePreview="false" expanded="true" ?><?php end="demo-block" ?>
</section>
    `;

    const html = renderMarkdown(markdown);

    assert.true(html.includes('<h2 class="doc-markdown-h2" id="title-here">Title Here</h2>'));
    assert.true(
      html.includes('<section id="guidelines" data-tab="Guidelines">'),
    );
    assert.true(
      html.includes(
        '<h3 class="doc-markdown-h3" id="child-heading">Child Heading</h3>',
      ),
    );
    assert.true(
      html.includes('<p class="doc-markdown-p">Plain paragraph.</p>'),
    );
    assert.true(html.includes('<Doc::Banner @type="warning">'));
    assert.true(
      html.includes('<p class="doc-markdown-p">Warning copy.</p>'),
    );
    assert.true(html.includes('<Doc::Thing />'));
    assert.false(html.includes('<p class="doc-markdown-p"><Doc::Thing /></p>'));
    assert.true(html.includes('<Doc::CodeGroup @filename="example"'));
  });

  test('it renders custom sized inline and reference images without showdown', function (assert) {
    const markdown = `
![kitten inline](/assets/testing/big_cat.png =120x80 "inline title")

![kitten reference][cat]

[cat]: /assets/testing/small_cat.png =250x250 "reference title"
    `;

    const html = renderMarkdown(markdown);

    assert.true(
      html.includes(
        '<img class="doc-markdown-img" src="/assets/testing/big_cat.png" alt="kitten inline" title="inline title" width="120" height="80" />',
      ),
    );
    assert.true(
      html.includes(
        '<img class="doc-markdown-img" src="/assets/testing/small_cat.png" alt="kitten reference" title="reference title" width="250" height="250" />',
      ),
    );
  });

  test('it preserves raw HTML classes for tables, images, and code blocks', function (assert) {
    const markdown = `
<table>
  <thead>
    <tr>
      <th>Column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Value</td>
    </tr>
  </tbody>
</table>

<img src="/assets/testing/raw_cat.png" alt="raw kitten" />

<pre><code class="language-js">const answer = 42;</code></pre>
    `;

    const html = renderMarkdown(markdown);

    assert.true(html.includes('<table class="doc-markdown-table">'));
    assert.true(html.includes('<thead class="doc-markdown-thead">'));
    assert.true(html.includes('<tbody class="doc-markdown-tbody">'));
    assert.true(html.includes('<tr class="doc-markdown-tr">'));
    assert.true(html.includes('<th class="doc-markdown-th">Column</th>'));
    assert.true(html.includes('<td class="doc-markdown-td">Value</td>'));
    assert.true(
      html.includes(
        '<img class="doc-markdown-img" src="/assets/testing/raw_cat.png" alt="raw kitten" />',
      ),
    );
    assert.true(html.includes('<pre class="doc-markdown-pre">'));
    assert.true(
      html.includes(
        '<code class="doc-markdown-code language-js">const answer = 42;</code>',
      ),
    );
  });
});
