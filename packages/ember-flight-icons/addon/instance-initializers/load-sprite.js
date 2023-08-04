import * as svgSprite from '@hashicorp/flight-icons/svg-sprite/svg-sprite-module';
import config from 'ember-get-config';

export function initialize() {
  if (config.emberFlightIcons?.lazyEmbed) {
    window.document.body.insertAdjacentHTML('beforeend', svgSprite);
  }
}

export default {
  initialize,
};
