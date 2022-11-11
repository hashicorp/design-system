/* eslint-disable ember/no-classic-components, prettier/prettier, ember/no-classic-classes */
import Component from '@ember/component';
import layout from '../templates/components/color-pallet';

function convertHex(hex){
  hex = hex.replace('#','');
  let r = parseInt(hex.substring(0,2), 16);
  let g = parseInt(hex.substring(2,4), 16);
  let b = parseInt(hex.substring(4,6), 16);

  return [r, g, b];
}

export default Component.extend({
  layout,

  tagName: '',


  init(attrs) {
    this._super(...arguments);

    this.rgb = convertHex(attrs.color);

    if (attrs.textClasses) {
      this.textClasses = attrs.textClasses;
    } else {
      // there needs to be at least one class
      this.textClasses = [
        'field-guide-text-sm',
      ]
    }

    if (attrs.textColorClasses) {
      this.textColorClasses = attrs.textColorClasses;
    } else {
      // there needs to be at least one class
      this.textColorClasses = [
        'field-guide-normal-text'
      ]
    }

    let [r, g, b] = this.rgb;
    this.rgbString = `${r}, ${g}, ${b}`
  },
});
