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
}
