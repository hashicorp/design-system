import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/checkbox/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::Form::Checkbox::Base id="test-form-checkbox" />`);
    assert.dom('#test-form-checkbox').exists();
  });
  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Form::Checkbox::Base id="test-form-checkbox" />`);
    assert.dom('#test-form-checkbox').hasClass('hds-form-checkbox');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Form::Checkbox::Base id="test-form-checkbox" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-form-checkbox').hasClass('my-class');
    assert.dom('#test-form-checkbox').hasAttribute('data-test1');
    assert.dom('#test-form-checkbox').hasAttribute('data-test2', 'test');
  });
});
