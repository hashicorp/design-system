/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import ShwText from './index';
import type { ShwTextSignature } from './index';

export interface ShwTextH4Signature {
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

export default class ShwTextH4 extends Component<ShwTextH4Signature> {
  <template>
    <ShwText
      @variant="h4"
      @align={{@align}}
      @weight={{@weight}}
      @tag={{@tag}}
      ...attributes
    >{{yield}}</ShwText>
  </template>
}
