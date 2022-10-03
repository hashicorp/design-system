import Route from '@ember/routing/route';

import {
  AVAILABLE_VARIANTS,
  AVAILABLE_COLORS,
  AVAILABLE_ALIGNS,
  MAPPING_STYLE_TO_TAG,
} from '@hashicorp/design-system-components/components/hds/text';

export default class ComponentsTextRoute extends Route {
  model() {
    const AVAILABLE_GROUP_SIZE_WEIGHT_COMBINATIONS = {};

    AVAILABLE_VARIANTS.forEach((variant) => {
      const [, group, size, weight] = variant.match(/^(\w+)\/(\w+)\/(\w+)$/);
      if (!AVAILABLE_GROUP_SIZE_WEIGHT_COMBINATIONS[`${group}/${size}`]) {
        AVAILABLE_GROUP_SIZE_WEIGHT_COMBINATIONS[`${group}/${size}`] = [];
      }
      AVAILABLE_GROUP_SIZE_WEIGHT_COMBINATIONS[`${group}/${size}`].push(weight);
    });

    return {
      AVAILABLE_VARIANTS,
      AVAILABLE_COLORS,
      AVAILABLE_ALIGNS,
      MAPPING_STYLE_TO_TAG,
      AVAILABLE_GROUP_SIZE_WEIGHT_COMBINATIONS,
    };
  }
}
