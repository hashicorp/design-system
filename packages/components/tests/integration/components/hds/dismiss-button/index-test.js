import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/dismiss-button/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::DismissButton />`);
    assert.dom(this.element).exists();
  });
  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::DismissButton id="test-dismiss-button" />`);
    assert.dom('#test-dismiss-button').hasClass('hds-dismiss-button');
  });
  test('it should render with custom classes', async function (assert) {
    await render(
      hbs`<Hds::DismissButton class="hds-alert__dismiss" id="test-dismiss-button" />`
    );
    assert.dom('#test-dismiss-button').hasClass('hds-alert__dismiss');
  });
});
