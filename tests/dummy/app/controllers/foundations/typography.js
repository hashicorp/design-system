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
