/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwText from './index';
import type { ShwTextSignature } from './index';

export interface ShwTextH3Signature {
  Args: {
    align?: ShwTextSignature['Args']['align'];
    weight?: ShwTextSignature['Args']['weight'];
    tag?: ShwTextSignature['Args']['tag'];
  };
  Blocks: {
    default: [];
  };
  Element: ShwTextSignature['Element'];
}

const ShwTextH3: TemplateOnlyComponent<ShwTextH3Signature> = <template>
  <ShwText
    @variant="h3"
    @align={{@align}}
    @weight={{@weight}}
    @tag={{@tag}}
    ...attributes
  >{{yield}}</ShwText>
</template>;

export default ShwTextH3;
