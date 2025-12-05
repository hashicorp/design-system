/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsApplicationStateMedia } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/application-state/media',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsApplicationStateMedia id="test-application-state-media" />
        </template>,
      );

      assert
        .dom('#test-application-state-media')
        .hasClass('hds-application-state__media');
    });

    test('it should render the yielded content when used in block form', async function (assert) {
      await render(
        <template>
          <HdsApplicationStateMedia id="test-application-state-media">
            <pre>test</pre>
          </HdsApplicationStateMedia>
        </template>,
      );
      assert.dom('#test-application-state-media > pre').exists();
      assert.dom('#test-application-state-media > pre').hasText('test');
    });
  },
);
