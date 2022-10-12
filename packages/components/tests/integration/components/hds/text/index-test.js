import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/text/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::Text @tag="p" />`);
    assert.dom(this.element).exists();
  });
  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Text @tag="p" id="test-text" />`);
    assert.dom('#test-text').hasClass('hds-text');
  });

  // TEXT

  test('it renders with the provided text', async function (assert) {
    await render(
      hbs`<Hds::Text @tag="p" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasText('This is the text');
  });

  // VARIANT (+ DEFAULTS)

  test('it should render text as "span" with the correct "variant" style if @variant is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @variant="display/500/bold" @tag="span" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('span');
    assert.dom('#test-text').hasClass('hds-typography-display-500');
    assert.dom('#test-text').hasClass('hds-font-weight-bold');
  });
  test('it should render text as "h1" by default if @variant is one of "display/500"', async function (assert) {
    await render(
      hbs`<Hds::Text @variant="display/500/bold" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('h1');
    assert.dom('#test-text').hasClass('hds-typography-display-500');
    assert.dom('#test-text').hasClass('hds-font-weight-bold');
  });
  test('it should render text as "h2" by default if @variant is one of "display/400"', async function (assert) {
    await render(
      hbs`<Hds::Text @variant="display/400/semibold" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('h2');
    assert.dom('#test-text').hasClass('hds-typography-display-400');
    assert.dom('#test-text').hasClass('hds-font-weight-semibold');
  });
  test('it should render text as "h3" by default if @variant is one of "display/300"', async function (assert) {
    await render(
      hbs`<Hds::Text @variant="display/300/semibold" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('h3');
    assert.dom('#test-text').hasClass('hds-typography-display-300');
    assert.dom('#test-text').hasClass('hds-font-weight-semibold');
  });
  test('it should render text as "h4" by default if @variant is one of "display/200"', async function (assert) {
    await render(
      hbs`<Hds::Text @variant="display/200/semibold" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('h4');
    assert.dom('#test-text').hasClass('hds-typography-display-200');
    assert.dom('#test-text').hasClass('hds-font-weight-semibold');
  });
  test('it should render text as "h5" by default if @variant is one of "display/100"', async function (assert) {
    await render(
      hbs`<Hds::Text @variant="display/100/medium" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('h5');
    assert.dom('#test-text').hasClass('hds-typography-display-100');
    assert.dom('#test-text').hasClass('hds-font-weight-medium');
  });
  test('it should render text as "p" by default if @variant is one of "body"', async function (assert) {
    await render(
      hbs`<Hds::Text @variant="body/300/regular" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('p');
    assert.dom('#test-text').hasClass('hds-typography-body-300');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
    await render(
      hbs`<Hds::Text @variant="body/200/regular" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('p');
    assert.dom('#test-text').hasClass('hds-typography-body-200');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
    await render(
      hbs`<Hds::Text @variant="body/100/regular" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('p');
    assert.dom('#test-text').hasClass('hds-typography-body-100');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
  });
  test('it should render text as "code" by default if @variant is one of "code"', async function (assert) {
    await render(
      hbs`<Hds::Text @variant="code/300/regular" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('code');
    assert.dom('#test-text').hasClass('hds-typography-code-300');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
    await render(
      hbs`<Hds::Text @variant="code/200/regular" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('code');
    assert.dom('#test-text').hasClass('hds-typography-code-200');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
    await render(
      hbs`<Hds::Text @variant="code/100/regular" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('code');
    assert.dom('#test-text').hasClass('hds-typography-code-100');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
  });

  // TAG (+ DEFAULTS)

  test('it should render text as "display/100/medium" with the correct tag if @tag is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @variant="display/100/medium" @tag="span" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('span');
    assert.dom('#test-text').hasClass('hds-typography-display-100');
    assert.dom('#test-text').hasClass('hds-font-weight-medium');
  });
  test('it should render text as "display/500/bold" with the correct tag if @tag is declared as "h1"', async function (assert) {
    await render(
      hbs`<Hds::Text @tag="h1" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('h1');
    assert.dom('#test-text').hasClass('hds-typography-display-500');
    assert.dom('#test-text').hasClass('hds-font-weight-bold');
  });
  test('it should render text as "display/400/semibold" with the correct tag if @tag is declared as "h2"', async function (assert) {
    await render(
      hbs`<Hds::Text @tag="h2" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('h2');
    assert.dom('#test-text').hasClass('hds-typography-display-400');
    assert.dom('#test-text').hasClass('hds-font-weight-semibold');
  });
  test('it should render text as "display/300/semibold" with the correct tag if @tag is declared as "h3"', async function (assert) {
    await render(
      hbs`<Hds::Text @tag="h3" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('h3');
    assert.dom('#test-text').hasClass('hds-typography-display-300');
    assert.dom('#test-text').hasClass('hds-font-weight-semibold');
  });
  test('it should render text as "display/200/semibold" with the correct tag if @tag is declared as "h4"', async function (assert) {
    await render(
      hbs`<Hds::Text @tag="h4" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('h4');
    assert.dom('#test-text').hasClass('hds-typography-display-200');
    assert.dom('#test-text').hasClass('hds-font-weight-semibold');
  });
  test('it should render text as "display/100/medium" with the correct tag if @tag is declared as "h5"', async function (assert) {
    await render(
      hbs`<Hds::Text @tag="h5" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('h5');
    assert.dom('#test-text').hasClass('hds-typography-display-100');
    assert.dom('#test-text').hasClass('hds-font-weight-medium');
  });
  test('it should render text as "body/200/regular" with the correct tag if @tag is declared as "p"', async function (assert) {
    await render(
      hbs`<Hds::Text @tag="p" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('p');
    assert.dom('#test-text').hasClass('hds-typography-body-200');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
  });
  test('it should render text as "code/200/regular" with the correct tag if @tag is declared as "code"', async function (assert) {
    await render(
      hbs`<Hds::Text @tag="code" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('code');
    assert.dom('#test-text').hasClass('hds-typography-code-200');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
  });
  test('it should render text as "code/200/regular" with the correct tag if @tag is declared as "pre"', async function (assert) {
    await render(
      hbs`<Hds::Text @tag="pre" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('pre');
    assert.dom('#test-text').hasClass('hds-typography-code-200');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
  });

  // ALIGN

  test('it should render text without alignment if no @align is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @tag="p" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').doesNotHaveClass(/hds-text--align-/);
  });
  test('it should render the correct CSS class if the @align prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @tag="p" @align="right" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasClass('hds-text--align-right');
  });

  // COLOR

  test('it should render text without color if no @color is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @tag="p" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').doesNotHaveClass(/hds-text--color-/);
    assert.dom('#test-text').doesNotHaveAttribute('style');
  });
  test('it should render the correct CSS color class if the @color prop is declared using a pre-defined color', async function (assert) {
    await render(
      hbs`<Hds::Text @tag="p" @color="highlight" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasClass('hds-text--color-highlight');
  });
  test('it should render the correct style if the @color prop is declared as custom CSS property color', async function (assert) {
    await render(
      hbs`<Hds::Text @tag="p" @color="var(--token-color-foreground-action)" id="test-text">This is the text</Hds::Text>`
    );
    assert
      .dom('#test-text')
      .hasAttribute('style', 'color: var(--token-color-foreground-action);');
  });
  test('it should render the correct style if the @color prop is declared as custom HEX color', async function (assert) {
    await render(
      hbs`<Hds::Text @tag="p" @color="#FF0000" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasAttribute('style', 'color: rgb(255, 0, 0);');
  });

  // ASSERTIONS

  test('it should throw an assertion if neither @tag nor @variant are provided', async function (assert) {
    const errorMessage =
      'You need to provide at least one of the @tag or @variant arguments to "Hds::Text"';
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Text id="test-text">This is the text</Hds::Text>`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @variant is provided', async function (assert) {
    const errorMessage =
      '@variant for "Hds::Text" must be one of the following: display/500/bold, display/400/medium, display/400/semibold, display/400/bold, display/300/medium, display/300/semibold, display/300/bold, display/200/semibold, display/100/medium, body/300/regular, body/300/medium, body/300/semibold, body/200/regular, body/200/medium, body/200/semibold, body/100/regular, body/100/medium, body/100/semibold, code/300/regular, code/200/regular, code/100/regular; received: abc123';
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Text @tag="p" @variant="abc123" id="test-text">This is the text</Hds::Text>`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @align is provided', async function (assert) {
    const errorMessage =
      '@align for "Hds::Text" must be one of the following: left, center, right; received: top';
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Text @tag="p" @align="top" id="test-text">This is the text</Hds::Text>`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
