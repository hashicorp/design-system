import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | foundations/colors', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /foundations/colors', async function (assert) {
    await visit('/foundations/colors');

    assert.strictEqual(currentURL(), '/foundations/colors');
  });
  test('foundations/colors page passes a11y automated checks', async function (assert) {
    await visit('/foundations/colors');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
