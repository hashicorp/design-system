import templateOnlyComponent from '@ember/component/template-only';

import type { ShwTextIndexComponentSignature } from './index';

export interface H1ComponentSignature {
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

const H1Component = templateOnlyComponent<H1ComponentSignature>();

export default H1Component;
