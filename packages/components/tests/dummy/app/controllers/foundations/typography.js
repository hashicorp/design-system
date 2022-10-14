import Controller from '@ember/controller';

import {
  FONT_FAMILIES,
  FONT_WEIGHTS,
  DISPLAY_STYLES,
  BODY_STYLES,
  CODE_STYLES,
  STYLES_COMBINATIONS,
} from '../../routes/foundations/typography';

export default class TypographyController extends Controller {
  get families() {
    return [...FONT_FAMILIES];
  }
  get weights() {
    return [...FONT_WEIGHTS];
  }
  get styles() {
    return [...DISPLAY_STYLES, ...BODY_STYLES, ...CODE_STYLES];
  }
  get stylesCombinations() {
    return STYLES_COMBINATIONS;
  }
  get cssHelpers() {
    const cssHelpers = {
      families: [],
      weights: [],
      styles: [],
    };
    this.families.forEach((family) => {
      cssHelpers.families.push(`.hds-font-family-${family}`);
    });
    this.weights.forEach((weight) => {
      cssHelpers.weights.push(`.hds-font-weight-${weight}`);
    });
    this.styles.forEach((style) => {
      cssHelpers.styles.push(`.hds-typography-${style}`);
    });
    return cssHelpers;
  }
}
