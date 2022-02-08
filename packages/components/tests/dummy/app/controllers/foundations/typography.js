import Controller from '@ember/controller';

import {
  FONT_FAMILIES,
  FONT_WEIGHTS,
  DISPLAY_STYLES,
  BODY_STYLES,
  CODE_STYLES,
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
    const combinations = [];
    // we add all these conditionals here, per design specs
    DISPLAY_STYLES.forEach((style) => {
      const weights = [];
      this.weights.forEach((weight) => {
        const isAllowed =
          (style === 'display-500' && weight === 'bold') ||
          (style === 'display-400' &&
            (weight === 'bold' ||
              weight === 'semibold' ||
              weight === 'medium')) ||
          (style === 'display-300' &&
            (weight === 'bold' ||
              weight === 'semibold' ||
              weight === 'medium')) ||
          (style === 'display-200' && weight === 'semibold') ||
          (style === 'display-100' && weight === 'medium');
        if (isAllowed) {
          weights.push(weight);
        }
      });
      combinations.push({
        name: style,
        weights: weights,
      });
    });
    BODY_STYLES.forEach((style) => {
      const weights = [];
      this.weights.forEach((weight) => {
        const isAllowed = weight !== 'bold';
        if (isAllowed) {
          weights.push(weight);
        }
      });
      combinations.push({
        name: style,
        weights: weights,
      });
    });
    CODE_STYLES.forEach((style) => {
      const weights = [];
      this.weights.forEach((weight) => {
        // TODO! ask @heather what are the conditions here
        weights.push(weight);
      });
      combinations.push({
        name: style,
        weights: weights,
      });
    });
    return combinations;
  }
  get csshelpers() {
    const helpers = [];
    this.families.forEach((family) => {
      helpers.push(`.hds-font-family-${family}`);
    });
    helpers.push('');
    this.weights.forEach((weight) => {
      helpers.push(`.hds-font-weight-${weight}`);
    });
    helpers.push('');
    this.styles.forEach((style) => {
      helpers.push(`.hds-typography-${style}`);
    });
    return `${helpers.join('\n')}`;
  }
}
