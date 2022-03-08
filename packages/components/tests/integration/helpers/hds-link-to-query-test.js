import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | hds-link-to-query', function (hooks) {
  setupRenderingTest(hooks);

  test('returns the same object that is passed as argument', async function (assert) {
    this.set('query', 'test');

    await render(hbs`{{hds-link-to-query this.query}}`);

    assert.equal(this.query, 'test');
  });
});
