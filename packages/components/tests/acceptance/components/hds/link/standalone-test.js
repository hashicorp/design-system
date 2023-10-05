import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'dummy/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Component | hds/link/standalone', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/link/standalone', async function (assert) {
    await visit('/components/link/standalone');

    assert.strictEqual(currentURL(), '/components/link/standalone');
  });
  test('Components/hds/link/standalone page passes automated a11y checks', async function (assert) {
    await visit('/components/link/standalone');
    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
