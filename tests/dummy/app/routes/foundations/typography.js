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
// we add all the allowed combinations here, per design specs
export const STYLES_COMBINATIONS = {
  'display-500': ['bold'],
  'display-400': ['medium', 'semibold', 'bold'],
  'display-300': ['medium', 'semibold', 'bold'],
  'display-200': ['semibold'],
  'display-100': ['medium'],
  'body-300': ['regular', 'medium', 'semibold'],
  'body-200': ['regular', 'medium', 'semibold'],
  'body-100': ['regular', 'medium', 'semibold'],
  // TODO! ask @heather what are the conditions here
  'code-100': ['regular', 'medium', 'semibold', 'bold'],
};

export default class FoundationsElevationRoute extends Route {
  model() {
    return {
      FONT_FAMILIES,
      FONT_WEIGHTS,
      DISPLAY_STYLES,
      BODY_STYLES,
      CODE_STYLES,
      STYLES_COMBINATIONS,
    };
  }
}
