import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | foundations', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /foundations', async function (assert) {
    await visit('/foundations');

    assert.strictEqual(currentURL(), '/foundations');
  });

  test('foundations page passes a11y automated checks', async function (assert) {
    await visit('/foundations');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
