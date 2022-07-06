import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/field/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::Form::Field id="test-form-field" />`);
    assert.dom('#test-form-field').exists();
  });
  test('it should render with a CSS class provided via the @contextualClass argument', async function (assert) {
    await render(
      hbs`<Hds::Form::Field @contextualClass="my-class" id="test-form-field" />`
    );
    assert.dom('#test-form-field').hasClass('my-class');
  });

  // LAYOUT

  test('it should render the correct CSS layout class depending on the @layout prop', async function (assert) {
    await render(
      hbs`<Hds::Form::Field @layout="vertical" id="test-form-field" />`
    );
    assert.dom('#test-form-field').hasClass('hds-form-field--layout-vertical');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components', async function (assert) {
    assert.expect(8);
    await render(
      hbs`<Hds::Form::Field @layout="vertical" id="test-form-field" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Control><pre class="hds-form-field__control">This is a mock control</pre></F.Control>
          <F.Error>This is the error</F.Error>
        </Hds::Form::Field>`
    );
    assert.dom('#test-form-field .hds-form-field__label').exists();
    assert.dom('.hds-form-field__label').hasText('This is the label');
    assert.dom('#test-form-field .hds-form-field__helper-text').exists();
    assert
      .dom('.hds-form-field__helper-text')
      .hasText('This is the helper text');
    assert.dom('#test-form-field .hds-form-field__control').exists();
    assert.dom('.hds-form-field__control').hasText('This is a mock control');
    assert.dom('#test-form-field .hds-form-field__error').exists();
    assert.dom('.hds-form-field__error').hasText('This is the error');
  });
  test('it automatically provides all the ID relations between the elements', async function (assert) {
    assert.expect(4);
    await render(
      hbs`<Hds::Form::Field @layout="vertical" id="test-form-field" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Control><pre class="hds-form-field__control" id={{F.id}} aria-describedby={{F.ariaDescribedBy}}>This is a mock control</pre></F.Control>
          <F.Error>This is the error</F.Error>
        </Hds::Form::Field>`
    );
    // the control ID is dynamically generated
    let control = this.element.querySelector(
      '#test-form-field .hds-form-field__control'
    );
    let controlId = control.id;
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${controlId} error-${controlId}`
      );
    assert
      .dom('.hds-form-field__error')
      .hasAttribute('id', `error-${controlId}`);
  });
  test('it automatically provides all the ID relations between the elements with a custom @id', async function (assert) {
    assert.expect(4);
    await render(
      hbs`<Hds::Form::Field @layout="vertical" id="test-form-field" @id="my-custom-id" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Control><pre class="hds-form-field__control" id={{F.id}} aria-describedby={{F.ariaDescribedBy}}>This is a mock control</pre></F.Control>
          <F.Error>This is the error</F.Error>
        </Hds::Form::Field>`
    );
    let controlId = 'my-custom-id';
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${controlId} error-${controlId}`
      );
    assert
      .dom('.hds-form-field__error')
      .hasAttribute('id', `error-${controlId}`);
  });
  test('it provides all the ID relations between the elements and allows extra `aria-describedby` attributes', async function (assert) {
    assert.expect(4);
    await render(
      hbs`<Hds::Form::Field @layout="vertical" id="test-form-field" @extraAriaDescribedBy="extra" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Control><pre class="hds-form-field__control" id={{F.id}} aria-describedby={{F.ariaDescribedBy}}>This is a mock control</pre></F.Control>
          <F.Error>This is the error</F.Error>
        </Hds::Form::Field>`
    );
    // the control ID is dynamically generated
    let control = this.element.querySelector(
      '#test-form-field .hds-form-field__control'
    );
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

  test('it should render a required badge if the @isRequired prop is declared', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Form::Field @isRequired={{true}} as |F|>
            <F.Label>This is the label</F.Label>
          </Hds::Form::Field>`
    );
    assert.dom('label .hds-form-required-indicator').exists();
    assert.dom('label .hds-form-required-indicator').hasText('Required');
  });
  test('it should render an optional indicator if the @isOptional prop is declared', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Form::Field @isOptional={{true}} as |F|>
            <F.Label>This is the label</F.Label>
          </Hds::Form::Field>`
    );
    assert.dom('label .hds-form-optional-indicator').exists();
    assert.dom('label .hds-form-optional-indicator').hasText('(Optional)');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Form::Field id="test-form-field" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-form-field').hasClass('my-class');
    assert.dom('#test-form-field').hasAttribute('data-test1');
    assert.dom('#test-form-field').hasAttribute('data-test2', 'test');
  });
});
