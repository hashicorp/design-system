import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from '../../../helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Components | hds/dropdown', function (hooks) {
  setupApplicationTest(hooks);

  test('visit /components/dropdown and check a11y', async function (assert) {
    let axeOptions = {
      rules: {
        'duplicate-id': { enabled: false },
      },
    };

    await visit('/components/dropdown');

    assert.strictEqual(currentURL(), '/components/dropdown');

    await a11yAudit(axeOptions);

    assert.ok(true, 'no a11y errors found!');
  });
});
