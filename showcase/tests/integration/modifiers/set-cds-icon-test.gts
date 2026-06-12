/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import type { ModifierLike } from '@glint/template';

import setCdsIcon from 'showcase/modifiers/set-cds-icon';

import { setupRenderingTest } from 'showcase/tests/helpers';

interface SetCdsIconTestSignature {
  Element: Element & {
    icon?: unknown;
  };
  Args: {
    Positional: [unknown];
  };
}

module('Integration | Modifier | set-cds-icon', function (hooks) {
  setupRenderingTest(hooks);

  test('it sets the icon property on the element', async function (assert) {
    class Context {
      @tracked icon = { iconName: 'first' };
    }

    const context = new Context();
    const setCdsIconModifier =
      setCdsIcon as ModifierLike<SetCdsIconTestSignature>;

    await render(
      <template>
        <div id="target" {{setCdsIconModifier context.icon}}>
          test
        </div>
      </template>,
    );

    const element = document.querySelector('#target') as Element & {
      icon?: unknown;
    };

    assert.strictEqual(element.icon, context.icon);
  });

  test('it updates icon property when argument changes', async function (assert) {
    class Context {
      @tracked icon = { iconName: 'first' };
    }

    const context = new Context();
    const setCdsIconModifier =
      setCdsIcon as ModifierLike<SetCdsIconTestSignature>;

    await render(
      <template>
        <div id="target" {{setCdsIconModifier context.icon}}>
          test
        </div>
      </template>,
    );

    const element = document.querySelector('#target') as Element & {
      icon?: unknown;
    };

    assert.deepEqual(element.icon, { iconName: 'first' });

    context.icon = { iconName: 'second' };
    await settled();

    assert.deepEqual(element.icon, { iconName: 'second' });
  });
});
