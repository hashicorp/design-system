/* eslint-disable ember/no-classic-components, ember/no-classic-classes, ember/require-tagless-components, ember/no-actions-hash, prettier/prettier */
import Component from '@ember/component';

import { COLORS } from '@hashicorp/design-system-components/components/hds/tag';

export default Component.extend({

  get noop() {
    return () => {};
  },

  get STATES() {
    // these are used only for presentation purpose in the showcase
    return ['default', 'hover', 'active', 'focus'];
  },

  get COLORS() {
    return COLORS;
  }
});
