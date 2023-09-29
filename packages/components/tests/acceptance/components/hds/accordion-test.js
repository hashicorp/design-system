import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'dummy/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Component | hds/accordion', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/accordion', async function (assert) {
    await visit('/components/accordion');

    assert.strictEqual(currentURL(), '/components/accordion');
  });
  test('Components/hds/accordion page passes automated a11y checks', async function (assert) {
    await visit('/components/accordion');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
