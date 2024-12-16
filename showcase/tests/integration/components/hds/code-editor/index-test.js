/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const selectors = {
  title: '.hds-code-editor__title',
  description: '.hds-code-editor__description',
  codeEditor: '.hds-code-editor__editor',
  toolbar: '.hds-code-editor__header-toolbar',
  copyButton: '.hds-code-editor__copy-button',
  expandButton: '.hds-code-editor__expand-button',
};

module('Integration | Component | hds/code-editor/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::CodeEditor id="test-code-editor" />`);
    assert.dom('#test-code-editor').hasClass('hds-code-editor');
  });

  // title
  test('it should render the component with a title', async function (assert) {
    await render(
      hbs`<Hds::CodeEditor as |CE|><CE.Title>Test Title</CE.Title></Hds::CodeEditor>`
    );
    assert.dom(selectors.title).hasText('Test Title');
  });
  test('it should not render the component with a title when the `title` contextual component is not yielded', async function (assert) {
    await render(hbs`<Hds::CodeEditor />`);
    assert.dom(selectors.title).doesNotExist();
  });

  // description
  test('it should render the component with a description', async function (assert) {
    await render(
      hbs`<Hds::CodeEditor as |CE|><CE.Description>Test Description</CE.Description></Hds::CodeEditor>`
    );
    assert.dom(selectors.description).hasText('Test Description');
  });
  test('it should not render the component with a description when the `description` contextual component is not yielded', async function (assert) {
    await render(hbs`<Hds::CodeEditor />`);
    assert.dom(selectors.description).doesNotExist();
  });

  // toolbar
  test('it should render custom content in the toolbar when provided', async function (assert) {
    await render(hbs`
      <Hds::CodeEditor>
        <button id="test-toolbar-button">Test Button</button>
      </Hds::CodeEditor>
    `);
    assert.dom(`${selectors.toolbar} #test-toolbar-button`).exists();
  });
  // @hasCopyButton
  test('it should render a copy button when the `@hasCopyButton` argument is true', async function (assert) {
    await render(hbs`<Hds::CodeEditor @hasCopyButton={{true}} />`);
    assert.dom(selectors.copyButton).exists();
  });
  test('it should not render a copy button when the `@hasCopyButton` argument is not provided', async function (assert) {
    await render(hbs`<Hds::CodeEditor />`);
    assert.dom(selectors.copyButton).doesNotExist();
  });
  // @hasExpandButton
  test('it should render a toggle fullscreen button when the `@hasExpandButton` argument is true', async function (assert) {
    await render(hbs`<Hds::CodeEditor @hasExpandButton={{true}} />`);
    assert.dom(selectors.expandButton).exists();
  });
  test('it should not render a toggle fullscreen button when the `@hasExpandButton` argument is not provided', async function (assert) {
    await render(hbs`<Hds::CodeEditor />`);
    assert.dom(selectors.expandButton).doesNotExist();
  });

  // @value & editing
  test('it should render the component with the provided value', async function (assert) {
    await render(hbs`<Hds::CodeEditor @value="Test Code" />`);
    assert.dom(selectors.codeEditor).includesText('Test Code');
  });
});
