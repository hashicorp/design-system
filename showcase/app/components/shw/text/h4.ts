import templateOnlyComponent from '@ember/component/template-only';

import type { ShwTextIndexComponentSignature } from './index';

export interface H4ComponentSignature {
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

const H4Component = templateOnlyComponent<H4ComponentSignature>();

export default H4Component;
