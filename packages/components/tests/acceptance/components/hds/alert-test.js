import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'dummy/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/hds/alert', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/alert', async function (assert) {
    await visit('/components/alert');

    assert.strictEqual(currentURL(), '/components/alert');
  });

  test('Components/alert page passes automated a11y checks', async function (assert) {
    await visit('/components/alert');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
