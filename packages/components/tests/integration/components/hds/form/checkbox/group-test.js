import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/checkbox/group', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::Form::Checkbox::Group id="test-form-checkbox" />`);
    assert.dom('#test-form-checkbox').exists();
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components and subcomponents', async function (assert) {
    assert.expect(12);
    await render(
      hbs`<Hds::Form::Checkbox::Group as |G|>
            <G.Legend>This is the legend</G.Legend>
            <G.HelperText>This is the group helper text</G.HelperText>
            <G.Checkbox::Field checked="checked" @value="abc123" as |F|>
              <F.Label>This is the control label</F.Label>
              <F.HelperText>This is the control helper text</F.HelperText>
              <F.Error>This is the control error</F.Error>
            </G.Checkbox::Field>
            <G.Error>This is the group error</G.Error>
        </Hds::Form::Checkbox::Group>`
    );
    assert.dom('.hds-form-group__legend').exists();
    assert.dom('.hds-form-group__legend').hasText('This is the legend');
    assert.dom('.hds-form-group__helper-text').exists();
    assert.dom('.hds-form-group__helper-text').hasText('This is the group helper text');
    assert.dom('.hds-form-group__control-fields-wrapper .hds-form-field__label').exists();
    assert.dom('.hds-form-group__control-fields-wrapper .hds-form-field__helper-text').exists();
    assert.dom('.hds-form-group__control-fields-wrapper .hds-form-field__control').exists();
    assert.dom('.hds-form-group__control-fields-wrapper input').isChecked();
    assert.dom('.hds-form-group__control-fields-wrapper input').hasValue('abc123');
    assert.dom('.hds-form-group__control-fields-wrapper .hds-form-field__error').exists();
    assert.dom('.hds-form-group__error').exists();
    assert.dom('.hds-form-group__error').hasText('This is the group error');
  });
  test('it does not render the yielded contextual components if not provided', async function (assert) {
    assert.expect(3);
    await render(hbs`<Hds::Form::Checkbox::Group />`);
    assert.dom('.hds-form-group__legend').doesNotExist();
    assert.dom('.hds-form-group__helper-text').doesNotExist();
    assert.dom('.hds-form-group__error').doesNotExist();
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Form::Checkbox::Group id="test-form-checkbox" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-form-checkbox').hasClass('my-class');
    assert.dom('#test-form-checkbox').hasAttribute('data-test1');
    assert.dom('#test-form-checkbox').hasAttribute('data-test2', 'test');
  });
});
