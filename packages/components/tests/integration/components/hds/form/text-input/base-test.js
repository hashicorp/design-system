import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/text-input/base', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::Form::TextInput::Base id="test-form-text-input" />`);
    assert.dom('#test-form-text-input').exists();
  });
  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Form::TextInput::Base id="test-form-text-input" />`);
    assert.dom('#test-form-text-input').hasClass('hds-form-text-input');
  });

  // TYPE

  test('it should render the "text" type if no type is declared', async function (assert) {
    await render(hbs`<Hds::Form::TextInput::Base id="test-form-text-input" />`);
    assert.dom('#test-form-text-input').hasAttribute('type', 'text');
  });
  test('it should render the correct type depending on the @type prop', async function (assert) {
    await render(
      hbs`<Hds::Form::TextInput::Base @type="email" id="test-form-text-input" />`
    );
    assert.dom('#test-form-text-input').hasAttribute('type', 'email');
  });

  // VALUE

  test('it should render the input with the value provided via @value argument', async function (assert) {
    await render(
      hbs`<Hds::Form::TextInput::Base @value="abc123" id="test-form-text-input" />`
    );
    assert.dom('#test-form-text-input').hasValue('abc123');
  });

  // INVALID

  test('it should render the correct CSS class if the @isInvalid prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Form::TextInput::Base id="test-form-text-input" @isInvalid={{true}} />`
    );
    assert
      .dom('#test-form-text-input')
      .hasClass('hds-form-text-input--is-invalid');
  });

  // WIDTH

  test('it should render the input with a fixed width if a @width value is passed', async function (assert) {
    await render(
      hbs`<Hds::Form::TextInput::Base @width="248px" id="test-form-text-input" />`
    );
    assert.dom('#test-form-text-input').hasStyle({ width: '248px' });
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Form::TextInput::Base id="test-form-text-input" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-form-text-input').hasClass('my-class');
    assert.dom('#test-form-text-input').hasAttribute('data-test1');
    assert.dom('#test-form-text-input').hasAttribute('data-test2', 'test');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @type is provided', async function (assert) {
    const errorMessage =
      '@type for "Hds::Form::TextInput" must be one of the following: text, email, password, url, search, date, time, received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Form::TextInput::Base @type="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
