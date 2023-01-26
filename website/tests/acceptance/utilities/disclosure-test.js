import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | utilities/disclosure', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /utilities/disclosure', async function (assert) {
    await visit('/utilities/disclosure');

    assert.strictEqual(currentURL(), '/utilities/disclosure');
  });

  test('utilities/disclosure passes a11y automated checks', async function (assert) {
    await visit('/utilities/disclosure');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
