/* eslint-disable ember/no-classic-components, ember/no-classic-classes, ember/require-tagless-components, ember/no-actions-hash, prettier/prettier */
import Component from '@ember/component';

import { COLORS } from '@hashicorp/design-system-components/components/hds/tag';

export default Component.extend({
  count: 0,

  test: 'AAAAA!',

  myColors: COLORS,

  get COLORS() {
    return COLORS;
  },

  get STATES() {
    // these are used only for presentation purpose in the showcase
    return ['default', 'hover', 'active', 'focus'];
  },

  actions: {
    clickButton() {
      console.log( 'Button clicked!', COLORS );
      this.set('count', this.count+3);
    }
  },

  get altClickButton1() {
    return () => {
      console.log('Clicked "altClickButton1" button function')
    };
  },

  get noop() {
    return () => {};
  },

});
