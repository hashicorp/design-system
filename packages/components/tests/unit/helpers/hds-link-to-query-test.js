import { module, test } from 'qunit';
import { hdsLinkToQuery } from '../../../helpers/hds-link-to-query';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | hds-link-to-query', function (hooks) {
  setupTest(hooks);

  test('returns the same object that is passed as argument', async function (assert) {
    let result = hdsLinkToQuery([{ category: 'learn', page: '1' }]);

    assert.deepEqual(result, {
      isQueryParams: true,
      values: {
        category: 'learn',
        page: '1',
      },
    });
  });

  test('returns an empty object if no argument is passed', async function (assert) {
    assert.equal(hdsLinkToQuery([]), {});
  });
});
