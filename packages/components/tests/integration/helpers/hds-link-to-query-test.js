import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | hds-link-to-query', function (hooks) {
  setupRenderingTest(hooks);

  test('returns the same object that is passed as argument', async function (assert) {
    this.set('queryParams', "['category']");

    await render(
      hbs`<Hds::LinkTo::Standalone @route="index" @query={{this.category}} @text="home" @icon="collections" />`
    );

    assert.equal(this.query, 'category');
  });

  skip('returns an empty object if no argument is passed', async function (assert) {
    this.set('query', '');

    await render(hbs`{{hds-link-to-query this.query}}`);

    assert.equal(this.query, '');
  });
});
