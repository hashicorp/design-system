import Controller from '@ember/controller';
import { AVAILABLE_VARIANTS } from '@hashicorp/design-system-components/components/hds/text';

export default class TypographyController extends Controller {
  get families() {
    return ['sans-display', 'sans-text', 'mono-code'];
  }
  get weights() {
    // we could infer this array but it's easier to manually maintain this
    return ['regular', 'medium', 'semibold', 'bold'];
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
    AVAILABLE_VARIANTS.forEach((variant) => {
      const [, group, size] = variant.match(/^(\w+)\/(\w+)\/(\w+)$/);
      const helperClass = `.hds-typography-${group}-${size}`;
      console.log(helperClass, !helpers.indexOf(helperClass), helpers.length, helpers);
      if(helpers.indexOf(helperClass) < 0) {
        helpers.push(helperClass);
      }
    });
    return `${helpers.join('\n')}`;
  }
  get stylesCombinations() {
    const AVAILABLE_GROUP_SIZE_WEIGHT_COMBINATIONS = {};

    AVAILABLE_VARIANTS.forEach((variant) => {
      const [, group, size, weight] = variant.match(/^(\w+)\/(\w+)\/(\w+)$/);
      if (!AVAILABLE_GROUP_SIZE_WEIGHT_COMBINATIONS[`${group}-${size}`]) {
        AVAILABLE_GROUP_SIZE_WEIGHT_COMBINATIONS[`${group}-${size}`] = [];
      }
      AVAILABLE_GROUP_SIZE_WEIGHT_COMBINATIONS[`${group}-${size}`].push(weight);
    });
    return AVAILABLE_GROUP_SIZE_WEIGHT_COMBINATIONS;
  }
}
