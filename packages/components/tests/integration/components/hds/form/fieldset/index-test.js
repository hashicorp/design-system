import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/fieldset/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::Form::Fieldset id="test-form-fieldset" />`);
    assert.dom('#test-form-fieldset').exists();
  });
  test('it renders the element as <fieldset>', async function (assert) {
    await render(hbs`<Hds::Form::Fieldset id="test-form-fieldset" />`);
    assert.dom('#test-form-fieldset').hasTagName('fieldset');
  });

  // LAYOUT

  test('it should render the correct CSS layout class depending on the @layout prop', async function (assert) {
    await render(
      hbs`<Hds::Form::Fieldset @layout="vertical" id="test-form-fieldset" />`
    );
    assert
      .dom('#test-form-fieldset')
      .hasClass('hds-form-group--layout-vertical');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components', async function (assert) {
    assert.expect(8);
    await render(
      hbs`<Hds::Form::Fieldset @layout="vertical" id="test-form-fieldset" as |F|>
          <F.Legend>This is the legend</F.Legend>
          <F.HelperText>This is the group helper text</F.HelperText>
          <F.Control><pre class="hds-form-group__control-field">This is a mock control field</pre></F.Control>
          <F.Error>This is the group error</F.Error>
        </Hds::Form::Fieldset>`
    );
    assert.dom('#test-form-fieldset .hds-form-group__legend').exists();
    assert.dom('.hds-form-group__legend').hasText('This is the legend');
    assert.dom('#test-form-fieldset .hds-form-group__helper-text').exists();
    assert
      .dom('.hds-form-group__helper-text')
      .hasText('This is the group helper text');
    assert.dom('#test-form-fieldset .hds-form-group__control-field').exists();
    assert
      .dom('.hds-form-group__control-field')
      .hasText('This is a mock control field');
    assert.dom('#test-form-fieldset .hds-form-group__error').exists();
    assert.dom('.hds-form-group__error').hasText('This is the group error');
  });
  test('it automatically provides all the ID relations between the elements', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Form::Fieldset @layout="vertical" @extraAriaDescribedBy="extra" as |F|>
          <F.Legend>This is the legend</F.Legend>
          <F.HelperText>This is the group helper text</F.HelperText>
          <F.Control><pre class="hds-form-group__control" id={{F.id}} aria-describedby={{F.ariaDescribedBy}}>This is a mock control</pre></F.Control>
          <F.Error>This is the group error</F.Error>
        </Hds::Form::Fieldset>`
    );
    // the fieldset ID is dynamically generated
    let fieldset = this.element.querySelector('fieldset');
    let fieldsetId = fieldset.id;
    assert
      .dom('.hds-form-group__helper-text')
      .hasAttribute('id', `helper-text-${fieldsetId}`);
    assert
      .dom('fieldset')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${fieldsetId} error-${fieldsetId} extra`
      );
    assert
      .dom('.hds-form-group__error')
      .hasAttribute('id', `error-${fieldsetId}`);
  });

  // REQUIRED AND OPTIONAL

  test('it should render a required badge if the @isRequired prop is declared', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Form::Fieldset @isRequired={{true}} as |F|>
          <F.Legend>This is the legend</F.Legend>
        </Hds::Form::Fieldset>`
    );
    assert.dom('legend .hds-badge').exists();
    assert.dom('legend .hds-badge').hasText('Required');
  });
  test('it should render an optional indicator if the @isOptional prop is declared', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Form::Fieldset @isOptional={{true}} as |F|>
          <F.Legend>This is the legend</F.Legend>
        </Hds::Form::Fieldset>`
    );
    assert.dom('legend .hds-form-legend__optional-indicator').exists();
    assert
      .dom('legend .hds-form-legend__optional-indicator')
      .hasText('(Optional)');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Form::Fieldset id="test-form-fieldset" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-form-fieldset').hasClass('my-class');
    assert.dom('#test-form-fieldset').hasAttribute('data-test1');
    assert.dom('#test-form-fieldset').hasAttribute('data-test2', 'test');
  });
});
