import templateOnlyComponent from '@ember/component/template-only';

import type { ShwTextIndexComponentSignature } from './index';

export interface H2ComponentSignature {
  Args: {
    align?: ShwTextIndexComponentSignature['Args']['align'];
    weight?: ShwTextIndexComponentSignature['Args']['weight'];
    tag?: ShwTextIndexComponentSignature['Args']['tag'];
  };
  Blocks: {
    default: [];
  };
  Element: ShwTextIndexComponentSignature['Element'];
}

const H2Component = templateOnlyComponent<H2ComponentSignature>();

export default H2Component;
