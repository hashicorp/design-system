import { module, test } from 'qunit';
import { setupTest } from 'website/tests/helpers';

module('Unit | Service | dynamic-sections', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:dynamic-sections');
    assert.ok(service);
  });
});
