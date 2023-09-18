import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/flyout', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/flyout', async function (assert) {
    await visit('/components/flyout');

    assert.strictEqual(currentURL(), '/components/flyout');
  });
  test('Components/flyout page passes a11y automated checks', async function (assert) {
    await visit('/components/flyout');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
