import type HdsComponentsRegistry from '../src/template-registry';
import { LinkTo } from '@ember/routing';
import '@glint/environment-ember-loose';
import type EmberElementHelperRegistry from 'ember-element-helper/template-registry';
import type EmberStyleModifier from 'ember-style-modifier';
import type EmberTruthRegistry from 'ember-truth-helpers/template-registry';

export default interface EmberStyleModifierRegistry {
  style: typeof EmberStyleModifier;
}

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
