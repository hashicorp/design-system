import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | about', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /about', async function (assert) {
    await visit('/about');

    assert.strictEqual(currentURL(), '/about');
  });

  test('about page passes a11y automated checks', async function (assert) {
    await visit('/about');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
