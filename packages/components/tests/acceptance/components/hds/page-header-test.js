import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'dummy/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/page header', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/page-header', async function (assert) {
    await visit('/components/page-header');

    assert.strictEqual(currentURL(), '/components/page-header');
  });
  test('Components/hds/page-header page passes automated a11y checks', async function (assert) {
    await visit('/components/page-header');
    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
