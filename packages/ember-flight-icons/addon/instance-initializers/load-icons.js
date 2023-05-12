import * as svgSprite from '@hashicorp/flight-icons/svg-sprite/svg-sprite-module';

export function initialize() {
  window.document.body.insertAdjacentHTML('beforeend', svgSprite);
}

export default {
  initialize,
};
