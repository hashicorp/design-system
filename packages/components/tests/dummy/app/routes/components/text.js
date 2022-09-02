import Route from '@ember/routing/route';

import {
  MAPPING_SIZE_TO_TAG,
  ALIGNS,
  AVAILABLE_WEIGHTS,
  AVAILABLE_SIZE_WEIGHT_COMBINATIONS,
  AVAILABLE_COLORS,
} from '@hashicorp/design-system-components/components/hds/text';

export default class ComponentsTextRoute extends Route {
  model() {
    // we need to create a new object because in handlebars `weights.[0]` triggers a prettier/linting error even if it's valid syntax
    // see: https://github.com/ember-template-lint/ember-template-lint/issues/787
    const DEFAULT_WEIGHTS = {};
    for (const size in AVAILABLE_SIZE_WEIGHT_COMBINATIONS) {
      DEFAULT_WEIGHTS[size] = AVAILABLE_SIZE_WEIGHT_COMBINATIONS[size][0];
    }

    return {
      SIZES: Object.keys(MAPPING_SIZE_TO_TAG),
      MAPPING_SIZE_TO_TAG,
      ALIGNS,
      AVAILABLE_WEIGHTS,
      AVAILABLE_SIZE_WEIGHT_COMBINATIONS,
      DEFAULT_WEIGHTS,
      AVAILABLE_COLORS,
    };
  }
}
