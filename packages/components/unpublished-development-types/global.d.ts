import '@glint/environment-ember-loose';

import { LinkTo } from '@ember/routing';
import DidInsertModifier from '@ember/render-modifiers/modifiers/did-insert';
import type EmberTruthRegistry from 'ember-truth-helpers/template-registry';
import type EmberElementHelperRegistry from 'ember-element-helper/template-registry';
import type EmberStyleModifier from 'ember-style-modifier';
import type FlightIconsRegistry from '@hashicorp/ember-flight-icons/template-registry';

export default interface EmberStyleModifierRegistry {
  style: typeof EmberStyleModifier;
}
import type HdsComponentsRegistry from '../src/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberTruthRegistry,
      HdsComponentsRegistry,
      EmberElementHelperRegistry,
      EmberStyleModifierRegistry,
      FlightIconsRegistry /*, other addon registries */ {
    // local entries
    'did-insert': typeof DidInsertModifier;
    LinkToExternal: typeof LinkTo;
  }
}
