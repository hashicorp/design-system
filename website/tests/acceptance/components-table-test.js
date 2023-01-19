import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Components/Table', function (hooks) {
  setupApplicationTest(hooks);

  test('Components/table page exists', async function (assert) {
    await visit('/components/table');

    assert.strictEqual(currentURL(), '/components/table');
  });

  test('Components/table page passes a11y automated checks', async function (assert) {
    await visit('/components/table');

    let axeOptions = {
      rules: {
        list: {
          enabled: false,
        },
      },
    };

    await a11yAudit(axeOptions);

    assert.ok(true, 'a11y automation audit passed');
  });
});
