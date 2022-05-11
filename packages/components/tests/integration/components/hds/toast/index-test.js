import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/toast/index', function (hooks) {
  setupRenderingTest(hooks);

  // notice: "toast" is a wrapper around the "hds::alert" so we test only very specific things

  test('it renders the "toast"', async function (assert) {
    await render(hbs`<Hds::Toast @text="alert text" />`);
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Toast @title="alert text" id="test-toast" />`);
    assert.dom('#test-toast').hasClass('hds-toast');
  });
});
