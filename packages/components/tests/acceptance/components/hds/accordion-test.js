import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from '../../../helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Component | hds/accordion', function (hooks) {
  setupApplicationTest(hooks);

  test('visit /components/accordion and check a11y', async function (assert) {
    let axeOptions = {
      rules: {
        'duplicate-id': { enabled: false },
      },
    };

    await visit('/components/accordion');

    assert.strictEqual(currentURL(), '/components/accordion');

    await a11yAudit(axeOptions);

    assert.ok(true, 'no a11y errors found!');
  });
});
