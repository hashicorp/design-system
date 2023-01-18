import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting the home page', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
  });

  test('Home page passes a11y automated checks', async function (assert) {
    await visit('/');

    let axeOptions = {
      runOnly: [
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
        'best-practice',
        'ACT',
      ],
    };

    await a11yAudit('#topofpage', axeOptions);

    assert.ok(true, 'a11y automation audit passed');
  });
});
