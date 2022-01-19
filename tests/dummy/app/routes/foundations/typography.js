import Route from '@ember/routing/route';

export const FONT_FAMILIES = ['sans-display', 'sans-text', 'mono-code'];
export const FONT_WEIGHTS = ['regular', 'medium', 'semibold', 'bold'];
export const DISPLAY_STYLES = [
  'display-500',
  'display-400',
  'display-300',
  'display-200',
  'display-100',
];
export const BODY_STYLES = ['body-300', 'body-200', 'body-100'];
export const CODE_STYLES = ['code-100'];

export default class FoundationsElevationRoute extends Route {
  model() {
    return {
      FONT_FAMILIES,
      FONT_WEIGHTS,
      DISPLAY_STYLES,
      BODY_STYLES,
      CODE_STYLES,
    };
  }
}
