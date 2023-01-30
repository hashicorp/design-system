import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/dropdown', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/dropdown', async function (assert) {
    await visit('/components/dropdown');

    assert.strictEqual(currentURL(), '/components/dropdown');
  });

  test('components/dropdown page passes a11y automated checks', async function (assert) {
    await visit('/components/dropdown');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
