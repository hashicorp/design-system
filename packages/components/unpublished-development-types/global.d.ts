import '@glint/environment-ember-loose';

import { LinkTo } from '@ember/routing';

import type EmberTruthRegistry from 'ember-truth-helpers/template-registry';
import type EmberElementHelperRegistry from 'ember-element-helper/template-registry';
import type EmberStyleModifier from 'ember-style-modifier';

export default interface EmberStyleModifierRegistry {
  style: typeof EmberStyleModifier;
}
import type HdsComponentsRegistry from '../src/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberTruthRegistry,
      HdsComponentsRegistry,
      EmberElementHelperRegistry,
      EmberStyleModifierRegistry /*, other addon registries */ {
    // local entries
    LinkToExternal: typeof LinkTo;
  }
}
