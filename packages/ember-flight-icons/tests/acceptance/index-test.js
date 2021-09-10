import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | icon index', function (hooks) {
  setupApplicationTest(hooks);

  // sanity checking that the docs are doing something vaguely resembling what we expect
  test('visiting / renders a list of icons', async function (assert) {
    await visit('/');

    assert.dom('[data-test-target="icon-grid"] [data-test-icon]').exists();
  });
});
