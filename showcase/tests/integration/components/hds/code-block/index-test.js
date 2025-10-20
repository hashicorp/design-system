/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import {
  render,
  settled,
  resetOnerror,
  setupOnerror,
  click,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | hds/code-block/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" id="test-code-block" />
    `);
    assert.dom('#test-code-block').hasClass('hds-code-block');
  });

  // CONTENT

  test('it renders the passed in code text content', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" id="test-code-block" />
    `);
    assert
      .dom('#test-code-block pre code')
      .containsText("console.log('Hello world');");
  });

  // DYNAMIC CONTENT

  test('it renders the passed in dynamic content', async function (assert) {
    this.set('value', "console.log('Hello world');");
    await render(hbs`
      <Hds::CodeBlock @value={{this.value}} id="test-code-block" />
    `);
    assert
      .dom('#test-code-block pre code')
      .hasText("console.log('Hello world');");
    this.set('value', "console.log('Lorem ipsum');");
    await settled();
    assert
      .dom('#test-code-block pre code')
      .hasText("console.log('Lorem ipsum');");
  });

  // CONTEXTUAL COMPONENTS

  test('it renders the contextual components', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" id="test-code-block" as |CB|>
        <CB.Title>Title</CB.Title>
        <CB.Description>Description</CB.Description>
      </Hds::CodeBlock>
    `);
    let titleId = document
      .querySelector('.hds-code-block__title')
      .getAttribute('id');
    assert.dom('.hds-code-block__code').hasAria('labelledby', titleId);
    assert.dom('.hds-code-block__title').hasText('Title');
    let descriptionId = document
      .querySelector('.hds-code-block__description')
      .getAttribute('id');
    assert.dom('.hds-code-block__code').hasAria('describedby', descriptionId);
    assert.dom('.hds-code-block__description').hasText('Description');
  });

  test('it renders the title as a p when the @tag argument is not provided', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" id="test-code-block" as |CB|>
        <CB.Title>Title</CB.Title>
      </Hds::CodeBlock>
    `);
    assert.dom('.hds-code-block__title').hasTagName('p');
  });

  test('it renders the title as the custom title tag when the @tag argument is provided', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" id="test-code-block" as |CB|>
        <CB.Title @tag='h2'>Title</CB.Title>
      </Hds::CodeBlock>
    `);
    assert.dom('.hds-code-block__title').hasTagName('h2');
  });

  // OPTIONS

  // ariaLabel
  test('it sets the aria-label property to the value provided', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @ariaLabel="test" id="test-code-block" />
    `);
    assert.dom('.hds-code-block__code').hasAria('label', 'test');
  });

  // ariaLabelledBy
  test('it sets the aria-labelledby property to the value provided', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @ariaLabelledBy="test-id" id="test-code-block" />
    `);
    assert.dom('.hds-code-block__code').hasAria('labelledby', 'test-id');
  });
  test('it does not set the aria-labelledby property to the value provided if an ariaLabel argument is set', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @ariaLabel="test" @ariaLabelledBy="test-id" id="test-code-block" />
    `);
    assert.dom('.hds-code-block__code').doesNotHaveAria('labelledby');
  });

  // ariaDescribedBy
  test('it sets the aria-describedby property to the value provided', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @ariaDescribedBy="test-id" id="test-code-block" />
    `);
    assert.dom('.hds-code-block__code').hasAria('describedby', 'test-id');
  });

  // isStandalone
  test('it has rounded corners by default', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" id="test-code-block" />
    `);
    assert.dom('#test-code-block').hasClass('hds-code-block--is-standalone');
  });

  test('it does not have rounded corners if `isStandalone` is set to false', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @isStandalone={{false}} id="test-code-block" />
    `);
    assert
      .dom('#test-code-block')
      .doesNotHaveClass('hds-code-block--is-standalone');
  });

  // language
  test('it has no default language for syntax highlighting', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" id="test-code-block" />
    `);
    assert.dom('#test-code-block').doesNotHaveClass(/language-*/);
  });

  test('it uses the passed in language value for syntax highlighting', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @language="go" id="test-code-block" />
    `);
    assert.dom('#test-code-block').hasClass('language-go');
  });

  test('syntax highlighting fails gracefully if an invalid language is specified', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @language="foo" id="test-code-block" />
    `);
    assert.dom('#test-code-block').hasClass('language-foo');
    assert.dom('#test-code-block .token').doesNotExist();
  });

  // hasCopyButton
  test('it does not display a Copy button by default', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" />
    `);
    assert.dom('.hds-code-block__copy-button').doesNotExist();
  });

  test(`it displays a Copy button if hasCopyButton is set to true`, async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @hasCopyButton={{true}} />
    `);

    assert
      .dom('.hds-code-block__copy-button')
      .exists()
      .hasAria('label', 'Copy');
  });

  test('it renders a Copy button with custom text', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @hasCopyButton={{true}} @copyButtonText="Foo" />
    `);

    assert.dom('.hds-code-block__copy-button').exists().hasAria('label', 'Foo');
  });

  test('it calls the onCopy action when the Copy button is clicked', async function (assert) {
    sinon.stub(window.navigator.clipboard, 'writeText').resolves();

    const copySpy = sinon.spy();

    this.set('onCopy', copySpy);

    await render(hbs`
      <Hds::CodeBlock @value="test" @hasCopyButton={{true}} @onCopy={{this.onCopy}} />
    `);

    await click('.hds-code-block__copy-button');
    assert.ok(copySpy.calledOnce, 'onCopy action was called');

    sinon.restore();
  });

  // copySuccessMessageText
  test('it should set the default success message in the aria-live region when the copy button is clicked', async function (assert) {
    sinon.stub(window.navigator.clipboard, 'writeText').resolves();
    const copySpy = sinon.spy();
    this.set('onCopy', copySpy);

    await render(hbs`
      <Hds::CodeBlock @value="test" @hasCopyButton={{true}} />
    `);

    assert
      .dom('.hds-code-block__copy-button + .sr-only')
      .doesNotContainText('Copied to clipboard');

    await click('.hds-code-block__copy-button');

    assert
      .dom('.hds-code-block__copy-button + .sr-only')
      .hasText('Copied to clipboard');

    sinon.restore();
  });

  test('it should set a custom success message in the aria-live region when the copy button is clicked', async function (assert) {
    sinon.stub(window.navigator.clipboard, 'writeText').resolves();
    const copySpy = sinon.spy();
    this.set('onCopy', copySpy);

    await render(hbs`
      <Hds::CodeBlock @value="test" @hasCopyButton={{true}} @copySuccessMessageText="Custom success message" />
    `);

    assert
      .dom('.hds-code-block__copy-button + .sr-only')
      .doesNotContainText('Custom success message');

    await click('.hds-code-block__copy-button');

    assert
      .dom('.hds-code-block__copy-button + .sr-only')
      .hasText('Custom success message');

    sinon.restore();
  });

  // hasLineNumbers
  test('it displays line numbers by default', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" id="test-code-block" />
    `);
    assert.dom('#test-code-block').hasClass('line-numbers');
  });

  test('it does not display line numbers if hasLineNumbers is set to false', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @hasLineNumbers={{false}} id="test-code-block" />
    `);
    assert.dom('#test-code-block').doesNotHaveClass('line-numbers');
  });

  // hasLineWrapping
  test('it does not wrap code line by default', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" id="test-code-block" />
    `);
    assert
      .dom('#test-code-block')
      .doesNotHaveClass('hds-code-block--has-line-wrapping');
  });

  test('it wraps code lines if hasLineWrapping is set to true', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @hasLineWrapping={{true}} id="test-code-block" />
    `);
    assert
      .dom('#test-code-block')
      .hasClass('hds-code-block--has-line-wrapping');
  });

  // highlightLines
  test('it highlights the passed in individual line numbers', async function (assert) {
    await render(hbs`
    <Hds::CodeBlock
      id="test-code-block-highlight"
      @highlightLines="1"
      @value="console.log('Hello world');"
    />
  `);
    assert
      .dom('#test-code-block-highlight [data-range="1"]')
      .exists()
      .hasClass('line-highlight');
  });

  // maxHeight
  test('it uses the passed in maxHeight value', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @maxHeight="100px" />
    `);
    assert
      .dom('.hds-code-block__code')
      .hasAttribute('style', 'max-height: 100px;');
  });

  test('it displays a "Show more" button if the height of the code content is greater than the maxHeight', async function (assert) {
    // Note: We set a very small maxHeight to ensure the code block is scrollable
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @maxHeight="1em" />
    `);
    assert
      .dom('.hds-code-block__height-toggle-button')
      .exists()
      .hasText('Show more code');
  });

  test('it does not display a height toggle button if the height of the code content is less than the maxHeight', async function (assert) {
    // Note: We use ems since if they were incorrectly interpreted as pixels, the test would fail)
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @maxHeight="5em" />
    `);
    assert.dom('.hds-code-block__height-toggle-button').doesNotExist();
  });

  test('it expands to show all content and displays a "Show less" button when "Show more" is clicked', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @maxHeight="1em" />
    `);

    assert
      .dom('.hds-code-block')
      .hasClass('hds-code-block--has-overlay-footer');

    await click('.hds-code-block__height-toggle-button');

    assert.dom('.hds-code-block').hasClass('hds-code-block--is-expanded');
    assert
      .dom('.hds-code-block__code')
      .hasAttribute('style', 'max-height: none;');
    assert
      .dom('.hds-code-block__height-toggle-button')
      .exists()
      .hasText('Show less code');
  });

  test('it collapses to show less content and displays a "Show more" button when "Show less" is clicked', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @maxHeight="1em" />
    `);

    await click('.hds-code-block__height-toggle-button');

    assert
      .dom('.hds-code-block__height-toggle-button')
      .exists()
      .hasText('Show less code');

    await click('.hds-code-block__height-toggle-button');

    assert
      .dom('.hds-code-block__code')
      .hasAttribute('style', 'max-height: 1em;');
    assert
      .dom('.hds-code-block__height-toggle-button')
      .exists()
      .hasText('Show more code');
  });

  // ASSERTION

  test('it should throw an assertion if no value for @code is provided', async function (assert) {
    const errorMessage = '@code for "Hds::CodeBlock" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::CodeBlock />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
