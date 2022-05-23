import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/helper-text/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the component', async function (assert) {
      await render(hbs`<Hds::Form::HelperText />`);
      assert.dom(this.element).exists();
    });
    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(hbs`<Hds::Form::HelperText id="test-form-helper-text" />`);
      assert.dom('#test-form-helper-text').hasClass('hds-form-helper-text');
    });
  }
);
