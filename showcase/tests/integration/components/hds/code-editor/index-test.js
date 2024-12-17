/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

async function setupCodeEditor(hbsTemplate) {
  await render(hbsTemplate);
  return waitFor('.cm-editor');
}

module('Integration | Component | hds/code-editor/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await setupCodeEditor(hbs`<Hds::CodeEditor id="test-code-editor" />`);
    assert.dom('#test-code-editor').hasClass('hds-code-editor');
  });

  // title
  test('it should render the component with a title', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor as |CE|><CE.Title>Test Title</CE.Title></Hds::CodeEditor>`
    );
    assert.dom('.hds-code-editor__title').hasText('Test Title');
  });
  test('it should not render the component with a title when the `title` contextual component is not yielded', async function (assert) {
    await setupCodeEditor(hbs`<Hds::CodeEditor />`);
    assert.dom('.hds-code-editor__title').doesNotExist();
  });

  // description
  test('it should render the component with a description', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor as |CE|><CE.Description>Test Description</CE.Description></Hds::CodeEditor>`
    );
    assert.dom('.hds-code-editor__description').hasText('Test Description');
  });
  test('it should not render the component with a description when the `description` contextual component is not yielded', async function (assert) {
    await setupCodeEditor(hbs`<Hds::CodeEditor />`);
    assert.dom('hds-code-editor__description').doesNotExist();
  });

  // yielded block content
  test('it should render custom content in the toolbar when provided', async function (assert) {
    await setupCodeEditor(hbs`
      <Hds::CodeEditor>
        <button id="test-toolbar-button">Test Button</button>
      </Hds::CodeEditor>
    `);
    assert.dom('#test-toolbar-button').exists();
  });
  // @hasCopyButton
  test('it should render a copy button when the `@hasCopyButton` argument is true', async function (assert) {
    await setupCodeEditor(hbs`<Hds::CodeEditor @hasCopyButton={{true}} />`);
    assert.dom('.hds-code-editor__copy-button').exists();
  });
  test('it should not render a copy button when the `@hasCopyButton` argument is not provided', async function (assert) {
    await setupCodeEditor(hbs`<Hds::CodeEditor />`);
    assert.dom('.hds-code-editor__copy-button').doesNotExist();
  });
  // @hasExpandButton
  test('it should render a toggle fullscreen button when the `@hasExpandButton` argument is true', async function (assert) {
    await setupCodeEditor(hbs`<Hds::CodeEditor @hasExpandButton={{true}} />`);
    assert.dom('.hds-code-editor__expand-button').exists();
  });
  test('it should not render a toggle fullscreen button when the `@hasExpandButton` argument is not provided', async function (assert) {
    await setupCodeEditor(hbs`<Hds::CodeEditor />`);
    assert.dom('.hds-code-editor__expand-button').doesNotExist();
  });

  // @value
  test('it should render the component with the provided value', async function (assert) {
    await setupCodeEditor(hbs`<Hds::CodeEditor @value="Test Code" />`);
    assert.dom('hds-code-editor__editor').includesText('Test Code');
  });

  // @onInput
  test('it should call the onInput action when the code editor value changes', async function (assert) {
    const inputSpy = sinon.spy();

    this.setProperties({
      handleInput: inputSpy,
      handleSetup: (editorView) => {
        this.set('editorView', editorView);
      },
    });

    await setupCodeEditor(
      hbs`<Hds::CodeEditor @onInput={{this.handleInput}} @onSetup={{this.handleSetup}} />`
    );

    this.editorView.dispatch({
      changes: {
        from: this.editorView.state.selection.main.from,
        insert: 'Test string',
      },
    });

    assert.ok(inputSpy.calledOnceWith('Test string'));
  });
});
