/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, waitFor } from '@ember/test-helpers';
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
  test('it should render the component with a title using the default tag', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor as |CE|><CE.Title>Test Title</CE.Title></Hds::CodeEditor>`
    );
    assert
      .dom('.hds-code-editor__title')
      .hasTagName('h2')
      .hasText('Test Title');
  });
  test('it should render the component title with a custom tag when provided', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor as |CE|><CE.Title @tag="h1">Test Title</CE.Title></Hds::CodeEditor>`
    );
    assert.dom('.hds-code-editor__title').hasTagName('h1');
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
  // @hasFullScreenButton
  test('it should render a toggle fullscreen button when the `@hasFullScreenButton` argument is true', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor @hasFullScreenButton={{true}} />`
    );
    assert.dom('.hds-code-editor__full-screen-button').exists();
  });
  test('it should not render a toggle fullscreen button when the `@hasFullScreenButton` argument is not provided', async function (assert) {
    await setupCodeEditor(hbs`<Hds::CodeEditor />`);
    assert.dom('.hds-code-editor__full-screen-button').doesNotExist();
  });

  // expand/colapse
  test('it should expand the code editor when the toggle full screen button is clicked', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor @hasFullScreenButton={{true}} />`
    );
    // initial state
    assert
      .dom('.hds-code-editor')
      .doesNotHaveClass('hds-code-editor--is-full-screen');
    assert
      .dom('.hds-code-editor__full-screen-button')
      .doesNotHaveAttribute('aria-pressed');
    assert
      .dom('.hds-code-editor__full-screen-button .hds-icon')
      .hasAttribute('data-test-icon', 'maximize');

    // expanded
    await click('.hds-code-editor__full-screen-button');
    assert.dom('.hds-code-editor').hasClass('hds-code-editor--is-full-screen');
    assert
      .dom('.hds-code-editor__full-screen-button')
      .hasAttribute('aria-pressed');
    assert
      .dom('.hds-code-editor__full-screen-button .hds-icon')
      .hasAttribute('data-test-icon', 'minimize');

    // collapsed
    await click('.hds-code-editor__full-screen-button');
    assert
      .dom('.hds-code-editor')
      .doesNotHaveClass('hds-code-editor--is-full-screen');
    assert
      .dom('.hds-code-editor__full-screen-button')
      .doesNotHaveAttribute('aria-pressed');
    assert
      .dom('.hds-code-editor__full-screen-button .hds-icon')
      .hasAttribute('data-test-icon', 'maximize');
  });

  // copy
  test('it should copy the code editor value to the clipboard when the copy button is clicked', async function (assert) {
    const clipboardStub = sinon.stub(window.navigator.clipboard, 'writeText');

    await setupCodeEditor(
      hbs`<Hds::CodeEditor @hasCopyButton={{true}} @value="Test Code" />`
    );

    await click('.hds-code-editor__copy-button');
    assert.true(clipboardStub.calledOnce);
    assert.true(clipboardStub.calledWith('Test Code'));

    sinon.restore();
  });

  // @value
  test('it should render the component with the provided value', async function (assert) {
    await setupCodeEditor(hbs`<Hds::CodeEditor @value="Test Code" />`);
    assert.dom('.hds-code-editor__editor').includesText('Test Code');
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
