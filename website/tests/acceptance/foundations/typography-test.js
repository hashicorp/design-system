import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | foundations/typography', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /foundations/typography', async function (assert) {
    await visit('/foundations/typography');

    assert.strictEqual(currentURL(), '/foundations/typography');
  });

  test('foundations/typography page passes a11y automated checks', async function (assert) {
    await visit('/foundations/typography');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
