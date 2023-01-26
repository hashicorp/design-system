import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/button set', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/button-set', async function (assert) {
    await visit('/components/button-set');

    assert.strictEqual(currentURL(), '/components/button-set');
  });
  test('components/button-set page passes a11y automated checks', async function (assert) {
    await visit('/components/button-set');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
