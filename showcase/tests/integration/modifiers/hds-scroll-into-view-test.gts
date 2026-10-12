/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, find, focus } from '@ember/test-helpers';
import sinon from 'sinon';
import { hash } from '@ember/helper';
import hdsScrollIntoViewOnFocus from '@hashicorp/design-system-components/modifiers/hds-scroll-into-view-on-focus';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Modifier | hds-scroll-into-view-on-focus',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(function () {
      sinon.restore();
    });

    test('it calls scrollIntoView with default options when focused', async function (assert) {
      assert.expect(2);

      const stub = sinon.stub(HTMLElement.prototype, 'scrollIntoView');

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
    });

    test('it calls scrollIntoView with provided options when focused', async function (assert) {
      assert.expect(2);

      const stub = sinon.stub(HTMLElement.prototype, 'scrollIntoView');

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
    });

    test('it does not call scrollIntoView when focus is pointer-driven', async function (assert) {
      assert.expect(1);

      const stub = sinon.stub(HTMLElement.prototype, 'scrollIntoView');

      await render(
        <template>
          <button id="target" type="button" {{hdsScrollIntoViewOnFocus}}>
            Target
          </button>
        </template>,
      );

      const target = find('#target') as HTMLElement;
      const matches = sinon.stub(target, 'matches').callThrough();
      matches.withArgs(':focus-visible').returns(false);

      await focus('#target');

      assert.false(
        stub.called,
        'scrollIntoView is not called for pointer-driven focus',
      );
    });
  },
);
