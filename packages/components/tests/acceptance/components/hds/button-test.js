import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'dummy/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Component | hds/button', function (hooks) {
  setupApplicationTest(hooks);

  test('Components/button passes a11y automated checks', async function (assert) {
    // if making any changes to this component, enable the rule and run it to check that changes are still compliant
    let axeOptions = {
      rules: {
        'color-contrast': {
          enabled: false,
        },
      },
    };
    await visit('/components/button');
    await a11yAudit(axeOptions);

    assert.ok(true, 'a11y automation audit passed');
  });
});
