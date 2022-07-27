import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/toggle/field', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::Form::Toggle::Field />`);
    assert.dom('input').exists();
  });
  test('it should render the input with a specific CSS class', async function (assert) {
    await render(hbs`<Hds::Form::Toggle::Field />`);
    // Notice: the "toggle" component has a slightly different DOM structure than the other form controls
    assert.dom('input').hasClass('hds-form-toggle__control');
  });

  // VALUE

  test('it should render the input with the value provided via @value argument', async function (assert) {
    await render(hbs`<Hds::Form::Toggle::Field @value="abc123" />`);
    assert.dom('input').hasValue('abc123');
  });

  // ID

  test('it should render the input with a custom @id', async function (assert) {
    await render(hbs`<Hds::Form::Toggle::Field @id="my-input" />`);
    assert.dom('input').hasAttribute('id', 'my-input');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components', async function (assert) {
    assert.expect(4);
    await render(
      hbs`<Hds::Form::Toggle::Field as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </Hds::Form::Toggle::Field>`
    );
    assert.dom('.hds-form-field__label').exists();
    assert.dom('.hds-form-field__helper-text').exists();
    assert.dom('.hds-form-field__control').exists();
    assert.dom('.hds-form-field__error').exists();
  });
  test('it does not render the yielded contextual components if not provided', async function (assert) {
    assert.expect(3);
    await render(hbs`<Hds::Form::Toggle::Field />`);
    assert.dom('.hds-form-field__label').doesNotExist();
    assert.dom('.hds-form-field__helper-text').doesNotExist();
    assert.dom('.hds-form-field__error').doesNotExist();
  });
  test('it automatically provides all the ID relations between the elements', async function (assert) {
    assert.expect(4);
    await render(
      hbs`<Hds::Form::Toggle::Field @extraAriaDescribedBy="extra" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </Hds::Form::Toggle::Field>`
    );
    // the control ID is dynamically generated
    // Notice: the "toggle" component has a slightly different DOM structure than the other form controls
    let control = this.element.querySelector('.hds-form-field__control input');
    let controlId = control.id;
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control input')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${controlId} error-${controlId} extra `
      );
    assert
      .dom('.hds-form-field__error')
      .hasAttribute('id', `error-${controlId}`);
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the input', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Form::Toggle::Field checked="checked" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('input').hasClass('my-class');
    assert.dom('input').hasAttribute('data-test1');
    assert.dom('input').hasAttribute('data-test2', 'test');
  });
});
