import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'dummy/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Component | hds/dropdown', function (hooks) {
  setupApplicationTest(hooks);

  test('Components/dropdown passes a11y automated checks', async function (assert) {
    await visit('/components/dropdown');
    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
