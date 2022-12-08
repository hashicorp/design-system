import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';

module('Acceptance | errors', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting a known bad route', async function (assert) {
    await visit('/wubalubadubdub');

    assert.strictEqual(currentURL(), '/error');
  });
});
