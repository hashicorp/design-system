/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import codeEditorPage from './page';

module('Integration | Component | hds/code-editor/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::CodeEditor id="test-code-editor" />`);
    assert.dom('#test-code-editor').hasClass('hds-code-editor');
  });

  // @title
  test('it should render the component with a title', async function (assert) {
    await render(hbs`<Hds::CodeEditor @title="Test Title" />`);
    assert.dom(codeEditorPage.selectors.title).hasText('Test Title');
  });
  test('it should not render the component with a title when the `@title` argument is not provided', async function (assert) {
    await render(hbs`<Hds::CodeEditor />`);
    assert.dom(codeEditorPage.selectors.title).doesNotExist();
  });

  // @description
  test('it should render the component with a description', async function (assert) {
    await render(hbs`<Hds::CodeEditor @description="Test Description" />`);
    assert.dom(codeEditorPage.selectors.description).hasText('Test Description');
  });
  test('it should not render the component with a description when the `@description` argument is not provided', async function (assert) {
    await render(hbs`<Hds::CodeEditor />`);
    assert.dom(codeEditorPage.selectors.description).doesNotExist();
  });

  // toolbar
  test('it should render custom content in the toolbar when provided', async function (assert) {
    await render(hbs`
      <Hds::CodeEditor as |toolbar|>
        <button id="test-toolbar-button">Test Button</button>
      </Hds::CodeEditor>
    `);
    assert.dom(`${codeEditorPage.selectors.toolbar} #test-toolbar-button`).exists();
  });
  // @canCopy
  test('it should render a copy button when the `@canCopy` argument is true', async function (assert) {
    await render(hbs`<Hds::CodeEditor @canCopy={{true}} />`);
    assert.dom(codeEditorPage.selectors.copyButton).exists();
  });
  test('it should not render a copy button when the `@canCopy` argument is not provided', async function (assert) {
    await render(hbs`<Hds::CodeEditor />`);
    assert.dom(codeEditorPage.selectors.copyButton).doesNotExist();
  });
  // @canExpand
  test('it should render a toggle fullscreen button when the `@canExpand` argument is true', async function (assert) {
    await render(hbs`<Hds::CodeEditor @canExpand={{true}} />`);
    assert.dom(codeEditorPage.selectors.expandButton).exists();
  });
  test('it should not render a toggle fullscreen button when the `@canExpand` argument is not provided', async function (assert) {
    await render(hbs`<Hds::CodeEditor />`);
    assert.dom(codeEditorPage.selectors.expandButton).doesNotExist();
  });

  // @value & editing
  test('it should render the component with the provided value', async function (assert) {
    await render(hbs`<Hds::CodeEditor @value="Test Code" />`);
    assert.dom(codeEditorPage.selectors.codeEditor).includesText('Test Code');
  });
});
