import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/application-state', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/application-state', async function (assert) {
    await visit('/components/application-state');

    assert.strictEqual(currentURL(), '/components/application-state');
  });
  test('Components/application-state page passes a11y automated checks', async function (assert) {
    await visit('/components/application-state');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
