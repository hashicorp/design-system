import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/textarea/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::Form::Textarea::Base id="test-form-textarea" />`);
    assert.dom('#test-form-textarea').exists();
  });
  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Form::Textarea::Base id="test-form-textarea" />`);
    assert.dom('#test-form-textarea').hasClass('hds-form-textarea');
  });

  // VALUE

  test('it should render the input with the value provided via @value argument', async function (assert) {
    await render(
      hbs`<Hds::Form::Textarea::Base @value="abc123" id="test-form-textarea" />`
    );
    assert.dom('#test-form-textarea').hasValue('abc123');
  });

  // ROWS

  test('it should render the textarea with the default number of rows', async function (assert) {
    await render(hbs`<Hds::Form::Textarea::Base />`);
    assert.dom('textarea').hasAttribute('rows', '4');
  });
  test('it should render the textarea with a custom number of rows', async function (assert) {
    await render(hbs`<Hds::Form::Textarea::Base rows="2" />`);
    assert.dom('textarea').hasAttribute('rows', '2');
  });

  // INVALID

  test('it should render the correct CSS class if the @isInvalid prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Form::Textarea::Base id="test-form-textarea" @isInvalid={{true}} />`
    );
    assert.dom('#test-form-textarea').hasClass('hds-form-textarea--is-invalid');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Form::Textarea::Base id="test-form-textarea" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-form-textarea').hasClass('my-class');
    assert.dom('#test-form-textarea').hasAttribute('data-test1');
    assert.dom('#test-form-textarea').hasAttribute('data-test2', 'test');
  });
});
