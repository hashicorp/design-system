/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import {
  click,
  render,
  fillIn,
  triggerEvent,
  waitFor,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

async function setupCodeEditor(hbsTemplate) {
  await render(hbsTemplate);
  return waitFor('.cm-editor');
}

module('Integration | Component | hds/code-editor/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor id="test-code-editor" @ariaLabel="code editor" />`,
    );
    assert.dom('#test-code-editor').hasClass('hds-code-editor');
  });

  // cspNonce
  test('it should render the injected style tag with the provided `@cspNonce` value', async function (assert) {
    const cspNonce = 'csp-nonce-123';

    this.set('cspNonce', cspNonce);

    await setupCodeEditor(
      hbs`<Hds::CodeEditor @cspNonce={{this.cspNonce}} as |CE|><CE.Title>Test Title</CE.Title></Hds::CodeEditor>`,
    );

    // can't use assert.dom to access elements in head
    assert.ok(document.querySelector(`style[nonce="${cspNonce}"]`));
  });

  // title
  test('it should render the component with a title using the default tag', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor as |CE|><CE.Title>Test Title</CE.Title></Hds::CodeEditor>`,
    );
    assert
      .dom('.hds-code-editor__title')
      .hasTagName('h2')
      .hasText('Test Title');
  });
  test('it should render the component title with a custom tag when provided', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor as |CE|><CE.Title @tag="h1">Test Title</CE.Title></Hds::CodeEditor>`,
    );
    assert.dom('.hds-code-editor__title').hasTagName('h1');
  });
  test('it should not render the component with a title when the `Title` contextual component is not yielded', async function (assert) {
    await setupCodeEditor(hbs`<Hds::CodeEditor @ariaLabel="code editor" />`);
    assert.dom('.hds-code-editor__title').doesNotExist();
  });
  test('when aria-label is not provided and the `Title` contextual component is yielded, it should use the title element id as the aria-labelledby value', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor as |CE|><CE.Title id="test-title">Test Title</CE.Title></Hds::CodeEditor>`,
    );
    assert
      .dom('.hds-code-editor__editor .cm-editor [role="textbox"]')
      .hasAttribute('aria-labelledby', 'test-title');
  });

  // description
  test('it should render the component with a description', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor @ariaLabel="code editor" as |CE|><CE.Description>Test Description</CE.Description></Hds::CodeEditor>`,
    );
    assert.dom('.hds-code-editor__description').hasText('Test Description');
  });
  test('it should not render the component with a description when the `description` contextual component is not yielded', async function (assert) {
    await setupCodeEditor(hbs`<Hds::CodeEditor @ariaLabel="code editor" />`);
    assert.dom('hds-code-editor__description').doesNotExist();
  });
  test('when aria-describedby is not provided and the `Description` contextual component is yielded, it should use the description element id as the aria-describedby value', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor @ariaLabel="code editor" as |CE|><CE.Description id="test-description">Test Description</CE.Description></Hds::CodeEditor>`,
    );
    assert
      .dom('.hds-code-editor__editor .cm-editor [role="textbox"]')
      .hasAttribute('aria-describedby', 'test-description');
  });

  // yielded block content
  test('it should render custom content in the toolbar when provided', async function (assert) {
    await setupCodeEditor(hbs`
      <Hds::CodeEditor @ariaLabel="code editor">
        <button id="test-toolbar-button">Test Button</button>
      </Hds::CodeEditor>
    `);
    assert.dom('#test-toolbar-button').exists();
  });
  // @hasCopyButton
  test('it should render a copy button when the `@hasCopyButton` argument is true', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor @ariaLabel="code editor" @hasCopyButton={{true}} />`,
    );
    assert
      .dom('.hds-code-editor__copy-button')
      .exists()
      .hasAria('label', 'Copy');
  });
  test('it should not render a copy button when the `@hasCopyButton` argument is not provided', async function (assert) {
    await setupCodeEditor(hbs`<Hds::CodeEditor @ariaLabel="code editor" />`);
    assert.dom('.hds-code-editor__copy-button').doesNotExist();
  });
  test('it renders a copy button with custom text', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor @ariaLabel="code editor" @hasCopyButton={{true}} @copyButtonText="Foo" />`,
    );
    assert
      .dom('.hds-code-editor__copy-button')
      .exists()
      .hasAria('label', 'Foo');
  });
  // @isStandalone
  test('it should render the component with a standalone style when the `@isStandalone` argument is true and when the argument is ommitted', async function (assert) {
    this.set('isStandalone', true);

    await setupCodeEditor(
      hbs`<Hds::CodeEditor @ariaLabel="code editor" @isStandalone={{this.isStandalone}} />`,
    );
    assert.dom('.hds-code-editor').hasClass('hds-code-editor--is-standalone');

    this.set('isStandalone', undefined);
    assert.dom('.hds-code-editor').hasClass('hds-code-editor--is-standalone');

    this.set('isStandalone', false);
    assert
      .dom('.hds-code-editor')
      .doesNotHaveClass('hds-code-editor--is-standalone');
  });

  // @isLintingEnabled
  test('it should render the component with the correct aria-describedby combination when the `@isLintingEnabled` argument is true and a description is set', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor
  @ariaLabel='code editor'
  @language='json'
  @isLintingEnabled={{true}}
  as |CE|
><CE.Description id="test-description">Test Description</CE.Description></Hds::CodeEditor>`,
    );

    const editorContentElement = document.querySelector(
      '.hds-code-editor__editor .cm-editor [role="textbox"]',
    );
    const ariaDescribedBy =
      editorContentElement.getAttribute('aria-describedby');
    const ariaDescribedByArray = ariaDescribedBy.split(' ');

    assert.ok(ariaDescribedByArray.includes('test-description'));
    assert.ok(
      ariaDescribedByArray.some((id) =>
        id.startsWith('lint-panel-instructions'),
      ),
    );
  });

  // @hasFullScreenButton
  test('it should render a toggle fullscreen button when the `@hasFullScreenButton` argument is true', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor @ariaLabel="code editor" @hasFullScreenButton={{true}} />`,
    );
    assert.dom('.hds-code-editor__full-screen-button').exists();
  });
  test('it should not render a toggle fullscreen button when the `@hasFullScreenButton` argument is not provided', async function (assert) {
    await setupCodeEditor(hbs`<Hds::CodeEditor @ariaLabel="code editor" />`);
    assert.dom('.hds-code-editor__full-screen-button').doesNotExist();
  });

  // expand/colapse
  test('it should expand the code editor when the toggle full screen button is clicked', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor @ariaLabel="code editor" @hasFullScreenButton={{true}} />`,
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
    this.value = 'Test Code';
    const clipboardStub = sinon.stub(window.navigator.clipboard, 'writeText');

    this.setProperties({
      handleInput: (val) => {
        this.set('value', val);
      },
      handleSetup: (editorView) => {
        this.set('editorView', editorView);
      },
    });

    await setupCodeEditor(
      hbs`<Hds::CodeEditor
        @ariaLabel="code editor"
        @hasCopyButton={{true}}
        @value={{this.value}}
        @onInput={{this.handleInput}}
        @onSetup={{this.handleSetup}}
      />`,
    );

    await click('.hds-code-editor__copy-button');
    assert.true(clipboardStub.calledWith('Test Code'));

    const newValue = `Additional text.



      Test Code`;
    this.set('value', newValue);

    await click('.hds-code-editor__copy-button');
    assert.true(clipboardStub.calledWith(newValue));

    sinon.restore();
  });

  // @ariaDescribedBy
  test('it should render the component with an aria-describedby when provided', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor @ariaLabel="code editor" @ariaDescribedBy="test-description" />`,
    );
    assert
      .dom('.hds-code-editor__editor .cm-editor [role="textbox"]')
      .hasAttribute('aria-describedby', 'test-description');
  });

  // @ariaLabel
  test('it should render the component with an aria-label when provided', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor @ariaLabel="Test Code Editor" />`,
    );
    assert
      .dom('.hds-code-editor__editor .cm-editor [role="textbox"]')
      .hasAttribute('aria-label', 'Test Code Editor');
  });

  // @ariaLabelledBy
  test('it should render the component with an aria-labelledby when provided', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor @ariaLabelledBy="test-label" />`,
    );
    assert
      .dom('.hds-code-editor__editor .cm-editor [role="textbox"]')
      .hasAttribute('aria-labelledby', 'test-label');
  });
  test('it should not render the component with an aria-labbelledby when @ariaLabel is provided as well', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor @ariaLabel="Test Code Editor" @ariaLabelledBy="test-label" />`,
    );
    assert
      .dom('.hds-code-editor__editor .cm-editor [role="textbox"]')
      .hasAttribute('aria-label', 'Test Code Editor');
    assert
      .dom('.hds-code-editor__editor .cm-editor [role="textbox"]')
      .doesNotHaveAttribute('aria-labelledby');
  });

  // @hasLineWrapping
  test('it should render the editor with line wrapping enabled when hasLineWrapping is true and not when it is false', async function (assert) {
    this.set('hasLineWrapping', true);

    await setupCodeEditor(
      hbs`<Hds::CodeEditor @ariaLabel="test" @hasLineWrapping={{this.hasLineWrapping}} />`,
    );
    assert
      .dom('.hds-code-editor__editor .cm-editor .cm-content')
      .hasClass('cm-lineWrapping');

    this.set('hasLineWrapping', false);
    assert
      .dom('.hds-code-editor__editor .cm-editor .cm-content')
      .doesNotHaveClass('cm-lineWrapping');
  });

  // @value
  test('it should render the component with the provided value', async function (assert) {
    await setupCodeEditor(
      hbs`<Hds::CodeEditor @ariaLabel="code editor" @value="Test Code" />`,
    );
    assert.dom('.hds-code-editor__editor .cm-editor').includesText('Test Code');
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
      hbs`<Hds::CodeEditor @ariaLabel="code editor" @onInput={{this.handleInput}} @onSetup={{this.handleSetup}} />`,
    );

    // simulate user input
    await click('.cm-content');
    await fillIn('.cm-content', 'Test string');
    await triggerEvent('.cm-content', 'input');

    assert.ok(inputSpy.calledOnceWith('Test string'));
  });
});
