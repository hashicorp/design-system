import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/textarea/field', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::Form::Textarea::Field />`);
    assert.dom('textarea').exists();
  });
  test('it should render the input with a specific CSS class', async function (assert) {
    await render(hbs`<Hds::Form::Textarea::Field />`);
    assert.dom('textarea').hasClass('hds-form-field__control');
  });

  // VALUE

  test('it should render the input with the value provided via @value argument', async function (assert) {
    await render(hbs`<Hds::Form::Textarea::Field @value="abc123" />`);
    assert.dom('textarea').hasValue('abc123');
  });

  // INVALID

  test('it should render the correct CSS class if the @isInvalid prop is declared', async function (assert) {
    await render(hbs`<Hds::Form::Textarea::Field @isInvalid={{true}} />`);
    assert.dom('textarea').hasClass('hds-form-textarea--is-invalid');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components', async function (assert) {
    assert.expect(4);
    await render(
      hbs`<Hds::Form::Textarea::Field as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </Hds::Form::Textarea::Field>`
    );
    assert.dom('.hds-form-field__label').exists();
    assert.dom('.hds-form-field__helper-text').exists();
    assert.dom('.hds-form-field__control').exists();
    assert.dom('.hds-form-field__error').exists();
  });
  test('it does not render the yielded contextual components if not provided', async function (assert) {
    assert.expect(3);
    await render(hbs`<Hds::Form::Textarea::Field />`);
    assert.dom('.hds-form-field__label').doesNotExist();
    assert.dom('.hds-form-field__helper-text').doesNotExist();
    assert.dom('.hds-form-field__error').doesNotExist();
  });
  test('it automatically provides all the ID relations between the elements', async function (assert) {
    assert.expect(4);
    await render(
      hbs`<Hds::Form::Textarea::Field @extraAriaDescribedBy="extra" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </Hds::Form::Textarea::Field>`
    );
    // the control ID is dynamically generated
    let control = this.element.querySelector('.hds-form-field__control');
    let controlId = control.id;
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${controlId} error-${controlId} extra`
      );
    assert
      .dom('.hds-form-field__error')
      .hasAttribute('id', `error-${controlId}`);
  });

  // REQUIRED AND OPTIONAL

  test('it should append an indicator to the label text and set the required attribute when user input is required', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Form::Textarea::Field @isRequired={{true}} as |F|>
            <F.Label>This is the label</F.Label>
          </Hds::Form::Textarea::Field>`
    );
    assert.dom('label .hds-badge').exists();
    assert.dom('label .hds-badge').hasText('Required');
    assert.dom('textarea').hasAttribute('required');
  });
  test('it should append an indicator to the label text when user input is optional', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Form::Textarea::Field @isOptional={{true}} as |F|>
            <F.Label>This is the label</F.Label>
          </Hds::Form::Textarea::Field>`
    );
    assert.dom('label .hds-form-indicator').exists();
    assert.dom('label .hds-form-indicator').hasText('(Optional)');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the input', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Form::Textarea::Field class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('textarea').hasClass('my-class');
    assert.dom('textarea').hasAttribute('data-test1');
    assert.dom('textarea').hasAttribute('data-test2', 'test');
  });
});
