/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { click, render, find, settled, waitFor } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';
import sinon from 'sinon';
import type { EditorView } from '@codemirror/view';

import { HdsCodeEditor } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';
import NOOP from 'showcase/utils/noop';

module('Integration | Component | hds/code-editor/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsCodeEditor id="test-code-editor" @ariaLabel="code editor" />
      </template>,
    );
    assert.dom('#test-code-editor').hasClass('hds-code-editor');
  });

  // cspNonce
  test('it should render the injected style tag with the provided `@cspNonce` value', async function (assert) {
    const cspNonce = 'csp-nonce-123';

    await render(
      <template>
        <HdsCodeEditor @cspNonce={{cspNonce}} as |CE|>
          <CE.Title>Test Title</CE.Title>
        </HdsCodeEditor>
      </template>,
    );

    // can't use assert.dom to access elements in head
    assert.ok(document.querySelector(`style[nonce="${cspNonce}"]`));
  });

  // title
  test('it should render the component with a title using the default tag', async function (assert) {
    await render(
      <template>
        <HdsCodeEditor as |CE|>
          <CE.Title>Test Title</CE.Title>
        </HdsCodeEditor>
      </template>,
    );
    assert
      .dom('.hds-code-editor__title')
      .hasTagName('h2')
      .hasText('Test Title');
  });
  test('it should render the component title with a custom tag when provided', async function (assert) {
    await render(
      <template>
        <HdsCodeEditor as |CE|>
          <CE.Title @tag="h1">Test Title</CE.Title>
        </HdsCodeEditor>
      </template>,
    );
    assert.dom('.hds-code-editor__title').hasTagName('h1');
  });
  test('it should not render the component with a title when the `Title` contextual component is not yielded', async function (assert) {
    await render(
      <template><HdsCodeEditor @ariaLabel="code editor" /></template>,
    );
    assert.dom('.hds-code-editor__title').doesNotExist();
  });
  test('when aria-label is not provided and the `Title` contextual component is yielded, it should use the title element id as the aria-labelledby value', async function (assert) {
    await render(
      <template>
        <HdsCodeEditor as |CE|>
          <CE.Title id="test-title">Test Title</CE.Title>
        </HdsCodeEditor>
      </template>,
    );
    assert
      .dom('.hds-code-editor__editor .cm-editor [role="textbox"]')
      .hasAttribute('aria-labelledby', 'test-title');
  });

  // description
  test('it should render the component with a description', async function (assert) {
    await render(
      <template>
        <HdsCodeEditor @ariaLabel="code editor" as |CE|>
          <CE.Description>Test Description</CE.Description>
        </HdsCodeEditor>
      </template>,
    );
    assert.dom('.hds-code-editor__description').hasText('Test Description');
  });
  test('it should not render the component with a description when the `description` contextual component is not yielded', async function (assert) {
    await render(
      <template><HdsCodeEditor @ariaLabel="code editor" /></template>,
    );
    assert.dom('hds-code-editor__description').doesNotExist();
  });
  test('when aria-describedby is not provided and the `Description` contextual component is yielded, it should use the description element id as the aria-describedby value', async function (assert) {
    await render(
      <template>
        <HdsCodeEditor @ariaLabel="code editor" as |CE|>
          <CE.Description id="test-description">
            Test Description
          </CE.Description>
        </HdsCodeEditor>
      </template>,
    );
    assert
      .dom('.hds-code-editor__editor .cm-editor [role="textbox"]')
      .hasAttribute('aria-describedby', 'test-description');
  });

  // yielded block content
  test('it should render custom content in the toolbar when provided', async function (assert) {
    await render(
      <template>
        <HdsCodeEditor @ariaLabel="code editor">
          <button id="test-toolbar-button" type="button">Test Button</button>
        </HdsCodeEditor>
      </template>,
    );
    assert.dom('#test-toolbar-button').exists();
  });
  // @hasCopyButton
  test('it should render a copy button when the `@hasCopyButton` argument is true', async function (assert) {
    await render(
      <template>
        <HdsCodeEditor @ariaLabel="code editor" @hasCopyButton={{true}} />
      </template>,
    );
    assert
      .dom('.hds-code-editor__copy-button')
      .exists()
      .hasAria('label', 'Copy');
  });
  test('it should not render a copy button when the `@hasCopyButton` argument is not provided', async function (assert) {
    await render(
      <template><HdsCodeEditor @ariaLabel="code editor" /></template>,
    );
    assert.dom('.hds-code-editor__copy-button').doesNotExist();
  });
  test('it renders a copy button with custom text', async function (assert) {
    await render(
      <template>
        <HdsCodeEditor
          @ariaLabel="code editor"
          @hasCopyButton={{true}}
          @copyButtonText="Foo"
        />
      </template>,
    );
    assert
      .dom('.hds-code-editor__copy-button')
      .exists()
      .hasAria('label', 'Foo');
  });
  // @isStandalone
  test('it should render the component with a standalone style when the `@isStandalone` argument is true and when the argument is ommitted', async function (assert) {
    const context = new TrackedObject<{ isStandalone: boolean | undefined }>({
      isStandalone: true,
    });

    await render(
      <template>
        <HdsCodeEditor
          @ariaLabel="code editor"
          @isStandalone={{context.isStandalone}}
        />
      </template>,
    );
    assert.dom('.hds-code-editor').hasClass('hds-code-editor--is-standalone');

    context.isStandalone = undefined;
    await settled();
    assert.dom('.hds-code-editor').hasClass('hds-code-editor--is-standalone');

    context.isStandalone = false;
    await settled();
    assert
      .dom('.hds-code-editor')
      .doesNotHaveClass('hds-code-editor--is-standalone');
  });

  // @isLintingEnabled
  test('it should render the component with the correct aria-describedby combination when the `@isLintingEnabled` argument is true and a description is set', async function (assert) {
    await render(
      <template>
        <HdsCodeEditor
          @ariaLabel="code editor"
          @language="json"
          @isLintingEnabled={{true}}
          as |CE|
        >
          <CE.Description id="test-description">Test Description</CE.Description>
        </HdsCodeEditor>
      </template>,
    );

    await waitFor('.cm-editor');

    const editor = find('.hds-code-editor__editor');
    const instructionsId = `lint-panel-instructions-${editor?.id}`;

    assert
      .dom('.cm-editor [role="textbox"]')
      .hasAria('describedby', `test-description ${instructionsId}`);
  });

  // @hasFullScreenButton
  test('it should render a toggle fullscreen button when the `@hasFullScreenButton` argument is true', async function (assert) {
    await render(
      <template>
        <HdsCodeEditor @ariaLabel="code editor" @hasFullScreenButton={{true}} />
      </template>,
    );
    assert.dom('.hds-code-editor__full-screen-button').exists();
  });
  test('it should not render a toggle fullscreen button when the `@hasFullScreenButton` argument is not provided', async function (assert) {
    await render(
      <template><HdsCodeEditor @ariaLabel="code editor" /></template>,
    );
    assert.dom('.hds-code-editor__full-screen-button').doesNotExist();
  });

  // expand/colapse
  test('it should expand the code editor when the toggle full screen button is clicked', async function (assert) {
    await render(
      <template>
        <HdsCodeEditor @ariaLabel="code editor" @hasFullScreenButton={{true}} />
      </template>,
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
    const context = new TrackedObject<{ editorView: EditorView | undefined }>({
      editorView: undefined,
    });

    const handleSetup = (editorView: EditorView) => {
      context.editorView = editorView;
    };

    await render(
      <template>
        <HdsCodeEditor
          @ariaLabel="code editor"
          @hasCopyButton={{true}}
          @value="Test Code"
          @onInput={{NOOP}}
          @onSetup={{handleSetup}}
        />
      </template>,
    );

    await click('.hds-code-editor__copy-button');
    assert.true(clipboardStub.calledWith('Test Code'));

    context.editorView?.dispatch({
      changes: {
        from: context.editorView.state.selection.main.from,
        insert: 'Additional text. ',
      },
    });

    await click('.hds-code-editor__copy-button');
    assert.true(clipboardStub.calledWith('Additional text. Test Code'));

    sinon.restore();
  });

  // @ariaDescribedBy
  test('it should render the component with an aria-describedby when provided', async function (assert) {
    await render(
      <template>
        <HdsCodeEditor
          @ariaLabel="code editor"
          @ariaDescribedBy="test-description"
        />
      </template>,
    );
    assert
      .dom('.hds-code-editor__editor .cm-editor [role="textbox"]')
      .hasAttribute('aria-describedby', 'test-description');
  });

  // @ariaLabel
  test('it should render the component with an aria-label when provided', async function (assert) {
    await render(
      <template><HdsCodeEditor @ariaLabel="Test Code Editor" /></template>,
    );
    assert
      .dom('.hds-code-editor__editor .cm-editor [role="textbox"]')
      .hasAttribute('aria-label', 'Test Code Editor');
  });

  // @ariaLabelledBy
  test('it should render the component with an aria-labelledby when provided', async function (assert) {
    await render(
      <template><HdsCodeEditor @ariaLabelledBy="test-label" /></template>,
    );
    assert
      .dom('.hds-code-editor__editor .cm-editor [role="textbox"]')
      .hasAttribute('aria-labelledby', 'test-label');
  });
  test('it should not render the component with an aria-labbelledby when @ariaLabel is provided as well', async function (assert) {
    await render(
      <template>
        <HdsCodeEditor
          @ariaLabel="Test Code Editor"
          @ariaLabelledBy="test-label"
        />
      </template>,
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
    const context = new TrackedObject({
      hasLineWrapping: true,
    });

    await render(
      <template>
        <HdsCodeEditor
          @ariaLabel="test"
          @hasLineWrapping={{context.hasLineWrapping}}
        />
      </template>,
    );
    assert
      .dom('.hds-code-editor__editor .cm-editor .cm-content')
      .hasClass('cm-lineWrapping');

    context.hasLineWrapping = false;
    await settled();
    assert
      .dom('.hds-code-editor__editor .cm-editor .cm-content')
      .doesNotHaveClass('cm-lineWrapping');
  });

  // @value
  test('it should render the component with the provided value', async function (assert) {
    await render(
      <template>
        <HdsCodeEditor @ariaLabel="code editor" @value="Test Code" />
      </template>,
    );
    assert.dom('.hds-code-editor__editor .cm-editor').includesText('Test Code');
  });

  // @onInput
  test('it should call the onInput action when the code editor value changes', async function (assert) {
    const inputSpy = sinon.spy();
    const context = new TrackedObject<{ editorView: EditorView | undefined }>({
      editorView: undefined,
    });

    const handleSetup = (editorView: EditorView) => {
      context.editorView = editorView;
    };

    await render(
      <template>
        <HdsCodeEditor
          @ariaLabel="code editor"
          @onInput={{inputSpy}}
          @onSetup={{handleSetup}}
        />
      </template>,
    );

    context.editorView?.dispatch({
      changes: {
        from: context.editorView.state.selection.main.from,
        insert: 'Test string',
      },
    });

    assert.ok(inputSpy.calledOnceWith('Test string'));
  });
});
