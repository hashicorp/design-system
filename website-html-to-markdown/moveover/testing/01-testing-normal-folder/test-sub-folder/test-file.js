/* eslint-disable ember/no-classic-components, ember/no-classic-classes, ember/require-tagless-components, ember/no-actions-hash, prettier/prettier */
import Component from '@ember/component';

export default Component.extend({
  count: 0,

  actions: {
    clickButton() {
      this.set('count', this.count+1);
    }
  }
});
