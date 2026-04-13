/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, focus } from '@ember/test-helpers';
import sinon from 'sinon';
import { hash } from '@ember/helper';
import hdsScrollIntoViewOnFocus from '@hashicorp/design-system-components/modifiers/hds-scroll-into-view-on-focus';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Modifier | hds-scroll-into-view-on-focus',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it calls scrollIntoView with default options when focused', async function (assert) {
      assert.expect(2);

      const stub = sinon.stub(HTMLElement.prototype, 'scrollIntoView');

      try {
        await render(
          <template>
            <button id="target" type="button" {{hdsScrollIntoViewOnFocus}}>
              Target
            </button>
          </template>,
        );

        await focus('#target');

        assert.true(stub.calledOnce, 'scrollIntoView is called once on focus');
        assert.deepEqual(stub.firstCall.args[0], {
          block: 'nearest',
          inline: 'nearest',
        });
      } finally {
        stub.restore();
      }
    });

    test('it calls scrollIntoView with provided options when focused', async function (assert) {
      assert.expect(2);

      const stub = sinon.stub(HTMLElement.prototype, 'scrollIntoView');

      try {
        await render(
          <template>
            <button
              id="target"
              type="button"
              {{hdsScrollIntoViewOnFocus
                options=(hash block="center" inline="end" behavior="smooth")
              }}
            >
              Target
            </button>
          </template>,
        );

        await focus('#target');

        assert.true(stub.calledOnce, 'scrollIntoView is called once on focus');
        assert.deepEqual(stub.firstCall.args[0], {
          block: 'center',
          inline: 'end',
          behavior: 'smooth',
        });
      } finally {
        stub.restore();
      }
    });
  },
);
