import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import { Portal, PortalTarget } from 'ember-stargate';

import type HdsComponentsRegistry from '../src/template-registry';
import type EmberElementHelperRegistry from 'ember-element-helper/template-registry';
import type EmberStargateRegistry from 'ember-stargate/template-registry';
import type EmberStyleModifierRegistry from 'ember-style-modifier/template-registry';
import type EmberTruthRegistry from 'ember-truth-helpers/template-registry';
import type PowerSelectRegistry from 'ember-power-select/template-registry';
import type { EmbroiderUtilRegistry } from '@embroider/util';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import type RenderModifiersRegistry from '@ember/render-modifiers/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends HdsComponentsRegistry,
      EmberElementHelperRegistry,
      EmberStargateRegistry,
      EmberStyleModifierRegistry,
      EmberTruthRegistry,
      PowerSelectRegistry,
      RenderModifiersRegistry,
      EmbroiderUtilRegistry /*, other addon registries */ {
    // local entries
    Portal: typeof Portal;
    PortalTarget: typeof PortalTarget;
    'sort-by': HelperLike<{
      Args: {
        Positional: [string[], unknown[]];
      };
      Return: unknown[];
    }>;
  }
}
