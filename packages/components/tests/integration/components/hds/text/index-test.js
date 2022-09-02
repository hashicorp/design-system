import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/text/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::Text @size="body-200" />`);
    assert.dom(this.element).exists();
  });
  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Text @size="body-200" id="test-text" />`);
    assert.dom('#test-text').hasClass('hds-text');
  });

  // TEXT

  test('it renders with the provided text', async function (assert) {
    await render(
      hbs`<Hds::Text @size="body-200" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasText('This is the text');
  });

  // SIZES (both via @size as well as with specialized components) + DEFAULTS

  test('it should render text as "Display500" with the correct defaults', async function (assert) {
    assert.expect(5);
    await render(
      hbs`<Hds::Text @size="display-500" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('h1');
    assert.dom('#test-text').hasClass('hds-typography-display-500');
    assert.dom('#test-text').hasClass('hds-font-weight-bold');
    assert.dom('#test-text').hasText('This is the text');
    await render(
      hbs`<Hds::Text::Display500 id="test-text">This is the text</Hds::Text::Display500>`
    );
    assert.dom('#test-text').hasClass('hds-typography-display-500');
  });
  test('it should render text as "Display400" with the correct defaults', async function (assert) {
    assert.expect(5);
    await render(
      hbs`<Hds::Text @size="display-400" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('h2');
    assert.dom('#test-text').hasClass('hds-typography-display-400');
    assert.dom('#test-text').hasClass('hds-font-weight-bold');
    assert.dom('#test-text').hasText('This is the text');
    await render(
      hbs`<Hds::Text::Display400 id="test-text">This is the text</Hds::Text::Display400>`
    );
    assert.dom('#test-text').hasClass('hds-typography-display-400');
  });
  test('it should render text as "Display300" with the correct defaults', async function (assert) {
    assert.expect(5);
    await render(
      hbs`<Hds::Text @size="display-300" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('h3');
    assert.dom('#test-text').hasClass('hds-typography-display-300');
    assert.dom('#test-text').hasClass('hds-font-weight-bold');
    assert.dom('#test-text').hasText('This is the text');
    await render(
      hbs`<Hds::Text::Display300 id="test-text">This is the text</Hds::Text::Display300>`
    );
    assert.dom('#test-text').hasClass('hds-typography-display-300');
  });
  test('it should render text as "Display200" with the correct defaults', async function (assert) {
    assert.expect(5);
    await render(
      hbs`<Hds::Text @size="display-200" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('h4');
    assert.dom('#test-text').hasClass('hds-typography-display-200');
    assert.dom('#test-text').hasClass('hds-font-weight-semibold');
    assert.dom('#test-text').hasText('This is the text');
    await render(
      hbs`<Hds::Text::Display200 id="test-text">This is the text</Hds::Text::Display200>`
    );
    assert.dom('#test-text').hasClass('hds-typography-display-200');
  });
  test('it should render text as "Display100" with the correct defaults', async function (assert) {
    assert.expect(5);
    await render(
      hbs`<Hds::Text @size="display-100" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('h5');
    assert.dom('#test-text').hasClass('hds-typography-display-100');
    assert.dom('#test-text').hasClass('hds-font-weight-medium');
    assert.dom('#test-text').hasText('This is the text');
    await render(
      hbs`<Hds::Text::Display100 id="test-text">This is the text</Hds::Text::Display100>`
    );
    assert.dom('#test-text').hasClass('hds-typography-display-100');
  });
  test('it should render text as "Body300" with the correct defaults', async function (assert) {
    assert.expect(5);
    await render(
      hbs`<Hds::Text @size="body-300" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('p');
    assert.dom('#test-text').hasClass('hds-typography-body-300');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
    assert.dom('#test-text').hasText('This is the text');
    await render(
      hbs`<Hds::Text::Body300 id="test-text">This is the text</Hds::Text::Body300>`
    );
    assert.dom('#test-text').hasClass('hds-typography-body-300');
  });
  test('it should render text as "Body200" with the correct defaults', async function (assert) {
    assert.expect(5);
    await render(
      hbs`<Hds::Text @size="body-200" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('p');
    assert.dom('#test-text').hasClass('hds-typography-body-200');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
    assert.dom('#test-text').hasText('This is the text');
    await render(
      hbs`<Hds::Text::Body200 id="test-text">This is the text</Hds::Text::Body200>`
    );
    assert.dom('#test-text').hasClass('hds-typography-body-200');
  });
  test('it should render text as "Body100" with the correct defaults', async function (assert) {
    assert.expect(5);
    await render(
      hbs`<Hds::Text @size="body-100" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('p');
    assert.dom('#test-text').hasClass('hds-typography-body-100');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
    assert.dom('#test-text').hasText('This is the text');
    await render(
      hbs`<Hds::Text::Body100 id="test-text">This is the text</Hds::Text::Body100>`
    );
    assert.dom('#test-text').hasClass('hds-typography-body-100');
  });
  test('it should render text as "Code300" with the correct defaults', async function (assert) {
    assert.expect(5);
    await render(
      hbs`<Hds::Text @size="code-300" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('code');
    assert.dom('#test-text').hasClass('hds-typography-code-300');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
    assert.dom('#test-text').hasText('This is the text');
    await render(
      hbs`<Hds::Text::Code300 id="test-text">This is the text</Hds::Text::Code300>`
    );
    assert.dom('#test-text').hasClass('hds-typography-code-300');
  });
  test('it should render text as "Code200" with the correct defaults', async function (assert) {
    assert.expect(5);
    await render(
      hbs`<Hds::Text @size="code-200" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('code');
    assert.dom('#test-text').hasClass('hds-typography-code-200');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
    assert.dom('#test-text').hasText('This is the text');
    await render(
      hbs`<Hds::Text::Code200 id="test-text">This is the text</Hds::Text::Code200>`
    );
    assert.dom('#test-text').hasClass('hds-typography-code-200');
  });
  test('it should render text as "Code100" with the correct defaults', async function (assert) {
    assert.expect(5);
    await render(
      hbs`<Hds::Text @size="code-100" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('code');
    assert.dom('#test-text').hasClass('hds-typography-code-100');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
    assert.dom('#test-text').hasText('This is the text');
    await render(
      hbs`<Hds::Text::Code100 id="test-text">This is the text</Hds::Text::Code100>`
    );
    assert.dom('#test-text').hasClass('hds-typography-code-100');
  });

  // TAG

  test('it should render text as "Display100" with the correct tag if @tag is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @size="display-100" @tag="span" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('span');
  });
  test('it should render text as "Body100" with the correct tag if @tag is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @size="body-100" @tag="span" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('span');
  });
  test('it should render text as "Code100" with the correct tag if @tag is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @size="code-100" @tag="span" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('span');
  });

  // WEIGHT

  test('it should render text with the correct CSS class if the @weight prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @size="body-200" @weight="semibold" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasClass('hds-font-weight-semibold');
  });

  // ALIGN

  test('it should render text without alignment if no @align is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @size="body-200" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').doesNotHaveClass(/hds-text--align-/);
  });
  test('it should render the correct CSS class if the @align prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @size="body-200" @align="right" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasClass('hds-text--align-right');
  });

  // COLOR

  test('it should render text without color if no @color is declared', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Text @size="body-200" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').doesNotHaveClass(/hds-text--color-/);
    assert.dom('#test-text').doesNotHaveAttribute('style');
  });
  test('it should render the correct CSS color class if the @color prop is declared using a pre-defined color', async function (assert) {
    await render(
      hbs`<Hds::Text @size="body-200" @color="action" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasClass('hds-text--color-action');
  });
  test('it should render the correct style if the @color prop is declared as custom CSS property color', async function (assert) {
    await render(
      hbs`<Hds::Text @size="body-200" @color="var(--token-color-foreground-action)" id="test-text">This is the text</Hds::Text>`
    );
    assert
      .dom('#test-text')
      .hasAttribute('style', 'color: var(--token-color-foreground-action);');
  });
  test('it should render the correct style if the @color prop is declared as custom HEX color', async function (assert) {
    await render(
      hbs`<Hds::Text @size="body-200" @color="#FF0000" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasAttribute('style', 'color: rgb(255, 0, 0);');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @size is provided', async function (assert) {
    const errorMessage =
      '@size for "Hds::Text" must be one of the following: display-500, display-400, display-300, display-200, display-100, body-300, body-200, body-100, code-300, code-200, code-100; received: title';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Text @size="title" id="test-text">This is the text</Hds::Text>`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @weight is provided', async function (assert) {
    const errorMessage =
      '@weight for "Hds::Text" must be one of the following: regular, medium, semibold, bold; received: light';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Text @size="body-100" @weight="light" id="test-text">This is the text</Hds::Text>`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @align is provided', async function (assert) {
    const errorMessage =
      '@align for "Hds::Text" must be one of the following: left, center, right; received: top';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Text @size="body-100" @align="top" id="test-text">This is the text</Hds::Text>`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
