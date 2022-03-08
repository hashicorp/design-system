import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | hds-link-to-query', function (hooks) {
  setupRenderingTest(hooks);

  test('Works properly in the LinkTo Standalone component', async function (assert) {
    await render(
      hbs`<Hds::LinkTo::Standalone @route="index" @query="category" @text="home" @icon="collections" />`
    );

    assert.equal(this.query, 'category');
  });
});
