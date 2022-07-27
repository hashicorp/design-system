import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/toggle/group', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::Form::Toggle::Group id="test-form-toggle" />`);
    assert.dom('#test-form-toggle').exists();
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components and subcomponents', async function (assert) {
    assert.expect(12);
    await render(
      hbs`<Hds::Form::Toggle::Group as |G|>
            <G.Legend>This is the legend</G.Legend>
            <G.HelperText>This is the group helper text</G.HelperText>
            <G.Toggle::Field checked="checked" @value="abc123" as |F|>
              <F.Label>This is the control label</F.Label>
              <F.HelperText>This is the control helper text</F.HelperText>
              <F.Error>This is the control error</F.Error>
            </G.Toggle::Field>
            <G.Error>This is the group error</G.Error>
        </Hds::Form::Toggle::Group>`
    );
    assert.dom('.hds-form-group__legend').exists();
    assert.dom('.hds-form-group__legend').hasText('This is the legend');
    assert.dom('.hds-form-group__helper-text').exists();
    assert
      .dom('.hds-form-group__helper-text')
      .hasText('This is the group helper text');
    assert
      .dom('.hds-form-group__control-fields-wrapper .hds-form-field__label')
      .exists();
    assert
      .dom(
        '.hds-form-group__control-fields-wrapper .hds-form-field__helper-text'
      )
      .exists();
    assert
      .dom('.hds-form-group__control-fields-wrapper .hds-form-field__control')
      .exists();
    assert.dom('.hds-form-group__control-fields-wrapper input').isChecked();
    assert
      .dom('.hds-form-group__control-fields-wrapper input')
      .hasValue('abc123');
    assert
      .dom('.hds-form-group__control-fields-wrapper .hds-form-field__error')
      .exists();
    assert.dom('.hds-form-group__error').exists();
    assert.dom('.hds-form-group__error').hasText('This is the group error');
  });
  test('it does not render the yielded contextual components if not provided', async function (assert) {
    assert.expect(3);
    await render(hbs`<Hds::Form::Toggle::Group />`);
    assert.dom('.hds-form-group__legend').doesNotExist();
    assert.dom('.hds-form-group__helper-text').doesNotExist();
    assert.dom('.hds-form-group__error').doesNotExist();
  });
  test('it automatically provides all the ID relations between the elements', async function (assert) {
    assert.expect(1);
    await render(
      hbs`<Hds::Form::Toggle::Group as |G|>
            <G.Legend>This is the legend</G.Legend>
            <G.HelperText>This is the group helper text</G.HelperText>
            <G.Toggle::Field checked="checked" @value="abc123" as |F|>
              <F.Label>This is the control label</F.Label>
              <F.HelperText>This is the control helper text</F.HelperText>
              <F.Error>This is the control error</F.Error>
            </G.Toggle::Field>
            <G.Error>This is the group error</G.Error>
        </Hds::Form::Toggle::Group>`
    );
    // the IDs are dynamically generated
    let groupHelperText = this.element.querySelector(
      '.hds-form-group__helper-text'
    );
    let groupHelperTextId = groupHelperText.id;
    let groupError = this.element.querySelector('.hds-form-group__error');
    let groupErrorId = groupError.id;
    let fieldHelperText = this.element.querySelector(
      '.hds-form-field__helper-text'
    );
    let fieldHelperTextId = fieldHelperText.id;
    let fieldError = this.element.querySelector('.hds-form-field__error');
    let fieldErrorId = fieldError.id;
    assert
      .dom('input')
      .hasAttribute(
        'aria-describedby',
        `${fieldHelperTextId} ${fieldErrorId} ${groupHelperTextId} ${groupErrorId}`
      );
  });

  // REQUIRED AND OPTIONAL

  test('it should append an indicator to the legend text and set the required attribute when user input is required', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Form::Toggle::Group @isRequired={{true}} as |G|>
            <G.Legend>This is the legend</G.Legend>
            <G.Toggle::Field checked="checked" @value="abc123" as |F|>
              <F.Label>This is the control label</F.Label>
            </G.Toggle::Field>
          </Hds::Form::Toggle::Group>`
    );
    assert.dom('legend .hds-form-indicator').exists();
    assert.dom('legend .hds-form-indicator').hasText('Required');
    assert.dom('input').hasAttribute('required');
  });
  test('it should append an indicator to the legend text when user input is optional', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Form::Toggle::Group @isOptional={{true}} as |G|>
            <G.Legend>This is the legend</G.Legend>
            <G.Toggle::Field checked="checked" @value="abc123" as |F|>
              <F.Label>This is the control label</F.Label>
            </G.Toggle::Field>
          </Hds::Form::Toggle::Group>`
    );
    assert.dom('legend .hds-form-indicator').exists();
    assert.dom('legend .hds-form-indicator').hasText('(Optional)');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Form::Toggle::Group id="test-form-toggle" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-form-toggle').hasClass('my-class');
    assert.dom('#test-form-toggle').hasAttribute('data-test1');
    assert.dom('#test-form-toggle').hasAttribute('data-test2', 'test');
  });
});
