import '@glint/environment-ember-loose';

declare module 'ember-truth-helpers';

import { LinkTo } from "@ember/routing";

import type EmberTruthRegistry from 'ember-truth-helpers/template-registry';
import type HdsComponentsRegistry from '../template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberTruthRegistry, HdsComponentsRegistry /*, other addon registries */ {
    // local entries
    "LinkToExternal": typeof LinkTo;
  }
}
