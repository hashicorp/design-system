import { module, test } from 'qunit';
import { setupTest } from 'website/tests/helpers';

module('Unit | Service | show-sections', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:show-sections');
    assert.ok(service);
  });
});
