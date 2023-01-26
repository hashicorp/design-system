import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | foundations/elevation', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /foundations/elevation', async function (assert) {
    await visit('/foundations/elevation');

    assert.strictEqual(currentURL(), '/foundations/elevation');
  });

  test('foundations/elevation page passes a11y automated checks', async function (assert) {
    await visit('/foundations/elevation');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
