import Controller from '@ember/controller';
import {
  AVAILABLE_WEIGHTS,
  AVAILABLE_SIZE_WEIGHT_COMBINATIONS,
} from '@hashicorp/design-system-components/components/hds/text';

export default class TypographyController extends Controller {
  get families() {
    return ['sans-display', 'sans-text', 'mono-code'];
  }
  get weights() {
    return AVAILABLE_WEIGHTS;
  }
  get styles() {
    return Object.keys(AVAILABLE_SIZE_WEIGHT_COMBINATIONS);
  }
  get stylesCombinations() {
    return AVAILABLE_SIZE_WEIGHT_COMBINATIONS;
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
