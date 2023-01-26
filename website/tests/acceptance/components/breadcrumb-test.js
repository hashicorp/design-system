import { module, test, skip } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/breadcrumb', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/breadcrumb', async function (assert) {
    await visit('/components/breadcrumb');

    assert.strictEqual(currentURL(), '/components/breadcrumb');
  });

  skip('components/breadcrumb page passes a11y automated checks', async function (assert) {
    await visit('/components/breadcrumb');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
