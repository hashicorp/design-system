import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/segmented-group', async function (assert) {
    await visit('/components/segmented-group');

    assert.strictEqual(currentURL(), '/components/segmented-group');
  });
  test('Components/segmented-group page passes a11y automated checks', async function (assert) {
    await visit('/components/segmented-group');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
