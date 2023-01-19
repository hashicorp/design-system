import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | getting started/for engineers', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /getting-started/for-engineers', async function (assert) {
    await visit('/getting-started/for-engineers');

    assert.strictEqual(currentURL(), '/getting-started/for-engineers');
  });

  test('getting-started/for-engineers page passes a11y automated checks', async function (assert) {
    await visit('/getting-started/for-engineers');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
