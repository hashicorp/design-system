import '@glint/environment-ember-loose';

declare module 'ember-truth-helpers';

import { LinkTo } from "@ember/routing";

import type EmberTruthRegistry from 'ember-truth-helpers/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberTruthRegistry /*, other addon registries */ {
    // local entries
    "LinkToExternal": typeof LinkTo;
  }
}
