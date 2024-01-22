const { addonV1Shim } = require('@embroider/addon-shim');
const flightIconSprite = require('@hashicorp/flight-icons/svg-sprite/svg-sprite-module');
module.exports = {
  ...addonV1Shim(__dirname),
  contentFor(type, config) {
    if (!config.emberFlightIcons?.lazyEmbed && type === 'body-footer') {
      return flightIconSprite;
    }
  },
};
