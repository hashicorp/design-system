import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

async function setupCodeEditor(hbsTemplate) {
  await render(hbsTemplate);
  return waitFor('.cm-editor');
}

module('Integration | Modifier | hds-code-editor', function (hooks) {
  setupRenderingTest(hooks);

  test('it converts the element it is applied to into a CodeMirror editor', async function (assert) {
    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor}}></div>`
    );
    assert
      .dom('#code-editor-wrapper .cm-editor')
      .exists('code editor is rendered');
  });

  // value
  test('it should render the component with the provided value', async function (assert) {
    await setupCodeEditor(hbs`<Hds::CodeEditor @value="Test Code" />`);
    assert.dom('.hds-code-editor__editor').includesText('Test Code');
  });

  // onInput
  test('it should call the onInput action when the code editor value changes', async function (assert) {
    const inputSpy = sinon.spy();

    this.setProperties({
      handleInput: inputSpy,
      handleSetup: (editorView) => {
        this.set('editorView', editorView);
      },
    });

    await setupCodeEditor(
      hbs`<div {{hds-code-editor onInput=this.handleInput onSetup=this.handleSetup}} />`
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
