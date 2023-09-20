import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/text', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/text', async function (assert) {
    await visit('/components/text');

    assert.strictEqual(currentURL(), '/components/text');
  });
  test('Components/text page passes a11y automated checks', async function (assert) {
    let axeOptions = {
      rules: {
        'heading-order': {
          enabled: false,
        },
      },
    };

    await visit('/components/text');

    await a11yAudit(axeOptions);

    assert.ok(true, 'a11y automation audit passed');
  });
});
