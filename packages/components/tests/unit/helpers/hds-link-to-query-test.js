import { module, test } from 'qunit';
import { hdsLinkToQuery } from '@hashicorp/design-system-components/helpers/hds-link-to-query';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | hds-link-to-query', function (hooks) {
  setupTest(hooks);

  test('returns the same object that is passed as argument', async function (assert) {
    assert.equal(hdsLinkToQuery(['test']), 'test');
  });

  test('returns an empty object if no argument is passed', async function (assert) {
    assert.equal(hdsLinkToQuery([]), {});
  });
});
