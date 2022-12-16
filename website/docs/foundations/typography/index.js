import Component from '@glimmer/component';

const FONT_FAMILIES = ['sans-display', 'sans-text', 'mono-code'];
const FONT_WEIGHTS = ['regular', 'medium', 'semibold', 'bold'];
const DISPLAY_STYLES = [
  'display-500',
  'display-400',
  'display-300',
  'display-200',
  'display-100',
];
const BODY_STYLES = ['body-300', 'body-200', 'body-100'];
const CODE_STYLES = ['code-300', 'code-200', 'code-100'];
// we add all the allowed combinations here, per design specs
const STYLES_COMBINATIONS = {
  'display-500': ['bold'],
  'display-400': ['medium', 'semibold', 'bold'],
  'display-300': ['medium', 'semibold', 'bold'],
  'display-200': ['semibold'],
  'display-100': ['medium'],
  'body-300': ['regular', 'medium', 'semibold'],
  'body-200': ['regular', 'medium', 'semibold'],
  'body-100': ['regular', 'medium', 'semibold'],
  'code-300': ['regular', 'bold'],
  'code-200': ['regular', 'bold'],
  'code-100': ['regular', 'bold'],
};

export default class Index extends Component {
  get families() {
    return [...FONT_FAMILIES];
  }
  get weights() {
    return [...FONT_WEIGHTS];
  }
  get styles() {
    return [...DISPLAY_STYLES, ...BODY_STYLES, ...CODE_STYLES];
  }
  get cssHelpers() {
    const cssHelpers = {
      families: [],
      weights: [],
      styles: [],
    };
    this.families.forEach((family) => {
      cssHelpers.families.push({
        previewText: 'Aa',
        previewClass: `hds-font-family-${family}`,
        copyText: `hds-font-family-${family}`,
      });
    });
    this.weights.forEach((weight) => {
      cssHelpers.weights.push({
        previewText: 'Aa',
        previewClass: `hds-font-weight-${weight}`,
        copyText: `hds-font-weight-${weight}`,
      });
    });
    this.styles.forEach((style) => {
      cssHelpers.styles.push({
        previewText: 'Aa',
        previewClass: `hds-typography-${style}`,
        copyText: `hds-typography-${style}`,
      });
    });
    return cssHelpers;
  }
  get stylesCombinations() {
    const combinations = [];
    Object.keys(STYLES_COMBINATIONS).forEach((style) => {
      STYLES_COMBINATIONS[style].forEach((weight) => {
        combinations.push({
          previewText: 'The fox jumped over the lazy dog',
          previewClass: `hds-typography-${style} hds-font-weight-${weight}`,
          otherText: `${style} (${weight})`,
        });
      });
    });
    return combinations;
  }
}
